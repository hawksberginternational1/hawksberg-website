"use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
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

const ISO14001QuizQuestions = [
  { id: 1, question: "What is the primary purpose of an Environmental Management System (EMS)?", options: { A: "Replace legal compliance obligations", B: "Manage environmental responsibilities and improve environmental performance", C: "Guarantee an organization has no environmental impacts", D: "Manage product quality requirements only" } },
  { id: 2, question: "Which cycle is used by ISO 14001 to drive continual improvement?", options: { A: "Define, Measure, Analyze, Improve", B: "Plan, Approve, Operate, Review", C: "Plan, Do, Check, Act", D: "Identify, Control, Certify, Renew" } },
  { id: 3, question: "Which is an example of an environmental aspect?", options: { A: "Fuel consumed by an organization's delivery vehicles", B: "A customer complaint about delivery time", C: "An employee's annual performance review", D: "A supplier's invoice payment terms" } },
  { id: 4, question: "What must an organization do with its compliance obligations under ISO 14001?", options: { A: "Consider them only during the certification audit", B: "Apply them only when an incident occurs", C: "Transfer responsibility to its certification body", D: "Determine, access, consider them in the EMS, and evaluate compliance" } },
  { id: 5, question: "What does a life-cycle perspective require an organization to consider?", options: { A: "Only impacts inside its facilities", B: "Relevant environmental impacts across stages it can control or influence", C: "Only product disposal", D: "Every supply-chain impact regardless of influence" } },
  { id: 6, question: "What is the purpose of operational controls in an EMS?", options: { A: "Establish criteria and control processes associated with significant aspects and obligations", B: "Eliminate environmental performance monitoring", C: "Replace competence and awareness activities", D: "Document every routine task regardless of relevance" } },
  { id: 7, question: "Which is an appropriate environmental objective?", options: { A: "Improve performance whenever convenient", B: "Seek certification without assigning resources", C: "Reduce electricity use by 10% by year-end with an owner and plan", D: "Avoid recording performance data" } },
  { id: 8, question: "How should an organization prepare for potential environmental emergencies?", options: { A: "Wait until an emergency occurs", B: "Rely only on external emergency services", C: "Keep response arrangements confidential from workers", D: "Establish and test response processes, then review them after incidents or tests" } },
  { id: 9, question: "What is the main purpose of an internal EMS audit?", options: { A: "Guarantee certification without external review", B: "Determine whether the EMS conforms to requirements and is effectively implemented", C: "Assign legal penalties to employees", D: "Replace management review" } },
  { id: 10, question: "What should an organization do when it identifies a nonconformity?", options: { A: "React, control and correct it, address its cause, and review effectiveness", B: "Delete the record after immediate correction", C: "Wait for the next certification audit", D: "Revise the environmental policy in every case" } },
];

// =====================================================
// CLOUDFLARE R2 VIDEO MAPPING
// =====================================================
// Only these four training portals use Cloudflare R2.
// All other training portals continue using their
// existing YouTube / database video source.

const CLOUDFLARE_R2_BASE_URL =
  "https://pub-6c4cdfacf7684bdbbd42c03d4f0743c6.r2.dev";

const CLOUDFLARE_R2_VIDEOS = {
  riskidentification: "1. Risk Identification.mp4",
  riskevaluation: "3. Risk Evaluation.mp4",
  riskassessment: "2. CIA - Risk Analysis.mp4",
  soa: "SOA - Training.mp4",
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

function getVideoSource(video, trainingName) {
  if (!video) {
    return "";
  }

  const normalizedTraining =
    normalizeTrainingName(trainingName);

  const r2File =
    CLOUDFLARE_R2_VIDEOS[normalizedTraining];

  // =====================================================
  // CLOUDFLARE R2
  // Only the four migrated training portals use the
  // Cloudflare R2 public video URL. All other portals
  // keep their existing YouTube / database video source.
  // =====================================================

  if (r2File) {
    const r2Url =
      `${CLOUDFLARE_R2_BASE_URL}/${encodeURIComponent(
        r2File
      )}`;

    console.log(
      "R2 VIDEO SOURCE:",
      r2Url
    );

    return r2Url;
  }

  // =====================================================
  // EXISTING YOUTUBE SOURCE
  // =====================================================

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

let youtubeIframeApiPromise;

// Adds the params the YouTube IFrame API needs while keeping the existing URL params.
function getISO14001YoutubeIframeSrc(url) {
  const embedUrl = getYoutubeEmbedUrl(url);
  try {
    const parsed = new URL(embedUrl);
    parsed.searchParams.set("enablejsapi", "1");
    if (typeof window !== "undefined") {
      parsed.searchParams.set("origin", window.location.origin);
    }
    return parsed.toString();
  } catch {
    return embedUrl;
  }
}

function loadYoutubeIframeApi() {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!youtubeIframeApiPromise) {
    youtubeIframeApiPromise = new Promise((resolve, reject) => {
      const previousReady = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve(window.YT);
      };

      const existingScript = document.getElementById("youtube-iframe-api");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "youtube-iframe-api";
        script.src = "https://www.youtube.com/iframe_api";
        script.onerror = reject;
        document.head.appendChild(script);
      }
    });
  }

  return youtubeIframeApiPromise;
}

function getYoutubeVideoId(url) {
  try {
    const embedUrl = new URL(getYoutubeEmbedUrl(url));
    if (!embedUrl.pathname.startsWith("/embed/")) return "";
    return embedUrl.pathname.split("/").filter(Boolean).pop() || "";
  } catch {
    return "";
  }
}

