module.exports = function() {
    return {
        isProduction: process.env.ELEVENTY_MODE === "PROD",
        isDevelopment: process.env.ELEVETNY_MODE === "DEV",
        siteShortUrl: "sollumz.github.io",
        siteUrl: "https://sollumz.github.io",
        githubUrl: "https://github.com/Skylumz/Sollumz",
        wikiUrl: "https://sollumz.gitbook.io/sollumz-wiki",
        discordUrl: "https://discord.gg/bZuWBWaQBg",
        enableKofiWidget: false,
    };
}
