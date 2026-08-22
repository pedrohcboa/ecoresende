import { Lightbulb, Leaf, PackageCheck } from "lucide-react";

const infoCards = [
  {
    icon: Leaf,
    title: "Coleta Seletiva",
    text: "Separe seus resíduos em recicláveis (papel, plástico, metal, vidro) e orgânicos. Isso facilita o trabalho dos catadores e cooperativas.",
    color: "text-primary" as const,
    bgColor: "bg-primary/10" as const,
  },
  {
    icon: Lightbulb,
    title: "Descarte Correto",
    text: "Pilhas, lâmpadas, eletrônicos e óleo de cozinha nunca devem ir para o lixo comum. Procure um ponto de coleta especializado.",
    color: "text-accent-foreground" as const,
    bgColor: "bg-accent/10" as const,
  },
  {
    icon: PackageCheck,
    title: "Prepare o Material",
    text: "Lave embalagens antes de reciclar, amasse latas e caixas, e retire tampas de garrafas. Material limpo tem mais valor.",
    color: "text-primary" as const,
    bgColor: "bg-secondary" as const,
  },
];

const InfoCards = () => {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
        Dicas de reciclagem
      </h4>
      {infoCards.map((card) => (
        <div
          key={card.title}
          className="rounded-lg border border-border bg-card p-3 space-y-1.5"
        >
          <div className="flex items-center gap-2">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <h5 className="text-sm font-semibold text-card-foreground">{card.title}</h5>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{card.text}</p>
        </div>
      ))}

    </div>
  );
};

export default InfoCards;
