import etsy from './src/clients/etsy.js';
import google from './src/clients/google.js';
import itunes from './src/clients/itunes.js';
import musickit from './src/clients/musickit.js';
import page from './src/clients/page.js';
import rss from './src/clients/rss.js';
import shopify from './src/clients/shopify.js';
import spotify from './src/clients/spotify.js';
import wordpress from './src/clients/wordpress.js';
import youtube from './src/clients/youtube.js';
import tentkeep, { BootrootsAttribute, findBootrootsAttribute, TKDataDomain, GalleryEntryTypes, } from 'tentkeep';
import { logic as tentkeepLogic } from 'tentkeep';
export const clients = {
    etsy,
    google,
    itunes,
    musickit,
    page,
    rss,
    shopify,
    spotify,
    tentkeep,
    wordpress,
    youtube,
};
export default clients;
export const logic = {
    tentkeep: tentkeepLogic,
};
export { TKDataDomain };
export { BootrootsAttribute, findBootrootsAttribute, GalleryEntryTypes, };
//# sourceMappingURL=index.js.map