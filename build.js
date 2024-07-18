import fs from "fs"
import esbuild from "esbuild"
import sveltePlugin from "esbuild-svelte"

const isDev = process.env.NODE_ENV === "development"

/** @type {import("esbuild").BuildOptions} */
const config = {
  entryPoints: ["web/main.ts"],
  mainFields: ["svelte", "browser", "module", "main"],
  conditions: ["svelte", "browser"],
  outdir: "dist",
  bundle: true,
  minify: true,
  sourcemap: isDev,
  metafile: isDev,
  plugins: [
    sveltePlugin({
      compilerOptions: {
        runes: true,
      },
    }),
    {
      name: "on-end",
      setup(build) {
        build.onEnd((result) => {
          if (result.metafile) {
            fs.writeFileSync(
              "dist/metafile.json",
              JSON.stringify(result.metafile),
            )
          }
        })
      },
    },
  ],
  logLevel: "info",
}

if (isDev) {
  const ctx = await esbuild.context(config)
  await ctx.watch()
} else {
  await esbuild.build(config)
}
