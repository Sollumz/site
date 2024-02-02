---js
{
    tags: ["releases"],
    pagination: {
        data: "releases",
        size: 1,
        alias: "release",
        addAllPagesToCollections: true,
    },
    permalink: "releases/{{ release.version | slugify }}/",
    layout: "release.html",
    eleventyComputed: {
        // https://github.com/11ty/eleventy/issues/2199#issuecomment-1027362151
        // HACK: inject the date and title from `releases` data into the internal `page` object.
        date(data) {
            data.page.date = new Date(data.release.date);
            return data.page.date;
        },
        title(data) {
            data.page.title = data.release.version
            return data.page.title
        },
    },
}
---

{{ release.changelog | processChangelog }}
