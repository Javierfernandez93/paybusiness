/* vue */
import { BridgefundsViewer } from '../../src/js/bridgefundsViewer.vue.js?v=2.7.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.1'

Vue.createApp({
    components: {
        BridgefundsViewer, FlyerViewer
    },
}).mount('#app')