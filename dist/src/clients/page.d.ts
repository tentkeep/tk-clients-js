declare const _default: {
    summary: (url: string) => Promise<{
        url: string;
        title: any;
        description: string | undefined;
        image: string | undefined;
        icon: string | undefined;
        twitter: any;
        elements: {
            meta: any[] | undefined;
            links: any[] | undefined;
            title: any[] | undefined;
        };
    }>;
};
export default _default;
