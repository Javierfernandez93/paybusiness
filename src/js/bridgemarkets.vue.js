/* vue */
import { BridgemarketsViewer } from '../../src/js/bridgemarketsViewer.vue.js?v=2.7.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.7'

Vue.createApp({
    components: {
        BridgemarketsViewer, FlyerViewer
    },
}).mount('#app')