import { useState } from "react";
import { MdOpenInNew, MdPublish } from "react-icons/md";
import type { Tool } from "sanity";

type DeployStatus = "idle" | "deploying" | "success" | "error";

type NetlifyDeployToolOptions = {
  buildHookId: string;
  siteName: string;
  siteTitle: string;
};

const NETLIFY_DEPLOYS_URL = "https://app.netlify.com/sites/weareamerica/deploys";

function NetlifyDeployTool({ tool }: { tool: Tool<NetlifyDeployToolOptions> }) {
  const [status, setStatus] = useState<DeployStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const options = tool.options;

  async function handleDeploy() {
    if (!options?.buildHookId) {
      setStatus("error");
      setError("This deploy tool is missing a Netlify build hook ID.");
      return;
    }

    setStatus("deploying");
    setError(null);

    try {
      const response = await fetch(
        `https://api.netlify.com/build_hooks/${options.buildHookId}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error(`Netlify responded with ${response.status}.`);
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Netlify could not start a new deploy."
      );
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.panel}>
        <div style={styles.iconWrap} aria-hidden="true">
          <MdPublish size={28} />
        </div>

        <div style={styles.copy}>
          <p style={styles.eyebrow}>Netlify deploy</p>
          <h1 style={styles.title}>Republish the website</h1>
          <p style={styles.description}>
            Trigger a fresh build for {options?.siteTitle ?? "the website"}.
            The new version will go live after Netlify finishes building it.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDeploy}
          disabled={status === "deploying"}
          style={{
            ...styles.button,
            ...(status === "deploying" ? styles.buttonDisabled : {}),
          }}
        >
          <MdPublish size={18} />
          {status === "deploying" ? "Republishing..." : "Republish website"}
        </button>

        <div aria-live="polite" style={styles.status}>
          {status === "success" && (
            <p style={{ ...styles.message, ...styles.success }}>
              Netlify started a new deploy.
            </p>
          )}

          {status === "error" && (
            <p style={{ ...styles.message, ...styles.error }}>
              {error ?? "Netlify could not start a new deploy."}
            </p>
          )}
        </div>

        <a
          href={NETLIFY_DEPLOYS_URL}
          rel="noreferrer"
          target="_blank"
          style={styles.link}
        >
          View deploys in Netlify
          <MdOpenInNew size={16} />
        </a>
      </section>
    </main>
  );
}

export const netlifyDeployTool: Tool<NetlifyDeployToolOptions> = {
  name: "republish",
  title: "Republish",
  icon: MdPublish,
  component: NetlifyDeployTool,
  options: {
    siteTitle: "weareamericaproject.com",
    siteName: "weareamerica",
    buildHookId: "610b6435e6c8ab72564f8425",
  },
};

const styles = {
  page: {
    minHeight: "100%",
    padding: "48px 24px",
    background: "#f8f8f6",
    color: "#1f2933",
  },
  panel: {
    maxWidth: 620,
    margin: "0 auto",
    padding: 32,
    border: "1px solid #d9ddd6",
    borderRadius: 6,
    background: "#fff",
    boxShadow: "0 8px 24px rgba(31, 41, 51, 0.08)",
  },
  iconWrap: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    marginBottom: 24,
    borderRadius: 6,
    background: "#1f2933",
    color: "#fff",
  },
  copy: {
    marginBottom: 28,
  },
  eyebrow: {
    margin: "0 0 8px",
    color: "#59636e",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0,
    textTransform: "uppercase" as const,
  },
  title: {
    margin: "0 0 12px",
    fontSize: 32,
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  description: {
    margin: 0,
    color: "#59636e",
    fontSize: 16,
    lineHeight: 1.55,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    minHeight: 42,
    padding: "0 18px",
    border: 0,
    borderRadius: 4,
    background: "#1f2933",
    color: "#fff",
    cursor: "pointer",
    fontSize: 15,
    fontWeight: 700,
  },
  buttonDisabled: {
    cursor: "wait",
    opacity: 0.72,
  },
  status: {
    minHeight: 42,
    marginTop: 18,
  },
  message: {
    margin: 0,
    padding: "12px 14px",
    borderRadius: 4,
    fontSize: 14,
    lineHeight: 1.4,
  },
  success: {
    background: "#edf7ed",
    color: "#245b2f",
  },
  error: {
    background: "#fff0f0",
    color: "#8a1f1f",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    color: "#1f2933",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
  },
};
