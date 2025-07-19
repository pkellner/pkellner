import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime = new Date(), modDatetime, description, tags } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-xl font-semibold text-skin-base group-hover:text-skin-accent transition-colors duration-200",
  };

  return (
    <li className="list-none">
      <a
        href={href}
        className="post-card group block p-6 rounded-xl bg-skin-card border border-skin-line hover:border-skin-accent hover:shadow-soft transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="flex flex-col gap-3">
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
          
          <div className="flex items-center gap-4 text-sm text-skin-muted">
            <Datetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
            {tags && tags.length > 0 && (
              <>
                <span className="text-skin-muted">•</span>
                <div className="flex gap-2">
                  {tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="badge badge-primary">
                      {tag}
                    </span>
                  ))}
                  {tags.length > 2 && (
                    <span className="badge badge-primary">+{tags.length - 2}</span>
                  )}
                </div>
              </>
            )}
          </div>
          
          <p className="text-skin-muted line-clamp-2">{description}</p>
          
          <div className="flex items-center gap-2 text-sm font-medium text-skin-accent group-hover:gap-3 transition-all duration-200">
            <span>Read more</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </a>
    </li>
  );
}