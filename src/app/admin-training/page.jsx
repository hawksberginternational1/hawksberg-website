"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Layout from "@/components/Layout";
import trainingApi from "@/services/trainingApi";
import AdminVideoForm from "@/components/AdminVideoForm";


// =====================================================
// CONSTANTS
// =====================================================

const MAX_VIDEO_SIZE =
  50 * 1024 * 1024;


// =====================================================
// EMPTY FORM
// =====================================================

const EMPTY_FORM = {
  title: "",
  description: "",
  duration: "",
  instructor: "Hawksberg International",

  // YouTube Embed URL
  video: "",

  // MP4 File
  video_file: null,

  // Training Portal
  training_name: "",
};


// =====================================================
// TRAINING PORTALS
// =====================================================

const PORTALS = [
  {
    key: "iso9001",
    title: "ISO 9001",
  },
  {
    key: "iso14001",
    title: "ISO 14001",
  },
  {
    key: "iso27001",
    title: "ISO 27001",
  },
  {
    key: "riskidentification",
    title: "Risk Identification",
  },
  {
    key: "riskevaluation",
    title: "Risk Evaluation",
  },
  {
    key: "riskassessment",
    title: "Risk Assessment",
  },
  {
    key: "risktreatment",
    title: "Risk Treatment",
  },
  {
    key: "soa",
    title: "SOA",
  },
];


// =====================================================
// HELPER - MP4 VALIDATION
// =====================================================

