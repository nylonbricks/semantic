export const slugify = (text: string): string =>
  text.toLowerCase().replace(/[\s/]/g, "-");
