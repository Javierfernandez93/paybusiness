import i18nPlugin from '../../src/js/plugins/i18n.js?v=1.4.3'
import { HomeViewer } from '../../src/js/homeViewer.vue.js?v=1.4.3'

async function initApp() {
    await i18nPlugin.load();
    
    const app = Vue.createApp({
        components : { 
            HomeViewer
        }
    })
    app.use(i18nPlugin)
    app.mount('#app')
}

initApp();