import { ProfileViewer } from '../../src/js/profileViewer.vue.js?v=2.4.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.4.6'
import { KycViewer } from '../../src/js/kycViewer.vue.js?v=2.4.6'   

Vue.createApp({
    components : { 
        ProfileViewer, FlyerViewer, KycViewer
    },
}).mount('#app')