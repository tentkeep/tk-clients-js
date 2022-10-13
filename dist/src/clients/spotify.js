import { api } from '../api.js';
const host = 'https://api.spotify.com';
export default {
    searchArtists: (query) => spotify(`${host}/v1/search?q=${query}&type=artist`),
    searchPlaylists: (query) => spotify(`${host}/v1/search?q=${query}&type=playlist`),
    userPlaylists: (userId) => spotify(`${host}/v1/users/${userId}/playlists`),
    playlist: (playlistId) => spotify(`${host}/v1/playlists/${playlistId}`),
    playlistTracks: (playlistId) => spotify(`${host}/v1/playlists/${playlistId}/tracks`),
};
var cachedToken = null;
const spotify = async (url, options) => {
    if (!cachedToken) {
        cachedToken = await token();
    }
    const _options = { ...options };
    _options.headers = {
        ..._options.headers,
        Authorization: `Bearer ${cachedToken}`,
    };
    return api(url, _options).catch(async (e) => {
        if (e.status === 401) {
            cachedToken = await token();
            return spotify(url, _options);
        }
        else {
            throw e;
        }
    });
};
const authHeader = () => {
    const id = process.env.CLIENTS_SPOTIFY_CLIENT_ID;
    const secret = process.env.CLIENTS_SPOTIFY_CLIENT_SECRET;
    return Buffer.from(`${id}:${secret}`).toString('base64');
};
const token = () => api('https://accounts.spotify.com/api/token', {
    method: 'post',
    headers: {
        Authorization: `Basic ${authHeader()}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
}).then((tokenPayload) => tokenPayload.access_token);
//# sourceMappingURL=spotify.js.map