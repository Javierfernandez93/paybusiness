import i18nPlugin from '../../src/js/plugins/i18n.js?v=1.0.4'
import { StoreViewer } from '../../src/js/storeViewer.vue.js?v=1.0.4'

async function initApp() {
    await i18nPlugin.load();
    
    const app = Vue.createApp({
        components: { StoreViewer },
    })

    app.use(i18nPlugin)
    app.mount('#app')
}

initApp();