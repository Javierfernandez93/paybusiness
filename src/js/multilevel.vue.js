
import { MultilevelViewer } from '../../src/js/multilevelViewer.vue.js?v=2.7.2'
import { WidgetlandingViewer } from '../../src/js/widgetlandingViewer.vue.js?v=2.7.2'

Vue.createApp({
    components : { 
        MultilevelViewer, WidgetlandingViewer
    },
}).mount('#app')