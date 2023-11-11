import { ProfileViewer } from '../../src/js/profileViewer.vue.js?v=2.3.7'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.7'
import { KycViewer } from '../../src/js/kycViewer.vue.js?v=2.3.7'   

Vue.createApp({
    components : { 
        ProfileViewer, FlyerViewer, KycViewer
    },
}).mount('#app')