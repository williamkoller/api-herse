import { cpf } from 'cpf-cnpj-validator';

export const validateCpf = (cpfValue: string): string => {
  return cpf.format(cpfValue);
};
