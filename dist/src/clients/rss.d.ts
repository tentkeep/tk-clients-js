declare namespace _default {
    export { feed };
    export function podcastSummary(feedUrl: any): Promise<{
        sourceId: string;
        title: any;
        description: any;
        image: any;
        url: any;
        items: any;
    }>;
}
export default _default;
declare function feed(feedUrl: any): Promise<any>;
