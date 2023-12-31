import { AddcourseViewer } from '../../src/js/addcourseViewer.vue.js?v=1.0.2'
import { AddsessionViewer } from '../../src/js/addsessionViewer.vue.js?v=1.0.2'

Vue.createApp({
    components: {
        AddcourseViewer, AddsessionViewer
    },
    methods: {
        selectSession(session) {
            this.$refs.sessionViewer.selectSession(session)
        },
        saveSession(session) {
            this.$refs.course.saveSession(session)
        },
        addSession(session) {
            this.$refs.sessionViewer.addSession(session)
        },
    }
}).mount('#app')