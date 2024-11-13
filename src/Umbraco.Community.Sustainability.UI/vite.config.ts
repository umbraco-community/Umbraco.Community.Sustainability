import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "src/index.ts", // your web component source file
            formats: ["es"],
        },
        outDir: "../Umbraco.Community.Sustainability/wwwroot/App_Plugins/Umbraco.Community.Sustainability", 
        emptyOutDir: true,
        sourcemap: true,
        rollupOptions: {
            external: [/^@umbraco/],
            onwarn: () => { },
        },
    },
});
