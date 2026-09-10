"use client";

// =====================================================
// API BASE URL
// =====================================================
// NEXT_PUBLIC_API_URL must be set (.env.local for dev, Vercel env var for prod).
// No localhost fallback so production never silently calls localhost.

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    "Missing required environment variable NEXT_PUBLIC_API_URL. " +
      "Set it in .env.local for local development, or in your hosting " +
      "platform's environment variables (e.g. Vercel) for production."
  );
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;


// =====================================================
// TRAINING API URL
// =====================================================

const TRAINING_API_URL =
  `${API_URL}/training`;


// =====================================================
// JSON HEADERS
// =====================================================

const JSON_HEADERS = {
  "Content-Type": "application/json",
};


// =====================================================
// READ ERROR RESPONSE SAFELY
// =====================================================

async function getErrorMessage(
  response,
  fallbackMessage
) {
  try {
    const contentType =
      response.headers.get("content-type") || "";

    // -----------------------------------------------
    // JSON error
    // -----------------------------------------------

    if (
      contentType.includes(
        "application/json"
      )
    ) {
      const data = await response.json();

      if (
        typeof data?.detail === "string"
      ) {
        return data.detail;
      }

      if (
        Array.isArray(data?.detail)
      ) {
        return data.detail
          .map(
            (item) =>
              item?.msg ||
              JSON.stringify(item)
          )
          .join(", ");
      }

      if (
        typeof data?.message === "string"
      ) {
        return data.message;
      }

      return fallbackMessage;
    }

    // -----------------------------------------------
    // Text error
    // -----------------------------------------------

    const text =
      await response.text();

    return (
      text?.trim() ||
      fallbackMessage
    );
  } catch {
    return fallbackMessage;
  }
}


// =====================================================
// NETWORK ERROR HANDLER
// =====================================================

async function fetchWithNetworkError(
  url,
  options = {}
) {
  try {
    console.log(
      "========================================"
    );

    console.log(
      "TRAINING API REQUEST"
    );

    console.log(
      "URL:",
      url
    );

    console.log(
      "METHOD:",
      options.method || "GET"
    );

    console.log(
      "========================================"
    );

    const response =
      await fetch(
        url,
        {
          ...options,
          cache: "no-store",
        }
      );

    console.log(
      "RESPONSE STATUS:",
      response.status
    );

    return response;

  } catch (error) {
    console.error(
      "========================================"
    );

    console.error(
      "TRAINING API NETWORK ERROR"
    );

    console.error(
      "URL:",
      url
    );

    console.error(
      "ERROR:",
      error
    );

    console.error(
      "========================================"
    );

    throw new Error(
      `Unable to connect to the training server.

Backend expected at:
${API_URL}

Make sure FastAPI is running with:
uvicorn app.main:app --reload`
    );
  }
}


// =====================================================
// YOUTUBE EMBED URL VALIDATION
// =====================================================

