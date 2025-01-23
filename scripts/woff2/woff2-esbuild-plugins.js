const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const which = require("which");
const wawoff = require("wawoff2");
const { Font } = require("fonteditor-core");

/**
 * Custom esbuild plugin to:
 * 1. inline all woff2 (url and relative imports) as base64 for server-side use cases (no need for additional font fetch; works in both esm and commonjs)
 * 2. convert all the imported fonts (including those from cdn) at build time into .ttf (since Resvg does not support woff2, neither inlined dataurls - https://github.com/RazrFalcon/resvg/issues/541)
 *    - merging multiple woff2 into one ttf (for same families with different unicode ranges)
 *    - deduplicating glyphs due to the merge process
<<<<<<< HEAD
 *    - merging emoji font for each
=======
 *    - merging fallback font for each
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
 *    - printing out font metrics
 *
 * @returns {import("esbuild").Plugin}
 */
module.exports.woff2ServerPlugin = (options = {}) => {
  return {
    name: "woff2ServerPlugin",
    setup(build) {
      const { outdir, generateTtf } = options;
      const outputDir = path.resolve(outdir);
      const fonts = new Map();

      build.onResolve({ filter: /\.woff2$/ }, (args) => {
        const resolvedPath = path.resolve(args.resolveDir, args.path);

        return {
          path: resolvedPath,
          namespace: "woff2ServerPlugin",
        };
      });

      build.onLoad(
        { filter: /.*/, namespace: "woff2ServerPlugin" },
        async (args) => {
          let woff2Buffer;

          if (path.isAbsolute(args.path)) {
            // read local woff2 as a buffer (WARN: `readFileSync` does not work!)
            woff2Buffer = await fs.promises.readFile(args.path);
          } else {
            throw new Error(`Font path has to be absolute! "${args.path}"`);
          }

          // google's brotli decompression into snft
          const snftBuffer = new Uint8Array(
            await wawoff.decompress(woff2Buffer),
          ).buffer;

          // load font and store per fontfamily & subfamily cache
          let font;

          try {
            font = Font.create(snftBuffer, {
              type: "ttf",
              hinting: true,
              kerning: true,
            });
          } catch {
            // if loading as ttf fails, try to load as otf
            font = Font.create(snftBuffer, {
              type: "otf",
              hinting: true,
              kerning: true,
            });
          }

          const fontFamily = font.data.name.fontFamily;
          const subFamily = font.data.name.fontSubFamily;

          if (!fonts.get(fontFamily)) {
            fonts.set(fontFamily, {});
          }

          if (!fonts.get(fontFamily)[subFamily]) {
            fonts.get(fontFamily)[subFamily] = [];
          }

          // store the snftbuffer per subfamily
          fonts.get(fontFamily)[subFamily].push(font);

          // inline the woff2 as base64 for server-side use cases
          // NOTE: "file" loader is broken in commonjs and "dataurl" loader does not produce correct ur
          return {
            contents: `data:font/woff2;base64,${woff2Buffer.toString(
              "base64",
            )}`,
            loader: "text",
          };
        },
      );

<<<<<<< HEAD
      // TODO: strip away some unnecessary glyphs
=======
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
      build.onEnd(async () => {
        if (!generateTtf) {
          return;
        }

        const isFontToolsInstalled = await which("fonttools", {
          nothrow: true,
        });
        if (!isFontToolsInstalled) {
          console.error(
            `Skipped TTF generation: install "fonttools" first in order to generate TTF fonts!\nhttps://github.com/fonttools/fonttools`,
          );
          return;
        }

<<<<<<< HEAD
=======
        const xiaolaiPath = path.resolve(
          __dirname,
          "./assets/Xiaolai-Regular.ttf",
        );
        const emojiPath = path.resolve(
          __dirname,
          "./assets/NotoEmoji-Regular.ttf",
        );

        // need to use the same em size as built-in fonts, otherwise pyftmerge throws (modified manually with font forge)
        const emojiPath_2048 = path.resolve(
          __dirname,
          "./assets/NotoEmoji-Regular-2048.ttf",
        );

        const xiaolaiFont = Font.create(fs.readFileSync(xiaolaiPath), {
          type: "ttf",
        });
        const emojiFont = Font.create(fs.readFileSync(emojiPath), {
          type: "ttf",
        });

>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
        const sortedFonts = Array.from(fonts.entries()).sort(
          ([family1], [family2]) => (family1 > family2 ? 1 : -1),
        );

        // for now we are interested in the regular families only
        for (const [family, { Regular }] of sortedFonts) {
<<<<<<< HEAD
          const baseFont = Regular[0];

          const tempFilePaths = Regular.map((_, index) =>
=======
          if (family.includes("Xiaolai")) {
            // don't generate ttf for Xiaolai, as we have it hardcoded as one ttf
            continue;
          }

          const fallbackFontsPaths = [];
          const shouldIncludeXiaolaiFallback = family.includes("Excalifont");

          if (shouldIncludeXiaolaiFallback) {
            fallbackFontsPaths.push(xiaolaiPath);
          }

          const baseFont = Regular[0];
          const tempPaths = Regular.map((_, index) =>
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            path.resolve(outputDir, `temp_${family}_${index}.ttf`),
          );

          for (const [index, font] of Regular.entries()) {
            // tempFileNames
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }

            // write down the buffer
<<<<<<< HEAD
            fs.writeFileSync(tempFilePaths[index], font.write({ type: "ttf" }));
          }

          const emojiFilePath = path.resolve(
            __dirname,
            "./assets/NotoEmoji-Regular.ttf",
          );

          const emojiBuffer = fs.readFileSync(emojiFilePath);
          const emojiFont = Font.create(emojiBuffer, { type: "ttf" });

          // hack so that:
          // - emoji font has same metrics as the base font, otherwise pyftmerge throws due to different unitsPerEm
          // - emoji font glyphs are adjusted based to the base font glyphs, otherwise the glyphs don't match
          const patchedEmojiFont = Font.create({
            ...baseFont.data,
            glyf: baseFont.find({ unicode: [65] }), // adjust based on the "A" glyph (does not have to be first)
          }).merge(emojiFont, { adjustGlyf: true });

          const emojiTempFilePath = path.resolve(
            outputDir,
            `temp_${family}_Emoji.ttf`,
          );
          fs.writeFileSync(
            emojiTempFilePath,
            patchedEmojiFont.write({ type: "ttf" }),
          );

          const mergedFontPath = path.resolve(outputDir, `${family}.ttf`);

          execSync(
            `pyftmerge --output-file="${mergedFontPath}" "${tempFilePaths.join(
              '" "',
            )}" "${emojiTempFilePath}"`,
          );

          // cleanup
          fs.rmSync(emojiTempFilePath);
          for (const path of tempFilePaths) {
=======
            fs.writeFileSync(tempPaths[index], font.write({ type: "ttf" }));
          }

          const mergedFontPath = path.resolve(outputDir, `${family}.ttf`);

          if (baseFont.data.head.unitsPerEm === 2048) {
            fallbackFontsPaths.push(emojiPath_2048);
          } else {
            fallbackFontsPaths.push(emojiPath);
          }

          // drop Vertical related metrics, otherwise it does not allow us to merge the fonts
          // vhea (Vertical Header Table)
          // vmtx (Vertical Metrics Table)
          execSync(
            `pyftmerge --drop-tables=vhea,vmtx --output-file="${mergedFontPath}" "${tempPaths.join(
              '" "',
            )}" "${fallbackFontsPaths.join('" "')}"`,
          );

          // cleanup
          for (const path of tempPaths) {
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            fs.rmSync(path);
          }

          // yeah, we need to read the font again (:
          const mergedFont = Font.create(fs.readFileSync(mergedFontPath), {
            type: "ttf",
            kerning: true,
            hinting: true,
          });

<<<<<<< HEAD
          // keep copyright & licence per both fonts, as per the OFL licence
=======
          const getNameField = (field) => {
            const base = baseFont.data.name[field];
            const xiaolai = xiaolaiFont.data.name[field];
            const emoji = emojiFont.data.name[field];

            return shouldIncludeXiaolaiFallback
              ? `${base} & ${xiaolai} & ${emoji}`
              : `${base} & ${emoji}`;
          };

>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
          mergedFont.set({
            ...mergedFont.data,
            name: {
              ...mergedFont.data.name,
<<<<<<< HEAD
              copyright: `${baseFont.data.name.copyright} & ${emojiFont.data.name.copyright}`,
              licence: `${baseFont.data.name.licence} & ${emojiFont.data.name.licence}`,
=======
              copyright: getNameField("copyright"),
              licence: getNameField("licence"),
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            },
          });

          fs.rmSync(mergedFontPath);
          fs.writeFileSync(mergedFontPath, mergedFont.write({ type: "ttf" }));

          const { ascent, descent } = baseFont.data.hhea;
          console.info(`Generated "${family}"`);
          if (Regular.length > 1) {
            console.info(
<<<<<<< HEAD
              `- by merging ${Regular.length} woff2 files and 1 emoji ttf file`,
=======
              `- by merging ${Regular.length} woff2 fonts and related fallback fonts`,
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
            );
          }
          console.info(
            `- with metrics ${baseFont.data.head.unitsPerEm}, ${ascent}, ${descent}`,
          );
          console.info(``);
        }
      });
    },
  };
};
