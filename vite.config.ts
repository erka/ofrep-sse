import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      // "@openfeature/ofrep-core":
      //   "/home/erka/projects/openfeature/js-sdk-contrib/dist/libs/shared/ofrep-core",
      //       "@openfeature/ofrep-web-provider":
      //         "/home/erka/projects/openfeature/js-sdk-contrib/dist/libs/providers/ofrep-web",
    },
  },
  server: {
    proxy: {
      "/ofrep": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/stream": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
});
