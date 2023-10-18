// change accents á => a
export const normalize_str = str =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
