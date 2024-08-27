import i18nPlugin from '../../src/js/plugins/i18n.js?v=1.0.6'

import { LessonViewer } from '../../src/js/lessonViewer.vue.js?v=1.0.6'

async function initApp() {
    await i18nPlugin.load();
    
    const app = Vue.createApp({
        components: { 
            LessonViewer
        },
    })
    app.use(i18nPlugin)
    app.mount('#app')
}

initApp();