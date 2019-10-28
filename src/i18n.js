import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

import LanguageDetector from "i18next-browser-languagedetector";
import XHR from "i18next-xhr-backend";

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,

        // have a common namespace used around the full app
        ns: ["translation"],
        defaultNS: "translation",

        keySeparator: false, // we use content as keys

        preload: ['fr', 'en'],

        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ","
        },

        react: {
            wait: true
        }
    });

export default i18n;