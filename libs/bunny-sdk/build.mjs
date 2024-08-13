import * as esbuild from 'esbuild'
import path from 'node:path'
import npmDTS from 'npm-dts';
import { readFile } from 'fs/promises';

const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url)));

const sharedConfig = {
  entryPoints: ['src/lib.ts'],
  bundle: true,
  minify: true,
  outfile: 'dist/index.js',
  define: {
    "VERSION": `"${pkg.version}"`,
  }
};

await new npmDTS.Generator({
  entry: 'src/lib.ts',
  output: 'dist/index.d.ts',
}).generate();

// CJS Build
await esbuild.build({
  ...sharedConfig,
  platform: 'node',
  outfile: "dist/index.js",
});



let noNodeImpl = {
  name: 'example',
  setup(build) {
    build.onResolve({ filter: /_impl\/node\/.*/ }, args => {
      return { path: args.path, namespace: "node-special" }
    })

    build.onLoad({ filter: /.*/, namespace: 'node-special' }, () => ({
      contents: "const handler = { get: () => undefined }; const proxy = new Proxy({}, handler); export default proxy;",
      loader: 'js',
    }))
  },
}

// ESM Build
await esbuild.build({
  ...sharedConfig,
  platform: 'neutral',
  outfile: "esm/index.js",
  plugins: [noNodeImpl],
  // external: ["*/_impl/node.ts", "*/_impl/node/"],
  format: "esm"
});

// Bunny Build
await esbuild.build({
  ...sharedConfig,
  platform: 'neutral',
  outfile: "esm-bunny/index.js",
  format: "esm",
  plugins: [noNodeImpl],
});
