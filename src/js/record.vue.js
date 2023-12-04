/* vue */
import { RecordViewer } from '../../src/js/recordViewer.vue.js?v=2.7.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.2'

Vue.createApp({
    components: {
        RecordViewer, FlyerViewer
    },
}).mount('#app')