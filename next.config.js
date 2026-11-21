/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ["192.168.1.4"],
//  async redirects() {
//   return [
//     {
//       source: "/:path*",
//       has: [
//         {
//           type: "host",
//           value: "hawksberginternational.com",
//         },
//       ],
//       destination: "https://www.hawksberginternational.com/:path*",
//       permanent: true,
//     },

//     {
//       source: "/services",
//       destination: "/ISO-consulting-services",
//       permanent: false,
//     },
//   ];
// },


async redirects() {
  return [
    {
      source: "/services/tisax",
      destination: "/services/tisax-certification-Chennai",
      permanent: true,
    },
    {
      source: "/services",
      destination: "/ISO-consulting-services",
      permanent: false,
    },
  ];
},

  async rewrites() {
    return [
      {
        source: "/ISO-consulting-services",
        destination: "/services",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/shieldlogo.jpg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/secondarylogo.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;