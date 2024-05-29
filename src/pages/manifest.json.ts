import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import favicon from "../../public/favicon.png";

const faviconPngSizes = [192, 512];

export const GET: APIRoute = async () => {
  const icons = await Promise.all(
    faviconPngSizes.map(async (size) => {
      const image = await getImage({
        src: favicon,
        width: size,
        height: size,
        format: "png",
      });
      return {
        src: image.src,
        type: `image/${image.options.format}`,
        sizes: `${image.options.width}x${image.options.height}`,
      };
    })
  );

  const manifest = {
    name: "Caveman Studio",
    description: "Caveman Studio is a recording studio in Copenhagen, Denmark run by Lucas Delacroix",
    start_url: "/",
    display: "standalone",
    id: "cavemanstudio",
    icons,
  };

  return new Response(JSON.stringify(manifest));
};
