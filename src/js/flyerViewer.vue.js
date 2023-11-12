import { User } from '../../src/js/user.module.js';

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
        <div class="row overflow-hidden">
           <div @click="goToEvent(banner)" v-for="banner in banners" class="col-12 col-md-6 cursor-pointer">
                <img :src="banner.image" class="w-100 rounded">
            </div>
        </div>
    `,
}

export { FlyerViewer } 