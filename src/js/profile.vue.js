import { ProfileViewer } from '../../src/js/profileViewer.vue.js?v=1.0.5'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=1.0.5'
import { KycViewer } from '../../src/js/kycViewer.vue.js?v=1.0.5'   

Vue.createApp({
    components : { 
        ProfileViewer, FlyerViewer, KycViewer
    },
}).mount('#app')