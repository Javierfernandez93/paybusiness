/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=2.6.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.6.7'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')