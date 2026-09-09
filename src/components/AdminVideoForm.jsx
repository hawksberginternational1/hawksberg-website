"use client";

import PropTypes from "prop-types";

const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

// =====================================================
// TRAINING PORTALS
// =====================================================

const TRAINING_PORTALS = [
  {
    value: "iso9001",
    label: "ISO 9001",
  },
  {
    value: "iso14001",
    label: "ISO 14001",
  },
  {
    value: "iso27001",
    label: "ISO 27001",
  },
  {
    value: "riskidentification",
    label: "Risk Identification",
  },
  {
    value: "riskevaluation",
    label: "Risk Evaluation",
  },
  {
    value: "riskassessment",
    label: "Risk Assessment",
  },
  {
    value: "risktreatment",
    label: "Risk Treatment",
  },
  {
    value: "soa",
    label: "SOA",
  },
];

// =====================================================
// YOUTUBE EMBED URL VALIDATION
// =====================================================

function isValidYoutubeEmbedUrl(url) {
  if (!url) {
    return false;
  }

  const value = String(url).trim();

  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);

    const hostname = (
      parsed.hostname || ""
    ).toLowerCase();

    const pathname = parsed.pathname || "";

    const allowedHosts = [
      "youtube.com",
      "www.youtube.com",
      "youtube-nocookie.com",
      "www.youtube-nocookie.com",
    ];

    if (!allowedHosts.includes(hostname)) {
      return false;
    }

    if (!pathname.startsWith("/embed/")) {
      return false;
    }

    const videoId = pathname
      .replace("/embed/", "")
      .replace(/\/+$/, "")
      .trim();

    return Boolean(videoId);
  } catch {
    return false;
  }
}

// =====================================================
// MP4 VALIDATION
// =====================================================

function isValidMp4(file) {
  if (!file) {
    return false;
  }

  const fileName = (
    file.name || ""
  ).toLowerCase();

  const fileType = (
    file.type || ""
  ).toLowerCase();

  return (
    fileType === "video/mp4" ||
    fileName.endsWith(".mp4")
  );
}

// =====================================================
// COMPONENT
// =====================================================

