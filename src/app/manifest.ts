
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Campus 2 Corporate",
        short_name: "C2C",
        description: "My Progressive Web App",
        start_url: "/",
        display: "standalone",
        // background_color: "#ffffff",
        // theme_color: "#2563eb",
        icons: [
            {
                src: "/images/new-favicon.png",



                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/images/new-favicon.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}