import { ApiwalletsViewer } from './apiwalletsViewer.vue.js?v=1.0.2'
import { AuthViewer } from './authViewer.vue.js?v=1.0.2'

Vue.createApp({
    components : { 
        ApiwalletsViewer, AuthViewer
    },
    methods: {
        authSuccess(data) 
        {
            this.$refs.wallets.authSuccess(data)
        },
        requestAuth(request) 
        {
            this.$refs.auth.requestAuth(request)
        },
    },
    mounted() 
    {       
    },
}).mount('#app')