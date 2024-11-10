import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"res.cloudinary.com"
      },
      //Agar kisi aur website se Fetch kr rhe h hot add kr skte h
    ]
  }
  ,
  experimental:{
    serverActions:{
      bodySizeLimit:'20mb'
    }
  }
 
  
};

export default nextConfig;
