
"use client";

// import { useEffect, useRef, useState } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import Layout from "@/components/Layout";
import { TrainingPortalContent } from "@/app/training/page";

export default function ISO14001Instructions() {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  const videoCompletedRef = useRef(false);

useEffect(() => {
  // Prevent browser Back navigation during the video
  const pushVideoHistory = () => {
    window.history.pushState(
      { iso14001Video: true },
      "",
      window.location.href
    );
  };

  pushVideoHistory();

  const handlePopState = () => {
    if (!videoCompletedRef.current) {
      pushVideoHistory();
    }
  };

  const handleVisibilityChange = () => {
    const video = videoRef.current;

    if (
      document.hidden &&
      video &&
      !video.ended &&
      !video.paused
    ) {
      video.pause();
    }
  };

  const handlePageHide = (event) => {
    if (!videoCompletedRef.current) {
      event.preventDefault();
    }
  };

  window.addEventListener("popstate", handlePopState);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("pagehide", handlePageHide);

  return () => {
    window.removeEventListener("popstate", handlePopState);
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("pagehide", handlePageHide);
  };
}, []);

  useEffect(() => {
    const findVideo = () => {
      const video = document.querySelector("video");

      if (video) {
        videoRef.current = video;
        setVideoReady(true);
      }
    };

    findVideo();

    const timer = window.setInterval(findVideo, 500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  // =========================================================
  // PREVENT ESC FROM EXITING FULLSCREEN
  // =========================================================
  useEffect(() => {
    const handleEscape = (event) => {
      const video = videoRef.current;

      if (
        event.key === "Escape" &&
        video &&
        document.fullscreenElement === video
      ) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleEscape, true);

    return () => {
      document.removeEventListener("keydown", handleEscape, true);
    };
  }, []);

  // =========================================================
  // VIDEO COMPLETION
  // After video ends:
  // 1. Unlock keyboard
  // 2. Exit fullscreen
  // 3. Go to existing /training page
  // =========================================================
  // useEffect(() => {
  //   const video = videoRef.current;

  //   if (!video) {
  //     return;
  //   }

  //   const handleVideoEnded = async () => {
  //     try {
  //       if (
  //         "keyboard" in navigator &&
  //         navigator.keyboard &&
  //         "unlock" in navigator.keyboard
  //       ) {
  //         navigator.keyboard.unlock();
  //       }

  //       if (document.fullscreenElement === video) {
  //         await document.exitFullscreen();
  //       }

  //       window.location.href = "/training";
  //     } catch (error) {
  //       console.error(
  //         "ISO 14001 fullscreen exit/navigation failed:",
  //         error
  //       );

  //       window.location.href = "/training";
  //     }
  //   };

  //   video.addEventListener("ended", handleVideoEnded);

  //   return () => {
  //     video.removeEventListener("ended", handleVideoEnded);
  //   };
  // }, [videoReady]);
//   useEffect(() => {
//   const handleVideoCompleted = async () => {
//     try {
//       if (
//         "keyboard" in navigator &&
//         navigator.keyboard &&
//         "unlock" in navigator.keyboard
//       ) {
//         navigator.keyboard.unlock();
//       }

//       if (document.fullscreenElement) {
//         await document.exitFullscreen().catch(() => {});
//       }

//       window.location.href = "/training";
//     } catch (error) {
//       console.error(
//         "ISO 14001 completion navigation failed:",
//         error
//       );
//     }
//   };

//   window.addEventListener(
//     "iso14001-video-completed",
//     handleVideoCompleted
//   );

//   return () => {
//     window.removeEventListener(
//       "iso14001-video-completed",
//       handleVideoCompleted
//     );
//   };
// }, []);
  useEffect(() => {
  const handleVideoCompleted = () => {
    try {
      if (
        "keyboard" in navigator &&
        navigator.keyboard &&
        "unlock" in navigator.keyboard
      ) {
        navigator.keyboard.unlock();
      }
    } catch (error) {
      console.warn("ISO 14001 keyboard unlock failed:", error);
    }

    // IMPORTANT:
    // Do NOT call document.exitFullscreen() here.
    // Navigate immediately while the video is still fullscreen.
    window.location.replace("/training");
  };

  window.addEventListener(
    "iso14001-video-completed",
    handleVideoCompleted
  );

  return () => {
    window.removeEventListener(
      "iso14001-video-completed",
      handleVideoCompleted
    );
  };
}, []);


  const handleStartVideo = async () => {
    const video = videoRef.current || document.querySelector("video");

    if (!video) {
      console.error("ISO 14001 training video not found.");
      return;
    }

    videoRef.current = video;

    try {
      await video.requestFullscreen({
        navigationUI: "hide",
        keyboardLock: "browser",
      });

      // Lock Escape while the video is fullscreen.
      if (
        "keyboard" in navigator &&
        navigator.keyboard &&
        "lock" in navigator.keyboard
      ) {
        try {
          await navigator.keyboard.lock(["Escape"]);
        } catch (error) {
          console.warn(
            "ISO 14001 keyboard lock unavailable:",
            error
          );
        }
      }

      await video.play();
    } catch (error) {
      console.error("ISO 14001 fullscreen/play failed:", error);
    }
  };

  return (
    <Layout hideFooter>
      {/* =========================================================
          EXISTING TRAINING VIDEO
          IMPORTANT:
          Keep the SAME existing video mounted.
          It is kept outside the visible instruction page.
          It is NOT display:none, so requestFullscreen() works.
      ========================================================== */}
      {/* <div
        className="fixed -left-[100vw] top-0 z-[-1] h-screen w-screen overflow-hidden"
        aria-hidden="true"
      >
        <TrainingPortalContent instructionMode={true} />
      </div> */}
      <div
  className="fixed -left-[100vw] top-0 z-[-1] h-screen w-screen overflow-hidden"
  aria-hidden="true"
>
  <Suspense
    fallback={<div className="min-h-screen bg-[#071A33]" />}
  >
    <TrainingPortalContent instructionMode={true} />
  </Suspense>
</div>

      {/* =========================================================
          ISO 14001 INSTRUCTION PAGE
          HEADER/NAVBAR COMES FROM Layout
      ========================================================== */}
      <section className="relative min-h-screen bg-[#071A33] px-6 py-16">
        <div className="mx-auto max-w-4xl">
          {/* <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-12"> */}
          <div className="rounded-3xl border border-white/10 bg-white p-8 shadow-2xl backdrop-blur-xl md:p-12">
            <p className="text-sm uppercase tracking-[0.35em] text-gold">
              Hawksberg International
            </p>

            {/* <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl"> */}
            <h1 className="mt-4 font-display text-4xl font-bold text-black md:text-5xl">
              Training Instructions
            </h1>

            {/* <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/80"> */}
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-black">
              <p>
                • Sit in a quiet room with minimal noise and distractions.
              </p>

              <p>
                • Use headphones or earbuds, or ensure you have a working
                speaker.
              </p>

              <p>
                • Set aside 30 uninterrupted minutes to complete the training.
              </p>

              <p>
                • Choose a location with an internet speed of at least 5 Mbps.
              </p>

              <p>• Take notes using a notepad as you go.</p>

              <p>• Complete the quiz immediately after the training.</p>

              <p>
                • Complete the quiz independently. Do not use Google, AI tools,
                or other outside assistance.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleStartVideo}
                disabled={!videoReady}
                className="rounded-full bg-gold px-8 py-4 font-bold text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {videoReady ? "Start Training" : "Loading Video..."}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
