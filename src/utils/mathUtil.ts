export function randIntBetween(a: number, b: number) {
  // Force inputs to integers
  const intA = Math.round(a);
  const intB = Math.round(b);
  const min = Math.min(intA, intB);
  const max = Math.max(intA, intB);
  const range = max - min;
  
  const result = min + Math.round(Math.random() * range);
  return result;
}

export function clamp(min: number, value: number, max: number) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}