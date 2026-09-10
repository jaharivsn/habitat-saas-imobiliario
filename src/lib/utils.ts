export function formatPrice(
  price: number,
  operation: "venda" | "aluguel" | "sale" | "rent" | "development" = "venda"
): string {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(price);

  if (operation === "aluguel" || operation === "rent") {
    return `${formatted}/mês`;
  }
  return formatted;
}

export function formatArea(area: number): string {
  return `${area.toLocaleString("pt-BR")} m²`;
}

export function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
