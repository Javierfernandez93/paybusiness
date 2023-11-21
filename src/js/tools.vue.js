/* vue */ 
import { ToolsViewer } from '../../src/js/toolsViewer.vue.js?v=2.6.0'
import { UserflyerViewer } from '../../src/js/userflyerViewer.vue.js?v=2.6.0'

Vue.createApp({
    components : { 
        ToolsViewer, UserflyerViewer
    },
}).mount('#app')