import i18nPlugin from '../../src/js/plugins/i18n.js?v=1.5.0'   
import { ForgotPasswordViewer } from '../../src/js/ForgotPasswordViewer.vue.js?v=1.5.0'   

async function initApp() {
    await i18nPlugin.load();

    const app = Vue.createApp({
        components : { 
            ForgotPasswordViewer
        },
    })
    app.use(i18nPlugin)
    app.mount('#app')
}

initApp();