export class ApiStatusError extends Error {
    constructor(status: any, bodyText: any);
    status: any;
    bodyText: any;
}
export function api(url: any, options: any): any;
export default api;
