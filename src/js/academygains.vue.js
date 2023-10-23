/* vue */
import { AcademygainsViewer } from '../../src/js/academygainsViewer.vue.js?v=2.3.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.3'

Vue.createApp({
    components: {
        AcademygainsViewer, FlyerViewer
    },
}).mount('#app')