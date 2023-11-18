/* vue */
import { BridgemarketsViewer } from '../../src/js/bridgemarketsViewer.vue.js?v=2.5.9'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.9'

Vue.createApp({
    components: {
        BridgemarketsViewer, FlyerViewer
    },
}).mount('#app')