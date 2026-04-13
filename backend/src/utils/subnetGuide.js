const STEPS = [
  'Determina la cantidad de hosts requerida por subred.',
  'Calcula bits de host y prefijo objetivo (32 - bits de host).',
  'Verifica el tamano de bloque con 256 - mascara en octeto variable.',
  'Lista subredes en incrementos constantes y valida red/broadcast.',
  'Documenta rangos usables y reservas segun politica de direccionamiento.'
];

export function buildSubnetGuide(prefix) {
  const parsedPrefix = Number(prefix);

  if (!Number.isInteger(parsedPrefix) || parsedPrefix < 0 || parsedPrefix > 32) {
    return { valid: false, error: 'Prefijo invalido. Debe estar entre 0 y 32.' };
  }

  const hostBits = 32 - parsedPrefix;
  const totalAddresses = 2 ** hostBits;
  const usableHosts = parsedPrefix >= 31 ? 0 : totalAddresses - 2;

  return {
    valid: true,
    prefix: parsedPrefix,
    hostBits,
    totalAddresses,
    usableHosts,
    steps: STEPS
  };
}
