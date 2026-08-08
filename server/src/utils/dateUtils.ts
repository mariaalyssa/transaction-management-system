export function formatDateToIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function normalizeDateInput(date: unknown): string {
  if (date instanceof Date && !Number.isNaN(date.getTime())) {
    return formatDateToIso(date);
  }

  if (typeof date === "string") {
    const trimmed = date.trim();
    if (trimmed.length) {
      const parsed = new Date(trimmed);
      if (!Number.isNaN(parsed.getTime())) {
        return formatDateToIso(parsed);
      }
    }
  }

  if (date !== undefined && date !== null) {
    const stringValue = String(date).trim();
    if (stringValue.length) {
      const parsed = new Date(stringValue);
      if (!Number.isNaN(parsed.getTime())) {
        return formatDateToIso(parsed);
      }
    }
  }

  return formatDateToIso(new Date());
}
