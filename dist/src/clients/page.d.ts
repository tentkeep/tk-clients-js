/// <reference types="node" resolution-mode="require"/>
/// <reference types="node/http.js" />

declare const _default: {
    info: (url: string) => Promise<{
        allowsIFrame: boolean;
        headers: import("http").IncomingHttpHeaders;
        features: string[];
    }>;
    summary: (url: string) => Promise<PageSummary>;
};
export default _default;
export declare type PageSummary = {
    url: string;
    title: string;
    description?: string;
    image?: string;
    icon?: string;
    twitter?: string;
    elements?: {
        meta: any;
        links: any;
        title: any;
    };
};
