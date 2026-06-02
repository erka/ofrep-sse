import { OpenFeature } from "@openfeature/web-sdk";
import { OFREPWebProvider } from "@openfeature/ofrep-web-provider";

const app = document.getElementById("app")!;

const provider = new OFREPWebProvider(
  {
    baseUrl: window.location.origin,
  },
  console,
);

async function main() {
  await OpenFeature.setProviderAndWait(provider);

  const client = OpenFeature.getClient();
  let prev: boolean | null = null;
  const display = () => {
    const enabled = client.getBooleanValue("my-flag", false);
    if (enabled === prev) return;
    prev = enabled;
    const color = enabled ? "gold" : "purple";
    app.innerHTML = `<code>my-flag</code>: <strong style="color:${color}">${enabled}</strong>`;
  };
  setInterval(display, 5000);
  display();
}
main().catch((err) => {
  app.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
});
