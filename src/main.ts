import { ClientProviderEvents, OpenFeature } from "@openfeature/web-sdk";
import { OFREPWebProvider } from "@openfeature/ofrep-web-provider";

const app = document.getElementById("app")!;

async function main() {
  const client = OpenFeature.getClient();
  let prev: boolean | null = null;
  const display = () => {
    const enabled = client.getBooleanValue("my-flag", false);
    if (enabled === prev) return;
    prev = enabled;
    const color = enabled ? "gold" : "purple";
    app.innerHTML = `<code>my-flag</code>: <strong style="color:${color}">${enabled}</strong>`;
  };
  // init context and handle events
  OpenFeature.addHandler(ClientProviderEvents.Ready, display);
  OpenFeature.addHandler(ClientProviderEvents.ConfigurationChanged, display);
  OpenFeature.setContext({ targetingKey: "asdfgh", plan: "pro" });
  // init provider
  const provider = new OFREPWebProvider(
    {
      baseUrl: window.location.origin,
      disableVisibilityRefresh: true,
    },
    console,
  );
  OpenFeature.setProvider(provider);
  // defer
  window.addEventListener("pagehide", async () => {
    OpenFeature.removeHandler(
      ClientProviderEvents.ConfigurationChanged,
      display,
    );
    OpenFeature.removeHandler(ClientProviderEvents.Ready, display);
    await OpenFeature.close();
  });
}
main().catch((err) => {
  app.innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
});
