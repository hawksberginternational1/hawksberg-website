import PropTypes from "prop-types";
import { useRef } from "react";

export default function TrainingVideoPlayer({ video }) {
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);
  const restoringRef = useRef(false);
  const wasPlayingRef = useRef(false);

  if (!video) {
    return (
      <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        <p className="text-white/60">No video selected.</p>
      </div>
    );
  }

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: video.title,
    description: video.description,
    provider: {
      "@type": "Organization",
      name: video.instructor || "Hawksberg International",
      sameAs: "https://www.hawksberginternational.com",
    },
    timeRequired: video.duration,
  };

  const youtubeUrl = video.youtube_url?.trim() || "";
  const mp4Url = video.video_url?.trim() || "";

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.pathname.startsWith("/embed/")) {
        parsedUrl.searchParams.set("controls", "0");
        parsedUrl.searchParams.set("disablekb", "1");
        parsedUrl.searchParams.set("fs", "0");
        parsedUrl.searchParams.set("rel", "0");

        return parsedUrl.toString();
      }

      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?controls=0&disablekb=1&fs=0&rel=0`;
      }

      if (parsedUrl.hostname === "youtu.be") {
        const id = parsedUrl.pathname.replace("/", "");

        if (id) {
          return `https://www.youtube.com/embed/${id}?controls=0&disablekb=1&fs=0&rel=0`;
        }
      }

      return url;
    } catch {
      return url;
    }
  };

  const youtubeEmbedUrl = getYoutubeEmbedUrl(youtubeUrl);

  const hasYoutubeVideo = Boolean(youtubeEmbedUrl);
  const hasMp4Video = Boolean(mp4Url);

  /*
   * MP4:
   * Store only the position reached during normal playback.
   */
  const handleTimeUpdate = (event) => {
    const videoElement = event.currentTarget;

    if (restoringRef.current || videoElement.seeking) {
      return;
    }

    lastTimeRef.current = videoElement.currentTime;
  };

  /*
   * MP4:
   * Reject a seek and return to the last watched position.
   */
  const handleSeeking = (event) => {
    const videoElement = event.currentTarget;

    if (restoringRef.current) {
      return;
    }

    restoringRef.current = true;
    wasPlayingRef.current = !videoElement.paused;

    videoElement.currentTime = lastTimeRef.current;
  };

  /*
   * MP4:
   * Ensure the rejected position is not retained.
   */
  const handleSeeked = (event) => {
    const videoElement = event.currentTarget;

    if (!restoringRef.current) {
      return;
    }

    videoElement.currentTime = lastTimeRef.current;

    restoringRef.current = false;

    if (wasPlayingRef.current) {
      videoElement.play().catch(() => {});
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      />

      {hasYoutubeVideo ? (
        <iframe
          key={`youtube-${video.id}`}
          src={youtubeEmbedUrl}
          title={video.title}
          loading="lazy"
          className="aspect-video w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : hasMp4Video ? (
        <div
          className="aspect-video w-full bg-black"
          onContextMenu={(event) => event.preventDefault()}
        >
          <video
            ref={videoRef}
            key={`mp4-${video.id}`}
            controls={false}
            preload="metadata"
            playsInline
            className="pointer-events-none h-full w-full bg-black object-contain select-none"
            title={video.title}
            onTimeUpdate={handleTimeUpdate}
            onSeeking={handleSeeking}
            onSeeked={handleSeeked}
            onLoadedMetadata={() => {
              lastTimeRef.current = 0;
              restoringRef.current = false;
              wasPlayingRef.current = false;
            }}
          >
            <source
              src={mp4Url}
              type="video/mp4"
            />

            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-[#081B35]">
          <p className="px-6 text-center text-white/60">
            Video is currently unavailable.
          </p>
        </div>
      )}

      <div className="border-t border-white/10 bg-[#081B35] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">
          Hawksberg International
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white">
          {video.title}
        </h2>

        <p className="mt-6 leading-8 text-white/70">
          {video.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-6">
          <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              Duration
            </p>

            <p className="mt-2 font-semibold text-gold">
              {video.duration}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              Instructor
            </p>

            <p className="mt-2 font-semibold text-gold">
              {video.instructor}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

TrainingVideoPlayer.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    instructor: PropTypes.string,
    youtube_url: PropTypes.string,
    video_url: PropTypes.string,
    training_name: PropTypes.string,
  }),
};