//import reactNativeTesting from "vitest-react-native";
import { defineConfig} from "vite";
import reactJsxPlugin from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        reactJsxPlugin(),
    ],
    server: {
        https: {
            key: "./localhost-key.pem",
            cert: "./localhost.pem"
        },
        port: 8080,
    },
    build: {
        sourcemap: true,
        minify: false
    }
});
