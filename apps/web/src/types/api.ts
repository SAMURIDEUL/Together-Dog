// Common API Response Types based on Swagger

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

export type OkResponseVoid = ApiResponse<Record<string, never>>;

export type OkResponseMapStringObject = ApiResponse<Record<string, unknown>>;

export interface TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export type OkResponseTokenResponseDto = ApiResponse<TokenResponseDto>;
