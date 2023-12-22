/* vue */
import { SyntheticsViewer } from '../../src/js/syntheticsViewer.vue.js?v=2.7.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.8'

Vue.createApp({
    components: {
        SyntheticsViewer, FlyerViewer
    },
}).mount('#app')