/* vue */
import { EditcourseViewer } from '../../src/js/editcourseViewer.vue.js?v=1.1.8'
import { EditsessionViewer } from '../../src/js/editsessionViewer.vue.js?v=1.1.8'

Vue.createApp({
    components: {
        EditcourseViewer, EditsessionViewer
    },
    methods: {
        selectSession(session) {
            this.$refs.sessionViewer.selectSession(session)
        },
        saveSession(session) {
            this.$refs.course.saveSession(session)
        },
        addSession(session) {
            console.log(session)
            this.$refs.sessionViewer.addSession(session)
        },
    }
}).mount('#app')