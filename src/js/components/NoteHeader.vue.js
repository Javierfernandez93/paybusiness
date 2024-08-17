export default {
    props: ['headers'],
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() 
    {       
     
    },
    template : `
        <div v-if="headers" class="row">
            <div v-for="header in headers" :class="header.className" class="col-12">
                <div class="row border-bottom py-2 px-3 align-items-center">
                    <div class="col-12 col-md-1">
                        <span v-html="header.icon"></span>
                    </div>
                    <div class="col-12 col-md text-uppercase text-xxs text-muted">
                        {{header.title}} 
                    </div>
                </div>
            </div>
        </div>
    `,
}