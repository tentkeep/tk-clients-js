import { PageInfo, PageSummary } from '@tentkeep/tentkeep';
declare const _default: {
    info: (url: string, options?: {
        timeout?: number | undefined;
    } | undefined) => Promise<PageInfo>;
    summary: (url: string, options?: {
        timeout?: number | undefined;
    } | undefined) => Promise<PageSummary>;
};
export default _default;
