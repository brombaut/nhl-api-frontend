import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class Api {
  private instance: AxiosInstance;

  public constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use((param: AxiosRequestConfig) => ({
      ...param
    }));
  }

  public getUri(config?: AxiosRequestConfig): string {
    return this.instance.getUri(config);
  }

  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.request(config);
  }

  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get(url, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.delete(url, config);
  }

  public head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.head(url, config);
  }

  public post<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post(url, data, config);
  }

  public put<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put(url, data, config);
  }

  public patch<T, R = AxiosResponse<T>>(
    url: string,
    data?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch(url, data, config);
  }
}
