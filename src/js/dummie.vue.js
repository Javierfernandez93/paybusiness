/* vue */
import { DummieViewer } from '../../src/js/dummieViewer.vue.js?v=2.7.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.0'

Vue.createApp({
    components: {
        DummieViewer, FlyerViewer
    },
}).mount('#app')