function isValidMp4(file) {
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


// =====================================================
// HELPER - YOUTUBE EMBED URL VALIDATION
// =====================================================

function isValidYoutubeUrl(url) {
  if (!url) {
    return false;
  }

  const value =
    String(url).trim();

  if (!value) {
    return false;
  }

  try {
    const parsed =
      new URL(value);

    const hostname =
      (
        parsed.hostname || ""
      ).toLowerCase();

    const pathname =
      parsed.pathname || "";

    const allowedHosts = [
      "youtube.com",
      "www.youtube.com",
      "youtube-nocookie.com",
      "www.youtube-nocookie.com",
    ];

    if (
      !allowedHosts.includes(
        hostname
      )
    ) {
      return false;
    }

    // Only Embed URL is allowed.
    if (
      !pathname.startsWith(
        "/embed/"
      )
    ) {
      return false;
    }

    const videoId =
      pathname
        .replace(
          "/embed/",
          ""
        )
        .replace(
          /\/+$/,
          ""
        )
        .trim();

    return Boolean(
      videoId
    );
  } catch {
    return false;
  }
}


// =====================================================
// COMPONENT
// =====================================================

export default function AdminTraining() {
  const router =
    useRouter();


  // ===================================================
  // AUTH
  // ===================================================

  const [
    user,
    setUser,
  ] = useState(null);

  const [
    authChecked,
    setAuthChecked,
  ] = useState(false);


  // ===================================================
  // VIDEOS
  // ===================================================

  const [
    videos,
    setVideos,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(false);


  // ===================================================
  // FORM
  // ===================================================

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  const [
    showVideoForm,
    setShowVideoForm,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({
    ...EMPTY_FORM,
  });


  // ===================================================
  // AUTH CHECK
  // ===================================================

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    const storedUser =
      localStorage.getItem(
        "trainingUser"
      );

    if (!storedUser) {
      setUser(null);
      setAuthChecked(true);
      return;
    }

    try {
      const parsedUser =
        JSON.parse(
          storedUser
        );

      setUser(
        parsedUser
      );
    } catch (error) {
      console.error(
        "INVALID TRAINING USER:",
        error
      );

      localStorage.removeItem(
        "trainingUser"
      );

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
      router.replace(
        "/training-login"
      );
      return;
    }

    if (
      user.role !== "admin"
    ) {
      router.replace(
        "/training-login"
      );
    }
  }, [
    authChecked,
    user,
    router,
  ]);


  // ===================================================
  // LOAD VIDEOS
  // ===================================================

  const loadVideos =
    useCallback(
      async () => {
        try {
          setLoading(true);

          const response =
            await trainingApi.getVideos();

          if (
            Array.isArray(
              response
            )
          ) {
            setVideos(
              response
            );
          } else if (
            Array.isArray(
              response?.data
            )
          ) {
            setVideos(
              response.data
            );
          } else if (
            Array.isArray(
              response?.videos
            )
          ) {
            setVideos(
              response.videos
            );
          } else {
            setVideos([]);
          }
        } catch (error) {
          console.error(
            "LOAD VIDEOS ERROR:",
            error
          );

          setVideos([]);

          // Don't show an alert during initial page load.
          // Console has the actual error.
        } finally {
          setLoading(false);
        }
      },
      []
    );


  // ===================================================
  // LOAD AFTER AUTH
  // ===================================================

  useEffect(() => {
    if (!authChecked) {
      return;
    }

    if (!user) {
      return;
    }

    if (
      user.role !== "admin"
    ) {
      return;
    }

    loadVideos();
  }, [
    authChecked,
    user,
    loadVideos,
  ]);


  // ===================================================
  // HANDLE FORM CHANGE
  // ===================================================

  const handleChange =
    (event) => {
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

      if (
        name ===
        "video_file"
      ) {
        const selectedFile =
          files?.[0] ||
          null;

        if (!selectedFile) {
          setFormData(
            (previous) => ({
              ...previous,
              video_file:
                null,
            })
          );

          return;
        }


        // -----------------------------------------------
        // MP4 extension/type
        // -----------------------------------------------

        if (
          !isValidMp4(
            selectedFile
          )
        ) {
          alert(
            "Only MP4 video files are allowed."
          );

          target.value = "";

          setFormData(
            (previous) => ({
              ...previous,
              video_file:
                null,
            })
          );

          return;
        }


        // -----------------------------------------------
        // 50 MB
        // -----------------------------------------------

        if (
          selectedFile.size >
          MAX_VIDEO_SIZE
        ) {
          alert(
            "Video file must be less than 50 MB."
          );

          target.value = "";

          setFormData(
            (previous) => ({
              ...previous,
              video_file:
                null,
            })
          );

          return;
        }


        // -----------------------------------------------
        // MP4 selected
        //
        // Remove YouTube source.
        // Exactly one source.
        // -----------------------------------------------

        setFormData(
          (previous) => ({
            ...previous,
            video: "",
            video_file:
              selectedFile,
          })
        );

        return;
      }


      // =================================================
      // YOUTUBE EMBED URL
      // =================================================

      if (
        name === "video"
      ) {
        const youtubeValue =
          value?.trim() || "";

        setFormData(
          (previous) => ({
            ...previous,
            video:
              youtubeValue,
            video_file:
              null,
          })
        );

        return;
      }


      // =================================================
      // NORMAL INPUTS
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

  const resetForm =
    () => {
      setEditingId(
        null
      );

      setFormData({
        ...EMPTY_FORM,
      });


      // Clear file input
      if (
        typeof document !==
        "undefined"
      ) {
        const fileInput =
          document.getElementById(
            "video_file"
          );

        if (fileInput) {
          fileInput.value =
            "";
        }
      }
    };


  // ===================================================
  // CLOSE FORM
  // ===================================================

  const handleCloseForm =
    () => {
      resetForm();

      setShowVideoForm(
        false
      );
    };


  // ===================================================
  // NEW VIDEO
  // ===================================================

  const handleNewVideo =
    () => {
      resetForm();

      setShowVideoForm(
        true
      );

      // Don't let loading state block the button.
      if (
        typeof window !==
        "undefined"
      ) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };


  // ===================================================
  // SUBMIT
  // ===================================================

  const handleSubmit =
    async (event) => {
      event.preventDefault();


      // =================================================
      // BASIC VALUES
      // =================================================

      const title =
        formData.title
          ?.trim() || "";

      const description =
        formData.description
          ?.trim() || "";

      const duration =
        formData.duration
          ?.trim() || "";

      const instructor =
        formData.instructor
          ?.trim() || "";

      const trainingName =
        formData.training_name
          ?.trim()
          .toLowerCase() || "";

      const youtubeUrl =
        formData.video
          ?.trim() || "";

      const videoFile =
        formData.video_file;


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

      if (!trainingName) {
        alert(
          "Please select a Training Portal."
        );
        return;
      }


      // =================================================
      // VALID PORTAL
      // =================================================

      const validPortal =
        PORTALS.some(
          (portal) =>
            portal.key ===
            trainingName
        );

      if (!validPortal) {
        alert(
          "Invalid Training Portal selected."
        );
        return;
      }


      // =================================================
      // SOURCE
      // =================================================

      const hasYoutube =
        Boolean(
          youtubeUrl
        );

      const hasMp4 =
        videoFile instanceof
        File;


      // =================================================
      // CREATE
      //
      // Exactly one source required.
      //
      // EDIT
      //
      // Existing source can be kept by submitting
      // without a new source.
      // =================================================

      if (
        editingId === null
      ) {
        if (
          !hasYoutube &&
          !hasMp4
        ) {
          alert(
            "Please enter a YouTube Embed URL or upload an MP4 video."
          );
          return;
        }
      }


      // =================================================
      // NEVER SEND BOTH
      // =================================================

      if (
        hasYoutube &&
        hasMp4
      ) {
        alert(
          "Please use either YouTube Embed URL OR MP4 video."
        );
        return;
      }


      // =================================================
      // YOUTUBE VALIDATION
      // =================================================

      if (hasYoutube) {
        if (
          !isValidYoutubeUrl(
            youtubeUrl
          )
        ) {
          alert(
            "Please enter a valid YouTube Embed URL, for example https://www.youtube.com/embed/VIDEO_ID"
          );
          return;
        }
      }


      // =================================================
      // MP4 VALIDATION
      // =================================================

      if (hasMp4) {
        if (
          !isValidMp4(
            videoFile
          )
        ) {
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
        trainingName
      );


      // =================================================
      // SOURCE
      // =================================================

      if (hasYoutube) {
        data.append(
          "youtube_url",
          youtubeUrl
        );
      }

      if (hasMp4) {
        data.append(
          "video_file",
          videoFile,
          videoFile.name
        );
      }


      // =================================================
      // API
      // =================================================

      try {
        setLoading(true);


        // -----------------------------------------------
        // EDIT
        // -----------------------------------------------

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
        }


        // -----------------------------------------------
        // CREATE
        // -----------------------------------------------

        else {
          await trainingApi.createVideo(
            data
          );

          alert(
            "Training video uploaded successfully."
          );
        }


        // -----------------------------------------------
        // Refresh list from database
        // -----------------------------------------------

        await loadVideos();


        // -----------------------------------------------
        // Close/reset form
        // -----------------------------------------------

        resetForm();

        setShowVideoForm(
          false
        );

      } catch (error) {
        console.error(
          "TRAINING VIDEO SUBMIT ERROR:",
          error
        );

        alert(
          error?.message ||
            "Unable to save training video."
        );
      } finally {
        setLoading(false);
      }
    };


  // ===================================================
  // EDIT VIDEO
  // ===================================================

  const handleEdit =
    (video) => {
      if (!video) {
        return;
      }

      setEditingId(
        video.id
      );


      // -------------------------------------------------
      // API response:
      //
      // YouTube:
      // video.youtube_url
      //
      // MP4:
      // video.video_url
      // -------------------------------------------------

      setFormData({
        title:
          video.title ||
          "",

        description:
          video.description ||
          "",

        duration:
          video.duration ||
          "",

        instructor:
          video.instructor ||
          "Hawksberg International",

        // Only load YouTube URL into
        // editable YouTube field.
        video:
          video.youtube_url ||
          "",

        // Existing MP4 is NOT placed
        // into file input.
        //
        // Backend keeps existing video_url
        // when no new source is supplied.
        video_file:
          null,

        training_name:
          video.training_name ||
          "",
      });


      setShowVideoForm(
        true
      );


      if (
        typeof window !==
        "undefined"
      ) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };


  // ===================================================
  // DELETE VIDEO
  // ===================================================

  const handleDelete =
    async (id) => {
      if (!id) {
        return;
      }


      const confirmed =
        window.confirm(
          "Are you sure you want to delete this training video?"
        );

      if (!confirmed) {
        return;
      }


      try {
        setLoading(true);

        await trainingApi.deleteVideo(
          id
        );


        // Refresh from DB
        await loadVideos();


        // If deleted video was
        // being edited, close form.
        if (
          String(editingId) ===
          String(id)
        ) {
          resetForm();

          setShowVideoForm(
            false
          );
        }


        alert(
          "Training video deleted successfully."
        );

      } catch (error) {
        console.error(
          "DELETE VIDEO ERROR:",
          error
        );

        alert(
          error?.message ||
            "Unable to delete training video."
        );
      } finally {
        setLoading(false);
      }
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
  // REDIRECT STATE
  // ===================================================

  if (
    !user ||
    user.role !== "admin"
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071A33]">
        <p className="text-white/60">
          Redirecting to training login...
        </p>
      </div>
    );
  }


  // ===================================================
  // UI
  // ===================================================

  return (
    <Layout>
      <section className="relative min-h-screen overflow-hidden bg-[#071A33]">

        {/* Background */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,162,58,0.12),transparent_35%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.12),transparent_40%)]" />

        <div className="absolute inset-0 grid-pattern opacity-10" />


        {/* Content */}

        <div className="container-x relative py-16">


          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.35em] text-gold">
                Hawksberg International
              </p>

              <h1 className="mt-3 text-4xl font-display text-white md:text-5xl">
                Admin Training Dashboard
              </h1>

              <p className="mt-4 text-white/70">
                Upload, edit and manage training videos.
              </p>

            </div>


            {/* =================================================
                NEW VIDEO BUTTON

                Always clickable.
                Loading state does not disable it.
            ================================================= */}

            <button
              type="button"
              onClick={
                handleNewVideo
              }
              className="w-fit cursor-pointer rounded-xl border border-gold px-6 py-3 font-semibold text-gold transition hover:bg-gold hover:text-black"
            >
              + New Video
            </button>

          </div>


          {/* =================================================
              VIDEO FORM
          ================================================= */}

          {showVideoForm && (
            <div className="mb-10">

              <AdminVideoForm
                formData={
                  formData
                }
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
                  handleCloseForm
                }
                loading={
                  loading
                }
              />

            </div>
          )}


          {/* =================================================
              TRAINING PORTALS
          ================================================= */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {PORTALS.map(
              (portal) => {

                const portalVideos =
                  videos.filter(
                    (video) =>
                      String(
                        video?.training_name ||
                          ""
                      )
                        .trim()
                        .toLowerCase() ===
                      portal.key
                  );


                return (
                  <div
                    key={
                      portal.key
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                  >

                    <h2 className="text-2xl font-bold text-white">
                      {
                        portal.title
                      }
                    </h2>

                    <p className="mt-3 text-white/60">
                      Total Videos:{" "}
                      <span className="font-semibold text-gold">
                        {
                          portalVideos.length
                        }
                      </span>
                    </p>


                    <button
                      type="button"
                      onClick={() => {
                        router.push(
                          `/training?trainingName=${encodeURIComponent(
                            portal.key
                          )}`
                        );
                      }}
                      className="mt-6 w-full cursor-pointer rounded-xl bg-gold py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-[#f1bc47]"
                    >
                      Manage Videos
                    </button>

                  </div>
                );
              }
            )}

          </div>


          {/* =================================================
              VIDEO COUNT / LOADING
          ================================================= */}

          {loading &&
            !showVideoForm && (
              <p className="mt-8 text-center text-sm text-white/50">
                Loading training videos...
              </p>
            )}

        </div>
      </section>
    </Layout>
  );
}