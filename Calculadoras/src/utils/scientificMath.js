function normalizeExpression(input) {
  return input
    .replace(/\s+/g, '')
    .replace(/π/g, 'pi')
    .replace(/,/g, '.');
}

function safeEvalExpression(expression) {
  const safeMap = {
    pi: 'Math.PI',
    e: 'Math.E',
    sqrt: 'Math.sqrt',
    sin: 'Math.sin',
    cos: 'Math.cos',
    tan: 'Math.tan',
    abs: 'Math.abs',
    log: 'Math.log10',
    ln: 'Math.log'
  };

  const replaced = Object.entries(safeMap).reduce(
    (acc, [token, mathToken]) => acc.replace(new RegExp(`\\b${token}\\b`, 'g'), mathToken),
    expression
  );

  if (!/^[\d+\-*/^().A-Za-z]+$/.test(replaced)) {
    throw new Error('La expresion contiene caracteres no permitidos.');
  }

  const exponentReplaced = replaced.replace(/\^/g, '**');
  // eslint-disable-next-line no-new-func
  return Function(`"use strict"; return (${exponentReplaced});`)();
}

export function evaluateExpression(input) {
  const expression = normalizeExpression(input);
  if (!expression) {
    return { valid: false, error: 'Ingresa una expresion para calcular.' };
  }

  try {
    const result = safeEvalExpression(expression);
    if (!Number.isFinite(result)) {
      return { valid: false, error: 'El resultado no es un numero finito.' };
    }

    return {
      valid: true,
      expression,
      result: Number(result.toPrecision(12))
    };
  } catch {
    return { valid: false, error: 'No se pudo evaluar la expresion. Revisa sintaxis y funciones.' };
  }
}
