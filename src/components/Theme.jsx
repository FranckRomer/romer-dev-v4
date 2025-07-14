
import { useEffect } from "astro:client";

useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
        document.documentElement.classList.add(theme);
    }
});

