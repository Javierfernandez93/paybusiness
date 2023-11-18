/* vue */
import { BridgemarketsViewer } from '../../src/js/bridgemarketsViewer.vue.js?v=2.5.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.6'

Vue.createApp({
    components: {
        BridgemarketsViewer, FlyerViewer
    },
}).mount('#app')