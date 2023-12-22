/* vue */
import { AcademyinfoViewer } from '../../src/js/academyinfoViewer.vue.js?v=2.7.8'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.8'

Vue.createApp({
    components: {
        AcademyinfoViewer, FlyerViewer
    },
}).mount('#app')