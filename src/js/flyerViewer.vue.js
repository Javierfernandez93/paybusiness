const FlyerViewer = {
    name : 'flyer-viewer',
    props : ['image'],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        
    },
    template : `
        <div class="row justify-content-center mb-5">
           <div class="col-12 col-xl-8">
                <img :src="image" class="img-fluid rounded border border-light">
            </div>
        </div>
    `,
}

export { FlyerViewer } 