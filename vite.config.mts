import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  environments: {
    // Tailwindcss currently uses the non-deprecated internal createResolver() vite API method. The code and its docstring indicate that it relies on an ssr being present.
    // This isn’t the case for us, since we only have a worker environment instead of ssr. To prevent builds from getting blocked on this, we stub out the ssr environment here.
    ssr: {},
  },
  plugins: [
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    redwood(),
    tailwindcss(),
  ],
});