export default function AdminVideoForm({
  formData,
  handleChange,
  handleSubmit,
  editingId = null,
  resetForm,
  loading = false,
}) {
  // ===================================================
  // NORMALIZE EDITING STATE
  // ===================================================

  const isEditing =
    editingId !== null &&
    editingId !== undefined &&
    editingId !== "";

  // ===================================================
  // SUBMIT
  // ===================================================

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // -------------------------------------------------
    // BASIC FIELDS
    // -------------------------------------------------

    const title = String(
      formData?.title || ""
    ).trim();

    const description = String(
      formData?.description || ""
    ).trim();

    const duration = String(
      formData?.duration || ""
    ).trim();

    const instructor = String(
      formData?.instructor || ""
    ).trim();

    const trainingName = String(
      formData?.training_name || ""
    )
      .trim()
      .toLowerCase();

    // -------------------------------------------------
    // VIDEO SOURCES
    // -------------------------------------------------

    const youtubeUrl = String(
      formData?.video || ""
    ).trim();

    const videoFile =
      formData?.video_file || null;

    // =================================================
    // REQUIRED FIELDS
    // =================================================

    if (!title) {
      alert("Please enter the video title.");
      return;
    }

    if (!description) {
      alert("Please enter the video description.");
      return;
    }

    if (!duration) {
      alert("Please enter the video duration.");
      return;
    }

    if (!instructor) {
      alert("Please enter the instructor name.");
      return;
    }

    // =================================================
    // TRAINING PORTAL
    // =================================================

    if (!trainingName) {
      alert("Please select a Training Portal.");
      return;
    }

    const validTrainingPortal =
      TRAINING_PORTALS.some(
        (portal) =>
          portal.value === trainingName
      );

    if (!validTrainingPortal) {
      alert("Please select a valid Training Portal.");
      return;
    }

    // =================================================
    // VIDEO SOURCE
    // =================================================

    const hasYoutube =
      youtubeUrl.length > 0;

    const hasMp4 =
      videoFile instanceof File;

    // =================================================
    // CREATE
    // New video requires one source.
    // =================================================

    if (
      !isEditing &&
      !hasYoutube &&
      !hasMp4
    ) {
      alert(
        "Please enter a YouTube Embed URL or upload an MP4 video."
      );
      return;
    }

    // =================================================
    // BOTH SOURCES
    // =================================================

    if (
      hasYoutube &&
      hasMp4
    ) {
      alert(
        "Please use either a YouTube Embed URL OR an MP4 video. Do not use both."
      );
      return;
    }

    // =================================================
    // YOUTUBE VALIDATION
    // =================================================

    if (hasYoutube) {
      if (
        !isValidYoutubeEmbedUrl(
          youtubeUrl
        )
      ) {
        alert(
          "Please enter a valid YouTube Embed URL.\n\nExample:\nhttps://www.youtube.com/embed/VIDEO_ID"
        );
        return;
      }
    }

    // =================================================
    // MP4 VALIDATION
    // =================================================

    if (hasMp4) {
      if (!isValidMp4(videoFile)) {
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
          "Video file is larger than 50 MB. Please upload an MP4 file below 50 MB."
        );
        return;
      }
    }

    // =================================================
    // SUBMIT TO PARENT
    // =================================================

    if (typeof handleSubmit !== "function") {
      console.error(
        "AdminVideoForm: handleSubmit is not a function."
      );

      alert(
        "Unable to submit the video form. Please check the admin page configuration."
      );

      return;
    }

    handleSubmit(event);
  };

  // =====================================================
  // FILE CHANGE HANDLER
  // =====================================================

  const handleVideoFileChange = (event) => {
    const file =
      event.target.files?.[0] || null;

    // -------------------------------------------------
    // NO FILE
    // -------------------------------------------------

    if (!file) {
      handleChange({
        target: {
          name: "video_file",
          value: null,
          type: "file",
          files: [],
        },
      });

      return;
    }

    // -------------------------------------------------
    // MP4 VALIDATION
    // -------------------------------------------------

    if (!isValidMp4(file)) {
      alert(
        "Only MP4 video files are allowed."
      );

      event.target.value = "";

      handleChange({
        target: {
          name: "video_file",
          value: null,
          type: "file",
          files: [],
        },
      });

      return;
    }

    // -------------------------------------------------
    // SIZE VALIDATION
    // -------------------------------------------------

    if (
      file.size >
      MAX_VIDEO_SIZE
    ) {
      alert(
        "Video file is larger than 50 MB. Please upload an MP4 file below 50 MB."
      );

      event.target.value = "";

      handleChange({
        target: {
          name: "video_file",
          value: null,
          type: "file",
          files: [],
        },
      });

      return;
    }

    // -------------------------------------------------
    // VALID FILE
    // -------------------------------------------------

    handleChange({
      target: {
        name: "video_file",
        value: file,
        type: "file",
        files: [file],
      },
    });

    // -------------------------------------------------
    // CLEAR YOUTUBE WHEN MP4 IS SELECTED
    // -------------------------------------------------

    if (
      String(formData?.video || "").trim()
    ) {
      handleChange({
        target: {
          name: "video",
          value: "",
          type: "url",
        },
      });
    }
  };

  // =====================================================
  // YOUTUBE CHANGE HANDLER
  // =====================================================

  const handleYoutubeChange = (event) => {
    const value = event.target.value;

    handleChange(event);

    // If user starts using YouTube,
    // remove selected MP4 so exactly one source remains.
    if (
      value.trim() &&
      formData?.video_file
    ) {
      handleChange({
        target: {
          name: "video_file",
          value: null,
          type: "file",
          files: [],
        },
      });

      const input =
        document.getElementById(
          "video_file"
        );

      if (input) {
        input.value = "";
      }
    }
  };

  // =====================================================
  // CLEAR MP4 FILE
  // =====================================================

  const clearVideoFile = () => {
    handleChange({
      target: {
        name: "video_file",
        value: null,
        type: "file",
        files: [],
      },
    });

    if (
      typeof document !== "undefined"
    ) {
      const input =
        document.getElementById(
          "video_file"
        );

      if (input) {
        input.value = "";
      }
    }
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      {/* =================================================
          TITLE
      ================================================= */}

      <h2 className="mb-8 text-2xl font-bold text-white">
        {isEditing
          ? "Edit Training Video"
          : "Upload Training Video"}
      </h2>

      <form
        onSubmit={handleFormSubmit}
        className="grid gap-6"
      >
        {/* =================================================
            VIDEO TITLE
        ================================================= */}

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-white"
          >
            Video Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={
              formData?.title || ""
            }
            onChange={handleChange}
            placeholder="Enter training title"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-gold"
            required
            disabled={loading}
          />
        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-white"
          >
            Description
          </label>

          <textarea
            id="description"
            rows={5}
            name="description"
            value={
              formData?.description || ""
            }
            onChange={handleChange}
            placeholder="Enter video description"
            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-gold"
            required
            disabled={loading}
          />
        </div>

        {/* =================================================
            DURATION + INSTRUCTOR
        ================================================= */}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Duration */}

          <div>
            <label
              htmlFor="duration"
              className="mb-2 block text-sm font-medium text-white"
            >
              Duration
            </label>

            <input
              id="duration"
              type="text"
              name="duration"
              value={
                formData?.duration || ""
              }
              onChange={handleChange}
              placeholder="20 mins"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-gold"
              required
              disabled={loading}
            />
          </div>

          {/* Instructor */}

          <div>
            <label
              htmlFor="instructor"
              className="mb-2 block text-sm font-medium text-white"
            >
              Instructor
            </label>

            <input
              id="instructor"
              type="text"
              name="instructor"
              value={
                formData?.instructor || ""
              }
              onChange={handleChange}
              placeholder="Hawksberg International"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-gold"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* =================================================
            TRAINING PORTAL
        ================================================= */}

        <div>
          <label
            htmlFor="training_name"
            className="mb-2 block text-sm font-medium text-white"
          >
            Training Portal
          </label>

          <select
            id="training_name"
            name="training_name"
            value={
              formData?.training_name || ""
            }
            onChange={handleChange}
            required
            disabled={loading}
            className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#172B46] px-4 py-3 text-white outline-none transition focus:border-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option
              value=""
              disabled
              className="bg-[#172B46] text-white/60"
            >
              Select Training Portal
            </option>

            {TRAINING_PORTALS.map(
              (portal) => (
                <option
                  key={portal.value}
                  value={portal.value}
                  className="bg-[#172B46] text-white"
                >
                  {portal.label}
                </option>
              )
            )}
          </select>
        </div>

        {/* =================================================
            YOUTUBE
        ================================================= */}

        <div>
          <label
            htmlFor="video"
            className="mb-2 block text-sm font-medium text-white"
          >
            YouTube Embed URL

            <span className="ml-2 text-xs font-normal text-white/40">
              (Use this OR upload MP4)
            </span>
          </label>

          <input
            id="video"
            type="url"
            name="video"
            value={
              formData?.video || ""
            }
            onChange={handleYoutubeChange}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-gold"
            disabled={loading}
          />

          <p className="mt-2 text-xs text-white/50">
            Use a YouTube Embed URL only.
          </p>

          <p className="mt-1 text-xs text-white/40">
            Example:
            {" "}
            https://www.youtube.com/embed/VIDEO_ID
          </p>
        </div>

        {/* =================================================
            OR
        ================================================= */}

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
            OR
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* =================================================
            MP4 UPLOAD
        ================================================= */}

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Upload MP4 Video
          </label>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            {/* Upload Box */}

            <label
              htmlFor="video_file"
              className={`flex items-center justify-between gap-4 rounded-lg border border-dashed border-white/20 bg-[#172B46] px-5 py-5 transition ${
                loading
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:border-gold hover:bg-[#1b3454]"
              }`}
            >
              <div className="min-w-0">
                <p className="font-semibold text-white">
                  Choose MP4 Video
                </p>

                <p className="mt-1 text-xs text-white/50">
                  MP4 format only • Maximum 50 MB
                </p>
              </div>

              <span className="shrink-0 rounded-lg bg-gold px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#f1bc47]">
                Browse
              </span>
            </label>

            {/* Hidden Input */}

            <input
              id="video_file"
              type="file"
              name="video_file"
              accept="video/mp4,.mp4"
              onChange={
                handleVideoFileChange
              }
              className="hidden"
              disabled={loading}
            />

            {/* =================================================
                SELECTED FILE
            ================================================= */}

            {formData?.video_file ? (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-gold/30 bg-gold/5 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs text-white/50">
                    Selected video
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-gold">
                    {
                      formData.video_file
                        .name
                    }
                  </p>

                  <p className="mt-1 text-xs text-white/40">
                    {(
                      formData.video_file
                        .size /
                      (1024 * 1024)
                    ).toFixed(2)}{" "}
                    MB
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-white/50">
                    MP4
                  </span>

                  <button
                    type="button"
                    onClick={
                      clearVideoFile
                    }
                    disabled={loading}
                    className="cursor-pointer rounded-lg border border-red-400/30 px-3 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3">
                <p className="text-sm text-white/40">
                  No MP4 video selected
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="flex flex-wrap gap-4 pt-2">
          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-xl bg-gold px-8 py-3 font-semibold text-black transition hover:scale-105 hover:bg-[#f1bc47] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Uploading..."
              : isEditing
                ? "Update Video"
                : "Upload Video"}
          </button>

          {/* Clear */}

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="cursor-pointer rounded-xl border border-white/20 px-8 py-3 font-semibold text-white transition hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

// =====================================================
// PROP TYPES
// =====================================================

AdminVideoForm.propTypes = {
  formData: PropTypes.object.isRequired,

  handleChange:
    PropTypes.func.isRequired,

  handleSubmit:
    PropTypes.func.isRequired,

  editingId:
    PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

  resetForm:
    PropTypes.func.isRequired,

  loading:
    PropTypes.bool,
};