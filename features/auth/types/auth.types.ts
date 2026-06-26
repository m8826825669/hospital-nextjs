export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthTokens = {
  access_token: string;
  refresh_token?: string | null;
  token_type?: string;
};

export type CurrentUser = {
  id: string;
  email: string;
  full_name?: string;
  name?: string;
  role?: string;
  tenant_id?: string;
  permissions?: string[];
};