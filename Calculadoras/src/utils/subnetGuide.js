const STEPS = [
  'Define la cantidad de hosts por subred y convierte ese requisito a potencia de 2.',
  'Calcula el nuevo prefijo: 32 - bits para hosts.',
  'Obtiene el tamano de bloque en el octeto interesante: 256 - mascara del octeto.',
  'Enumera subredes en incrementos del tamano de bloque.',
  'Por cada subred: identifica red, primer host, ultimo host y broadcast.'
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
