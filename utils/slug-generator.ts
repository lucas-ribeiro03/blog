const generateSlug = (text: string): string => {
  return text
    .toLowerCase() // 1. Tudo em minúsculo
    .replace(/\s+/g, "-") // 2. Substitui espaços por hífens (mais comum para slugs)
    .normalize("NFD") // Remove acentos (ex: "á" -> "a´")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "") // 3. Remove todos os caracteres não-alfanuméricos, exceto hífens
    .replace(/--+/g, "-") // Substitui múltiplos hífens por um só
    .replace(/^-+/, "") // Remove hífens do início
    .replace(/-+$/, ""); // Remove hífens do final
};

export const generateUniqueSlug = (text: string): string => {
  const slug = generateSlug(text);
  const random = Date.now().toString().trim().slice(0, -3);
  return slug + random;
};
