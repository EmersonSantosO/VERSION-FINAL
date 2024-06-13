// src/utils/formatRut.js

export function formatRut(rut) {
  return rut.replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])$/, "$1.$2.$3-$4");
}
