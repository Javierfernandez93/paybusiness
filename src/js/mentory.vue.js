/* vue */
import { MentoryViewer } from '../../src/js/mentoryViewer.vue.js?v=2.3.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.3'

Vue.createApp({
    components: {
        MentoryViewer, FlyerViewer
    },
}).mount('#app')