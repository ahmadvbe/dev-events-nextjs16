import type { NextConfig } from "next";
//13:30 allowing u to cinfig ur next js features
const nextConfig: NextConfig = {

    typescript: {

              //## 3:54:00 Deployment -- we dnt wont TS errors warning  to break the build
        ignoreBuildErrors: true,
    },

      // 3:29:00 uswe cache will now let you cahce results during built time or run time for a ceratin cutomzied time imrpoving speed, reducing load  
      //     3:29:20 manually enable the useCache within the next js config
    cacheComponents: true,

    
    images: { //2:29:05 Cloudinary upload
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ]
    },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;