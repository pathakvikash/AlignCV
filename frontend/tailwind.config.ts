import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core semantic colors
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-hover": "var(--surface-hover)",
        border: "var(--border)",
        "border-muted": "var(--border-muted)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-disabled": "var(--text-disabled)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-soft": "var(--primary-soft)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        success: "var(--success)",
        warning: "var(--warning)",
        destructive: "var(--destructive)",
        info: "var(--info)",
        ring: "var(--ring)",
        overlay: "var(--overlay)",
        // AI-specific accent colors
        "ai-highlight": "var(--ai-highlight)",
        "ai-soft": "var(--ai-soft)",
        "semantic-match": "var(--semantic-match)",
        "rewrite-change": "var(--rewrite-change)",
        "missing-skill": "var(--missing-skill)",
        "validation-safe": "var(--validation-safe)",
        "validation-risk": "var(--validation-risk)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "xs": ["0.75rem", { lineHeight: "1rem", fontWeight: "400" }],
        "sm": ["0.875rem", { lineHeight: "1.25rem", fontWeight: "400" }],
        "base": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        "lg": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "500" }],
        "xl": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700" }],
      },
      lineHeight: {
        "tight": "1.2",
        "normal": "1.5",
        "relaxed": "1.7",
      },
      spacing: {
        "1": "0.25rem", // 4px
        "2": "0.5rem",  // 8px
        "3": "0.75rem", // 12px
        "4": "1rem",    // 16px
        "5": "1.25rem", // 20px
        "6": "1.5rem",  // 24px
        "8": "2rem",    // 32px
        "10": "2.5rem", // 40px
        "12": "3rem",   // 48px
      },
      borderRadius: {
        "xs": "0.25rem", // 4px
        "sm": "0.375rem", // 6px
        "md": "0.5rem",   // 8px
        "lg": "0.75rem",  // 12px
        "xl": "1rem",     // 16px
        "2xl": "1.25rem", // 20px
      },
      boxShadow: {
        "sm": "0 1px 2px rgba(0,0,0,0.05)",
        "md": "0 4px 6px rgba(0,0,0,0.08)",
        "lg": "0 10px 15px rgba(0,0,0,0.10)",
      },
      ringColor: {
        ring: "var(--ring)",
      },
    },
  },
  plugins: [],
} satisfies Config;
