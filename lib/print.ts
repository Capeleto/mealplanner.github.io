export function hasText(...values: Array<string | undefined | null>): boolean {
  return values.some((value) => Boolean(value?.trim()));
}
