export declare const sanitizeOptions: (options: any | null) => any;
export type RequestOptions = {
    method?: 'get' | 'post' | 'put' | 'delete';
    headers?: Record<string, string | undefined>;
    body?: any;
};
export declare class ApiStatusError extends Error {
    status: number;
    bodyText: string;
    constructor(status: any, bodyText: any);
}
export type API = (url: string | URL, options?: RequestOptions | RequestInit | null) => Promise<any>;
export declare const api: API;
export default api;
