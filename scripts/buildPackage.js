const { build } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

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
    define: {
      "import.meta.env": JSON.stringify({ DEV: true }),
    },
  });

  // production minified build without sourcemaps
  await build({
    ...rawConfig,
    minify: true,
    outdir: "dist/prod",
    define: {
      "import.meta.env": JSON.stringify({ PROD: true }),
    },
  });
};

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
