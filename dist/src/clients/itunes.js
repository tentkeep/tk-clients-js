import { api } from '../api.js';
import { GalleryEntryTypes, } from '@tentkeep/tentkeep';
const host = 'https://itunes.apple.com';
const podcasts = (query) => api(`${host}/search?entity=podcast&term=${query}`).then((response) => JSON.parse(response.body));
const contentClient = {
    search: (query) => podcasts(query).then((result) => result.results.map((r) => ({
        sourceId: r.feedUrl,
        entryType: GalleryEntryTypes.Podcast,
        genericType: 'audio',
        title: r.collectionName,
        description: r.genres.join(', '),
        url: r.feedUrl,
        image: r.artworkUrl600,
    }))),
    summarize: (_sourceId) => Promise.resolve({}),
};
export default {
    podcasts,
    ...contentClient,
};
//# sourceMappingURL=itunes.js.map