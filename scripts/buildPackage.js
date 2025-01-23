const { build } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
<<<<<<< HEAD
=======
const { externalGlobalPlugin } = require("esbuild-plugin-external-global");
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db

// Will be used later for treeshaking
//const fs = require("fs");
// const path = require("path");

// function getFiles(dir, files = []) {
//   const fileList = fs.readdirSync(dir);
//   for (const file of fileList) {
//     const name = `${dir}/${file}`;
//     if (
//       name.includes("node_modules") ||
//       name.includes("config") ||
//       name.includes("package.json") ||
//       name.includes("main.js") ||
//       name.includes("index-node.ts") ||
//       name.endsWith(".d.ts")
//     ) {
//       continue;
//     }

//     if (fs.statSync(name).isDirectory()) {
//       getFiles(name, files);
//     } else if (
//       !(
//         name.match(/\.(sa|sc|c)ss$/) ||
//         name.match(/\.(woff|woff2|eot|ttf|otf)$/) ||
//         name.match(/locales\/[^/]+\.json$/)
//       )
//     ) {
//       continue;
//     } else {
//       files.push(name);
//     }
//   }
//   return files;
// }

<<<<<<< HEAD

const rawConfig = {
  entryPoints: ["excalidraw-app/App.tsx"],
  bundle: true,
  format: "esm",
  plugins: [sassPlugin()],
  loader: {
    ".json": "copy",
    ".woff2": "file",
  },
  // These must be here otherwise we get duplicate versions of react errors in Hyperpad.
  // Maybe be a better solution available with dedupe at the link below,
  // but this will do for now.
  // https://github.com/evanw/esbuild/issues/3419
  external: ['react', 'react-dom', 'use-sync-external-store'],
};

const createESMRawBuild = async () => {
  // Development unminified build with source maps
  await build({
    ...rawConfig,
    sourcemap: true,
    outdir: "dist/dev",
=======
const browserConfig = {
  entryPoints: ["index.tsx"],
  bundle: true,
  format: "esm",
  plugins: [
    sassPlugin(),
    externalGlobalPlugin({
      react: "React",
      "react-dom": "ReactDOM",
    }),
  ],
  splitting: true,
  loader: {
    ".woff2": "file",
  },
};
const createESMBrowserBuild = async () => {
  // Development unminified build with source maps
  await build({
    ...browserConfig,
    outdir: "dist/browser/dev",
    sourcemap: true,
    chunkNames: "excalidraw-assets-dev/[name]-[hash]",
    assetNames: "excalidraw-assets-dev/[name]-[hash]",
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
    define: {
      "import.meta.env": JSON.stringify({ DEV: true }),
    },
  });

  // production minified build without sourcemaps
  await build({
<<<<<<< HEAD
    ...rawConfig,
    minify: true,
    outdir: "dist/prod",
=======
    ...browserConfig,
    outdir: "dist/browser/prod",
    minify: true,
    chunkNames: "excalidraw-assets/[name]-[hash]",
    assetNames: "excalidraw-assets/[name]-[hash]",
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
    define: {
      "import.meta.env": JSON.stringify({ PROD: true }),
    },
  });
};

<<<<<<< HEAD
// Function to create CJS build
const createCJSBuild = async () => {
  // Development unminified build with source maps
  await build({
    ...rawConfig,
    format: 'cjs',
    sourcemap: true,
    outdir: "dist/cjs/dev", // Output directory for CJS dev build
    define: {
      "import.meta.env": JSON.stringify({ DEV: true }),
    },
  });
};

// Call the function to create the CJS build
createCJSBuild();
createESMRawBuild();
=======
// const BASE_PATH = `${path.resolve(`${__dirname}/..`)}`;
// const filesinExcalidrawPackage = [
//   ...getFiles(`${BASE_PATH}/packages/excalidraw`),
//   `${BASE_PATH}/packages/utils/export.ts`,
//   `${BASE_PATH}/packages/utils/bbox.ts`,
//   ...getFiles(`${BASE_PATH}/public/fonts`),
// ];

// const filesToTransform = filesinExcalidrawPackage.filter((file) => {
//   return !(
//     file.includes("/__tests__/") ||
//     file.includes(".test.") ||
//     file.includes("/tests/") ||
//     file.includes("example")
//   );
// });

const rawConfigCommon = {
  bundle: true,
  format: "esm",
  plugins: [sassPlugin()],
  assetNames: "[dir]/[name]-[hash]",
  loader: {
    ".json": "copy",
    ".woff2": "file",
  },
  packages: "external",
  // chunks are always external, so they are not bundled within and get build separately
  external: ["*.chunk"],
};

const rawConfigIndex = {
  ...rawConfigCommon,
  entryPoints: ["index.tsx"],
};

const rawConfigChunks = {
  ...rawConfigCommon,
  // create a separate chunk for each
  entryPoints: ["**/*.chunk.ts"],
};

function buildDev(chunkConfig) {
  const config = {
    ...chunkConfig,
    sourcemap: true,
    define: {
      "import.meta.env": JSON.stringify({ DEV: true }),
    },
    outdir: "dist/dev",
  };

  return build(config);
}

function buildProd(chunkConfig) {
  const config = {
    ...chunkConfig,
    minify: true,
    define: {
      "import.meta.env": JSON.stringify({ PROD: true }),
    },
    outdir: "dist/prod",
  };

  return build(config);
}

const createESMRawBuild = async () => {
  // development unminified build with source maps
  await buildDev(rawConfigIndex);
  await buildDev(rawConfigChunks);

  // production minified buld without sourcemaps
  await buildProd(rawConfigIndex);
  await buildProd(rawConfigChunks);
};

createESMRawBuild();
createESMBrowserBuild();
>>>>>>> 840f1428c49e3dffa6474743ca2677b7697638db
