const FlyerViewer = {
    name : 'flyer-viewer',
    props : ['image','image2'],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        
    },
    template : `
        <div class="flyer-container gx-0 row justify-content-center mb-5">
           <div class="col-6">
                <img :src="image" class="img-fluid">
            </div>
           <div class="col-6">
                <img :src="image2" class="img-fluid">
            </div>
        </div>
    `,
}

export { FlyerViewer } 