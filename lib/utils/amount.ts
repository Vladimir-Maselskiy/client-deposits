export function digitsOnly(value: string) {
  return value.replace(/\D+/g, "");
}

export function formatAmountInput(value: string) {
  const digits = digitsOnly(value);

  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function parseAmountInput(value: string) {
  const digits = digitsOnly(value);

  return digits ? Number(digits) : 0;
}
