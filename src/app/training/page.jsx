"use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  Suspense,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Layout from "@/components/Layout";
import TrainingVideoList from "@/components/TrainingVideoList";
import AdminVideoForm from "@/components/AdminVideoForm";
import trainingApi from "@/services/trainingApi";

// =====================================================
// CONSTANTS
// =====================================================

const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

const EMPTY_FORM = {
  title: "",
  description: "",
  duration: "",
  instructor: "Hawksberg International",
  video: "",
  video_file: null,
  training_name: "",
};

// =====================================================
// TRAINING PORTALS
// =====================================================

const TRAINING_PORTALS = {
  iso9001: "ISO 9001",
  iso14001: "ISO 14001",
  iso27001: "ISO 27001",
  riskidentification: "Risk Identification",
  riskevaluation: "Risk Evaluation",
  riskassessment: "Risk Assessment",
  risktreatment: "Risk Treatment",
  soa: "SOA",
};

// =====================================================
// HELPERS
// =====================================================

function normalizeTrainingName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

function getTrainingTitle(value) {
  const key = normalizeTrainingName(value);

  return (
    TRAINING_PORTALS[key] ||
    value ||
    "Training"
  );
}

function isYoutubeUrl(url) {
  if (!url) {
    return false;
  }

  const value = String(url).trim();

  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);

    const hostname =
      parsed.hostname?.toLowerCase() || "";

    return (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "youtube-nocookie.com" ||
      hostname === "www.youtube-nocookie.com" ||
      hostname === "youtu.be" ||
      hostname === "www.youtu.be"
    );
  } catch {
    return false;
  }
}

function isMp4File(file) {
  if (!file) {
    return false;
  }

  const fileName =
    file.name?.toLowerCase() || "";

  const fileType =
    file.type?.toLowerCase() || "";

  return (
    fileType === "video/mp4" ||
    fileName.endsWith(".mp4")
  );
}

function isMp4Url(url) {
  if (!url) {
    return false;
  }

  return String(url)
    .toLowerCase()
    .split("?")[0]
    .endsWith(".mp4");
}

// =====================================================
// GET VIDEO SOURCE
// =====================================================

function getVideoSource(video) {
  if (!video) {
    return "";
  }

  // New DB structure
  if (video.youtube_url) {
    return video.youtube_url;
  }

  if (video.video_url) {
    return video.video_url;
  }

  // Legacy fallback
  if (video.video) {
    return video.video;
  }

  return "";
}

// =====================================================
// YOUTUBE EMBED URL
// =====================================================

