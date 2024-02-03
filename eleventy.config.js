const luxon = require('luxon');
const htmlmin = require("html-minifier");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const fs = require("fs/promises");
const path = require("path");

module.exports = function(eleventyConfig) {
    const isProduction = process.env.ELEVENTY_MODE === 'PROD';

    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    eleventyConfig.addPassthroughCopy('site/favicon.svg');
    eleventyConfig.addPassthroughCopy('site/css');
    eleventyConfig.addPassthroughCopy('site/fonts');
    eleventyConfig.addPassthroughCopy('site/img');

    eleventyConfig.addFilter("readableDate", (dateObj) => {
        return luxon.DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLLL yyyy");
    });

    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return luxon.DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    eleventyConfig.addFilter("head", (array, n) => {
        if(!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if( n < 0 ) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    eleventyConfig.addFilter("processChangelog", function(str) {
        const ghUrl = this.ctx.env.githubUrl;
        return str
          // link GitHub commits
          .replace(/(([0-9a-f]{7})[0-9a-f]{33})\b/g, `[\`$2\`](${ghUrl}/commit/$1)`)
          // link GitHub issues
          .replace(/#([0-9]+)\b/g, `[#$1](${ghUrl}/issues/$1)`)
          // link GitHub usernames (regex from https://stackoverflow.com/a/30281147)
          .replace(/\B@([a-z0-9](?:-(?=[a-z0-9])|[a-z0-9]){0,38}(?<=[a-z0-9]))/gi, "[@$1](https://github.com/$1)");
    });

    // remove tags for internal use from the array and sort alphabetically
    if (isProduction) {
        eleventyConfig.addTransform("htmlmin", function (content) {
            if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
                return htmlmin.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true
                });
            }

            return content;
        });
    }

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
        ],
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        dir: {
            input: "site",
            output: "_site"
        },
    }
};

