import { TestViewer } from '../../src/js/testViewer.vue.js?v=1.0.2'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=1.0.2'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')