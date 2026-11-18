// Conteúdo das páginas públicas (landing RF01–RF05). Regra de ouro (RF04): nenhum texto promete
// economia fixa, e o mercado livre é sempre apresentado como dependente das regras da Aneel.

/** Códigos de segmento do sistema (lead-capture RF02). */
export type Segment = "bakery" | "mini_market" | "butcher" | "ice_cream" | "gym" | "clinic";

export type SegmentPage = {
  slug: string;
  segment: Segment;
  name: string; // "padaria"
  plural: string; // "padarias"
  title: string;
  description: string;
  intro: string;
  equipment: string[];
  peak: string;
  tip: string;
};

export const SEGMENT_PAGES: SegmentPage[] = [
  {
    slug: "padarias",
    segment: "bakery",
    name: "padaria",
    plural: "padarias",
    title: "Conta de luz da padaria: vale a pena trocar de fornecedor?",
    description:
      "Fornos, câmaras frias e masseiras pesam na conta da padaria. Veja em 1 minuto se energia por assinatura ou o mercado livre compensam para você.",
    intro:
      "Na padaria, a energia trabalha antes de o primeiro cliente chegar. Forno elétrico, câmara fria e masseira fazem a conta crescer mês a mês, e quase sempre ela fica entre as maiores despesas do negócio.",
    equipment: [
      "Fornos elétricos e de lastro",
      "Câmaras frias e balcões refrigerados",
      "Masseiras e cilindros",
      "Iluminação da loja",
    ],
    peak: "O consumo mais forte costuma ser de madrugada e no começo da manhã, quando a produção do dia acontece.",
    tip: "Se boa parte da produção acontece fora do horário de pico, a tarifa branca pode valer a pena — o diagnóstico mostra os outros caminhos lado a lado.",
  },
  {
    slug: "mercadinhos",
    segment: "mini_market",
    name: "mercadinho",
    plural: "mercadinhos",
    title: "Conta de luz do mercadinho: quanto dá para economizar?",
    description:
      "Geladeiras, freezers e iluminação ligados o dia todo. Descubra em 1 minuto se o seu mercadinho paga luz demais e quais caminhos existem.",
    intro:
      "No mercadinho, geladeiras, freezers e ilhas de congelados não desligam nunca. Somados à iluminação e ao ar-condicionado, eles deixam a conta alta e constante o ano inteiro.",
    equipment: [
      "Geladeiras e expositores de bebidas",
      "Freezers e ilhas de congelados",
      "Iluminação do salão",
      "Ar-condicionado",
    ],
    peak: "O consumo é alto e bem distribuído ao longo do dia, porque a refrigeração funciona 24 horas.",
    tip: "Consumo alto e constante é o perfil em que energia por assinatura e mercado livre costumam aparecer com as maiores faixas de economia.",
  },
  {
    slug: "acougues",
    segment: "butcher",
    name: "açougue",
    plural: "açougues",
    title: "Conta de luz do açougue: como pagar menos pela refrigeração",
    description:
      "Câmaras frias e balcões refrigerados 24 horas por dia. Veja em 1 minuto se o seu açougue pode pagar menos de energia.",
    intro:
      "No açougue, a refrigeração não pode parar: câmara fria, balcões e expositores funcionam dia e noite. Por isso a energia pesa tanto no custo de cada quilo vendido.",
    equipment: ["Câmara fria", "Balcões e expositores refrigerados", "Serra fita e moedor", "Iluminação"],
    peak: "A base de consumo é a refrigeração, ligada 24 horas, com picos quando os equipamentos de corte trabalham.",
    tip: "Com refrigeração ligada o tempo todo, mudar de horário é difícil; por isso vale olhar com atenção a energia por assinatura e o mercado livre.",
  },
  {
    slug: "sorveterias",
    segment: "ice_cream",
    name: "sorveteria",
    plural: "sorveterias",
    title: "Conta de luz da sorveteria: o peso dos freezers no verão",
    description:
      "Freezers, produtoras de sorvete e ar-condicionado fazem a conta disparar no calor. Descubra em 1 minuto se dá para pagar menos.",
    intro:
      "Na sorveteria, a conta acompanha o termômetro: no verão, freezers, produtoras e ar-condicionado trabalham no limite, e a energia vira uma das maiores despesas.",
    equipment: [
      "Freezers e vitrines de sorvete",
      "Máquinas produtoras",
      "Ar-condicionado",
      "Iluminação da loja",
    ],
    peak: "O consumo cresce muito nos meses quentes e à tarde, quando o movimento é maior.",
    tip: "Como o consumo varia ao longo do ano, o diagnóstico usa a média do seu histórico e mostra a economia em faixa, não um número fixo.",
  },
  {
    slug: "academias",
    segment: "gym",
    name: "academia",
    plural: "academias",
    title: "Conta de luz da academia: esteiras, ar-condicionado e chuveiros",
    description:
      "Esteiras, ar-condicionado e chuveiros elétricos pesam na conta da academia. Veja em 1 minuto quais caminhos podem reduzir esse custo.",
    intro:
      "Na academia, a conta junta muita coisa: esteiras e bicicletas, ar-condicionado no salão, som, iluminação e chuveiros elétricos nos vestiários.",
    equipment: [
      "Ar-condicionado",
      "Esteiras e equipamentos elétricos",
      "Chuveiros elétricos",
      "Iluminação e som",
    ],
    peak: "Os horários de maior movimento — começo da manhã e começo da noite — são também os de maior consumo, e o da noite coincide com o horário de pico.",
    tip: "Como boa parte do movimento cai no horário de pico, a tarifa branca nem sempre ajuda; o diagnóstico compara os 4 caminhos para o seu caso.",
  },
  {
    slug: "clinicas",
    segment: "clinic",
    name: "clínica",
    plural: "clínicas",
    title: "Conta de luz da clínica: energia que não pode faltar",
    description:
      "Ar-condicionado, equipamentos e autoclaves em horário comercial. Descubra em 1 minuto se a sua clínica paga luz demais.",
    intro:
      "Na clínica, conforto e equipamentos andam juntos: ar-condicionado nas salas, autoclave, aparelhos de exame e iluminação durante todo o horário de atendimento.",
    equipment: [
      "Ar-condicionado das salas",
      "Autoclave e esterilização",
      "Equipamentos de exame",
      "Iluminação e computadores",
    ],
    peak: "O consumo se concentra no horário comercial, com o ar-condicionado como maior responsável nos meses quentes.",
    tip: "Com consumo concentrado em horário comercial, a tarifa branca pode ser uma opção; o diagnóstico mostra se ela e os outros caminhos fazem sentido para você.",
  },
];

