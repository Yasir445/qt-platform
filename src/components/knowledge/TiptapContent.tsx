interface TiptapNode {
  type: string;
  text?: string;
  content?: TiptapNode[];
  marks?: { type: string }[];
}

function renderInline(node: TiptapNode, key: number): React.ReactNode {
  if (node.type === "text") {
    let el: React.ReactNode = node.text;
    if (node.marks?.some((m) => m.type === "bold")) el = <strong key={key}>{el}</strong>;
    if (node.marks?.some((m) => m.type === "italic")) el = <em key={key}>{el}</em>;
    return <span key={key}>{el}</span>;
  }
  return null;
}

function renderNode(node: TiptapNode, key: number): React.ReactNode {
  const children = node.content?.map((c, i) => renderNode(c, i));
  const inline = node.content?.every((c) => c.type === "text");

  switch (node.type) {
    case "doc":
      return <div key={key}>{children}</div>;
    case "paragraph":
      return (
        <p key={key} className="mb-3 text-sm leading-relaxed text-ink-secondary">
          {inline ? node.content?.map((c, i) => renderInline(c, i)) : children}
        </p>
      );
    case "heading":
      return (
        <h3 key={key} className="mb-2 mt-5 text-sm font-semibold text-ink-primary first:mt-0">
          {node.content?.map((c, i) => renderInline(c, i))}
        </h3>
      );
    case "bulletList":
      return (
        <ul key={key} className="mb-3 space-y-1.5 text-sm text-ink-secondary">
          {children}
        </ul>
      );
    case "listItem":
      return (
        <li key={key}>
          {node.content?.map((c, i) =>
            c.type === "paragraph" ? c.content?.map((t, j) => renderInline(t, j)) : renderNode(c, i)
          )}
        </li>
      );
    default:
      return null;
  }
}

/** Renders Tiptap's JSON document format as read-only HTML. No editor library required for display. */
export function TiptapContent({ content }: { content: unknown }) {
  return <>{renderNode(content as TiptapNode, 0)}</>;
}
