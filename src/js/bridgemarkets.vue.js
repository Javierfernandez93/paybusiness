/* vue */
import { BridgemarketsViewer } from '../../src/js/bridgemarketsViewer.vue.js?v=2.6.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.6.0'

Vue.createApp({
    components: {
        BridgemarketsViewer, FlyerViewer
    },
}).mount('#app')