/* vue */
import { BridgesignViewer } from '../../src/js/bridgesignViewer.vue.js?v=2.7.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.5'

Vue.createApp({
    components: {
        BridgesignViewer, FlyerViewer
    },
}).mount('#app')