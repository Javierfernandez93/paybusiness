/* vue */ 
import { ToolsViewer } from '../../src/js/toolsViewer.vue.js?v=2.7.1'
import { UserflyerViewer } from '../../src/js/userflyerViewer.vue.js?v=2.7.1'

Vue.createApp({
    components : { 
        ToolsViewer, UserflyerViewer
    },
}).mount('#app')