export function segmentBySlug(slug: string): SegmentPage | undefined {
  return SEGMENT_PAGES.find((s) => s.slug === slug);
}

export const PATHS_EXPLAINED = [
  {
    title: "Ficar como está",
    text: "Se nenhuma alternativa compensa para o seu perfil, a gente diz isso com todas as letras.",
  },
  {
    title: "Tarifa branca",
    text: "Preço menor fora do horário de pico. Pode valer a pena para quem consegue concentrar o consumo fora dele.",
  },
  {
    title: "Energia por assinatura",
    text: "Você recebe créditos de uma usina solar parceira na sua região e paga menos pela parte de energia, sem obra e sem instalar nada.",
  },
  {
    title: "Mercado livre de energia",
    text: "A partir de 25/11/2027, comércios e indústrias pequenos poderão escolher de quem compram energia. As regras ainda dependem da Aneel.",
  },
];

export const HOW_IT_WORKS = [
  { title: "Envie a conta", text: "O PDF da distribuidora ou uma foto pelo celular." },
  { title: "Confira os dados", text: "Lemos a conta automaticamente; você corrige o que precisar." },
  { title: "Veja os 4 caminhos", text: "A economia de cada um em faixa, com as premissas abertas." },
];

export const FAQ = [
  {
    question: "O que é o mercado livre de energia e quando ele abre para pequenos negócios?",
    answer:
      "É poder escolher de quem comprar energia, em vez de comprar só da distribuidora. Pelo decreto publicado em 2026, comércios e indústrias em baixa tensão poderão migrar a partir de 25/11/2027, e residências e demais consumidores a partir de 25/11/2028. Os detalhes ainda dependem de regras da Aneel, por isso tratamos os números do mercado livre como estimativa.",
  },
  {
    question: "O que é energia por assinatura?",
    answer:
      "É a geração distribuída compartilhada: uma usina solar na mesma área da sua distribuidora gera créditos de energia que são abatidos da sua conta. Você paga a assinatura com desconto e continua recebendo a conta da distribuidora. Não há obra nem instalação.",
  },
  {
    question: "O que acontece com os dados da minha conta?",
    answer:
      "Usamos a conta só para calcular o diagnóstico. O arquivo é apagado em até 30 dias. Se você não deixar contato, os dados pessoais lidos também são apagados em 30 dias. Se deixar, você escolhe com quem eles podem ser compartilhados e pode apagar tudo quando quiser. Detalhes na política de privacidade.",
  },
  {
    question: "Por que o resultado é uma faixa e não um número exato?",
    answer:
      "Porque a economia depende de fatores que mudam: o desconto que cada fornecedor oferece, as bandeiras tarifárias, os impostos do seu estado e, no mercado livre, regras que a Aneel ainda vai publicar. Preferimos mostrar uma faixa honesta, com as premissas abertas, a prometer um número que pode não se confirmar.",
  },
  {
    question: "Quanto custa?",
    answer:
      "Nada para você. Somos remunerados pelos fornecedores parceiros quando você contrata um deles, e isso não muda o seu preço.",
  },
];

/** Termos que nunca podem aparecer nos textos públicos (RF04, CA02). */
export const FORBIDDEN_PATTERNS: RegExp[] = [
  /economia garantida/i,
  /garant(e|imos|ida)\s+(de\s+)?economia/i,
  /economiz[ea]\s+(até\s+)?\d/i,
  /\d+\s?%\s+de\s+economia/i,
  /\bsem risco\b/i,
];
