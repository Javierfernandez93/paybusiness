/* vue */
import { BridgesignViewer } from '../../src/js/bridgesignViewer.vue.js?v=2.5.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.1'

Vue.createApp({
    components: {
        BridgesignViewer, FlyerViewer
    },
}).mount('#app')