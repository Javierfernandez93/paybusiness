/* vue */
import { BridgefundsViewer } from '../../src/js/bridgefundsViewer.vue.js?v=2.7.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.0'

Vue.createApp({
    components: {
        BridgefundsViewer, FlyerViewer
    },
}).mount('#app')