// Verifica se o caractere é um operador matemático
export const isOperator = (ch: string) => "+-×÷".includes(ch);

// Formata um número para exibição no padrão pt-BR (ponto como milhar, vírgula como decimal)
export const formatNumber = (value: number): string => {
  if (!Number.isFinite(value)) return "Erro";
  if (Math.abs(value) >= 1e15) return value.toExponential(2);

  const str = value.toString();
  const [intPart, decPart] = str.split(".");
  const isNegative = intPart.startsWith("-");
  const absInt = isNegative ? intPart.slice(1) : intPart;
  const formattedInt = absInt.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  let result = decPart ? `${formattedInt},${decPart}` : formattedInt;
  if (isNegative) result = "-" + result;
  return result;
};

// Converte um número formatado (pt-BR) de volta para formato raw (ponto como decimal)
export const resultToRaw = (formatted: string): string =>
  formatted.replace(/\./g, "").replace(",", ".");

// Converte a expressão raw (ex: "12+34×5") para exibição formatada (ex: "12 + 34 × 5")
export const formatExpression = (raw: string): string => {
  if (!raw) return "";

  let result = "";
  let i = 0;

  while (i < raw.length) {
    const ch = raw[i];

    if ((ch >= "0" && ch <= "9") || ch === ".") {
      let num = "";
      while (
        i < raw.length &&
        ((raw[i] >= "0" && raw[i] <= "9") || raw[i] === ".")
      ) {
        num += raw[i];
        i++;
      }
      const parts = num.split(".");
      const intFormatted = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      if (parts.length > 1) {
        result += intFormatted + "," + parts[1];
      } else {
        result += intFormatted;
        if (num.endsWith(".")) result += ",";
      }
    } else if (isOperator(ch)) {
      result += " " + ch + " ";
      i++;
    } else {
      result += ch;
      i++;
    }
  }

  return result;
};

// Extrai o último número da expressão (usado para validação de decimal e porcentagem)
export const getLastNumber = (expr: string): string => {
  let num = "";
  for (let i = expr.length - 1; i >= 0; i--) {
    const ch = expr[i];
    if ((ch >= "0" && ch <= "9") || ch === ".") {
      num = ch + num;
    } else {
      break;
    }
  }
  return num;
};
