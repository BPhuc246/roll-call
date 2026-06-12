export function PercentNumberToColor(amount: number, total: number) {
  if (amount / total < 0.2) return "text-red-300";
  else if (amount / total >= 0.2 && amount / total <= 0.5)
    return "text-yellow-300";
  else if (amount / total >= 0.6 && amount / total < 0.8)
    return "text-blue-300";
  else if (amount / total >= 0.8 && amount / total <= 1)
    return "text-green-300";
}
