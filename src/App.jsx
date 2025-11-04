import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import PreviewPane from "./components/PreviewPane";
import ExportPanel from "./components/ExportPanel";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [html, setHtml] = useState("<!doctype html><html><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><link href='https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css' rel='stylesheet'><title>Welcome</title></head><body class='bg-white'><section class='max-w-3xl mx-auto px-6 py-16 text-center'><h1 class='text-3xl font-semibold text-slate-900'>Welcome to FlameSite AI</h1><p class='mt-3 text-slate-600'>Describe the website you want and generate a ready-to-export page.</p></section></body></html>");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendUrl = useMemo(() => {
    return (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "");
  }, []);

  const handleGenerate = async ({ name, style, primary, prompt }) => {
    setError("");
    setLoading(true);
    try {
      if (!backendUrl) {
        throw new Error("Backend URL is not configured.");
      }
      const res = await fetch(`${backendUrl}/generate-site`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, style, primary, prompt, api_key: apiKey || undefined }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Request failed: ${res.status}`);
      }
      const data = await res.json();
      setHtml(data.html);
    } catch (e) {
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header apiKey={apiKey} onApiKeyChange={setApiKey} />

      <main className="w-full">
        <PromptForm onGenerate={handleGenerate} />

        {loading && (
          <div className="mx-auto max-w-6xl px-4 -mt-4 pb-6">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              Generating with DeepSeek… this usually takes a few seconds.
            </div>
          </div>
        )}

        {error && (
          <div className="mx-auto max-w-6xl px-4 -mt-4 pb-6">
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          </div>
        )}

        <PreviewPane html={html} />
        <ExportPanel html={html} />
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500">
          Built with FlameSite AI • Powered by DeepSeek
        </div>
      </footer>
    </div>
  );
}
