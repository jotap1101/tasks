import { createAuthClient } from "better-auth/react";

type ErrorTypes = Partial<
  Record<
    keyof typeof authClient.$ERROR_CODES,
    {
      en: string;
      ptBr: string;
    }
  >
>;

const errorCodes = {
  // Erros de Autenticação e Usuário
  USER_NOT_FOUND: {
    en: "User not found",
    ptBr: "Usuário não encontrado",
  },
  USER_EMAIL_NOT_FOUND: {
    en: "User email not found",
    ptBr: "Nenhum usuário encontrado com este email",
  },
  USER_ALREADY_EXISTS: {
    en: "User already registered",
    ptBr: "Este email já está registrado",
  },
  INVALID_EMAIL: {
    en: "Invalid email",
    ptBr: "O email informado é inválido",
  },
  INVALID_PASSWORD: {
    en: "Invalid password",
    ptBr: "A senha informada está incorreta",
  },
  INVALID_EMAIL_OR_PASSWORD: {
    en: "Invalid email or password",
    ptBr: "Email ou senha inválidos",
  },
  PASSWORD_TOO_SHORT: {
    en: "Password is too short",
    ptBr: "A senha é muito curta",
  },
  PASSWORD_TOO_LONG: {
    en: "Password is too long",
    ptBr: "A senha é muito longa",
  },
  EMAIL_NOT_VERIFIED: {
    en: "Email not verified",
    ptBr: "O email ainda não foi verificado",
  },
  USER_ALREADY_HAS_PASSWORD: {
    en: "User already has a password set",
    ptBr: "Este usuário já possui uma senha cadastrada",
  },

  // Erros de Sessão e Conta
  SESSION_EXPIRED: {
    en: "Session expired",
    ptBr: "Sua sessão expirou. Por favor, faça login novamente",
  },
  CREDENTIAL_ACCOUNT_NOT_FOUND: {
    en: "Account not found. Please sign up",
    ptBr: "Conta não encontrada. Por favor, realize o cadastro",
  },
  ACCOUNT_NOT_FOUND: {
    en: "Account not found",
    ptBr: "Conta não encontrada",
  },
  SOCIAL_ACCOUNT_ALREADY_LINKED: {
    en: "This social account is already linked to another user",
    ptBr: "Esta conta social já está vinculada a outro usuário",
  },
  EMAIL_CAN_NOT_BE_UPDATED: {
    en: "Email can not be updated",
    ptBr: "O email não pode ser atualizado",
  },

  // Erros de Token e Provedor
  INVALID_TOKEN: {
    en: "Invalid token",
    ptBr: "Token inválido ou expirado",
  },
  ID_TOKEN_NOT_SUPPORTED: {
    en: "ID token is not supported by this provider",
    ptBr: "O token de ID não é suportado por este provedor",
  },
  PROVIDER_NOT_FOUND: {
    en: "Provider not found",
    ptBr: "Provedor de autenticação não encontrado",
  },

  // Erros Genéricos do Servidor
  FAILED_TO_CREATE_USER: {
    en: "Failed to create user",
    ptBr: "Falha ao criar o usuário. Tente novamente",
  },
  FAILED_TO_UPDATE_USER: {
    en: "Failed to update user",
    ptBr: "Falha ao atualizar o usuário. Tente novamente",
  },
  FAILED_TO_CREATE_SESSION: {
    en: "Failed to create session",
    ptBr: "Não foi possível iniciar a sessão. Tente novamente",
  },
  FAILED_TO_GET_SESSION: {
    en: "Failed to get session information",
    ptBr: "Não foi possível obter as informações da sessão",
  },
  FAILED_TO_GET_USER_INFO: {
    en: "Failed to get user information",
    ptBr: "Não foi possível obter as informações do usuário",
  },
  FAILED_TO_UNLINK_LAST_ACCOUNT: {
    en: "Failed to unlink the last remaining account",
    ptBr: "Não é possível desvincular a última conta conectada",
  },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string, lang: "en" | "ptBr") => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes][lang];
  }
  return "";
};

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});
