import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Site público da Kilu (specs/features/landing.md).

const PAGES = [
  "/",
  "/energia-para/padarias",
  "/energia-para/mercadinhos",
  "/energia-para/acougues",
  "/energia-para/sorveterias",
  "/energia-para/academias",
  "/energia-para/clinicas",
  "/privacidade",
  "/termos",
];

const FORBIDDEN = [
  /economia garantida/i,
  /garant(e|imos|ida)\s+(de\s+)?economia/i,
  /economiz[ea]\s+(até\s+)?\d/i,
  /\d+\s?%\s+de\s+economia/i,
  /\bsem risco\b/i,
];

/** Captures the anonymous events the page sends and answers 204, like the API. */
async function captureEvents(page: Page) {
  const events: Array<{ body: Record<string, unknown>; credentials: string | null }> = [];
  await page.route("https://api.kilu.example/api/v1/metrics/events", async (route) => {
    events.push({
      body: route.request().postDataJSON(),
      credentials: route.request().headers()["cookie"] ?? null,
    });
    await route.fulfill({ status: 204 });
  });
  return events;
}

async function expectNoHorizontalScroll(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth),
  ).toBe(false);
}

test("home has the promise, the button above the fold, how it works, the 4 paths, remuneration and FAQ (CA01)", async ({
  page,
}) => {
  await captureEvents(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Descubra em 1 minuto se sua empresa paga luz demais",
  );
  const cta = page.getByRole("link", { name: "Enviar minha conta (PDF ou foto)" });
  await expect(cta).toBeInViewport();
  await expect(cta).toHaveAttribute("href", "https://app.kilu.example/simulador");
  await expect(page.getByRole("heading", { name: "Como funciona" })).toBeVisible();
  for (const path of [
    "Ficar como está",
    "Tarifa branca",
    "Energia por assinatura",
    "Mercado livre de energia",
  ]) {
    await expect(page.getByRole("heading", { name: path, exact: true })).toBeVisible();
  }
  await expect(page.getByText("Somos pagos pelos fornecedores parceiros, não por você.")).toBeVisible();
  await expect(page.locator("details")).toHaveCount(5);
  await expectNoHorizontalScroll(page);
});

test("no page promises fixed savings (CA02)", async ({ request }) => {
  for (const path of PAGES) {
    const html = await (await request.get(path)).text();
    const text = html.replace(/<[^>]+>/g, " ");
    for (const pattern of FORBIDDEN) expect(text, `${path} matches ${pattern}`).not.toMatch(pattern);
  }
});

test("the 6 segment pages have their own content and lead to the simulator with the segment (CA03, CA04)", async ({
  page,
}) => {
  await captureEvents(page);
  const titles = new Set<string>();
  for (const slug of ["padarias", "mercadinhos", "acougues", "sorveterias", "academias", "clinicas"]) {
    await page.goto(`/energia-para/${slug}`);
    const title = await page.getByRole("heading", { level: 1 }).innerText();
    titles.add(title);
    const cta = page.getByRole("link", { name: /Ver o diagnóstico da minha/ });
    await expect(cta).toHaveAttribute("href", `https://app.kilu.example/simulador?segmento=${slug}`);
    await expectNoHorizontalScroll(page);
  }
  expect(titles.size).toBe(6);
});

test("legal pages have every required item, version, date and the provisional notice (CA05)", async ({
  page,
}) => {
  await captureEvents(page);
  await page.goto("/privacidade");
  for (const section of [
    "controller",
    "data",
    "purposes",
    "consents",
    "sharing",
    "retention",
    "international",
    "rights",
  ]) {
    await expect(page.locator(`[data-section="${section}"]`)).toBeVisible();
  }
  await expect(page.getByText("Versão v1-provisorio")).toBeVisible();
  await expect(page.getByRole("note")).toContainText("Texto provisório");
  await expect(page.locator('[data-section="controller"]')).toContainText("a definir");

  await page.goto("/termos");
  for (const section of ["estimates", "remuneration", "no-promise", "user"]) {
    await expect(page.locator(`[data-section="${section}"]`)).toBeVisible();
  }
  await expect(page.getByRole("note")).toContainText("Texto provisório");
});

test("a referral link is carried to every link into the system; malformed codes are ignored (CA06)", async ({
  page,
}) => {
  await captureEvents(page);
  await page.goto("/energia-para/padarias?ref=Contador-Joao");
  await expect(page.getByRole("link", { name: /Ver o diagnóstico da minha/ })).toHaveAttribute(
    "href",
    "https://app.kilu.example/simulador?segmento=padarias&ref=contador-joao",
  );
  // the code survives navigation inside the site (same tab)
  await page.getByRole("link", { name: "Kilu" }).first().click();
  await expect(page.getByRole("link", { name: "Enviar minha conta (PDF ou foto)" })).toHaveAttribute(
    "href",
    "https://app.kilu.example/simulador?ref=contador-joao",
  );

  const fresh = await page.context().browser()!.newPage();
  await fresh.route("https://api.kilu.example/**", (r) => r.fulfill({ status: 204 }));
  await fresh.goto("/?ref=<script>");
  await expect(fresh.getByRole("link", { name: "Enviar minha conta (PDF ou foto)" })).toHaveAttribute(
    "href",
    "https://app.kilu.example/simulador",
  );
  await fresh.close();
});

test("visits are counted anonymously, without cookies (CA07)", async ({ page, context }) => {
  const events = await captureEvents(page);
  await page.goto("/energia-para/academias");
  await expect.poll(() => events.length).toBe(1);
  expect(events[0].body).toEqual({ event: "visit", page: "/energia-para/academias" });
  expect(events[0].credentials).toBeNull();
  expect(await context.cookies()).toEqual([]);
});

test("public pages have their own metadata and share image, and are in the sitemap (CA08)", async ({
  page,
  request,
}) => {
  await captureEvents(page);
  const seen = new Set<string>();
  for (const path of PAGES) {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    const image = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(title).toContain("Kilu");
    expect(description?.length).toBeGreaterThan(40);
    expect(image).toMatch(/^https:\/\/kilu\.example\/og\/[a-z]+\.png$/);
    const png = await request.get(new URL(image!).pathname);
    expect(png.headers()["content-type"]).toContain("image/png");
    seen.add(title);
  }
  expect(seen.size).toBe(PAGES.length);

  const sitemap = await (await request.get("/sitemap-0.xml")).text();
  for (const path of PAGES)
    expect(sitemap).toContain(`<loc>https://kilu.example${path === "/" ? "/" : path}</loc>`);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Sitemap: https://kilu.example/sitemap-index.xml");
});

test("main content is in the HTML without running JavaScript (CA09)", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/energia-para/clinicas");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Conta de luz da clínica: energia que não pode faltar",
  );
  await context.close();
});

test("the product name comes from one place (CA10)", async ({ page }) => {
  await captureEvents(page);
  await page.goto("/termos");
  await expect(page.locator("header .brand")).toHaveText("Kilu");
  await expect(page.locator('[data-section="service"]')).toContainText("A Kilu lê a conta");
});

test("pages have no detectable accessibility violations (CA12)", async ({ page }) => {
  await captureEvents(page);
  for (const path of PAGES) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations.map((v) => `${path}: ${v.id} — ${v.help}`)).toEqual([]);
  }
});
