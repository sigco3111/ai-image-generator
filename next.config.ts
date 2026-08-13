import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages 서빙용 basePath (Pages는 repo 경로 아래에 호스팅됨)
  basePath: '/ai-image-generator',
  output: 'export',
};

export default nextConfig;
