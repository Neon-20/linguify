// next.config.mjs

const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: '',
            pathname: '/**',
        },
      ],
    },
  };
  
  export default nextConfig;