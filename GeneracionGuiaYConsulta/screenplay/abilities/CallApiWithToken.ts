import { APIRequestContext, request } from '@playwright/test';

export class CallApiWithToken {
  private constructor(private apiContext: APIRequestContext) {}

  static async usingToken(): Promise<CallApiWithToken> {
    const requestContext = await request.newContext();
    const response = await requestContext.post('https://cmautenticacion-test.coordinadora.com/realms/test-auth/protocol/openid-connect/token', {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      form: {
        grant_type: 'client_credentials',
        client_id: 'test_client',
        client_secret: 'm0D2Mg6fkyPvbSgiVh0bGYQOzcJQpc8z',
        scope: 'openid'
      },
    });

    const body = await response.json();
    console.log(body)
    const token = body.id_token;

    const apiWithToken = await request.newContext({
      baseURL: 'https://guias-service-test.coordinadora.com',
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return new CallApiWithToken(apiWithToken);
  }

  context(): APIRequestContext {
    return this.apiContext;
  }
}
