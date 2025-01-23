<<<<<<< HEAD
// `EXCALIDRAW_ASSET_PATH` as a SSOT
const OSS_FONTS_CDN =
  "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/fonts/oss/";
=======
// define `EXCALIDRAW_ASSET_PATH` as a SSOT
const OSS_FONTS_CDN = "https://excalidraw.nyc3.cdn.digitaloceanspaces.com/oss/";
const OSS_FONTS_FALLBACK = "/";
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db

/**
 * Custom vite plugin for auto-prefixing `EXCALIDRAW_ASSET_PATH` woff2 fonts in `excalidraw-app`.
 *
 * @returns {import("vite").PluginOption}
 */
module.exports.woff2BrowserPlugin = () => {
  let isDev;

  return {
    name: "woff2BrowserPlugin",
    enforce: "pre",
    config(_, { command }) {
      isDev = command === "serve";
    },
    transform(code, id) {
      // using copy / replace as fonts defined in the `.css` don't have to be manually copied over (vite/rollup does this automatically),
      // but at the same time can't be easily prefixed with the `EXCALIDRAW_ASSET_PATH` only for the `excalidraw-app`
<<<<<<< HEAD
      if (!isDev && id.endsWith("/excalidraw/fonts/assets/fonts.css")) {
=======
      if (!isDev && id.endsWith("/excalidraw/fonts/fonts.css")) {
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
        return `/* WARN: The following content is generated during excalidraw-app build */

      @font-face {
        font-family: "Assistant";
<<<<<<< HEAD
        src: url(${OSS_FONTS_CDN}Assistant-Regular-DVxZuzxb.woff2)
=======
        src: url(${OSS_FONTS_CDN}fonts/Assistant/Assistant-Regular.woff2)
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            format("woff2"),
          url(./Assistant-Regular.woff2) format("woff2");
        font-weight: 400;
        style: normal;
        display: swap;
      }

      @font-face {
        font-family: "Assistant";
<<<<<<< HEAD
        src: url(${OSS_FONTS_CDN}Assistant-Medium-DrcxCXg3.woff2)
=======
        src: url(${OSS_FONTS_CDN}fonts/Assistant/Assistant-Medium.woff2)
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            format("woff2"),
          url(./Assistant-Medium.woff2) format("woff2");
        font-weight: 500;
        style: normal;
        display: swap;
      }

      @font-face {
        font-family: "Assistant";
<<<<<<< HEAD
        src: url(${OSS_FONTS_CDN}Assistant-SemiBold-SCI4bEL9.woff2)
=======
        src: url(${OSS_FONTS_CDN}fonts/Assistant/Assistant-SemiBold.woff2)
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            format("woff2"),
          url(./Assistant-SemiBold.woff2) format("woff2");
        font-weight: 600;
        style: normal;
        display: swap;
      }

      @font-face {
        font-family: "Assistant";
<<<<<<< HEAD
        src: url(${OSS_FONTS_CDN}Assistant-Bold-gm-uSS1B.woff2)
=======
        src: url(${OSS_FONTS_CDN}fonts/Assistant/Assistant-Bold.woff2)
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            format("woff2"),
          url(./Assistant-Bold.woff2) format("woff2");
        font-weight: 700;
        style: normal;
        display: swap;
      }`;
      }

      if (!isDev && id.endsWith("excalidraw-app/index.html")) {
        return code.replace(
          "<!-- PLACEHOLDER:EXCALIDRAW_APP_FONTS -->",
          `<script>
        // point into our CDN in prod, fallback to root (excalidraw.com) domain in case of issues
        window.EXCALIDRAW_ASSET_PATH = [
          "${OSS_FONTS_CDN}",
<<<<<<< HEAD
          "/",
        ];
      </script>

      <!-- Preload all default fonts and Virgil for backwards compatibility to avoid swap on init -->
      <link
        rel="preload"
        href="${OSS_FONTS_CDN}Excalifont-Regular-C9eKQy_N.woff2"
=======
          "${OSS_FONTS_FALLBACK}",
        ];
      </script>

      <!-- Preload all default fonts to avoid swap on init -->
      <link
        rel="preload"
        href="${OSS_FONTS_CDN}fonts/Excalifont/Excalifont-Regular-a88b72a24fb54c9f94e3b5fdaa7481c9.woff2"
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <!-- For Nunito only preload the latin range, which should be good enough for now -->
      <link
        rel="preload"
<<<<<<< HEAD
        href="${OSS_FONTS_CDN}Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTQ3j6zbXWjgeg-DqUjjPte.woff2"
=======
        href="${OSS_FONTS_CDN}fonts/Nunito/Nunito-Regular-XRXI3I6Li01BKofiOc5wtlZ2di8HDIkhdTQ3j6zbXWjgeg.woff2"
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
<<<<<<< HEAD
        href="${OSS_FONTS_CDN}ComicShanns-Regular-D0c8wzsC.woff2"
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
      <link
        rel="preload"
        href="${OSS_FONTS_CDN}Virgil-Regular-hO16qHwV.woff2"
=======
        href="${OSS_FONTS_CDN}fonts/ComicShanns/ComicShanns-Regular-279a7b317d12eb88de06167bd672b4b4.woff2"
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
        as="font"
        type="font/woff2"
        crossorigin="anonymous"
      />
    `,
        );
      }
    },
  };
};
