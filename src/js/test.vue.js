import { TestViewer } from '../../src/js/testViewer.vue.js?v=2.6.7'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=2.6.7'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')