// ./astro-jekyll.d.ts
export interface JekyllCollectionEntry {
  slug: string;
  data: {
    date: Date;
    permalink?: string;
    [key: string]: unknown; // Allows for additional properties as needed
  };
}