function isYoutubeEmbedUrl(
  value
) {
  if (!value) {
    return false;
  }

  const url =
    String(value).trim();

  if (!url) {
    return false;
  }

  try {
    const parsed =
      new URL(url);

    const hostname =
      (
        parsed.hostname || ""
      ).toLowerCase();

    const path =
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

    // Backend accepts only /embed/...
    if (
      !path.startsWith(
        "/embed/"
      )
    ) {
      return false;
    }

    const videoId =
      path
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
// MP4 VALIDATION
// =====================================================

function isMp4File(
  file
) {
  if (!file) {
    return false;
  }

  const fileName =
    (
      file.name || ""
    ).toLowerCase();

  const fileType =
    (
      file.type || ""
    ).toLowerCase();

  return (
    fileType === "video/mp4" ||
    fileName.endsWith(".mp4")
  );
}


// =====================================================
// BUILD FORM DATA
// =====================================================

function buildVideoFormData(
  data
) {
  // ---------------------------------------------------
  // If FormData was already supplied
  // ---------------------------------------------------

  if (
    typeof FormData !== "undefined" &&
    data instanceof FormData
  ) {
    return data;
  }

  const formData =
    new FormData();


  // ===================================================
  // BASIC DETAILS
  // ===================================================

  const title =
    data?.title !== undefined &&
    data?.title !== null
      ? String(data.title).trim()
      : "";

  const description =
    data?.description !== undefined &&
    data?.description !== null
      ? String(data.description)
      : "";

  const duration =
    data?.duration !== undefined &&
    data?.duration !== null
      ? String(data.duration).trim()
      : "";

  const instructor =
    data?.instructor !== undefined &&
    data?.instructor !== null
      ? String(data.instructor).trim()
      : "";


  formData.append(
    "title",
    title
  );

  formData.append(
    "description",
    description
  );

  formData.append(
    "duration",
    duration
  );

  formData.append(
    "instructor",
    instructor
  );


  // ===================================================
  // TRAINING PORTAL
  // ===================================================

  const trainingName =
    data?.training_name !== undefined &&
    data?.training_name !== null
      ? String(
          data.training_name
        ).trim().toLowerCase()
      : "";

  formData.append(
    "training_name",
    trainingName
  );


  // ===================================================
  // CREATED BY
  // ===================================================

  if (
    data?.created_by !== undefined &&
    data?.created_by !== null
  ) {
    const createdBy =
      String(
        data.created_by
      ).trim();

    if (createdBy) {
      formData.append(
        "created_by",
        createdBy
      );
    }
  }


  // ===================================================
  // VIDEO SOURCES
  // ===================================================

  const rawYoutubeUrl =
    data?.youtube_url ??
    data?.video ??
    "";

  const youtubeUrl =
    String(
      rawYoutubeUrl || ""
    ).trim();

  const videoFile =
    data?.video_file ||
    null;


  // ===================================================
  // SOURCE VALIDATION
  // ===================================================

  const hasYoutube =
    Boolean(youtubeUrl);

  const hasMp4 =
    Boolean(videoFile);


  // ---------------------------------------------------
  // Cannot use both
  // ---------------------------------------------------

  if (
    hasYoutube &&
    hasMp4
  ) {
    throw new Error(
      "Please use either a YouTube Embed URL or an MP4 file, not both."
    );
  }


  // ---------------------------------------------------
  // Create request requires one source.
  //
  // Update request can have neither source because
  // backend keeps the existing source.
  // ---------------------------------------------------

  // ===================================================
  // MP4 SOURCE
  // ===================================================

  if (hasMp4) {

    if (
      !isMp4File(
        videoFile
      )
    ) {
      throw new Error(
        "Only MP4 video files are allowed."
      );
    }

    // 50 MB frontend protection
    const maxSize =
      50 * 1024 * 1024;

    if (
      videoFile.size >
      maxSize
    ) {
      throw new Error(
        "MP4 file size must not exceed 50 MB."
      );
    }

    formData.append(
      "video_file",
      videoFile,
      videoFile.name
    );
  }


  // ===================================================
  // YOUTUBE SOURCE
  // ===================================================

  else if (
    hasYoutube
  ) {

    if (
      !isYoutubeEmbedUrl(
        youtubeUrl
      )
    ) {
      throw new Error(
        "Please provide a valid YouTube Embed URL, for example https://www.youtube.com/embed/VIDEO_ID"
      );
    }

    formData.append(
      "youtube_url",
      youtubeUrl
    );
  }


  return formData;
}


// =====================================================
// DEBUG FORMDATA
// =====================================================

function logFormData(
  formData
) {
  console.log(
    "========== TRAINING VIDEO FORM DATA =========="
  );

  for (
    const [key, value]
    of formData.entries()
  ) {

    if (
      typeof File !== "undefined" &&
      value instanceof File
    ) {
      console.log(
        `${key}:`,
        value.name,
        "| type:",
        value.type,
        "| size:",
        value.size
      );
    } else {
      console.log(
        `${key}:`,
        value
      );
    }
  }

  console.log(
    "==============================================="
  );
}


// =====================================================
// TRAINING API
// =====================================================

const trainingApi = {

  // ===================================================
  // LOGIN
  // ===================================================

  async login(
    data
  ) {
    const url =
      `${TRAINING_API_URL}/login`;

    console.log(
      "TRAINING LOGIN:",
      url
    );

    const response =
      await fetchWithNetworkError(
        url,
        {
          method: "POST",
          headers: JSON_HEADERS,
          body: JSON.stringify(
            data
          ),
        }
      );

    if (
      !response.ok
    ) {
      const message =
        await getErrorMessage(
          response,
          "Login failed"
        );

      throw new Error(
        message
      );
    }

    return await response.json();
  },


  // ===================================================
  // GET ALL VIDEOS
  // ===================================================

  async getVideos() {
    const url =
      `${TRAINING_API_URL}/videos`;

    const response =
      await fetchWithNetworkError(
        url,
        {
          method: "GET",
          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (
      !response.ok
    ) {
      const message =
        await getErrorMessage(
          response,
          "Unable to load training videos"
        );

      throw new Error(
        message
      );
    }

    const result =
      await response.json();

    console.log(
      "ALL TRAINING VIDEOS:",
      result
    );

    return Array.isArray(
      result
    )
      ? result
      : [];
  },


  // ===================================================
  // GET SINGLE VIDEO
  // ===================================================

  async getVideo(
    id
  ) {
    if (
      !id
    ) {
      throw new Error(
        "Video ID is required."
      );
    }

    const url =
      `${TRAINING_API_URL}/videos/${id}`;

    const response =
      await fetchWithNetworkError(
        url,
        {
          method: "GET",
          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (
      !response.ok
    ) {
      const message =
        await getErrorMessage(
          response,
          "Video not found"
        );

      throw new Error(
        message
      );
    }

    return await response.json();
  },


  // ===================================================
  // GET VIDEOS BY TRAINING PORTAL
  // ===================================================

  async getVideosByTraining(
    trainingName
  ) {
    if (
      !trainingName
    ) {
      throw new Error(
        "Training name is required."
      );
    }

    const normalizedName =
      String(
        trainingName
      )
        .trim()
        .toLowerCase();

    const url =
      `${TRAINING_API_URL}/videos/training/` +
      encodeURIComponent(
        normalizedName
      );

    console.log(
      "GET VIDEOS BY TRAINING:",
      url
    );

    const response =
      await fetchWithNetworkError(
        url,
        {
          method: "GET",
          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (
      !response.ok
    ) {
      const message =
        await getErrorMessage(
          response,
          "Unable to load training videos"
        );

      throw new Error(
        message
      );
    }

    const result =
      await response.json();

    console.log(
      "TRAINING VIDEOS RESULT:",
      result
    );

    return Array.isArray(
      result
    )
      ? result
      : [];
  },


  // ===================================================
  // CREATE VIDEO
  // ===================================================

  async createVideo(
    data
  ) {
    const url =
      `${TRAINING_API_URL}/videos`;

    console.log(
      "========================================"
    );

    console.log(
      "CREATE TRAINING VIDEO"
    );

    console.log(
      "API URL:",
      url
    );

    console.log(
      "========================================"
    );


    // -------------------------------------------------
    // Build multipart/form-data
    // -------------------------------------------------

    const formData =
      buildVideoFormData(
        data
      );

    logFormData(
      formData
    );


    // -------------------------------------------------
    // Required fields
    // -------------------------------------------------

    const title =
      String(
        formData.get(
          "title"
        ) || ""
      ).trim();

    const description =
      String(
        formData.get(
          "description"
        ) || ""
      );

    const duration =
      String(
        formData.get(
          "duration"
        ) || ""
      ).trim();

    const instructor =
      String(
        formData.get(
          "instructor"
        ) || ""
      ).trim();

    const trainingName =
      String(
        formData.get(
          "training_name"
        ) || ""
      ).trim();


    if (!title) {
      throw new Error(
        "Video title is required."
      );
    }

    if (!description) {
      throw new Error(
        "Video description is required."
      );
    }

    if (!duration) {
      throw new Error(
        "Video duration is required."
      );
    }

    if (!instructor) {
      throw new Error(
        "Instructor is required."
      );
    }

    if (!trainingName) {
      throw new Error(
        "Please select a training portal."
      );
    }


    // -------------------------------------------------
    // Source validation
    // -------------------------------------------------

    const youtubeUrl =
      formData.get(
        "youtube_url"
      );

    const videoFile =
      formData.get(
        "video_file"
      );

    const hasYoutube =
      typeof youtubeUrl === "string" &&
      youtubeUrl.trim() !== "";

    const hasMp4 =
      videoFile instanceof File;


    if (
      hasYoutube &&
      hasMp4
    ) {
      throw new Error(
        "Please use either a YouTube Embed URL or an MP4 file, not both."
      );
    }


    if (
      !hasYoutube &&
      !hasMp4
    ) {
      throw new Error(
        "Please select an MP4 video or enter a YouTube Embed URL."
      );
    }


    // -------------------------------------------------
    // IMPORTANT
    //
    // DO NOT manually set Content-Type.
    //
    // Browser automatically creates:
    //
    // multipart/form-data;
    // boundary=...
    // -------------------------------------------------

    const response =
      await fetchWithNetworkError(
        url,
        {
          method: "POST",
          body: formData,
        }
      );


    if (
      !response.ok
    ) {
      const message =
        await getErrorMessage(
          response,
          "Unable to upload training video"
        );

      console.error(
        "UPLOAD SERVER ERROR:",
        message
      );

      throw new Error(
        message
      );
    }


    const result =
      await response.json();

    console.log(
      "UPLOAD SUCCESS:",
      result
    );

    return result;
  },


  // ===================================================
  // UPDATE VIDEO
  // ===================================================

  async updateVideo(
    id,
    data
  ) {
    if (
      !id
    ) {
      throw new Error(
        "Video ID is required."
      );
    }

    const url =
      `${TRAINING_API_URL}/videos/${id}`;

    console.log(
      "========================================"
    );

    console.log(
      "UPDATE TRAINING VIDEO"
    );

    console.log(
      "API URL:",
      url
    );

    console.log(
      "VIDEO ID:",
      id
    );

    console.log(
      "========================================"
    );


    // -------------------------------------------------
    // Build FormData
    // -------------------------------------------------

    const formData =
      buildVideoFormData(
        data
      );

    logFormData(
      formData
    );


    // -------------------------------------------------
    // Required training name
    // -------------------------------------------------

    const trainingName =
      String(
        formData.get(
          "training_name"
        ) || ""
      ).trim();

    if (
      !trainingName
    ) {
      throw new Error(
        "Please select a training portal."
      );
    }


    // -------------------------------------------------
    // Source check
    // -------------------------------------------------

    const youtubeUrl =
      formData.get(
        "youtube_url"
      );

    const videoFile =
      formData.get(
        "video_file"
      );

    const hasYoutube =
      typeof youtubeUrl === "string" &&
      youtubeUrl.trim() !== "";

    const hasMp4 =
      videoFile instanceof File;


    if (
      hasYoutube &&
      hasMp4
    ) {
      throw new Error(
        "Please use either a YouTube Embed URL or an MP4 file, not both."
      );
    }


    // -------------------------------------------------
    // IMPORTANT:
    //
    // During EDIT, both sources can be absent.
    //
    // Backend will then keep existing source.
    //
    // This allows editing:
    // - title
    // - description
    // - duration
    // - instructor
    // - training portal
    //
    // without re-uploading the video.
    // -------------------------------------------------

    const response =
      await fetchWithNetworkError(
        url,
        {
          method: "PUT",
          body: formData,
        }
      );


    if (
      !response.ok
    ) {
      const message =
        await getErrorMessage(
          response,
          "Unable to update training video"
        );

      console.error(
        "UPDATE SERVER ERROR:",
        message
      );

      throw new Error(
        message
      );
    }


    const result =
      await response.json();

    console.log(
      "UPDATE SUCCESS:",
      result
    );

    return result;
  },


  // ===================================================
  // DELETE VIDEO
  // ===================================================

  async deleteVideo(
    id
  ) {
    if (
      !id
    ) {
      throw new Error(
        "Video ID is required."
      );
    }

    const url =
      `${TRAINING_API_URL}/videos/${id}`;

    console.log(
      "DELETE TRAINING VIDEO:",
      url
    );


    const response =
      await fetchWithNetworkError(
        url,
        {
          method: "DELETE",
          headers: {
            Accept:
              "application/json",
          },
        }
      );


    if (
      !response.ok
    ) {
      const message =
        await getErrorMessage(
          response,
          "Unable to delete training video"
        );

      console.error(
        "DELETE SERVER ERROR:",
        message
      );

      throw new Error(
        message
      );
    }


    const result =
      await response.json();

    console.log(
      "DELETE SUCCESS:",
      result
    );

    return result;
  },
};


// =====================================================
// EXPORT
// =====================================================

export default trainingApi;