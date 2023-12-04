import { TestViewer } from '../../src/js/testViewer.vue.js?v=2.7.2'
import { TestprogressViewer } from '../../src/js/testprogressViewer.vue.js?v=2.7.2'

Vue.createApp({
    components : { 
        TestViewer, TestprogressViewer
    },
}).mount('#app')