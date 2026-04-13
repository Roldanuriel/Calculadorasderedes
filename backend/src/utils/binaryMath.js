const BASE_CONFIG = {
  binary: { radix: 2, pattern: /^[01]+$/, label: 'Binario' },
  octal: { radix: 8, pattern: /^[0-7]+$/, label: 'Octal' },
  decimal: { radix: 10, pattern: /^\d+$/, label: 'Decimal' },
  hexadecimal: { radix: 16, pattern: /^[0-9a-fA-F]+$/, label: 'Hexadecimal' }
};

export function convertBaseValue(value, sourceBase) {
  const normalizedValue = String(value ?? '').trim();
  const base = BASE_CONFIG[sourceBase];

  if (!base) {
    return { valid: false, error: 'Base de origen no soportada.' };
  }

  if (!normalizedValue) {
    return { valid: false, error: 'Ingresa un valor para convertir.' };
  }

  if (!base.pattern.test(normalizedValue)) {
    return { valid: false, error: `El valor ingresado no coincide con la base ${base.label}.` };
  }

  const asDecimal = Number.parseInt(normalizedValue, base.radix);

  return {
    valid: true,
    sourceBase,
    input: normalizedValue,
    decimalValue: asDecimal,
    results: {
      binary: asDecimal.toString(2),
      octal: asDecimal.toString(8),
      decimal: asDecimal.toString(10),
      hexadecimal: asDecimal.toString(16).toUpperCase()
    }
  };
}
