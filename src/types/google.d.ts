export {}

declare global {
  interface Window {
    google: typeof google
    gapi: typeof gapi
  }

  namespace google {
    namespace accounts {
      namespace oauth2 {
        interface TokenClientConfig {
          client_id: string
          scope: string
          callback: (response: TokenResponse) => void
        }

        interface TokenClient {
          requestAccessToken: (options?: { prompt?: string }) => void
          callback: (response: TokenResponse) => void
        }

        interface TokenResponse {
          access_token: string
          expires_in: number
          error?: string
        }

        function initTokenClient(config: TokenClientConfig): TokenClient
      }
    }
  }
}
