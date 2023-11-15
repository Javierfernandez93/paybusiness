/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=2.5.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.2'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')