/* vue */
import { MarketingViewer } from '../../src/js/marketingViewer.vue.js?v=2.5.6'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.5.6'

Vue.createApp({
    components: {
        MarketingViewer, FlyerViewer
    },
}).mount('#app')