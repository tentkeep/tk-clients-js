import { api } from '../api.js';
import { forKey } from '../shareable/common.js';
const host = 'https://www.googleapis.com/youtube/v3';
const resources = [
    'activities',
    'channels',
    'comments',
    'playlists',
    'playlistItems',
    'search',
    'videos',
    'videoCategories',
];
const resourcesApi = resources.reduce((yt, resource) => {
    yt[resource] = (params = {}) => {
        const url = new URL(`${host}/${resource}`);
        forKey(params, (k) => url.searchParams.append(k, params[k]));
        return youtube(url);
    };
    return yt;
}, {});
const playlist = (playlistId, opts = {}) => resourcesApi.playlistItems({
    playlistId,
    part: 'snippet,contentDetails',
    maxResults: 50,
    ...opts,
});
const channelForUser = (username) => youtube(`${host}/channels?forUsername=${username}&part=snippet,contentDetails`);
const playlistsForChannel = (channelId) => youtube(`${host}/playlists?channelId=${channelId}&part=snippet,contentDetails,player&maxResults=50`);
const videosForPlaylist = (playlistId, opts = {}) => {
    return playlist(playlistId, opts)
        .then((pl) => ({
        nextPageToken: pl.nextPageToken,
        videoIds: pl.items.map((i) => i.snippet.resourceId.videoId),
    }))
        .then(async ({ nextPageToken, videoIds }) => {
        const videos = await resourcesApi.videos({
            id: videoIds.join(','),
            part: 'snippet,contentDetails,player,statistics,topicDetails',
        });
        return { videos, nextPageToken };
    });
};
const allVideosForPlaylist = async (playlistId) => {
    const first = await playlist(playlistId);
    const videos = first.items;
    let pageCount = 1;
    let nextPageToken = first.nextPageToken;
    while (nextPageToken) {
        const page = await playlist(playlistId, { pageToken: nextPageToken });
        videos.push(...page.items);
        pageCount++;
        nextPageToken = page.nextPageToken;
    }
    console.log(`All videos fetched from ${pageCount} pages.`);
    return videos;
};
export default {
    ...resourcesApi,
    channelSummary: async ({ username, channelId }) => {
        let channelResponse;
        if (username) {
            channelResponse = await channelForUser(username);
        }
        else {
            channelResponse = await resourcesApi.channels({
                id: channelId,
                part: 'snippet,contentDetails',
            });
        }
        if (!channelResponse.items || channelResponse.items.length !== 1) {
            throw new Error('404');
        }
        const channel = channelResponse.items[0];
        const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
        const [uploadedVideos, playlists] = await Promise.all([
            allVideosForPlaylist(uploadsPlaylistId),
            playlistsForChannel(channel.id),
        ]);
        const img = channel.snippet.thumbnails.default;
        return {
            sourceId: channel.id,
            title: channel.snippet.title,
            image: img.url,
            publishedAt: channel.snippet.publishedAt,
            uploadsPlaylistId,
            items: uploadedVideos.map((i) => ({
                sourceId: i.id,
                title: i.snippet.title,
                description: i.snippet.description,
                image: i.snippet.thumbnails.high.url,
                date: new Date(i.contentDetails.videoPublishedAt).toISOString(),
                videoId: i.contentDetails.videoId,
            })),
            imageWidth: img.width,
            imageHeight: img.height,
            playlists: playlists.items.map((p) => ({
                sourceId: p.id,
                title: p.snippet.title,
                description: p.snippet.description,
                image: p.snippet.thumbnails.high.url,
                publishedAt: p.snippet.publishedAt,
                itemCount: p.contentDetails.itemCount,
            })),
        };
    },
    channelForUser,
    playlistsForChannel,
    playlist,
    videosForPlaylist,
};
const youtube = (url, options) => {
    const apiKey = process.env.CLIENTS_GOOGLE_YOUTUBE_API_KEY;
    const _url = url instanceof URL ? url : new URL(url);
    _url.searchParams.append('key', apiKey);
    return api(_url, options);
};
//# sourceMappingURL=youtube.js.map