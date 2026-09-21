import { NextResponse } from "next/server";

const R2_BASE_URL =
  "https://pub-6c4cdfacf7684dbbd42c03d4f0743c6.r2.dev";

// Only these 4 videos are allowed through this proxy.
const ALLOWED_FILES = new Set([
  "1. Risk Identification.mp4",
  "3. Risk Evaluation.mp4",
  "2. CIA - Risk Analysis.mp4",
  "SOA - Training.mp4",
]);

function getFileName(params) {
  const pathParts = Array.isArray(params?.path)
    ? params.path
    : [];

  return decodeURIComponent(pathParts.join("/"));
}

async function proxyVideo(request, params) {
  try {
    const fileName = getFileName(params);

    console.log("=================================");
    console.log("R2 PROXY REQUEST:", fileName);
    console.log("=================================");

    // Security: allow only the 4 migrated videos.
    if (!ALLOWED_FILES.has(fileName)) {
      console.warn(
        "R2 PROXY BLOCKED - FILE NOT ALLOWED:",
        fileName
      );

      return NextResponse.json(
        {
          detail: "Video not found.",
        },
        {
          status: 404,
        }
      );
    }

    const r2Url = `${R2_BASE_URL}/${encodeURIComponent(
      fileName
    )}`;

    console.log("R2 UPSTREAM URL:", r2Url);

    // Preserve browser Range request.
    const range = request.headers.get("range");

    const requestHeaders = new Headers();

    if (range) {
      requestHeaders.set("Range", range);
      console.log("RANGE REQUEST:", range);
    }

    const r2Response = await fetch(r2Url, {
      method: "GET",
      headers: requestHeaders,
      cache: "no-store",
    });

    console.log(
      "R2 RESPONSE STATUS:",
      r2Response.status
    );

    console.log(
      "R2 RESPONSE STATUS TEXT:",
      r2Response.statusText
    );

    // -------------------------------------------------
    // IMPORTANT:
    // If R2 returns an error, read the actual response
    // body and headers so we can identify the reason.
    // -------------------------------------------------
    if (
      !r2Response.ok &&
      r2Response.status !== 206
    ) {
      const errorBody = await r2Response.text();

      console.error("=================================");
      console.error("R2 ERROR");
      console.error("STATUS:", r2Response.status);
      console.error(
        "STATUS TEXT:",
        r2Response.statusText
      );
      console.error(
        "BODY:",
        errorBody
      );
      console.error(
        "HEADERS:",
        Object.fromEntries(
          r2Response.headers.entries()
        )
      );
      console.error("=================================");

      return NextResponse.json(
        {
          detail: `R2 request failed with status ${r2Response.status}`,
          status: r2Response.status,
          statusText: r2Response.statusText,
          upstreamBody: errorBody,
        },
        {
          status: r2Response.status,
        }
      );
    }

    // -------------------------------------------------
    // Successful R2 response
    // -------------------------------------------------

    const responseHeaders = new Headers();

    // Correct MIME type for MP4.
    responseHeaders.set(
      "Content-Type",
      "video/mp4"
    );

    // Required for video seeking / streaming.
    responseHeaders.set(
      "Accept-Ranges",
      "bytes"
    );

    // Preserve Content-Length.
    const contentLength =
      r2Response.headers.get(
        "content-length"
      );

    if (contentLength) {
      responseHeaders.set(
        "Content-Length",
        contentLength
      );
    }

    // Preserve Content-Range for partial requests.
    const contentRange =
      r2Response.headers.get(
        "content-range"
      );

    if (contentRange) {
      responseHeaders.set(
        "Content-Range",
        contentRange
      );
    }

    // Preserve ETag.
    const etag =
      r2Response.headers.get("etag");

    if (etag) {
      responseHeaders.set(
        "ETag",
        etag
      );
    }

    // Browser caching.
    responseHeaders.set(
      "Cache-Control",
      "public, max-age=3600"
    );

    console.log(
      "R2 VIDEO PROXY SUCCESS:",
      fileName
    );

    console.log(
      "CONTENT-TYPE:",
      responseHeaders.get("Content-Type")
    );

    console.log(
      "CONTENT-LENGTH:",
      responseHeaders.get("Content-Length")
    );

    console.log(
      "CONTENT-RANGE:",
      responseHeaders.get("Content-Range")
    );

    console.log(
      "================================="
    );

    return new NextResponse(
      r2Response.body,
      {
        status: r2Response.status,
        headers: responseHeaders,
      }
    );
  } catch (error) {
    console.error(
      "================================="
    );

    console.error(
      "R2 VIDEO PROXY ERROR:",
      error
    );

    console.error(
      "ERROR MESSAGE:",
      error?.message
    );

    console.error(
      "================================="
    );

    return NextResponse.json(
      {
        detail:
          "Unable to load training video.",
        error:
          error?.message ||
          "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}

// -------------------------------------------------
// GET
// Actual video streaming
// -------------------------------------------------

export async function GET(
  request,
  { params }
) {
  const resolvedParams = await params;

  return proxyVideo(
    request,
    resolvedParams
  );
}

// -------------------------------------------------
// HEAD
// Browser metadata check
// -------------------------------------------------

export async function HEAD(
  request,
  { params }
) {
  try {
    const resolvedParams = await params;

    const fileName =
      getFileName(resolvedParams);

    console.log(
      "R2 HEAD REQUEST:",
      fileName
    );

    if (!ALLOWED_FILES.has(fileName)) {
      console.warn(
        "R2 HEAD BLOCKED - FILE NOT ALLOWED:",
        fileName
      );

      return new NextResponse(null, {
        status: 404,
      });
    }

    const r2Url =
      `${R2_BASE_URL}/${encodeURIComponent(
        fileName
      )}`;

    const range =
      request.headers.get("range");

    const headers = new Headers();

    if (range) {
      headers.set(
        "Range",
        range
      );
    }

    const r2Response = await fetch(
      r2Url,
      {
        method: "GET",
        headers,
        cache: "no-store",
      }
    );

    console.log(
      "R2 HEAD UPSTREAM STATUS:",
      r2Response.status
    );

    // If HEAD-style metadata request gets an
    // upstream error, expose the reason in terminal.
    if (
      !r2Response.ok &&
      r2Response.status !== 206
    ) {
      const errorBody =
        await r2Response.text();

      console.error(
        "================================="
      );

      console.error(
        "R2 HEAD ERROR"
      );

      console.error(
        "STATUS:",
        r2Response.status
      );

      console.error(
        "STATUS TEXT:",
        r2Response.statusText
      );

      console.error(
        "BODY:",
        errorBody
      );

      console.error(
        "HEADERS:",
        Object.fromEntries(
          r2Response.headers.entries()
        )
      );

      console.error(
        "================================="
      );

      return new NextResponse(null, {
        status: r2Response.status,
      });
    }

    const responseHeaders =
      new Headers();

    responseHeaders.set(
      "Content-Type",
      "video/mp4"
    );

    responseHeaders.set(
      "Accept-Ranges",
      "bytes"
    );

    const contentLength =
      r2Response.headers.get(
        "content-length"
      );

    if (contentLength) {
      responseHeaders.set(
        "Content-Length",
        contentLength
      );
    }

    const contentRange =
      r2Response.headers.get(
        "content-range"
      );

    if (contentRange) {
      responseHeaders.set(
        "Content-Range",
        contentRange
      );
    }

    const etag =
      r2Response.headers.get("etag");

    if (etag) {
      responseHeaders.set(
        "ETag",
        etag
      );
    }

    responseHeaders.set(
      "Cache-Control",
      "public, max-age=3600"
    );

    return new NextResponse(null, {
      status: r2Response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(
      "R2 VIDEO HEAD ERROR:",
      error
    );

    console.error(
      "ERROR MESSAGE:",
      error?.message
    );

    return new NextResponse(null, {
      status: 500,
    });
  }
}