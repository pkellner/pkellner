import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

interface PostOgProps {
  post: CollectionEntry<"blog">;
  images?: Buffer[];
}

export default function postOgImage({ post, images }: PostOgProps) {
  if (!post) return null;

  const title = post.data.title;
  const author = post.data.author;
  const tags = post.data.tags?.slice(0, 3) || [];

  // If we have images, render the collage layout
  if (images && images.length > 0) {
    return renderWithImages(title, author, tags, images);
  }

  // Otherwise render the styled title card
  return renderTitleCard(title, author, tags);
}

function renderWithImages(
  title: string,
  author: { author_login?: string; display_name?: string },
  tags: string[],
  images: Buffer[]
) {
  const imageCount = Math.min(images.length, 3);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        position: "relative",
      }}
    >
      {/* Image collage section - top 65% */}
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "65%",
          gap: "4px",
          padding: "16px 16px 8px 16px",
        }}
      >
        {imageCount === 1 && (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              borderRadius: "12px",
              overflow: "hidden",
              border: "3px solid rgba(255,255,255,0.2)",
            }}
          >
            <img
              src={`data:image/png;base64,${images[0].toString("base64")}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
        {imageCount === 2 && (
          <>
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                borderRadius: "12px",
                overflow: "hidden",
                border: "3px solid rgba(255,255,255,0.2)",
              }}
            >
              <img
                src={`data:image/png;base64,${images[0].toString("base64")}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                borderRadius: "12px",
                overflow: "hidden",
                border: "3px solid rgba(255,255,255,0.2)",
              }}
            >
              <img
                src={`data:image/png;base64,${images[1].toString("base64")}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </>
        )}
        {imageCount >= 3 && (
          <>
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                borderRadius: "12px",
                overflow: "hidden",
                border: "3px solid rgba(255,255,255,0.2)",
              }}
            >
              <img
                src={`data:image/png;base64,${images[0].toString("base64")}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div
              style={{
                width: "50%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "3px solid rgba(255,255,255,0.2)",
                }}
              >
                <img
                  src={`data:image/png;base64,${images[1].toString("base64")}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "50%",
                  display: "flex",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "3px solid rgba(255,255,255,0.2)",
                }}
              >
                <img
                  src={`data:image/png;base64,${images[2].toString("base64")}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Title and info section - bottom 35% */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px 24px 20px 24px",
          height: "35%",
        }}
      >
        <p
          style={{
            fontSize: 42,
            fontWeight: "bold",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.2,
            maxHeight: "100px",
            overflow: "hidden",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          {title.length > 80 ? title.substring(0, 77) + "..." : title}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {tags.map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#e0e0e0",
                  padding: "4px 12px",
                  borderRadius: "16px",
                  fontSize: 18,
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: 22,
              color: "#b0b0b0",
            }}
          >
            <span style={{ fontWeight: "bold", color: "#ffffff" }}>
              {author?.display_name || author?.author_login || "Peter Kellner"}
            </span>
            <span>•</span>
            <span style={{ fontWeight: "bold", color: "#94a3b8" }}>
              {SITE.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderTitleCard(
  title: string,
  author: { author_login?: string; display_name?: string },
  tags: string[]
) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        position: "relative",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 80px",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Tags at top */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
          {tags.map((tag, i) => (
            <span
              key={i}
              style={{
                background: "rgba(99,102,241,0.3)",
                color: "#a5b4fc",
                padding: "8px 20px",
                borderRadius: "24px",
                fontSize: 22,
                fontWeight: 500,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <p
          style={{
            fontSize: 64,
            fontWeight: "bold",
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.15,
            maxWidth: "1000px",
            textShadow: "0 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          {title.length > 90 ? title.substring(0, 87) + "..." : title}
        </p>

        {/* Author and site */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginTop: "48px",
            fontSize: 28,
          }}
        >
          {/* Author avatar placeholder */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {(author?.display_name || "PK").charAt(0).toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: "bold", color: "#ffffff" }}>
              {author?.display_name || author?.author_login || "Peter Kellner"}
            </span>
            <span style={{ color: "#94a3b8", fontSize: 22 }}>{SITE.title}</span>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%)",
        }}
      />
    </div>
  );
}