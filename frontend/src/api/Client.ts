
const baseUrl = 'https://gateway.saxobank.com/sim/openapi/port/v1/';

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

// Define a function to set the Bearer token in the request headers
const setHeaders = (token: string): RequestInit => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

class FetchAPIClient {
  private baseUrl: string;
  private token: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  private async request<T>(method: HttpMethod, url: string, data?: any): Promise<T> {
    const requestUrl = `${this.baseUrl}${url}`;

    const requestOptions: RequestInit = {
      method,
      ...setHeaders(this.token),
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      const response = await fetch(requestUrl, requestOptions);
      if (!response.ok) {
        throw new Error('An error occurred');
      }
      const responseData: T = await response.json();
      return responseData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public get<T>(url: string): Promise<T> {
    return this.request<T>('GET', url);
  }

  public post<T>(url: string, data: any): Promise<T> {
    return this.request<T>('POST', url, data);
  }

  public delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url);
  }

  public put<T>(url: string, data: any): Promise<T> {
    return this.request<T>('PUT', url, data);
  }
}