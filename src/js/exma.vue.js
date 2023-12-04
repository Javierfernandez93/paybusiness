/* vue */
import { ExmaViewer } from '../../src/js/exmaViewer.vue.js?v=2.7.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.5'

Vue.createApp({
    components: {
        ExmaViewer, FlyerViewer
    },
}).mount('#app')