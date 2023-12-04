/* vue */
import { AcademygainsViewer } from '../../src/js/academygainsViewer.vue.js?v=2.7.2'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.2'

Vue.createApp({
    components: {
        AcademygainsViewer, FlyerViewer
    },
}).mount('#app')