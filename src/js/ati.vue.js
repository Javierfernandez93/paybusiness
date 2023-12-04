/* vue */
import { AtiViewer } from '../../src/js/atiViewer.vue.js?v=2.7.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.2'

Vue.createApp({
    components: {
        AtiViewer, FlyerViewer
    },
}).mount('#app')