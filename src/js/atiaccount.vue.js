/* vue */
import { AtiaccountViewer } from '../../src/js/atiaccountViewer.vue.js?v=2.7.0'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.7.0'

Vue.createApp({
    components: {
        AtiaccountViewer, FlyerViewer
    },
}).mount('#app')