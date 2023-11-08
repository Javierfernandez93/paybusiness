import { User } from '../../src/js/user.module.js';

const UnilevelViewer = {
    name : 'unilevel-viewer',
    data() {
        return {
            User : new User,
            banners: null,
        }
    },
    methods: {
        goToEvent(banner) {
            window.open(banner.link)
        },
        getBanners() {
            this.User.getBanners({},(response)=>{
                this.banners = response.banners
            })
        }
    },
    mounted() {
        this.getBanners()
    },
    template : `
        <h3>KYC</h3>
    `,
}

export { UnilevelViewer } 