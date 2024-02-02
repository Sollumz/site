
// This must be the first script loaded by a page to prevent a flash of unstyled content (especifically a white screen when using dark theme).
const THEME_SWITCHER_ID = "theme-switcher";

/**
 * Called early in the page load process to set up the theme.
 */
function themeEarlyInit(): void {
    themeRefresh();

    window.addEventListener("storage", () => {
        themeRefresh();
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        themeRefresh();
    });

    window.addEventListener("DOMContentLoaded", () => {
        const themeSwitcher = window.document.getElementById(THEME_SWITCHER_ID);
        themeSwitcher?.addEventListener("click", function() {
            themeToggle();
        });
    });
}

/**
 * Refreshes the theme based on the current theme setting, either from local storage or default user preference.
 */
function themeRefresh(): void {
    let theme = localStorage.getItem("theme");
    if (theme === null) {
        const systemDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
        theme = systemDarkTheme.matches ? "dark" : "light";
    }

    if (theme === "dark") {
        document.documentElement.classList.add("dark-mode");
        const frames = window.frames;
        for (let i = 0; i < frames.length; i++) {
            try {
                frames[i].document.documentElement.classList.add("dark-mode");
            } catch {} // in case of a cross-origin iframe
        }
    } else {
        document.documentElement.classList.remove("dark-mode");
        const frames = window.frames;
        for (let i = 0; i < frames.length; i++) {
            try {
                frames[i].document.documentElement.classList.remove("dark-mode");
            } catch {} // in case of a cross-origin iframe
        }
    }
}
window.themeRefresh = themeRefresh;

/**
 * Toggles the theme and stores it in local storage.
 */
function themeToggle(): void {
    const frames = window.frames;
    for (let i = 0; i < frames.length; i++) {
        try {
            frames[i].document.documentElement.classList.toggle("dark-mode");
        } catch {} // in case of a cross-origin iframe
    }
    const usingDarkTheme = document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem("theme", usingDarkTheme ? "dark" : "light");
}

themeEarlyInit();
