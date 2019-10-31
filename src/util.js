import config from './config/config.js';
import Fuse from "fuse.js";

function buildUrl(category) {
    return buildLanguageUrl(category, '');
}

function buildLanguageUrl(category, language) {
    return config.neotv.baseurl + category + '?' + config.neotv.code_param + '=' + config.neotv.key + '&' + config.neotv.language_param + '=' + language;
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
    //return buildUrl(properties.urls.sport);
    return "http://localhost:3000/sports.json";
}

export function getMovieUrl(language) {
    //return buildLanguageUrl(properties.urls.movie);
    return "http://localhost:3000/movies.json";
}

export function getCartoonUrl(language) {
    //return buildLanguageUrl(properties.urls.cartoon);
    return "http://localhost:3000/cartoons.json";
}

export function getTvUrl() {
    //return buildUrl(properties.urls.tv);
    return "http://localhost:3000/tv.json";
}

export function getSearchUrl(key, type) {
    return buildUrl(config.neotv.urls.search) + '&name=' + key + (type ? '&type=' + type : '');
}