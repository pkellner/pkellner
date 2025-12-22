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
  const pubDate = post.data.pubDatetime ? new Date(post.data.pubDatetime) : undefined;

  // If we have images, render the collage layout
  if (images && images.length > 0) {
    return renderWithImages(title, author, tags, images, pubDate);
  }

  // Otherwise render the styled title card
  return renderTitleCard(title, author, tags, pubDate);
}

function renderWithImages(
  title: string,
  _author: { author_login?: string; display_name?: string },
  tags: string[],
  images: Buffer[],
  pubDate?: Date
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
          gap: "24px",
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
                gap: "12px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  flex: 1,
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
                  flex: 1,
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
            textAlign: "center",
            width: "100%",
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
          <span style={{ fontSize: 22, color: "#94a3b8", minWidth: "180px" }}>
            {pubDate ? pubDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            }) : ""}
          </span>

          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flex: 1, overflow: "hidden" }}>
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(99,102,241,0.3)",
                  color: "#a5b4fc",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: 18,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                #{tag.length > 12 ? tag.substring(0, 10) + "…" : tag}
              </span>
            ))}
          </div>

          <span style={{ fontWeight: "bold", color: "#ffffff", fontSize: 22, minWidth: "180px", textAlign: "right" }}>
            {SITE.title}
          </span>
        </div>
      </div>
    </div>
  );
}

function renderTitleCard(
  title: string,
  _author: { author_login?: string; display_name?: string },
  tags: string[],
  pubDate?: Date
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
          alignItems: "center",
          padding: "60px 80px",
          flex: 1,
          position: "relative",
        }}
      >
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
            textAlign: "center",
          }}
        >
          {title.length > 90 ? title.substring(0, 87) + "..." : title}
        </p>
      </div>

      {/* Bottom bar with date, tags, and site */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 40px",
          width: "100%",
          position: "relative",
        }}
      >
        <span style={{ fontSize: 22, color: "#94a3b8", minWidth: "180px" }}>
          {pubDate ? pubDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) : ""}
        </span>

        {tags.length > 0 ? (
          <div style={{ display: "flex", gap: "8px", justifyContent: "center", flex: 1, overflow: "hidden" }}>
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                style={{
                  background: "rgba(99,102,241,0.3)",
                  color: "#a5b4fc",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: 18,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                #{tag.length > 12 ? tag.substring(0, 10) + "…" : tag}
              </span>
            ))}
          </div>
        ) : (
          <div style={{ flex: 1 }} />
        )}

        <span style={{ fontWeight: "bold", color: "#ffffff", fontSize: 22, minWidth: "180px", textAlign: "right" }}>
          {SITE.title}
        </span>
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