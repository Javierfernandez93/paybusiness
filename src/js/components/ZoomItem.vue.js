import PlaceHolder from './PlaceHolder.vue.js?v=1.5.4'

const ZoomItem = {
    components: {
        PlaceHolder,
    },  
    props: ['meeting'],
    methods: {
        copy(text,target) {
            navigator.clipboard.writeText(text).then(() => {
                target.innerText = 'Copiado'

                toastInfo({
                    message : 'Copiado',
                })
            })
        },
    },
    template : `
        <li class="list-group-item bg-dark">
            <div class="row align-items-center">
                <div class="col-auto">
                    <i :class="icon" class="bi"></i>
                </div>
                <div class="col-12 col-xl">
                    <PlaceHolder classValue="h4 text-dark" :type="type" :postfix="postfix" :value="meeting.title" />
                </div>
                <div class="col-12 col-xl-auto">
                    <a :href="'../../apps/academy/zoom?'+meeting.token" class="btn btn-primary mb-0 shadow-none">Acceder a la reunión</a>
                </div>
            </div>
        </li>
    `,
}

export default ZoomItem 