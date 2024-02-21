import type { CollectionEntry } from "astro:content";

export function formatJekyllPost(): (
  post: CollectionEntry<"blog">
) => CollectionEntry<"blog"> {
  return function (post: CollectionEntry<"blog">): CollectionEntry<"blog"> {
    function formatString(inputString: string) {
      // Step 1: Strip off ".md" extension if it exists
      if (inputString.endsWith(".md")) {
        inputString = inputString.slice(0, -3);
      }

      // Split the string by dashes
      const parts = inputString.split("-");

      // Reconstruct the string with the first three parts joined by "/" and the rest joined by "-"
      let formattedString =
        parts.slice(0, 3).join("/") + "/" + parts.slice(3).join("-");

      // Ensure the result ends with "/"
      if (!formattedString.endsWith("/")) {
        formattedString += "/";
      }

      return formattedString;
    }

    const postUpdated: any = post;
    postUpdated.slug = formatString(post.id);
    return postUpdated;
  };
}
