import * as Support from "vscode-debugadapter-testsupport";
import * as Kit from "../client";
import * as puppeteer from "puppeteer";

const debServerStartedRe = /^webpack: Listening on (.+)$/m;

export class DebugClient extends Kit.DebugClient {
  browser: puppeteer.Browser | undefined;
  page: puppeteer.Page | undefined;
  async start(port?: number): Promise<void> {
    await Promise.all([
      super.start(port),
      (async () => {
        this.browser = await puppeteer.launch(
          process.env.EFFECTFUL_DEBUG_CHROME
            ? {
                headless: false,
                args: ["--auto-open-devtools-for-tabs"]
              }
            : {}
        );
        this.page = await this.browser.newPage();
      })()
    ]);
  }
  async stop() {
    if (this.browser) await this.browser.close();
    this.page = void 0;
    this.browser = void 0;
    return super.stop();
  }
  public async awaitWebpack(): Promise<string | undefined> {
    const self = this;
    const url = await new Promise<string | undefined>(cb =>
      this.on("output", function listener(event) {
        if (self.page) {
          const message = event.body.output;
          if (!message) return;
          const m = debServerStartedRe.exec(message);
          if (!m) return;
          cb(m[1]);
        } else cb();
        self.off("output", listener);
      })
    );
    if (this.page && url)
      await this.page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    return url;
  }
}
