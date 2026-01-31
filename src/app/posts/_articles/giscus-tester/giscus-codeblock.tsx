import type { CSSProperties } from "react";

interface GiscusCodeBlockProps {
  repository: string;
  repositoryId: string;
  category: string;
  categoryId: string;
}

export const GiscusCodeBlock = ({
  repository,
  repositoryId,
  category,
  categoryId,
}: GiscusCodeBlockProps) => {
  const styleProps = {
    "--shiki-dark": "#adbac7",
    "--shiki-light": "#24292e",
    "--shiki-dark-bg": "#22272e",
    "--shiki-light-bg": "#fff",
  } as CSSProperties;

  const textStyle = (dark: string, light: string) =>
    ({ "--shiki-dark": dark, "--shiki-light": light }) as CSSProperties;

  return (
    <figure data-rehype-pretty-code-figure={true}>
      <pre
        data-language="typescript"
        data-theme="github-dark-dimmed github-light"
        style={styleProps}
      >
        <code
          data-language="typescript"
          data-theme="github-dark-dimmed github-light"
          style={{ display: "grid" }}
        >
          <span>
            <span style={textStyle("#F47067", "#D73A49")}>export</span>
            <span style={textStyle("#F47067", "#D73A49")}> const</span>
            <span style={textStyle("#6CB6FF", "#005CC5")}> GISCUS</span>
            <span style={textStyle("#F47067", "#D73A49")}> =</span>
            <span style={textStyle("#ADBAC7", "#24292E")}> {"{"}</span>
          </span>
          <span>
            <span style={textStyle("#ADBAC7", "#24292E")}>{"  "}REPO: </span>
            <span style={textStyle("#96D0FF", "#032F62")}>
              &#39;{repository}&#39;
            </span>
            <span style={textStyle("#ADBAC7", "#24292E")}>,</span>
          </span>
          <span>
            <span style={textStyle("#ADBAC7", "#24292E")}>{"  "}REPO_ID: </span>
            <span style={textStyle("#96D0FF", "#032F62")}>
              &#39;{repositoryId}&#39;
            </span>
            <span style={textStyle("#ADBAC7", "#24292E")}>,</span>
          </span>
          <span>
            <span style={textStyle("#ADBAC7", "#24292E")}>
              {"  "}CATEGORY:{" "}
            </span>
            <span style={textStyle("#96D0FF", "#032F62")}>
              &#39;{category}&#39;
            </span>
            <span style={textStyle("#ADBAC7", "#24292E")}>,</span>
          </span>
          <span>
            <span style={textStyle("#ADBAC7", "#24292E")}>
              {"  "}CATEGORY_ID:{" "}
            </span>
            <span style={textStyle("#96D0FF", "#032F62")}>
              &#39;{categoryId}&#39;
            </span>
            <span style={textStyle("#ADBAC7", "#24292E")}>,</span>
          </span>
          <span>
            <span style={textStyle("#ADBAC7", "#24292E")}>{"  "}MAPPING: </span>
            <span style={textStyle("#96D0FF", "#032F62")}>&#39;title&#39;</span>
            <span style={textStyle("#ADBAC7", "#24292E")}>,</span>
          </span>
          <span>
            <span style={textStyle("#ADBAC7", "#24292E")}>{"}"}</span>
            <span style={textStyle("#F47067", "#D73A49")}> as</span>
            <span style={textStyle("#F47067", "#D73A49")}> const</span>
            <span style={textStyle("#ADBAC7", "#24292E")}>;</span>
          </span>
        </code>
      </pre>
    </figure>
  );
};
