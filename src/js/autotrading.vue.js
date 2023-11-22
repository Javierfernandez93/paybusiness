/* vue */
import { AutotradingViewer } from '../../src/js/autotradingViewer.vue.js?v=2.6.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.6.3'

Vue.createApp({
    components: {
        AutotradingViewer, FlyerViewer
    },
}).mount('#app')