/* vue */ 
import { ToolsViewer } from '../../src/js/toolsViewer.vue.js?v=2.4.6'
import { UserflyerViewer } from '../../src/js/userflyerViewer.vue.js?v=2.4.6'

Vue.createApp({
    components : { 
        ToolsViewer, UserflyerViewer
    },
}).mount('#app')