/* vue */
import { ComingViewer } from '../../src/js/comingViewer.vue.js?v=1.0.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.2'

Vue.createApp({
    components: {
        ComingViewer, FlyerViewer
    },
}).mount('#app')