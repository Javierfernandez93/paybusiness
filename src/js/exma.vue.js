/* vue */
import { ExmaViewer } from '../../src/js/exmaViewer.vue.js?v=2.3.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.3'

Vue.createApp({
    components: {
        ExmaViewer, FlyerViewer
    },
}).mount('#app')