import { User } from '../../src/js/user.module.js?v=1.0.8';

const FlyerViewer = {
    name : 'flyer-viewer',
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
        <div class="row justify-content-center overflow-hidden mb-3">
           <div @click="goToEvent(banner)" v-for="banner in banners" class="col-12 col-md-11 cursor-pointer">
                <img :src="banner.image" class="w-100 rounded">
            </div>
        </div>
    `,
}

export { FlyerViewer } 