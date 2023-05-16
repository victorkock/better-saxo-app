const baseUrl = 'https://gateway.saxobank.com/sim/openapi/port/v1/';

type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

// Define a function to set the Bearer token in the request headers
const setHeaders = (token: string): RequestInit => {
  return {
    headers: {
      Authorization: `BEARER ${token}`,
      'Content-Type': 'application/json',
      'Accept': '*/*',
    },
  };
};

export class FetchAPIClient {

  private async request<T>(method: HttpMethod, url: string, data?: any): Promise<T> {
    const requestUrl = `${baseUrl}${url}`;

    const requestOptions: RequestInit = {
      method,
      ...setHeaders(process.env.REACT_APP_API_KEY!),
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