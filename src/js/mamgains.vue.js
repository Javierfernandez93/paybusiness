/* vue */
import { MamgainsViewer } from '../../src/js/mamgainsViewer.vue.js?v=2.7.1'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.1'

Vue.createApp({
    components: {
        MamgainsViewer, FlyerViewer
    },
}).mount('#app')