export type ApiResult<T> = { data: T; error?: undefined } | { data?: undefined; error: string };

export const api = {
  // Placeholder: swap this for Supabase / your backend later.
  async ping(): Promise<ApiResult<{ ok: true }>> {
    return { data: { ok: true } };
  },
};
