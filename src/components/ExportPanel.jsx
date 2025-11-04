import { Download } from "lucide-react";

export default function ExportPanel({ html, filename = "index.html" }) {
  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-4 pb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-slate-600">Happy with the result? Download the file and deploy anywhere.</p>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
        >
          <Download size={16} /> Download HTML
        </button>
      </div>
    </section>
  );
}
