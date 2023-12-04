/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=2.7.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.1'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')