function getYoutubeEmbedUrl(url) {
  if (!url) {
    return "";
  }

  const value = String(url).trim();

  if (!value) {
    return "";
  }

  // Already an embed URL
  if (
    value.includes("youtube.com/embed/")
  ) {
    return value;
  }

  try {
    const parsed = new URL(value);

    const hostname =
      parsed.hostname?.toLowerCase() || "";

    // youtu.be/VIDEO_ID
    if (
      hostname === "youtu.be" ||
      hostname === "www.youtu.be"
    ) {
      const videoId =
        parsed.pathname
          .replace(/^\/+/, "")
          .split("/")[0];

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // youtube.com/watch?v=VIDEO_ID
    const videoId =
      parsed.searchParams.get("v");

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // youtube.com/shorts/VIDEO_ID
    const shortsMatch =
      parsed.pathname.match(
        /\/shorts\/([^/?]+)/
      );

    if (shortsMatch?.[1]) {
      return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    }
  } catch {
    return value;
  }

  return value;
}

// =====================================================
// COMPONENT
// =====================================================

function TrainingPortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ===================================================
  // AUTH
  // ===================================================

  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] =
    useState(false);

  // ===================================================
  // TRAINING
  // ===================================================

  const [trainingName, setTrainingName] =
    useState("");

  // ===================================================
  // VIDEOS
  // ===================================================

  const [videos, setVideos] = useState([]);

  const [selectedVideo, setSelectedVideo] =
    useState(0);

  const [videosLoading, setVideosLoading] =
    useState(true);

  const [videosError, setVideosError] =
    useState("");

  // ===================================================
  // FORM
  // ===================================================

  const [showVideoForm, setShowVideoForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState(EMPTY_FORM);

  const [saving, setSaving] =
    useState(false);

  // ===================================================
  // AUTH CHECK
  // ===================================================

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const storedUser =
        localStorage.getItem("trainingUser");

      if (!storedUser) {
        setUser(null);
        setAuthChecked(true);
        return;
      }

      const parsedUser =
        JSON.parse(storedUser);

      setUser(parsedUser);
    } catch (error) {
      console.error(
        "TRAINING USER PARSE ERROR:",
        error
      );

      localStorage.removeItem("trainingUser");

      setUser(null);
    }

    setAuthChecked(true);
  }, []);

  // ===================================================
  // AUTH REDIRECT
  // ===================================================

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!user) {
      router.replace("/training-login");
    }
  }, [
    authChecked,
    user,
    router,
  ]);

  // ===================================================
  // SET TRAINING NAME
  // ===================================================
  //
  // USER:
  // Always use user's DB training_name.
  //
  // ADMIN:
  // Can use ?trainingName=iso9001 etc.
  //
  // This prevents normal users from changing the
  // training portal simply by editing the URL.
  // ===================================================

  useEffect(() => {
    if (!user) {
      return;
    }

    const userTraining =
      normalizeTrainingName(
        user.training_name
      );

    const urlTraining =
      normalizeTrainingName(
        searchParams.get("trainingName")
      );

    if (user.role === "admin") {
      if (urlTraining) {
        setTrainingName(urlTraining);
        return;
      }

      setTrainingName("");
      return;
    }

    if (userTraining) {
      setTrainingName(userTraining);
    } else {
      setTrainingName("");
    }
  }, [
    user,
    searchParams,
  ]);

  // ===================================================
  // SCROLL TOP
  // ===================================================

  useEffect(() => {
    if (!trainingName) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [trainingName]);

  // ===================================================
  // LOAD VIDEOS FROM DATABASE
  // ===================================================

  const loadVideos =
    useCallback(async () => {
      if (!trainingName) {
        setVideos([]);
        setVideosLoading(false);
        return;
      }

      try {
        setVideosLoading(true);
        setVideosError("");
        setSelectedVideo(0);

        console.log(
          "========================================"
        );

        console.log(
          "LOADING TRAINING VIDEOS"
        );

        console.log(
          "TRAINING NAME:",
          trainingName
        );

        console.log(
          "========================================"
        );

        const response =
          await trainingApi.getVideosByTraining(
            trainingName
          );

        console.log(
          "TRAINING VIDEOS RESPONSE:",
          response
        );

        let loadedVideos = [];

        if (Array.isArray(response)) {
          loadedVideos = response;
        } else if (
          Array.isArray(response?.data)
        ) {
          loadedVideos = response.data;
        } else if (
          Array.isArray(response?.videos)
        ) {
          loadedVideos = response.videos;
        }

        // =================================================
        // FILTER BY TRAINING PORTAL
        // =================================================

        const filteredVideos =
          loadedVideos.filter((video) => {
            return (
              normalizeTrainingName(
                video?.training_name
              ) === trainingName
            );
          });

        console.log(
          "FILTERED TRAINING VIDEOS:",
          filteredVideos
        );

        setVideos(filteredVideos);
        setSelectedVideo(0);
      } catch (error) {
        console.error(
          "LOAD TRAINING VIDEOS ERROR:",
          error
        );

        setVideos([]);

        setVideosError(
          error?.message ||
            "Unable to load training videos."
        );
      } finally {
        setVideosLoading(false);
      }
    }, [trainingName]);

  // ===================================================
  // LOAD WHEN TRAINING CHANGES
  // ===================================================

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!user) {
      return;
    }

    if (!trainingName) {
      setVideos([]);
      setVideosLoading(false);
      return;
    }

    loadVideos();
  }, [
    authChecked,
    user,
    trainingName,
    loadVideos,
  ]);

  // ===================================================
  // CURRENT VIDEO
  // ===================================================

  const currentVideo =
    videos[selectedVideo] || null;

  // ===================================================
  // CURRENT SOURCE
  // ===================================================

  const currentVideoSource =
    useMemo(() => {
      return getVideoSource(
        currentVideo
      );
    }, [currentVideo]);

  // ===================================================
  // VIDEO TYPE
  // ===================================================

  const currentVideoIsYoutube =
    useMemo(() => {
      if (!currentVideo) {
        return false;
      }

      if (currentVideo.youtube_url) {
        return true;
      }

      return isYoutubeUrl(
        currentVideoSource
      );
    }, [
      currentVideo,
      currentVideoSource,
    ]);

  const currentVideoIsMp4 =
    useMemo(() => {
      if (!currentVideo) {
        return false;
      }

      if (
        currentVideo.video_url &&
        !currentVideoIsYoutube
      ) {
        return true;
      }

      return (
        !currentVideoIsYoutube &&
        isMp4Url(
          currentVideoSource
        )
      );
    }, [
      currentVideo,
      currentVideoSource,
      currentVideoIsYoutube,
    ]);

  // ===================================================
  // NEXT VIDEO
  // ===================================================

  const nextVideo = () => {
    if (
      selectedVideo <
      videos.length - 1
    ) {
      setSelectedVideo(
        (previous) =>
          previous + 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ===================================================
  // PREVIOUS VIDEO
  // ===================================================

  const previousVideo = () => {
    if (selectedVideo > 0) {
      setSelectedVideo(
        (previous) =>
          previous - 1
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleChange = (event) => {
    const target =
      event?.target;

    if (!target) {
      return;
    }

    const {
      name,
      value,
      files,
    } = target;

    // =================================================
    // MP4 FILE
    // =================================================

    if (name === "video_file") {
      const file =
        files?.[0] || null;

      if (!file) {
        setFormData(
          (previous) => ({
            ...previous,
            video_file: null,
          })
        );

        return;
      }

      if (!isMp4File(file)) {
        alert(
          "Only MP4 video files are allowed."
        );

        target.value = "";
        return;
      }

      if (
        file.size >
        MAX_VIDEO_SIZE
      ) {
        alert(
          "Video file must be less than 50 MB."
        );

        target.value = "";
        return;
      }

      setFormData(
        (previous) => ({
          ...previous,

          // YouTube and MP4 are mutually exclusive
          video: "",

          video_file: file,

          training_name:
            trainingName,
        })
      );

      return;
    }

    // =================================================
    // YOUTUBE URL
    // =================================================

    if (name === "video") {
      const youtubeUrl =
        value?.trim() || "";

      setFormData(
        (previous) => ({
          ...previous,

          video:
            youtubeUrl,

          // Remove MP4 when YouTube is entered
          video_file:
            null,

          training_name:
            trainingName,
        })
      );

      return;
    }

    // =================================================
    // NORMAL FIELD
    // =================================================

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );
  };

  // ===================================================
  // RESET FORM
  // ===================================================

  const resetForm = () => {
    setEditingId(null);

    setFormData({
      ...EMPTY_FORM,
      training_name:
        trainingName,
    });

    if (
      typeof document !==
      "undefined"
    ) {
      const fileInput =
        document.getElementById(
          "video_file"
        );

      if (fileInput) {
        fileInput.value = "";
      }
    }
  };

  // ===================================================
  // CLOSE FORM
  // ===================================================

  const closeForm = () => {
    resetForm();
    setShowVideoForm(false);
  };

  // ===================================================
  // NEW VIDEO
  // ===================================================

  const handleNewVideo = () => {
    setEditingId(null);

    setFormData({
      ...EMPTY_FORM,
      training_name:
        trainingName,
    });

    setShowVideoForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================================================
  // EDIT VIDEO
  // ===================================================

  const handleEdit = (video) => {
    if (!video) {
      return;
    }

    const youtubeUrl =
      video.youtube_url ||
      (
        isYoutubeUrl(
          video.video
        )
          ? video.video
          : ""
      );

    setEditingId(
      video.id
    );

    setFormData({
      title:
        video.title || "",

      description:
        video.description || "",

      duration:
        video.duration || "",

      instructor:
        video.instructor ||
        "Hawksberg International",

      video:
        youtubeUrl,

      // Existing Supabase MP4 remains
      // in the database.
      // A browser File is not recreated.
      video_file:
        null,

      training_name:
        normalizeTrainingName(
          video.training_name ||
            trainingName
        ),
    });

    setShowVideoForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===================================================
  // DELETE VIDEO
  // ===================================================

  const handleDelete = async (
    video
  ) => {
    if (!video?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Delete "${video.title}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setSaving(true);

      await trainingApi.deleteVideo(
        video.id
      );

      alert(
        "Training video deleted successfully."
      );

      setSelectedVideo(0);

      await loadVideos();
    } catch (error) {
      console.error(
        "DELETE TRAINING VIDEO ERROR:",
        error
      );

      alert(
        error?.message ||
          "Unable to delete training video."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===================================================
  // SUBMIT FORM
  // ===================================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    const title =
      formData.title?.trim() || "";

    const description =
      formData.description?.trim() || "";

    const duration =
      formData.duration?.trim() || "";

    const instructor =
      formData.instructor?.trim() || "";

    // Always use current portal.
    const selectedTraining =
      normalizeTrainingName(
        trainingName
      );

    const youtubeUrl =
      formData.video?.trim() || "";

    const videoFile =
      formData.video_file || null;

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (!title) {
      alert(
        "Please enter the video title."
      );
      return;
    }

    if (!description) {
      alert(
        "Please enter the video description."
      );
      return;
    }

    if (!duration) {
      alert(
        "Please enter the video duration."
      );
      return;
    }

    if (!instructor) {
      alert(
        "Please enter the instructor name."
      );
      return;
    }

    if (!selectedTraining) {
      alert(
        "Training portal is required."
      );
      return;
    }

    // =================================================
    // SOURCE VALIDATION
    // =================================================

    const hasYoutube =
      Boolean(youtubeUrl);

    const hasMp4 =
      videoFile instanceof File;

    if (
      hasYoutube &&
      hasMp4
    ) {
      alert(
        "Please use either YouTube URL OR MP4 file, not both."
      );
      return;
    }

    // CREATE requires a source.
    if (
      editingId === null &&
      !hasYoutube &&
      !hasMp4
    ) {
      alert(
        "Please provide a YouTube URL or upload an MP4 video."
      );
      return;
    }

    // =================================================
    // YOUTUBE VALIDATION
    // =================================================

    if (
      hasYoutube &&
      !isYoutubeUrl(
        youtubeUrl
      )
    ) {
      alert(
        "Please enter a valid YouTube URL."
      );
      return;
    }

    // =================================================
    // MP4 VALIDATION
    // =================================================

    if (hasMp4) {
      if (!isMp4File(videoFile)) {
        alert(
          "Only MP4 video files are allowed."
        );
        return;
      }

      if (
        videoFile.size >
        MAX_VIDEO_SIZE
      ) {
        alert(
          "Video file must be less than 50 MB."
        );
        return;
      }
    }

    // =================================================
    // FORMDATA
    // =================================================

    const data =
      new FormData();

    data.append(
      "title",
      title
    );

    data.append(
      "description",
      description
    );

    data.append(
      "duration",
      duration
    );

    data.append(
      "instructor",
      instructor
    );

    data.append(
      "training_name",
      selectedTraining
    );

    // YouTube only
    if (hasYoutube) {
      data.append(
        "youtube_url",
        youtubeUrl
      );
    }

    // MP4 only
    if (hasMp4) {
      data.append(
        "video_file",
        videoFile
      );
    }

    // =================================================
    // SAVE
    // =================================================

    try {
      setSaving(true);

      if (
        editingId !== null
      ) {
        await trainingApi.updateVideo(
          editingId,
          data
        );

        alert(
          "Training video updated successfully."
        );
      } else {
        await trainingApi.createVideo(
          data
        );

        alert(
          "Training video uploaded successfully."
        );
      }

      closeForm();

      await loadVideos();
    } catch (error) {
      console.error(
        "SAVE TRAINING VIDEO ERROR:",
        error
      );

      alert(
        error?.message ||
          "Unable to save training video."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===================================================
  // LOGOUT
  // ===================================================

  const handleLogout = () => {
    localStorage.removeItem(
      "trainingUser"
    );

    router.replace(
      "/training-login"
    );
  };

  // ===================================================
  // AUTH LOADING
  // ===================================================

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071A33]">
        <p className="text-white/60">
          Checking authentication...
        </p>
      </div>
    );
  }

  // ===================================================
  // NO USER
  // ===================================================

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071A33]">
        <p className="text-white/60">
          Redirecting to training login...
        </p>
      </div>
    );
  }

  // ===================================================
  // USER ROLE
  // ===================================================

  const isAdmin =
    user.role === "admin";

  // ===================================================
  // TRAINING TITLE
  // ===================================================

  const trainingTitle =
    getTrainingTitle(
      trainingName
    );

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Layout>
      <section className="relative min-h-screen overflow-hidden bg-[#071A33]">

        {/* =================================================
            BACKGROUND
        ================================================= */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,162,58,0.15),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_40%)]" />

        <div className="absolute inset-0 grid-pattern opacity-10" />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="container-x relative py-16">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-10 flex flex-wrap items-center justify-between gap-6">

            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-gold">
                Hawksberg International
              </p>

              <h1 className="mt-3 font-display text-5xl text-white">
                {trainingTitle}
              </h1>

              <p className="mt-4 text-white/70">
                Welcome{" "}
                <span className="font-semibold text-gold">
                  {user.name ||
                    "User"}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">

              <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                  Logged in as
                </p>

                <h3 className="mt-2 text-lg font-bold text-gold">
                  {isAdmin
                    ? "Administrator"
                    : "Training User"}
                </h3>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={
                    handleNewVideo
                  }
                  disabled={
                    saving ||
                    !trainingName
                  }
                  className="cursor-pointer rounded-xl bg-gold px-6 py-3 font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  + New Video
                </button>
              )}

            </div>
          </div>

          {/* =================================================
              ADMIN FORM
          ================================================= */}

          {isAdmin &&
            showVideoForm && (
              <div className="mb-10 rounded-2xl border border-gold/30 bg-gold/5 p-6">

                <div className="mb-6 flex items-center justify-between">

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gold">
                      {editingId
                        ? "Edit Training Video"
                        : "Add Training Video"}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-white">
                      {trainingTitle}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={
                      closeForm
                    }
                    className="rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-red-400 hover:bg-red-500"
                  >
                    Close
                  </button>

                </div>

                <AdminVideoForm
                  formData={formData}
                  handleChange={
                    handleChange
                  }
                  handleSubmit={
                    handleSubmit
                  }
                  editingId={
                    editingId
                  }
                  resetForm={
                    closeForm
                  }
                  loading={saving}
                />

              </div>
            )}

          {/* =================================================
              LOADING
          ================================================= */}

          {videosLoading && (
            <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-white/10 bg-white/5">

              <div className="text-center">

                <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-gold" />

                <p className="text-lg text-white/70">
                  Loading training videos...
                </p>

              </div>

            </div>
          )}

          {/* =================================================
              ERROR
          ================================================= */}

          {!videosLoading &&
            videosError && (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-8 text-center">

                <p className="text-red-300">
                  {videosError}
                </p>

                <button
                  type="button"
                  onClick={
                    loadVideos
                  }
                  className="mt-5 rounded-xl bg-gold px-6 py-3 font-semibold text-black transition hover:scale-105"
                >
                  Try Again
                </button>

              </div>
            )}

          {/* =================================================
              NO VIDEOS
          ================================================= */}

          {!videosLoading &&
            !videosError &&
            videos.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">

                <h2 className="text-2xl font-bold text-white">
                  No training videos available
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-white/60">
                  There are currently no videos
                  available for{" "}
                  <span className="font-semibold text-gold">
                    {trainingTitle}
                  </span>.
                </p>

                {isAdmin &&
                  trainingName && (
                    <button
                      type="button"
                      onClick={
                        handleNewVideo
                      }
                      className="mt-7 rounded-xl bg-gold px-7 py-3 font-semibold text-black transition hover:scale-105"
                    >
                      + Add First Video
                    </button>
                  )}

              </div>
            )}

          {/* =================================================
              VIDEO CONTENT
          ================================================= */}

          {!videosLoading &&
            !videosError &&
            currentVideo && (
              <div className="grid gap-8 lg:grid-cols-12">

                {/* =================================================
                    VIDEO LIST
                ================================================= */}

                <div className="lg:col-span-3">

                  <TrainingVideoList
                    videos={videos}
                    selectedVideo={
                      selectedVideo
                    }
                    setSelectedVideo={
                      setSelectedVideo
                    }
                  />

                </div>

                {/* =================================================
                    MAIN VIDEO
                ================================================= */}

                <div className="lg:col-span-9">

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

                    {/* =================================================
                        VIDEO PLAYER
                    ================================================= */}

                    <div className="overflow-hidden rounded-t-2xl bg-black">

                      {/* =================================================
                          YOUTUBE
                      ================================================= */}

                      {currentVideoIsYoutube && (
                        <iframe
                          key={
                            `youtube-${currentVideo.id}`
                          }
                          src={getYoutubeEmbedUrl(
                            currentVideoSource
                          )}
                          title={
                            currentVideo.title
                          }
                          loading="lazy"
                          className="aspect-video w-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      )}

                      {/* =================================================
                          MP4 FROM SUPABASE
                      ================================================= */}

                      {currentVideoIsMp4 && (
                        <video
                          key={
                            `mp4-${currentVideo.id}`
                          }
                          controls
                          preload="metadata"
                          playsInline
                          className="aspect-video w-full bg-black object-contain"
                        >
                          <source
                            src={
                              currentVideo.video_url ||
                              currentVideoSource
                            }
                            type="video/mp4"
                          />

                          Your browser does not support HTML5 video.
                        </video>
                      )}

                      {/* =================================================
                          NO SOURCE
                      ================================================= */}

                      {!currentVideoIsYoutube &&
                        !currentVideoIsMp4 && (
                          <div className="flex aspect-video items-center justify-center bg-black">

                            <p className="text-white/60">
                              Video source is not available.
                            </p>

                          </div>
                        )}

                    </div>

                    {/* =================================================
                        VIDEO DETAILS
                    ================================================= */}

                    <div className="p-8">

                      <div className="flex flex-wrap items-center justify-between gap-4">

                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-gold">
                            {trainingTitle}
                          </p>

                          <h2 className="mt-3 text-3xl font-bold text-white">
                            {currentVideo.title}
                          </h2>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">

                          <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                            Duration
                          </p>

                          <p className="mt-2 font-semibold text-gold">
                            {currentVideo.duration ||
                              "-"}
                          </p>

                        </div>

                      </div>

                      {/* =================================================
                          DESCRIPTION
                      ================================================= */}

                      <div className="mt-8">

                        <h3 className="text-lg font-semibold text-white">
                          Description
                        </h3>

                        <p className="mt-4 leading-8 text-white/70">
                          {currentVideo.description ||
                            "No description available."}
                        </p>

                      </div>

                      {/* =================================================
                          NAVIGATION
                      ================================================= */}

                      <div className="mt-10 flex flex-wrap gap-4">

                        <button
                          type="button"
                          onClick={
                            previousVideo
                          }
                          disabled={
                            selectedVideo ===
                            0
                          }
                          className="rounded-xl border border-gold px-8 py-3 font-semibold text-gold transition hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Previous Lesson
                        </button>

                        <button
                          type="button"
                          onClick={
                            nextVideo
                          }
                          disabled={
                            selectedVideo ===
                            videos.length - 1
                          }
                          className="rounded-xl bg-gold px-8 py-3 font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Next Lesson
                        </button>

                      </div>

                      {/* =================================================
                          INSTRUCTOR
                      ================================================= */}

                      <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-6">

                        <p className="text-xs uppercase tracking-[0.3em] text-gold">
                          Instructor
                        </p>

                        <h3 className="mt-2 text-xl font-bold text-white">
                          {currentVideo.instructor ||
                            "Hawksberg International"}
                        </h3>

                      </div>

                      {/* =================================================
                          ADMIN CONTROLS
                      ================================================= */}

                      {isAdmin && (
                        <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/10 p-6">

                          <p className="text-xs uppercase tracking-[0.3em] text-gold">
                            Administrator Controls
                          </p>

                          <h3 className="mt-3 text-2xl font-bold text-white">
                            Video Management
                          </h3>

                          <p className="mt-3 text-white/70">
                            Manage the selected{" "}
                            {trainingTitle}{" "}
                            training video.
                          </p>

                          <div className="mt-6 flex flex-wrap gap-4">

                            <button
                              type="button"
                              onClick={
                                handleNewVideo
                              }
                              disabled={
                                saving ||
                                !trainingName
                              }
                              className="rounded-xl bg-gold px-6 py-3 font-semibold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              New Video
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  currentVideo
                                )
                              }
                              disabled={
                                saving
                              }
                              className="rounded-xl border border-gold px-6 py-3 font-semibold text-gold transition hover:bg-gold hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Edit Video
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  currentVideo
                                )
                              }
                              disabled={
                                saving
                              }
                              className="rounded-xl border border-red-500 px-6 py-3 font-semibold text-red-400 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Delete Video
                            </button>

                          </div>

                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>
            )}

          {/* =================================================
              LOGOUT
          ================================================= */}

          <div className="mt-10">

            <button
              type="button"
              onClick={
                handleLogout
              }
              className="rounded-xl border border-white/20 px-8 py-3 font-semibold text-white transition hover:border-red-500 hover:bg-red-500"
            >
              Logout
            </button>

          </div>

        </div>
      </section>
    </Layout>
  );
}

export default function TrainingPortal() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#071A33]">
        <p className="text-white/60">
          Loading training portal...
        </p>
      </div>
    }>
      <TrainingPortalContent />
    </Suspense>
  );
}