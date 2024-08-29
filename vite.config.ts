import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import tw from "@tailwindcss/vite"

export default defineConfig({
  plugins: [sveltekit(), tw()]
})
