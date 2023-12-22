/* vue */
import { AutotradingViewer } from '../../src/js/autotradingViewer.vue.js?v=2.7.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.8'

Vue.createApp({
    components: {
        AutotradingViewer, FlyerViewer
    },
}).mount('#app')