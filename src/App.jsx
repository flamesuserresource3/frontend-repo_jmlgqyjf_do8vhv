import { useCallback, useMemo, useState } from "react";
import Header from "./components/Header";
import PromptForm from "./components/PromptForm";
import PreviewPane from "./components/PreviewPane";
import ExportPanel from "./components/ExportPanel";

function buildHtml({ name, style, primary, prompt }) {
  const siteName = name?.trim() || "FlameSite";
  const color = primary || "indigo";

  const palette = {
    bg: `from-${color}-50 to-white`,
    text: `text-${color}-600`,
    ring: `ring-${color}-100`,
    btn: `bg-${color}-600 hover:bg-${color}-700`,
    badge: `bg-${color}-50 text-${color}-700 border-${color}-200`,
    gradient: `from-${color}-500 via-${color}-500 to-${color}-600`,
  };

  const tone = {
    modern: {
      radius: "rounded-2xl",
      shadow: "shadow-xl",
    },
    minimal: {
      radius: "rounded-xl",
      shadow: "shadow",
    },
    playful: {
      radius: "rounded-3xl",
      shadow: "shadow-2xl",
    },
    dark: {
      radius: "rounded-xl",
      shadow: "shadow-xl",
    },
  }[style || "modern"]; 

  const words = (prompt || "AI startup landing page with hero, features, pricing, contact").split(/\W+/).filter(w => w.length > 4);
  const featureSeeds = Array.from(new Set(words)).slice(0, 3);
  const features = (featureSeeds.length ? featureSeeds : ["Automation", "Analytics", "Assistant"]).map((w, i) => ({
    title: w.charAt(0).toUpperCase() + w.slice(1),
    desc: [
      "Streamline your workflow with intelligent tooling.",
      "Make better decisions with real-time insights.",
      "Delight users with natural conversations.",
    ][i % 3],
  }));

  const isDark = style === "dark";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${siteName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    html, body { height: 100%; }
    body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"; }
  </style>
</head>
<body class="${isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-800"}">

  <!-- Navbar -->
  <header class="sticky top-0 z-20 ${isDark ? "bg-slate-950/80" : "bg-white/80"} backdrop-blur border-b ${isDark ? "border-slate-800" : "border-slate-200"}">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
      <div class="h-8 w-8 ${tone.radius} bg-gradient-to-br ${palette.gradient}" aria-hidden="true"></div>
      <div class="font-semibold">${siteName}</div>
      <div class="flex-1"></div>
      <nav class="hidden sm:flex items-center gap-6 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}">
        <a href="#features" class="hover:${palette.text}">Features</a>
        <a href="#pricing" class="hover:${palette.text}">Pricing</a>
        <a href="#contact" class="hover:${palette.text}">Contact</a>
      </nav>
      <a href="#contact" class="ml-4 inline-flex items-center ${tone.radius} ${palette.btn} px-3 py-2 text-sm font-medium text-white">Get Started</a>
    </div>
  </header>

  <!-- Hero -->
  <section class="relative overflow-hidden">
    <div class="absolute inset-0 -z-0 bg-gradient-to-br ${palette.bg}"></div>
    <div class="relative max-w-6xl mx-auto px-4 py-20">
      <div class="inline-flex items-center gap-2 ${tone.radius} border ${isDark ? "border-slate-800 bg-slate-900 text-slate-300" : palette.badge} px-3 py-1 text-xs mb-4">Powered by AI</div>
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-slate-900"}">
        Build websites with a single prompt
      </h1>
      <p class="mt-4 text-lg ${isDark ? "text-slate-300" : "text-slate-600"}">
        ${prompt || "Describe your idea and get a beautiful, responsive site in seconds."}
      </p>
      <div class="mt-8 flex items-center gap-3">
        <a href="#pricing" class="inline-flex items-center ${tone.radius} ${palette.btn} px-5 py-3 text-sm font-semibold text-white">Generate Now</a>
        <a href="#features" class="inline-flex items-center ${tone.radius} border ${isDark ? "border-slate-800 text-slate-300" : "border-slate-300 text-slate-700"} px-5 py-3 text-sm font-semibold">Explore Features</a>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section id="features" class="${isDark ? "bg-slate-950" : "bg-white"}">
    <div class="max-w-6xl mx-auto px-4 py-16">
      <h2 class="text-2xl md:text-3xl font-bold mb-6">Everything you need</h2>
      <p class="${isDark ? "text-slate-300" : "text-slate-600"} mb-10">From concept to code in moments. Designed for founders, marketers, and makers.</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${features.map((f, i) => `
          <div class="${tone.radius} ${tone.shadow} border ${isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"} p-5">
            <div class="h-10 w-10 ${tone.radius} bg-gradient-to-br ${palette.gradient} mb-4"></div>
            <h3 class="font-semibold mb-1">${f.title}</h3>
            <p class="text-sm ${isDark ? "text-slate-300" : "text-slate-600"}">${f.desc}</p>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Pricing -->
  <section id="pricing" class="${isDark ? "bg-slate-950" : "bg-white"}">
    <div class="max-w-6xl mx-auto px-4 pb-16">
      <h2 class="text-2xl md:text-3xl font-bold mb-6">Simple pricing</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${["Starter", "Pro", "Scale"].map((tier, i) => `
          <div class="${tone.radius} ${tone.shadow} border ${isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"} p-6 flex flex-col">
            <div class="text-sm ${isDark ? "text-slate-300" : "text-slate-600"}">${tier}</div>
            <div class="mt-2 text-3xl font-extrabold">$${(i+1)*9}<span class="text-base font-medium ${isDark ? "text-slate-400" : "text-slate-500"}>/mo</span></div>
            <ul class="mt-4 space-y-2 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}">
              <li>AI site generator</li>
              <li>Responsive templates</li>
              <li>1-click export</li>
            </ul>
            <a href="#contact" class="mt-6 inline-flex items-center ${tone.radius} ${palette.btn} px-4 py-2 text-sm font-semibold text-white text-center">Choose ${tier}</a>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="${isDark ? "bg-slate-950" : "bg-white"}">
    <div class="max-w-6xl mx-auto px-4 pb-24">
      <div class="${tone.radius} border ${isDark ? "border-slate-800 bg-slate-900" : "border-slate-200 bg-white"} p-6 ${tone.shadow}">
        <h2 class="text-xl font-semibold mb-2">Get in touch</h2>
        <p class="text-sm ${isDark ? "text-slate-300" : "text-slate-600"}">Tell us about your project and we'll get back to you.</p>
        <form class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input class="border ${isDark ? "border-slate-800 bg-slate-950 text-slate-100 placeholder-slate-500" : "border-slate-300"} ${tone.radius} px-3 py-2 text-sm" placeholder="Name" />
          <input class="border ${isDark ? "border-slate-800 bg-slate-950 text-slate-100 placeholder-slate-500" : "border-slate-300"} ${tone.radius} px-3 py-2 text-sm" placeholder="Email" />
          <button class="${tone.radius} ${palette.btn} px-4 py-2 text-sm font-semibold text-white">Send</button>
        </form>
      </div>
    </div>
  </section>

  <footer class="border-t ${isDark ? "border-slate-800 bg-slate-950 text-slate-400" : "border-slate-200 bg-white text-slate-500"}">
    <div class="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
      <span>© ${new Date().getFullYear()} ${siteName}</span>
      <a href="#" class="text-sm hover:${palette.text}">Privacy</a>
    </div>
  </footer>

</body>
</html>`;
}

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [config, setConfig] = useState({ name: "FlameSite", style: "modern", primary: "indigo", prompt: "" });

  const html = useMemo(() => buildHtml(config), [config]);

  const handleGenerate = useCallback((data) => {
    // For this sandbox, generation is client-side to keep things simple and fast.
    // In production, send {prompt, settings} to your own backend that calls DeepSeek securely.
    setConfig(data);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header apiKey={apiKey} onApiKeyChange={setApiKey} />
      <main className="w-full">
        <section className="mx-auto max-w-6xl px-4 py-10">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Describe your site</h2>
            <p className="text-slate-600 text-sm">We will turn your idea into a complete, downloadable webpage.</p>
          </div>
          <PromptForm onGenerate={handleGenerate} />
        </section>

        <PreviewPane html={html} />
        <ExportPanel html={html} />
      </main>
    </div>
  );
}