function sampleISO14001Playback(tracker, mediaPosition, now, playbackRate = 1) {
  if (
    tracker.playing &&
    !tracker.seeking &&
    tracker.lastMediaPosition !== null &&
    tracker.lastSampleAt !== null
  ) {
    const mediaDelta = mediaPosition - tracker.lastMediaPosition;
    const elapsed = Math.max(0, (now - tracker.lastSampleAt) / 1000);
    const maximumExpected = elapsed * Math.max(1, playbackRate) * 1.5 + 0.25;
    if (mediaDelta > 0 && mediaDelta <= maximumExpected) {
      tracker.watchedSeconds += mediaDelta;
      tracker.dirty = true;
    }
  }
  tracker.lastMediaPosition = mediaPosition;
  tracker.lastSampleAt = now;
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
  // R2 PLAYER FALLBACK
  // ===================================================
  const [r2PlaybackFallback, setR2PlaybackFallback] =
    useState(false);

  const iso14001VideoRef = useRef(null);
  const iso14001TrackerRef = useRef(null);
  const iso14001YoutubeIframeRef = useRef(null);
  const iso14001YoutubePlayerRef = useRef(null);
  const iso14001QuizSubmittingRef = useRef(false);
  const iso14001QuizStartingRef = useRef(false);
  const iso14001RetestRequestingRef = useRef(false);
  const iso14001QuizExpiresAtRef = useRef(null);
  const [iso14001QuizSubmitting, setIso14001QuizSubmitting] = useState(false);
  const [iso14001QuizStarting, setIso14001QuizStarting] = useState(false);
  const [iso14001Progress, setIso14001Progress] = useState(null);
  const [iso14001QuizReady, setIso14001QuizReady] = useState(false);
  const [iso14001QuizModalOpen, setIso14001QuizModalOpen] = useState(false);
  const [iso14001QuizSession, setIso14001QuizSession] = useState(null);
  const [iso14001QuizAnswers, setIso14001QuizAnswers] = useState({});
  const [iso14001QuizResult, setIso14001QuizResult] = useState(null);
  const [iso14001QuizError, setIso14001QuizError] = useState("");
  const [iso14001QuizRemaining, setIso14001QuizRemaining] = useState(0);

  const [iso14001RetestRequest, setIso14001RetestRequest] = useState(null);
  const [iso14001RetestRequesting, setIso14001RetestRequesting] = useState(false);
  const activeISO14001QuizQuestions =
    iso14001QuizSession?.quiz_set === 2
      ? iso14001QuizSession.questions || []
      : ISO14001QuizQuestions;

  const refreshISO14001RetestStatus = useCallback(async () => {
    if (!user?.email || !user?.access_token) return null;
    try {
      const status = await trainingApi.getISO14001RetestStatus(
        user.email,
        user.access_token
      );
      setIso14001RetestRequest(status);
      return status;
    } catch (error) {
      console.error("ISO 14001 RETEST STATUS ERROR:", error);
      return null;
    }
  }, [user?.access_token, user?.email]);

  const submitISO14001Quiz = useCallback(async ({ allowIncomplete = false } = {}) => {
    const quizSession = iso14001QuizSession;
    if (!quizSession || iso14001QuizSubmittingRef.current) return;
    if (
      !allowIncomplete &&
      activeISO14001QuizQuestions.some(
        (question) => !iso14001QuizAnswers[question.id ?? question.question_id]
      )
    ) {
      setIso14001QuizError("Answer all 10 questions before submitting.");
      return;
    }

    iso14001QuizSubmittingRef.current = true;
    setIso14001QuizSubmitting(true);
    setIso14001QuizError("");
    try {
      const answers = Object.entries(iso14001QuizAnswers).map(
        ([questionId, answer]) => ({
          question_id: Number(questionId),
          answer,
        })
      );
      const result = await trainingApi.submitISO14001Quiz(
        quizSession.attempt_id,
        user?.email,
        answers,
        user?.access_token
      );
      setIso14001QuizResult(result);
      setIso14001QuizSession(null);
      setIso14001QuizRemaining(0);
    } catch (error) {
      setIso14001QuizError(error.message || "Unable to submit the quiz.");
    } finally {
      iso14001QuizSubmittingRef.current = false;
      setIso14001QuizSubmitting(false);
    }
  }, [activeISO14001QuizQuestions, iso14001QuizAnswers, iso14001QuizSession, user?.email]);

  // const startISO14001Quiz = async (retestRequestId = null) => {
  //   if (iso14001QuizStartingRef.current) return;
  const startISO14001Quiz = async (retestRequestId = null) => {
  if (iso14001QuizSession) return;
  if (iso14001QuizStartingRef.current) return;
    iso14001QuizStartingRef.current = true;
    setIso14001QuizStarting(true);
    setIso14001QuizError("");
    setIso14001QuizResult(null);
    setIso14001QuizAnswers({});
    iso14001QuizExpiresAtRef.current = null;
    setIso14001QuizSession(null);
    try {
      // const session = await trainingApi.startISO14001Quiz(
      //   currentVideo.id,
      //   user?.email,
      //   user?.access_token,
      //   retestRequestId
      // );
      // setIso14001QuizSession(session);
      const session = await trainingApi.startISO14001Quiz(
  currentVideo.id,
  user?.email,
  user?.access_token,
  retestRequestId
);

iso14001QuizExpiresAtRef.current = Date.parse(session.expires_at);

setIso14001QuizSession(session);
      setIso14001QuizModalOpen(true);
      // setIso14001QuizRemaining(ISO14001_QUIZ_TOTAL_TIME_SECONDS);
      
      // const serverOffset = Date.parse(session.server_now) - Date.now();
      // setIso14001QuizRemaining(
      //   Math.max(0, Math.ceil((Date.parse(session.expires_at) - Date.now() - serverOffset) / 1000))
      // );
    } catch (error) {
      setIso14001QuizError(error.message || "Unable to start the quiz.");
    } finally {
      iso14001QuizStartingRef.current = false;
      setIso14001QuizStarting(false);
    }
  };

  const requestISO14001Retest = async (attemptId = iso14001QuizResult?.attempt_id) => {
    if (!attemptId || iso14001RetestRequestingRef.current) return;
    iso14001RetestRequestingRef.current = true;
    setIso14001RetestRequesting(true);
    setIso14001QuizError("");
    try {
      const retestRequest = await trainingApi.requestISO14001Retest(
        attemptId,
        user?.email,
        user?.access_token
      );
      setIso14001RetestRequest(retestRequest);
    } catch (error) {
      setIso14001QuizError(error.message || "Unable to request a retest.");
    } finally {
      iso14001RetestRequestingRef.current = false;
      setIso14001RetestRequesting(false);
    }
  };

  const closeISO14001Quiz = () => {
    if (iso14001QuizSession && !iso14001QuizResult) {
      const confirmed = window.confirm(
        "Are you sure you want to leave the quiz? Your current answers will be lost."
      );
      if (!confirmed) return;
      setIso14001QuizSession(null);
      setIso14001QuizAnswers({});
      setIso14001QuizRemaining(0);
    }
    setIso14001QuizModalOpen(false);
  };

  useEffect(() => {
    if (!iso14001QuizModalOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [iso14001QuizModalOpen]);

  // useEffect(() => {
  //   if (!iso14001QuizSession) return undefined;
  //   const serverOffset = Date.parse(iso14001QuizSession.server_now) - Date.now();
  //   const expiresAt = Date.parse(iso14001QuizSession.expires_at);
  //   const updateCountdown = () => {
  //     const remaining = Math.max(
  //       0,
  //       Math.ceil((expiresAt - Date.now() - serverOffset) / 1000)
  //     );
  //     setIso14001QuizRemaining(remaining);
  //     if (remaining === 0) submitISO14001Quiz({ allowIncomplete: true });
  //   };
  //   updateCountdown();
  //   const timer = window.setInterval(updateCountdown, 500);
  //   return () => window.clearInterval(timer);
  // }, [iso14001QuizSession, submitISO14001Quiz]);

  useEffect(() => {
  if (!iso14001QuizSession) return undefined;

  const expiresAt = iso14001QuizExpiresAtRef.current;

  if (!expiresAt) return undefined;

  const updateCountdown = () => {
    const remaining = Math.max(
      0,
      Math.ceil((expiresAt - Date.now()) / 1000)
    );

    setIso14001QuizRemaining(remaining);

    if (remaining === 0) {
      submitISO14001Quiz({ allowIncomplete: true });
    }
  };

  updateCountdown();

  const timer = window.setInterval(updateCountdown, 500);

  return () => window.clearInterval(timer);
}, [iso14001QuizSession]);


//   const iso14001QuizSubmitRef = useRef(null);

// useEffect(() => {
//   iso14001QuizSubmitRef.current = submitISO14001Quiz;
// }, [submitISO14001Quiz]);

// useEffect(() => {
//   if (!iso14001QuizSession) return undefined;

//   const serverOffset =
//     Date.parse(iso14001QuizSession.server_now) - Date.now();

//   const expiresAt =
//     Date.parse(iso14001QuizSession.expires_at);

//   const updateCountdown = () => {
//     const remaining = Math.max(
//       0,
//       Math.ceil(
//         (expiresAt - Date.now() - serverOffset) / 1000
//       )
//     );

//     setIso14001QuizRemaining(remaining);

//     if (
//       remaining === 0 &&
//       iso14001QuizSubmitRef.current
//     ) {
//       iso14001QuizSubmitRef.current({
//         allowIncomplete: true,
//       });
//     }
//   };

//   updateCountdown();

//   const timer = window.setInterval(
//     updateCountdown,
//     500
//   );

//   return () => window.clearInterval(timer);
// }, [iso14001QuizSession]);

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

        // ISO 14001 only: the database MP4 lesson is Lesson 1; other order is kept.
        // const orderedVideos =
        //   trainingName === "iso14001"
        //     ? [
        //         ...filteredVideos.filter((video) => isMp4Url(video?.video_url)),
        //         ...filteredVideos.filter((video) => !isMp4Url(video?.video_url)),
        //       ]
        //     : filteredVideos;

        // setVideos(orderedVideos);
        // setSelectedVideo(0);
        let videosForPortal = filteredVideos;

if (trainingName === "iso14001") {
  videosForPortal = filteredVideos.filter((video) => {
    const title = String(video?.title || "")
      .trim()
      .toLowerCase();

    return (
      title !== "iso 14001 introduction" &&
      title !== "environmental management system"
    );
  });
}

setVideos(videosForPortal);
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
        currentVideo,
        trainingName
      );
    }, [
      currentVideo,
      trainingName,
    ]);

  // Reset the R2 fallback whenever the selected video
  // or its source changes.
  useEffect(() => {
    setR2PlaybackFallback(false);
  }, [currentVideo?.id, currentVideoSource]);

  // ===================================================
  // VIDEO TYPE
  // ===================================================

  const currentVideoIsYoutube =
    useMemo(() => {
      if (!currentVideo) {
        return false;
      }

      const normalizedTraining =
        normalizeTrainingName(
          trainingName
        );

      // The four migrated training portals must
      // never render a YouTube iframe.
      if (
        CLOUDFLARE_R2_VIDEOS[
          normalizedTraining
        ]
      ) {
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
      trainingName,
    ]);

  const currentVideoIsMp4 =
    useMemo(() => {
      if (!currentVideo) {
        return false;
      }

      const normalizedTraining =
        normalizeTrainingName(
          trainingName
        );

      // The four migrated training portals always
      // render the Cloudflare R2 MP4 player.
      if (
        CLOUDFLARE_R2_VIDEOS[
          normalizedTraining
        ]
      ) {
        return true;
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
      trainingName,
    ]);

  const saveISO14001VideoProgress = useCallback(
    async (tracker, media, { completed = false, keepalive = false } = {}) => {
      const currentPosition =
        typeof media?.getCurrentTime === "function"
          ? media.getCurrentTime()
          : media?.currentTime;
      const liveDuration =
        typeof media?.getDuration === "function"
          ? media.getDuration()
          : media?.duration;
      if (Number.isFinite(liveDuration) && liveDuration > 0 && tracker) {
        tracker.duration = liveDuration;
      }
      if (
        !tracker ||
        !media ||
        !tracker.ready ||
        tracker.saving ||
        !(tracker.duration > 0) ||
        !Number.isFinite(currentPosition) ||
        (!tracker.dirty && !completed)
      ) {
        return;
      }
      tracker.watchedSeconds = Math.min(tracker.watchedSeconds, tracker.duration);

      tracker.saving = true;
      try {
        const response = await trainingApi.saveVideoProgress(
          {
            email: tracker.email,
            video_id: tracker.videoId,
            training_name: "iso14001",
            watched_seconds: tracker.watchedSeconds,
            video_duration: tracker.duration,
            last_position: Math.min(currentPosition, tracker.duration),
            completed,
          },
          { keepalive, token: tracker.accessToken }
        );
        tracker.watchedSeconds = Math.max(
          tracker.watchedSeconds,
          response.watched_seconds
        );
        tracker.dirty = false;
        setIso14001Progress(response);
        // Quiz is offered only after the backend confirms completion.
        if (completed && response?.completed) {
          setIso14001QuizReady(true);
        }
        return response;
      } catch (error) {
        console.error("ISO 14001 VIDEO PROGRESS SAVE ERROR:", error);
        return null;
      } finally {
        tracker.saving = false;
      }
    },
    []
  );

  const iso14001AuthorizedUser =
    trainingName === "iso14001" &&
    user?.role !== "admin" &&
    Boolean(user?.email);

  // useEffect(() => {
  //   if (!iso14001AuthorizedUser) {
  //     setIso14001RetestRequest(null);
  //     return undefined;
  //   }
  //   refreshISO14001RetestStatus();
  //   if (iso14001RetestRequest?.status !== "pending") return undefined;
  //   const interval = window.setInterval(refreshISO14001RetestStatus, 10000);
  //   return () => window.clearInterval(interval);
  // }, [
  //   iso14001AuthorizedUser,
  //   iso14001RetestRequest?.status,
  //   refreshISO14001RetestStatus,
  // ]);
useEffect(() => {
  if (!iso14001AuthorizedUser) {
    setIso14001RetestRequest(null);
    return undefined;
  }

  let disposed = false;

  // const checkRetestStatus = async () => {
  //   const status = await refreshISO14001RetestStatus();

  //   if (disposed || !status) return;

  //   if (
  //     status.status === "accepted" &&
  //     !iso14001QuizSession &&
  //     !iso14001QuizStartingRef.current
  //   ) {
  //     await startISO14001Quiz(status.id);
  //   }
  // };
  const checkRetestStatus = async () => {
  const status = await refreshISO14001RetestStatus();

  if (disposed || !status) return;

  if (
    status.status === "accepted" &&
    !status.started &&
    !iso14001QuizSession &&
    !iso14001QuizStartingRef.current
  ) {
    await startISO14001Quiz(status.id);
  }
};

  checkRetestStatus();

  const interval = window.setInterval(() => {
    checkRetestStatus();
  }, 3000);

  return () => {
    disposed = true;
    window.clearInterval(interval);
  };
}, [
  iso14001AuthorizedUser,
  refreshISO14001RetestStatus,
  iso14001QuizSession,
  currentVideo?.id,
]);
  const iso14001Mp4Tracking =
    iso14001AuthorizedUser && currentVideoIsMp4 && !r2PlaybackFallback;

  const iso14001YoutubeTracking =
    iso14001AuthorizedUser && currentVideoIsYoutube;

  useEffect(() => {
    if (!iso14001Mp4Tracking || !currentVideo) {
      return undefined;
    }

    let disposed = false;
    const tracker = {
      email: String(user.email).trim().toLowerCase(),
      accessToken: user.access_token,
      videoId: currentVideo.id,
      watchedSeconds: 0,
      resumePosition: 0,
      lastLegitimatePosition: 0,
      duration: 0,
      ready: false,
      playing: false,
      seeking: false,
      dirty: false,
      saving: false,
      lastMediaPosition: null,
      lastSampleAt: null,
    };
    iso14001TrackerRef.current = tracker;

    trainingApi
      .getVideoProgress(tracker.email, tracker.videoId, "iso14001", tracker.accessToken)
      .then((progress) => {
        if (disposed) return;
        if (progress) {
          tracker.watchedSeconds = progress.watched_seconds;
          tracker.resumePosition = progress.last_position;
          tracker.lastLegitimatePosition = progress.last_position;
        }
        setIso14001Progress(progress);
        if (progress?.completed) setIso14001QuizReady(true);
        tracker.ready = true;
        const media = iso14001VideoRef.current;
        if (media && tracker.resumePosition > 0 && media.readyState >= 1) {
          media.currentTime = tracker.resumePosition;
        }
        if (tracker.dirty && media) {
          saveISO14001VideoProgress(tracker, media);
        }
      })
      .catch((error) => {
        if (!disposed) {
          console.error("ISO 14001 VIDEO PROGRESS LOAD ERROR:", error);
        }
      });

    const saveInterval = window.setInterval(() => {
      const media = iso14001VideoRef.current;
      if (tracker.playing && tracker.dirty && media) {
        saveISO14001VideoProgress(tracker, media);
      }
    }, 8000);

    const saveWhenHidden = () => {
      if (document.visibilityState !== "visible") {
        iso14001VideoRef.current?.pause();
        saveISO14001VideoProgress(
          tracker,
          iso14001VideoRef.current,
          { keepalive: true }
        );
      }
    };

    const saveWhenLeaving = () => {
      saveISO14001VideoProgress(
        tracker,
        iso14001VideoRef.current,
        { keepalive: true }
      );
    };

    document.addEventListener("visibilitychange", saveWhenHidden);
    window.addEventListener("pagehide", saveWhenLeaving);

    return () => {
      disposed = true;
      window.clearInterval(saveInterval);
      document.removeEventListener("visibilitychange", saveWhenHidden);
      window.removeEventListener("pagehide", saveWhenLeaving);
      if (tracker.dirty) {
        saveISO14001VideoProgress(
          tracker,
          iso14001VideoRef.current,
          { keepalive: true }
        );
      }
      if (iso14001TrackerRef.current === tracker) {
        iso14001TrackerRef.current = null;
      }
    };
  }, [
    currentVideo?.id,
    iso14001Mp4Tracking,
    saveISO14001VideoProgress,
    user?.email,
  ]);

  useEffect(() => {
    if (!iso14001YoutubeTracking || !currentVideo) {
      return undefined;
    }

    let disposed = false;
    let sampleTimer = null;
    let saveTimer = null;
    const tracker = {
      email: String(user.email).trim().toLowerCase(),
      accessToken: user.access_token,
      videoId: currentVideo.id,
      watchedSeconds: 0,
      duration: 0,
      lastLegitimatePosition: 0,
      ready: false,
      playing: false,
      seeking: false,
      dirty: false,
      saving: false,
      lastMediaPosition: null,
      lastSampleAt: null,
    };
    iso14001TrackerRef.current = tracker;

    const sample = (player) => {
      if (!tracker.playing || disposed) return;
      const now = performance.now();
      const position = player.getCurrentTime();
      const priorWatchedSeconds = tracker.watchedSeconds;
      sampleISO14001Playback(
        tracker,
        position,
        now,
        player.getPlaybackRate?.() || 1
      );
      if (tracker.watchedSeconds > priorWatchedSeconds) {
        tracker.lastLegitimatePosition = position;
      }
    };

    const save = async (player, options = {}) => {
      if (tracker.dirty && player) {
        return saveISO14001VideoProgress(tracker, player, options);
      }
      return null;
    };

    const handleVisibility = () => {
      if (document.visibilityState !== "visible") {
        const player = iso14001YoutubePlayerRef.current;
        if (player) {
          sample(player);
          tracker.playing = false;
          player.pauseVideo();
          save(player, { keepalive: true });
        }
      }
    };

    const handlePageHide = () => {
      const player = iso14001YoutubePlayerRef.current;
      if (player) {
        sample(player);
        tracker.playing = false;
        save(player, { keepalive: true });
      }
    };

    const initialize = async () => {
      try {
        let progress = null;

        // Progress loading must never block YouTube playback.
        try {
          progress = await trainingApi.getVideoProgress(
            tracker.email,
            tracker.videoId,
            "iso14001",
            tracker.accessToken
          );
        } catch (progressError) {
          console.error(
            "ISO 14001 progress tracking unavailable:",
            progressError
          );
        }

        if (disposed || !iso14001YoutubeIframeRef.current) return;

        tracker.watchedSeconds = progress?.watched_seconds || 0;
        tracker.lastLegitimatePosition = progress?.last_position || 0;

        if (progress) {
          setIso14001Progress(progress);
          if (progress.completed) setIso14001QuizReady(true);
        }

        const youtube = await loadYoutubeIframeApi();

        if (disposed || !iso14001YoutubeIframeRef.current) return;

        const videoId = getYoutubeVideoId(currentVideoSource);

        if (!videoId) {
          throw new Error("Invalid YouTube video URL");
        }

        // Attach to the iframe React already rendered; do not create or replace it.
        iso14001YoutubePlayerRef.current = new youtube.Player(
          iso14001YoutubeIframeRef.current,
          {
            events: {
              onReady: (event) => {
                if (disposed) return;

                const player = event.target;
                tracker.duration = player.getDuration();

                if (tracker.duration > 0) {
                  tracker.watchedSeconds = Math.min(
                    tracker.watchedSeconds,
                    tracker.duration
                  );
                }

                const restoredPosition = Math.min(
                  progress?.last_position || 0,
                  tracker.duration > 0
                    ? tracker.duration
                    : Infinity
                );

                if (restoredPosition > 0) {
                  player.seekTo(restoredPosition, true);
                }

                tracker.lastLegitimatePosition = restoredPosition;

                // Playback must work even when the progress request
                // temporarily fails. Progress saving will simply retry
                // through the normal API path when possible.
                tracker.ready = tracker.duration > 0;

                setIso14001Progress((previous) => ({
                  ...(previous || {}),
                  video_duration: tracker.duration,
                }));

                sampleTimer = window.setInterval(() => {
                  sample(player);
                }, 100);

                saveTimer = window.setInterval(() => {
                  if (tracker.playing && tracker.dirty) {
                    save(player);
                  }
                }, 8000);
              },

              onStateChange: async (event) => {
                if (disposed) return;

                const player = event.target;
                const playing =
                  event.data === youtube.PlayerState.PLAYING;

                if (playing) {
                  tracker.playing = true;
                  tracker.lastMediaPosition =
                    player.getCurrentTime();
                  tracker.lastSampleAt = performance.now();
                  tracker.dirty = true;
                  save(player);
                } else if (
                  event.data === youtube.PlayerState.ENDED
                ) {
                  sample(player);
                  tracker.playing = false;
                  tracker.duration = player.getDuration();
                  tracker.watchedSeconds = tracker.duration;
                  tracker.lastLegitimatePosition =
                    tracker.duration;
                  tracker.lastMediaPosition =
                    tracker.duration;
                  tracker.dirty = true;

                  while (tracker.saving) {
                    await new Promise((resolve) => window.setTimeout(resolve, 100));
                  }
                  await save(player, { completed: true });
                } else if (
                  event.data === youtube.PlayerState.PAUSED
                ) {
                  sample(player);
                  tracker.playing = false;
                  save(player);
                }
              },

              onError: (event) => {
                console.error(
                  "ISO 14001 YouTube player error:",
                  event.data
                );
              },
            },
          }
        );
      } catch (error) {
        if (!disposed) {
          console.error(
            "ISO 14001 YouTube tracking unavailable:",
            error
          );
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", handlePageHide);
    initialize();

    return () => {
      disposed = true;
      window.clearInterval(sampleTimer);
      window.clearInterval(saveTimer);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", handlePageHide);
      const player = iso14001YoutubePlayerRef.current;
      iso14001YoutubePlayerRef.current = null;
      if (player) {
        try {
          sample(player);
          tracker.playing = false;
          save(player, { keepalive: true });
        } catch (saveError) {
          console.warn("ISO 14001 YouTube player save warning:", saveError);
        }
        // No destroy(): it would remove the React-owned iframe.
      }
      if (iso14001TrackerRef.current === tracker) {
        iso14001TrackerRef.current = null;
      }
    };
  }, [
    currentVideo?.id,
    currentVideoSource,
    iso14001YoutubeTracking,
    saveISO14001VideoProgress,
    user?.email,
  ]);

  const selectVideo = (index) => {
    if (trainingName === "iso14001") {
      const tracker = iso14001TrackerRef.current;
      const media =
        iso14001VideoRef.current || iso14001YoutubePlayerRef.current;
      if (tracker?.dirty && media) {
        saveISO14001VideoProgress(tracker, media, { keepalive: true });
      }
      setIso14001Progress(null);
      setIso14001QuizReady(false);
      setIso14001QuizSession(null);
      setIso14001QuizAnswers({});
      setIso14001QuizResult(null);
      setIso14001QuizError("");
    }
    setSelectedVideo(index);
  };

  // ===================================================
  // NEXT VIDEO
  // ===================================================

  const nextVideo = () => {
    if (
      selectedVideo <
      videos.length - 1
    ) {
      selectVideo(selectedVideo + 1);

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
      selectVideo(selectedVideo - 1);

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
                      selectVideo
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
                        iso14001YoutubeTracking ? (
                          <iframe
                            ref={iso14001YoutubeIframeRef}
                            key={`youtube-${currentVideo.id}-${currentVideoSource}`}
                            src={getISO14001YoutubeIframeSrc(currentVideoSource)}
                            title={currentVideo.title}
                            className="aspect-video w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <iframe
                            key={`youtube-${currentVideo.id}`}
                            src={getYoutubeEmbedUrl(currentVideoSource)}
                            title={currentVideo.title}
                            loading="lazy"
                            className="aspect-video w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        )
                      )}

                      {/* =================================================
                          MP4 FROM SUPABASE / CLOUDFLARE R2
                      ================================================= */}
{currentVideoIsMp4 && (
  <>
    {!r2PlaybackFallback ? (
      <video
        key={`mp4-video-${currentVideo.id}-${currentVideoSource}`}
        ref={
          iso14001Mp4Tracking
            ? iso14001VideoRef
            : undefined
        }
        controls
        preload="metadata"
        playsInline
        // onKeyDown={(event) => {
        //   if (
        //     iso14001Mp4Tracking &&
        //     ["ArrowLeft", "ArrowRight", "Home", "End", "PageUp", "PageDown"].includes(event.key)
        //   ) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //   }
        // }}
        className="aspect-video w-full bg-black object-contain"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          const tracker = iso14001TrackerRef.current;

          if (
            iso14001Mp4Tracking &&
            tracker?.videoId === currentVideo.id &&
            Number.isFinite(video.duration)
          ) {
            tracker.duration = video.duration;
            if (tracker.resumePosition > 0) {
              const resumePosition = Math.min(
                tracker.resumePosition,
                video.duration
              );
              tracker.lastLegitimatePosition = resumePosition;
              video.currentTime = resumePosition;
            }
          }

          console.log("VIDEO LOADED:", video.currentSrc);
          console.log("VIDEO DURATION:", video.duration);
          console.log("VIDEO READY STATE:", video.readyState);
          console.log(
            "VIDEO NETWORK STATE:",
            video.networkState
          );
        }}
        onCanPlay={(event) => {
          console.log(
            "VIDEO CAN PLAY:",
            event.currentTarget.currentSrc
          );
        }}
        onPlay={(event) => {
          const tracker = iso14001TrackerRef.current;
          const video = event.currentTarget;
          if (!iso14001Mp4Tracking || tracker?.videoId !== currentVideo.id) return;

          tracker.duration = video.duration;
          tracker.playing = true;
          tracker.lastMediaPosition = video.currentTime;
          tracker.lastSampleAt = performance.now();
          tracker.dirty = true;
          saveISO14001VideoProgress(tracker, video);
        }}
        onTimeUpdate={(event) => {
          const tracker = iso14001TrackerRef.current;
          const video = event.currentTarget;
          if (!iso14001Mp4Tracking || tracker?.videoId !== currentVideo.id) return;

          const now = performance.now();
          const position = video.currentTime;
          if (
            tracker.ready &&
            tracker.playing &&
            !tracker.seeking &&
            !video.paused &&
            tracker.lastMediaPosition !== null &&
            tracker.lastSampleAt !== null
          ) {
            const mediaDelta = position - tracker.lastMediaPosition;
            const elapsed = Math.max(0, (now - tracker.lastSampleAt) / 1000);
            const maxExpectedDelta =
              elapsed * Math.max(video.playbackRate || 1, 1) * 1.5 + 0.25;
            if (mediaDelta > 0 && mediaDelta <= maxExpectedDelta) {
              tracker.watchedSeconds += mediaDelta;
              tracker.dirty = true;
              tracker.lastLegitimatePosition = position;
            }
          }

          tracker.lastMediaPosition = position;
          tracker.lastSampleAt = now;
        }}
        // onSeeking={(event) => {
        //   const tracker = iso14001TrackerRef.current;
        //   if (!iso14001Mp4Tracking || tracker?.videoId !== currentVideo.id) return;
        //   tracker.seeking = true;
        //   const video = event.currentTarget;
        //   if (
        //     Math.abs(video.currentTime - tracker.lastLegitimatePosition) > 0.25
        //   ) {
        //     video.currentTime = tracker.lastLegitimatePosition;
        //   }
        //   tracker.lastMediaPosition = tracker.lastLegitimatePosition;
        //   tracker.lastSampleAt = performance.now();
        // }}
        // onSeeked={(event) => {
        //   const tracker = iso14001TrackerRef.current;
        //   if (!iso14001Mp4Tracking || tracker?.videoId !== currentVideo.id) return;
        //   tracker.seeking = false;
        //   tracker.lastMediaPosition = tracker.lastLegitimatePosition;
        //   tracker.lastSampleAt = performance.now();
        // }}
        onPause={(event) => {
          const tracker = iso14001TrackerRef.current;
          if (!iso14001Mp4Tracking || tracker?.videoId !== currentVideo.id) return;
          tracker.playing = false;
          tracker.lastMediaPosition = tracker.lastLegitimatePosition;
          tracker.lastSampleAt = performance.now();
          tracker.dirty = true;
          saveISO14001VideoProgress(tracker, event.currentTarget);
        }}
        // onEnded={(event) => {
        //   const tracker = iso14001TrackerRef.current;
        //   if (!iso14001Mp4Tracking || tracker?.videoId !== currentVideo.id) return;
        //   tracker.playing = false;
        //   tracker.lastMediaPosition = event.currentTarget.duration;
        //   tracker.lastSampleAt = performance.now();
        //   tracker.dirty = true;
        //   saveISO14001VideoProgress(tracker, event.currentTarget, {
        //     completed: true,
        //   });
        // }}
        onEnded={async (event) => {
  const tracker = iso14001TrackerRef.current;
  const video = event.currentTarget;

  if (
    !iso14001Mp4Tracking ||
    tracker?.videoId !== currentVideo.id
  ) {
    return;
  }

  const duration = video.duration;

  if (!Number.isFinite(duration) || duration <= 0) {
    return;
  }

  tracker.playing = false;
  tracker.duration = duration;
  tracker.watchedSeconds = duration;
  tracker.lastLegitimatePosition = duration;
  tracker.lastMediaPosition = duration;
  tracker.lastSampleAt = performance.now();
  tracker.dirty = true;

  // Wait for any previous progress save to finish.
  while (tracker.saving) {
    await new Promise((resolve) =>
      window.setTimeout(resolve, 100)
    );
  }

  await saveISO14001VideoProgress(
    tracker,
    video,
    {
      completed: true,
    }
  );

}}

        onError={(event) => {
          const video = event.currentTarget;
          const error = video.error;

          console.warn(
            "VIDEO PLAYBACK FAILED:",
            {
              src: video.currentSrc,
              readyState: video.readyState,
              networkState: video.networkState,
              errorCode: error?.code,
              errorMessage: error?.message,
            }
          );

          if (
            CLOUDFLARE_R2_VIDEOS[
              normalizeTrainingName(trainingName)
            ] &&
            error?.code === 4
          ) {
            setR2PlaybackFallback(true);
          }
        }}
      >
        <source
          src={currentVideoSource}
          type="video/mp4"
        />

        Your browser does not support HTML5 video.
      </video>
    ) : (
      <div className="relative aspect-video w-full bg-black">
        <iframe
          key={`r2-fallback-${currentVideo.id}-${currentVideoSource}`}
          src={currentVideoSource}
          title={currentVideo.title || "Training Video"}
          className="h-full w-full border-0 bg-black"
          allow="autoplay; fullscreen"
          allowFullScreen
        />

        <button
          type="button"
          onClick={() => setR2PlaybackFallback(false)}
          className="absolute right-4 top-4 rounded-lg bg-black/70 px-3 py-2 text-xs font-semibold text-white transition hover:bg-black"
        >
          Retry Video Player
        </button>
      </div>
    )}
  </>
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

                      {iso14001AuthorizedUser && (
                        <section className="mt-8 rounded-xl border border-gold/30 bg-white/5 p-6">
                          {iso14001QuizReady && iso14001Progress?.video_id === currentVideo.id && iso14001Progress.completed ? (
                            <>
                              <p className="font-semibold text-emerald-300">Video Completed</p>
                              {!iso14001QuizSession && (
                                <>
                                  {iso14001QuizResult ? (
                                    <button
                                      type="button"
                                      onClick={() => setIso14001QuizModalOpen(true)}
                                      className="mt-4 rounded-xl bg-gold px-6 py-3 font-semibold text-black transition hover:scale-[1.02]"
                                    >
                                      View Quiz Result
                                    </button>
                                  // ) : iso14001RetestRequest?.status === "accepted" ? (
                                  //   <button
                                  //     type="button"
                                  //     onClick={() => startISO14001Quiz(iso14001RetestRequest.id)}
                                  //     disabled={iso14001QuizStarting}
                                  //     className="mt-4 rounded-xl bg-gold px-6 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-60"
                                  //   >
                                  //     Start Retest
                                  //   </button>
                                ) : iso14001RetestRequest?.status === "accepted" ? (
  <p
    className="mt-4 text-sm font-medium text-emerald-300"
    role="status"
  >
    Retest Approved. Starting Set 2...
  </p>
)
                                  // )
                                   : iso14001RetestRequest?.status === "rejected" ? (
                                    <button
                                      type="button"
                                      onClick={() => requestISO14001Retest(iso14001RetestRequest.original_attempt_id)}
                                      disabled={iso14001RetestRequesting}
                                      className="mt-4 rounded-xl bg-gold px-6 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-60"
                                    >
                                      {iso14001RetestRequesting ? "Sending..." : "Request Retest Again"}
                                    </button>
                                  ) : iso14001RetestRequest?.status === "pending" ? null : (
                                    <button
                                      type="button"
                                      onClick={() => startISO14001Quiz()}
                                      disabled={iso14001QuizStarting}
                                      className="mt-4 rounded-xl bg-gold px-6 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-60"
                                    >
                                      Ready for Quiz
                                    </button>
                                  )}
                                </>
                              )}
                              {iso14001RetestRequest?.status === "pending" && (
                                <p className="mt-4 text-sm text-amber-200" role="status">
                                  Retest request sent to the administrator. Waiting for admin approval.
                                </p>
                              )}
                              {iso14001RetestRequest?.status === "accepted" && !iso14001QuizResult && (
                                <p className="mt-4 text-sm text-emerald-300" role="status">
                                  Retest Approved
                                </p>
                              )}
                              {iso14001RetestRequest?.status === "rejected" && !iso14001QuizResult && (
                                <p className="mt-4 text-sm text-red-300" role="status">
                                  Retest Request Rejected. Set 2 remains locked.
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-white/70">Complete this video to unlock its quiz.</p>
                          )}

                          {iso14001QuizError && (
                            <p className="mt-4 text-sm text-red-300" role="alert">{iso14001QuizError}</p>
                          )}
                        </section>
                      )}

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
      {iso14001AuthorizedUser && iso14001QuizModalOpen && (
        <div className="fixed inset-0 z-[9999] h-[100dvh] w-full bg-white">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="iso14001-quiz-title"
            className="flex h-full w-full flex-col bg-white text-slate-900"
          >
            {/* =====================================================
                QUIZ HEADER
            ===================================================== */}
            <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 shadow-sm sm:px-8">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-600">
                  ISO 14001
                </p>

                <h2
                  id="iso14001-quiz-title"
                  className="mt-1 truncate text-xl font-bold text-slate-900 sm:text-2xl"
                >
                  {iso14001QuizSession?.quiz_set === 2 || iso14001QuizResult?.quiz_set === 2
                    ? "ISO 14001 Retest"
                    : "ISO 14001 Quiz"}
                </h2>
              </div>

              <div className="flex shrink-0 items-center gap-3 sm:gap-5">
                {iso14001QuizSession ? (
                  <div
                    className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 font-mono text-base font-bold text-amber-700 sm:px-4 sm:text-lg"
                    aria-live="polite"
                  >
                    {Math.floor(iso14001QuizRemaining / 60)}:
                    {String(iso14001QuizRemaining % 60).padStart(2, "0")}
                  </div>
                ) : (
                  <span className="hidden text-sm font-medium text-slate-500 sm:block">
                    Attempt complete
                  </span>
                )}

                <button
                  type="button"
                  onClick={closeISO14001Quiz}
                  aria-label="Close quiz"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-2xl font-medium leading-none text-slate-700 transition hover:border-red-400 hover:bg-red-50 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            </header>

            {/* =====================================================
                QUIZ BODY
            ===================================================== */}
            <div className="min-h-0 flex-1 overflow-y-auto bg-white">
              <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
                {iso14001QuizSession && (
                  <div className="space-y-6">
                    {activeISO14001QuizQuestions.map((question, index) => (
                      <fieldset
                        key={question.id ?? question.question_id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
                      >
                        <legend className="w-full px-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
                            <span className="shrink-0 text-sm font-bold text-amber-600">
                              Question {index + 1} of {activeISO14001QuizQuestions.length}
                            </span>

                            <span className="text-base font-semibold leading-7 text-slate-900 sm:text-lg">
                              {question.question}
                            </span>
                          </div>
                        </legend>

                        <div className="mt-5 grid gap-3">
                          {Object.entries(question.options).map(([letter, option]) => {
                            const isSelected =
                              iso14001QuizAnswers[question.id ?? question.question_id] === letter;

                            return (
                              <label
                                key={letter}
                                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 text-sm leading-6 transition sm:text-base ${
                                  isSelected
                                    ? "border-amber-500 bg-amber-50"
                                    : "border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name={`iso14001-question-${question.id ?? question.question_id}`}
                                  value={letter}
                                  checked={isSelected}
                                  onChange={() =>
                                    setIso14001QuizAnswers((previous) => ({
                                      ...previous,
                                      [question.id ?? question.question_id]: letter,
                                    }))
                                  }
                                  className="mt-1 h-4 w-4 shrink-0 accent-amber-500"
                                />

                                <span
                                  className={
                                    isSelected
                                      ? "font-medium text-slate-900"
                                      : "text-slate-700"
                                  }
                                >
                                  {option}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                    ))}

                    <div className="flex justify-center pb-4 pt-2 sm:justify-end">
                      <button
                        type="button"
                        onClick={submitISO14001Quiz}
                        disabled={
                          iso14001QuizSubmitting ||
                          activeISO14001QuizQuestions.some(
                            (question) => !iso14001QuizAnswers[question.id ?? question.question_id]
                          )
                        }
                        className="w-full rounded-xl bg-amber-500 px-8 py-4 text-base font-bold text-slate-900 shadow-sm transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        {iso14001QuizSubmitting ? "Submitting..." : "Submit Quiz"}
                      </button>
                    </div>
                  </div>
                )}

                {iso14001QuizStarting && !iso14001QuizSession && (
                  <div className="flex min-h-[300px] items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-amber-500" />
                      <p className="mt-5 text-base font-medium text-slate-600" role="status">
                        Starting quiz...
                      </p>
                    </div>
                  </div>
                )}

                {iso14001QuizResult && (
                  <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-600">
                        ISO 14001
                      </p>

                      <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                        {iso14001QuizResult.status === "FAIL" ? "Quiz Failed" : "Quiz Result"}
                      </h3>

                      <p
                        className={`mt-5 text-3xl font-extrabold ${
                          iso14001QuizResult.status === "PASS"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {iso14001QuizResult.status}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Score
                          </p>
                          <p className="mt-1 text-xl font-bold text-slate-900">
                            {iso14001QuizResult.score} / {iso14001QuizResult.total_questions}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Percentage
                          </p>
                          <p className="mt-1 text-xl font-bold text-slate-900">
                            {iso14001QuizResult.percentage}%
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-50 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Passing Score
                          </p>
                          <p className="mt-1 text-xl font-bold text-slate-900">
                            {iso14001QuizResult.passing_score} / {iso14001QuizResult.total_questions}
                          </p>
                        </div>
                      </div>

                      {/* {iso14001QuizResult.status === "FAIL" && (
                        iso14001RetestRequest?.original_attempt_id === iso14001QuizResult.attempt_id ? (
                          iso14001RetestRequest.status === "pending" ? (
                            <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                              <p>Retest request sent to the administrator.</p>
                              <p className="mt-1 font-semibold">Waiting for admin approval.</p>
                            </div>
                          ) : iso14001RetestRequest.status === "accepted" ? (
                            <div className="mt-7">
                              <p className="font-bold text-emerald-600">Retest Approved</p>
                              <button
                                type="button"
                                onClick={() => startISO14001Quiz(iso14001RetestRequest.id)}
                                disabled={iso14001QuizStarting}
                                className="mt-3 rounded-xl bg-amber-500 px-7 py-3 font-bold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                Start Retest
                              </button>
                            </div>
                          ) 
                         iso14001RetestRequest.status === "pending" ? (
  <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
    <p>Retest request sent to the administrator.</p>
    <p className="mt-1 font-semibold">Waiting for admin approval.</p>
  </div>
) : (
  <div className="mt-7">
    <p className="font-bold text-red-600">Retest Request Rejected</p>
    <p className="mt-1 text-sm text-slate-600">Set 2 remains locked.</p>
    <button
      type="button"
      onClick={() => requestISO14001Retest(iso14001QuizResult.attempt_id)}
      disabled={iso14001RetestRequesting}
      className="mt-3 rounded-xl bg-amber-500 px-7 py-3 font-bold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {iso14001RetestRequesting ? "Sending..." : "Request Retest Again"}
    </button>
  </div>
)
                          : (
                            <div className="mt-7">
                              <p className="font-bold text-red-600">Retest Request Rejected</p>
                              <p className="mt-1 text-sm text-slate-600">Set 2 remains locked.</p>
                              <button
                                type="button"
                                onClick={() => requestISO14001Retest(iso14001QuizResult.attempt_id)}
                                disabled={iso14001RetestRequesting}
                                className="mt-3 rounded-xl bg-amber-500 px-7 py-3 font-bold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {iso14001RetestRequesting ? "Sending..." : "Request Retest Again"}
                              </button>
                            </div>
                          )
                        ) : (
                          <button
                            type="button"
                            onClick={() => requestISO14001Retest(iso14001QuizResult.attempt_id)}
                            disabled={iso14001RetestRequesting}
                            className="mt-7 rounded-xl bg-amber-500 px-7 py-3 font-bold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {iso14001RetestRequesting ? "Sending..." : "Request Retest"}
                          </button>
                        )
                      )} */}
{/* {iso14001QuizResult.status === "FAIL" && (
  iso14001RetestRequest?.original_attempt_id ===
  iso14001QuizResult.attempt_id ? ( */}
  {iso14001QuizResult.status === "FAIL" && (
  iso14001QuizResult.quiz_set === 2 ? (
    <div className="mt-7 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <p className="font-semibold">
        This test has been completed.
      </p>

      <p className="mt-1">
        You can take the retest only after 45 days from your last failed retest.
      </p>
    </div>
  ) : (
    iso14001RetestRequest?.original_attempt_id ===
    iso14001QuizResult.attempt_id ? (
    iso14001RetestRequest.status === "pending" ? (
      <div className="mt-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p>
          Retest request sent to the administrator.
        </p>

        <p className="mt-1 font-semibold">
          Waiting for admin approval.
        </p>
      </div>
    ) : iso14001RetestRequest.status === "accepted" ? (
      <div className="mt-7">
        <p className="font-bold text-emerald-600">
          Retest Approved
        </p>

        <button
          type="button"
          onClick={() =>
            startISO14001Quiz(
              iso14001RetestRequest.id
            )
          }
          disabled={iso14001QuizStarting}
          className="mt-3 rounded-xl bg-amber-500 px-7 py-3 font-bold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {iso14001QuizStarting
            ? "Starting Retest..."
            : "Start Retest"}
        </button>
      </div>
    ) : (
      <div className="mt-7">
        <p className="font-bold text-red-600">
          Retest Request Rejected
        </p>

        <p className="mt-1 text-sm text-slate-600">
          Set 2 remains locked.
        </p>

        <button
          type="button"
          onClick={() =>
            requestISO14001Retest(
              iso14001QuizResult.attempt_id
            )
          }
          disabled={iso14001RetestRequesting}
          className="mt-3 rounded-xl bg-amber-500 px-7 py-3 font-bold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {iso14001RetestRequesting
            ? "Sending..."
            : "Request Retest Again"}
        </button>
      </div>
    )
  ) : (
    <button
      type="button"
      onClick={() =>
        requestISO14001Retest(
          iso14001QuizResult.attempt_id
        )
      }
      disabled={iso14001RetestRequesting}
      className="mt-7 rounded-xl bg-amber-500 px-7 py-3 font-bold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {iso14001RetestRequesting
        ? "Sending..."
        : "Request Retest"}
    </button>
  )
))}
                      {iso14001QuizResult.status === "PASS" && (
                        <p className="mt-6 text-sm font-medium text-emerald-600">
                          Congratulations! You have successfully passed the ISO 14001 quiz.
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {iso14001QuizError && (
                  <div
                    className="mx-auto mt-5 max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600"
                    role="alert"
                  >
                    {iso14001QuizError}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}
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