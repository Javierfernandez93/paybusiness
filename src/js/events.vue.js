/* vue */
import { EventsViewer } from '../../src/js/eventsViewer.vue.js?v=2.7.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.8'

Vue.createApp({
    components: {
        EventsViewer, FlyerViewer
    },
}).mount('#app')