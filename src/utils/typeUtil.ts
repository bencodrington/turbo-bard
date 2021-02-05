export function isNumberArray(value: number | number[]): value is number[] {
  return (value as number[]).length !== undefined;
}