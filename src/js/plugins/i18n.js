import i18next from "https://unpkg.com/i18next/dist/esm/i18next.js";
import { Cookie } from "../../../src/js/cookie.module.js?v=1.0.5";
import LanguageManager  from "../../../src/js/languageManager.module.js?v=1.0.5";

const languageManager = new LanguageManager()
const cookie = new Cookie()

const i18nPlugin = {
  async load() {

    const DEFAULT_LANGUAGE = 'es' 
    const LANGUAGE = cookie.getCookie("language") || DEFAULT_LANGUAGE
    let resources = {}

    resources[LANGUAGE] = { translation: await languageManager.getLanguage(LANGUAGE) }

    i18next.init({
      lng: cookie.getCookie("language") || DEFAULT_LANGUAGE,
      debug: false,
      resources: resources,
    });
  },
  install: (app) => {
    app.config.globalProperties.t = function (key,args) {
      return i18next.t(key,args ?? []);
    };
    app.config.globalProperties.getI18nLanguage = function () {
      return i18next.language
    };
    app.config.globalProperties.selectLanguage = function (lng) {
      i18next.changeLanguage(lng, () => {
        console.log(lng)
        cookie.setCookie("language",lng)    
      });
    };
  },
};

export default i18nPlugin;