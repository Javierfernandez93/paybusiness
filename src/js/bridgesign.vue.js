/* vue */
import { BridgesignViewer } from '../../src/js/bridgesignViewer.vue.js?v=2.3.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.3'

Vue.createApp({
    components: {
        BridgesignViewer, FlyerViewer
    },
}).mount('#app')