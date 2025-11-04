import { useMemo } from "react";

export default function PreviewPane({ html }) {
  const srcDoc = useMemo(() => html, [html]);

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-4 py-2 text-xs font-medium tracking-wide uppercase text-slate-600 bg-slate-50 border-b border-slate-200">
            Live Preview
          </div>
          <iframe
            title="preview"
            className="w-full h-[640px] bg-white"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            srcDoc={srcDoc}
          />
        </div>
      </div>
    </section>
  );
}
