/* vue */ 
import { ToolsViewer } from '../../src/js/toolsViewer.vue.js?v=2.5.5'
import { UserflyerViewer } from '../../src/js/userflyerViewer.vue.js?v=2.5.5'

Vue.createApp({
    components : { 
        ToolsViewer, UserflyerViewer
    },
}).mount('#app')