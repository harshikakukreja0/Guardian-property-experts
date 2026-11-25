export function formatIndianCurrency(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lac`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export const formatCurrency = formatIndianCurrency;

export function formatRentCurrency(amount: number): string {
  return `${formatIndianCurrency(amount)} / month`;
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString("en-IN")} sq.ft.`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
