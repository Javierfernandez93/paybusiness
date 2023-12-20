/* vue */
import { AcademygainsViewer } from '../../src/js/academygainsViewer.vue.js?v=2.7.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.7'

Vue.createApp({
    components: {
        AcademygainsViewer, FlyerViewer
    },
}).mount('#app')