// Imagens de compartilhamento geradas no build, uma por página (landing RF15). Nada roda no navegador.
import { ImageResponse } from "@vercel/og";
import type { APIRoute, GetStaticPaths } from "astro";

import { SITE } from "../../config/site";
import { SEGMENT_PAGES } from "../../content/content";

type Card = { title: string; subtitle: string };

const CARDS: Record<string, Card> = {
  home: { title: SITE.tagline, subtitle: "Compare os 4 caminhos para pagar menos de energia. Gratuito." },
  privacidade: { title: "Política de privacidade", subtitle: "Como cuidamos dos dados da sua conta de luz." },
  termos: { title: "Termos de uso", subtitle: "Estimativas em faixa, sem promessa de economia." },
  ...Object.fromEntries(
    SEGMENT_PAGES.map((s) => [s.slug, { title: `Energia para ${s.plural}`, subtitle: s.description }]),
  ),
};

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(CARDS).map((image) => ({ params: { image } }));

// Elementos no formato aceito pelo satori, sem React.
type Node = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children: unknown): Node => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = ({ params }) => {
  const card = CARDS[params.image as string];
  const tree = el(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 72,
      background: "#0f172a",
      color: "#f8fafc",
    },
    [
      el("div", { fontSize: 44, fontWeight: 700, color: "#facc15" }, SITE.name),
      el("div", { display: "flex", flexDirection: "column", gap: 24 }, [
        el("div", { fontSize: 58, fontWeight: 700, lineHeight: 1.1 }, card.title),
        el("div", { fontSize: 28, color: "#cbd5e1" }, card.subtitle),
      ]),
    ],
  );
  // @vercel/og aceita a mesma árvore que o satori; o tipo declarado é ReactElement.
  return new ImageResponse(tree as never, { width: 1200, height: 630 });
};
