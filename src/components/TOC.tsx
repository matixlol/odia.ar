import { useEffect, useMemo, useState } from "preact/hooks";

type Heading = {
  depth: number;
  slug: string;
  text: string;
};

interface TableOfContentsProps {
  headings: Heading[];
}

function buildTree(flatHeadings: Heading[], currentDepth = 2): any[] {
  const result: any[] = [];
  let i = 0;

  while (i < flatHeadings.length) {
    const heading = flatHeadings[i];
    if (heading.depth === currentDepth) {
      const children: Heading[] = [];
      let j = i + 1;
      while (j < flatHeadings.length && flatHeadings[j].depth > currentDepth) {
        children.push(flatHeadings[j]);
        j++;
      }
      result.push({ heading, children });
      i = j;
    } else {
      i++;
    }
  }
  return result;
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const allSlugs = useMemo(() => headings.map((h) => h.slug), [headings]);
  const tree = useMemo(() => buildTree(headings), [headings]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the entry nearest to top that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
          return;
        }
        // Fallback: find the last heading above viewport if none intersecting
        let current: string | null = null;
        for (const slug of allSlugs) {
          const el = document.getElementById(slug);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) current = slug; // 80px top offset for sticky header
        }
        setActiveId(current);
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: [0, 1.0],
      }
    );

    for (const slug of allSlugs) {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [allSlugs]);

  const renderNodes = (nodes: any[], depth = 2) => {
    return (
      <ul
        className="list-none p-0 m-0"
        style={{ marginLeft: depth > 2 ? "1rem" : undefined }}
      >
        {nodes.map((node) => {
          const isActive = activeId === node.heading.slug;
          return (
            <li>
              <a
                href={`#${node.heading.slug}`}
                className={`underline ${isActive ? "font-black" : ""}`}
              >
                {node.heading.text}
              </a>
              {node.children.length > 0 &&
                renderNodes(buildTree(node.children, depth + 1), depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return <nav aria-label="Tabla de contenidos">{renderNodes(tree)}</nav>;
}
