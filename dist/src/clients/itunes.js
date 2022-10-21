import { api } from '../api.js';
const host = 'https://itunes.apple.com';
export default {
    podcasts: (query) => api(`${host}/search?entity=podcast&term=${query}`).then((response) => JSON.parse(response.body)),
};
//# sourceMappingURL=itunes.js.map