/* vue */
import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=2.7.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.7'

Vue.createApp({
    components: {
        ConferenceViewer, FlyerViewer
    },
}).mount('#app')