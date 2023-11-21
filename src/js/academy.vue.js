/* vue */
import { AcademyViewer } from '../../src/js/academyViewer.vue.js?v=2.6.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.6.0'

Vue.createApp({
    components: {
        AcademyViewer, FlyerViewer
    },
}).mount('#app')