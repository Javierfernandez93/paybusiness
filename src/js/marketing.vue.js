/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=2.3.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.3'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')