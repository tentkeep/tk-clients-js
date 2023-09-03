import { GalleryEntrySummary } from '@tentkeep/tentkeep';
declare const _default: {
    search: (query: string, options?: Record<string, any> | undefined) => Promise<import("@tentkeep/tentkeep").GalleryEntry[]>;
    summarize: (sourceId: string) => Promise<GalleryEntrySummary>;
    feed: (feedUrl: any) => Promise<RSS>;
};
export default _default;
declare type RSS = {
    title: string;
    description: string;
    link: string;
    image: {
        url: string;
        title: string;
        link: string;
    };
    generator: string;
    lastBuildDate: string;
    'atom:link': {
        $href: string;
        $rel: string;
        $type: string;
    };
    author: string;
    copyright: string;
    language: string;
    'anchor:support': string;
    'anchor:station': string;
    'itunes:author': string;
    'itunes:summary': string;
    'itunes:type': string;
    'itunes:owner': {
        'itunes:name': string;
        'itunes:email': string;
    };
    'itunes:explicit': string;
    'itunes:category': {
        $text: string;
    };
    'itunes:image': {
        $href: string;
    };
    item: [
        {
            title: string;
            description: string;
            link: string;
            guid: {
                _: string;
            };
            'dc:creator': string;
            pubDate: string;
            enclosure: {
                $url: string;
                $length: string;
                $type: string;
            };
            'itunes:summary': string;
            'itunes:explicit': string;
            'itunes:duration': string;
            'itunes:image': {
                $href: string;
            };
            'itunes:season': string;
            'itunes:episode': string;
            'itunes:episodeType': string;
        }
    ];
};
