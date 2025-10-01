export type Currency = "USD" | "CLP"

export function formatCurrency(amount: number, currency: Currency = "USD"): string {
  const absAmount = Math.abs(amount)

  if (currency === "CLP") {
    // Chilean Peso: no decimals, use dot as thousands separator
    return `$${absAmount.toLocaleString("es-CL", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`
  }

  // USD: 2 decimals, comma as thousands separator
  return `$${absAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}

export function getCurrencySymbol(currency: Currency = "USD"): string {
  return currency === "CLP" ? "CLP $" : "USD $"
}
