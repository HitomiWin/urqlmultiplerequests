import * as esbuild from "esbuild"

const ctx = await esbuild.context({
	entryPoints: ["src/Main.tsx"],
	bundle: true,
	minify: false,
	sourcemap: true,
	outdir: "www",
	splitting: true,
	format: "esm",
})

const { host, port } = await ctx.serve({
	servedir: "www",
})

console.log(`SERVING app on ${host}, ${port}`)
