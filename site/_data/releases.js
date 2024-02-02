const eleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
  // https://developer.github.com/v3/repos/#get
  let json = await eleventyFetch("https://api.github.com/repos/Skylumz/Sollumz/releases", {
    duration: "1d",
    type: "json"
  });

  return json.map(r => ({
    version: r.name.replace(/^Sollumz /, ""),
    tag: r.tag_name,
    date: r.published_at,
    changelog: r.body,
    download_url: r.assets.find(a => a.name === "Sollumz.zip")?.browser_download_url,
  }));
};
