/* vue */
import { RecordViewer } from '../../src/js/recordViewer.vue.js?v=1.0.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.2'

Vue.createApp({
    components: {
        RecordViewer, FlyerViewer
    },
}).mount('#app')