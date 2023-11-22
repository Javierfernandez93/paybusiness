/* vue */ 
import { ToolsViewer } from '../../src/js/toolsViewer.vue.js?v=2.6.2'
import { UserflyerViewer } from '../../src/js/userflyerViewer.vue.js?v=2.6.2'

Vue.createApp({
    components : { 
        ToolsViewer, UserflyerViewer
    },
}).mount('#app')