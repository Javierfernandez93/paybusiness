/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=2.7.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.3'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')