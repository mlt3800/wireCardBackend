export function generateBoleto(): string {
    const boleto = Math.floor(Math.random() * (99999999999 - 10000000000 + 1)) + 10000000000;
    return boleto.toString();
  }