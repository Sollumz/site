const eleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  // https://developer.github.com/v3/repos/#get
  let json = await eleventyFetch("https://api.github.com/repos/Skylumz/Sollumz/releases", {
    duration: "1d",
    type: "json"
  });

  return json
    .filter(r => !r.tag_name.includes("maintenance-3.6"))
    .map(r => ({
      version: r.name.replace(/^Sollumz /, ""),
      tag: r.tag_name,
      date: r.published_at,
      changelog: r.body,
      downloadUrl: r.assets.find(a => a.name === "Sollumz.zip" || a.name === "Sollumz-legacy.zip")?.browser_download_url,
    }));
};
