import { User } from '../../src/js/user.module.js';

const UnilevelViewer = {
    name : 'unilevel-viewer',
    data() {
        return {
            User : new User,
            network: null,
        }
    },
    methods: {
        goToEvent(banner) {
            window.open(banner.link)
        },
        getNetwork() {
            this.User.getNetwork({},(response)=>{
                this.network = response.network
            })
        }
    },
    mounted() {
        this.getNetwork()
    },
    template : `
    {{network}}
        <h3>KYC</h3>
    `,
}

export { UnilevelViewer } 