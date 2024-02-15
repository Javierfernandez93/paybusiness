/* vue */
import { AddbannerViewer } from '../../src/js/addbannerViewer.vue.js?v=1.1.2'

Vue.createApp({
    components: {
        AddbannerViewer
    },
    data() {
        return {
            
        }
    },
    watch: {
    },
    methods: {
        goToAddCampaign: function()
        {
            window.location.href = '../../apps/banner/addCampaign'
        }
    },
    mounted() {
    },
}).mount('#app')