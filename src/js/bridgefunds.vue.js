/* vue */
import { BridgefundsViewer } from '../../src/js/bridgefundsViewer.vue.js?v=2.6.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.6.9'

Vue.createApp({
    components: {
        BridgefundsViewer, FlyerViewer
    },
}).mount('#app')