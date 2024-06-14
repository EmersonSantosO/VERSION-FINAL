// src/utils/formatRut.js

// Formato de RUT: 12345678-9 -> 12.345.678-9
export function formatRut(rut) {
  return rut.replace(/^(\d{1,2})(\d{3})(\d{3})([\dkK])$/, "$1.$2.$3-$4");
}
