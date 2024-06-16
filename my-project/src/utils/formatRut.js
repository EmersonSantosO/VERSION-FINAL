// src/utils/formatRut.js

export function formatRut(rut) {
  const cleanRut = rut.replace(/[^\dkK]/g, "");

  if (cleanRut.length <= 1) return cleanRut;

  let result = cleanRut.slice(-1);
  let counter = 0;

  for (let i = cleanRut.length - 2; i >= 0; i--) {
    if (counter === 3) {
      result = `.${result}`;
      counter = 0;
    }
    result = cleanRut[i] + result;
    counter++;
  }

  return result.length > 1
    ? result.slice(0, -1) + "-" + result.slice(-1)
    : result;
}
