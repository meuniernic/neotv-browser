import config from './config/config.js';
import Fuse from "fuse.js";

function buildUrl(category) {
    return config.neotv.baseurl + category + '?' + config.neotv.code_param + '=' + config.neotv.key;
}

export function fuseSearchIcon(data, keyword) {
    var fuse = new Fuse(data, {keys: ['name'], shouldSort: true, threshold: 0.6, includeScore: true, tokenize: true, });
    var res = fuse.search(keyword);
    var icon = 'images/logo/';
    if (res && res.length > 0) {
      icon = icon + res[0].item.icon;
    }
    return icon;
  }

export function wrapText(text) {
    return text.substring(0, 150) + '...';
}

export function getSportUrl() {
    //return buildUrl(properties.urls.sports);
    return "http://localhost:3000/sports.json";
}

export function getMovieUrl() {
    //return buildUrl(properties.urls.movies);
    return "http://localhost:3000/movies.json";
}

export function getCartoonUrl() {
    //return buildUrl(properties.urls.cartoons);
    return "http://localhost:3000/cartoons.json";
}

export function getTvUrl() {
    //return buildUrl(properties.urls.);
    return "http://localhost:3000/tv.json";
}

export function getSearchUrl(key, type) {
    return buildUrl(config.neotv.urls.search) + '&name=' + key + (type ? '&type=' + type : '');
}