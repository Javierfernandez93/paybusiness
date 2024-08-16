import i18nPlugin from '../../src/js/plugins/i18n.js?v=1.5.0'   
import { ForgotpasswordViewer } from '../../src/js/forgotpasswordViewer.vue.js?v=1.5.0'   

async function initApp() {
    await i18nPlugin.load();

    const app = Vue.createApp({
        components : { 
            ForgotpasswordViewer
        },
    })
    app.use(i18nPlugin)
    app.mount('#app')
}

initApp();