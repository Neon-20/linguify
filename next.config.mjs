// next.config.mjs

const nextConfig = {
  async headers(){
    return[
      {
        source:"/api/(.*)",
        headers:[
          {
            key:"Access-Control-Allow-Origin",
            value:"*"
          },
          {
            key:"Access-Control-Allow-Methods",
            value:"GET,POST,PUT,OPTIONS,DELETE",
          },
          {
            key:"Access-Control-Allow-Headers",
            value:"Content-type,Authorization",
          },
          {
            key:"Content-Range",
            value:"bytes : 0-9/*",
          },
        ]
      }
    ];
  },
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