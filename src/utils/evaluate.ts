import type { ParseState } from "@/types/Evaluate";

// Remove operadores soltos do final e fecha parênteses abertos antes de avaliar
const prepareForEval = (expr: string): string => {
  let prepared = expr;
  while (
    prepared.length > 0 &&
    "+-×÷".includes(prepared[prepared.length - 1])
  ) {
    prepared = prepared.slice(0, -1);
  }
  const open = countOpenParens(prepared);
  for (let i = 0; i < open; i++) {
    prepared += ")";
  }
  return prepared;
};

// Conta quantos parênteses estão abertos (sem fechar) na expressão
export const countOpenParens = (expr: string): number => {
  let count = 0;
  for (const ch of expr) {
    if (ch === "(") count++;
    if (ch === ")") count--;
  }
  return count;
};

// Avança o cursor ignorando espaços em branco
const skipSpaces = (state: ParseState) => {
  while (state.pos < state.expr.length && state.expr[state.pos] === " ") {
    state.pos++;
  }
};

// Lê e converte um número literal a partir da posição atual
const parseNumber = (state: ParseState): number => {
  let num = "";
  while (
    state.pos < state.expr.length &&
    ((state.expr[state.pos] >= "0" && state.expr[state.pos] <= "9") ||
      state.expr[state.pos] === ".")
  ) {
    num += state.expr[state.pos];
    state.pos++;
  }
  if (!num) throw new Error("Expected number at position " + state.pos);
  return parseFloat(num);
};

// Resolve fatores: números, expressões entre parênteses e sinais unários (+/-)
const parseFactor = (state: ParseState): number => {
  skipSpaces(state);

  if (state.pos < state.expr.length && state.expr[state.pos] === "-") {
    state.pos++;
    return -parseFactor(state);
  }
  if (state.pos < state.expr.length && state.expr[state.pos] === "+") {
    state.pos++;
    return parseFactor(state);
  }

  if (state.pos < state.expr.length && state.expr[state.pos] === "(") {
    state.pos++;
    const result = parseExpression(state);
    if (state.pos < state.expr.length && state.expr[state.pos] === ")") {
      state.pos++;
    }
    return result;
  }

  return parseNumber(state);
};

// Resolve multiplicações e divisões (maior precedência que + e -)
const parseTerm = (state: ParseState): number => {
  let left = parseFactor(state);

  while (state.pos < state.expr.length) {
    const ch = state.expr[state.pos];
    if (ch === "*" || ch === "/") {
      state.pos++;
      const right = parseFactor(state);
      if (ch === "*") left *= right;
      else {
        if (right === 0) throw new Error("Division by zero");
        left /= right;
      }
    } else {
      break;
    }
  }

  return left;
};

// Resolve somas e subtrações (menor precedência)
const parseExpression = (state: ParseState): number => {
  let left = parseTerm(state);

  while (state.pos < state.expr.length) {
    const ch = state.expr[state.pos];
    if (ch === "+" || ch === "-") {
      state.pos++;
      const right = parseTerm(state);
      left = ch === "+" ? left + right : left - right;
    } else {
      break;
    }
  }

  return left;
};

// Avalia uma expressão matemática completa com precedência de operadores
export const evaluate = (expr: string): number => {
  const prepared = prepareForEval(expr);
  if (!prepared.trim()) throw new Error("Empty expression");

  const sanitized = prepared.replace(/×/g, "*").replace(/÷/g, "/");
  const state: ParseState = { pos: 0, expr: sanitized };
  const result = parseExpression(state);

  if (!Number.isFinite(result)) throw new Error("Invalid result");
  return result;
};
