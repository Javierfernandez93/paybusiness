import { User } from '../../src/js/user.module.js?v=1.0.5'   

const StorecheckoutViewer = {
    props : ['cart'],
    emits : ['nextStep'],
    data() {
        return {
            User: new User,
            busy: false,
            conditions: false,
        }
    },
    watch : {
        query : {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        getCartResume() {
            this.resume = null

            return new Promise((resolve,reject) => {
                this.User.getCartResume({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.resume)
                    }

                    reject()
                })
            })
        },
        deleteItemCart(id)
        {
            this.User.deleteItemCart({id:id}, (response) => {
                if (response.s == 1) {
                    this.getCartResume()
                }
            })
        },
        nextStep()
        {
            this.busy = true
            this.$emit('nextStep')
        },
        init()
        {
            this.getCartResume().then(resume => this.cart.resume = resume).catch( (error) => { })
        }
    },
    mounted() {
        
    },
    template : `
        <div v-if="cart.resume" class="row justify-content-center">
            <div class="col-12 col-xl-5">
                <div v-if="cart.resume.items" class="card border border-light overflow-hidden">
                    <div class="card-body">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item py-5 border-light bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col h3 text-dark">
                                        {{t('payment_method')}}
                                    </div>
                                    <div class="col-auto fw-sembold text-dark">
                                        {{cart.resume.payment_method}}
                                    </div>
                                </div>
                            </li>
                            <li v-for="item in cart.resume.items" class="list-group-item bg-transparent py-3">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <div class="fs-5 fw-semibold  text-dark">{{item.item.tblFields.title}}</div>
                                        {{t(item.item.tblFields.description,{
                                            amount : '$50.00 USD'
                                        })}} 
                                    </div>
                                    <div v-if="item.item.tblFields.amount > 1" class="col-auto fw-semibold fs-3 text-dark text-end">
                                        $ {{item.item.tblFields.amount.numberFormat(2)}} USD
                                    </div>
                                    <div class="col-auto fw-semibold text-dark">
                                        <button @click="deleteItemCart(item.item.tblFields.package_id)" type="button" class="btn-danger btn btn-sm px-3 mb-0 shadow-none" aria-label="Close"><i class="bi bi-x fs-5"></i></button>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col">
                                        {{t('total')}}
                                    </div>
                                    <div class="col-auto fs-4 fw-semibold">
                                        $ {{cart.resume.amount.numberFormat(2)}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" v-model="conditions" id="conditions">
                            <label class="form-check-label text-dark" for="conditions">
                                {{t('accept')}} <a class="text-dark text-decoration-underline cursor-pointer" href="../../src/files/pdf/conditions.pdf">{{t('conditions')}}</a>
                            </label>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button :disabled="busy || !conditions" @click="nextStep" class="btn mb-0 btn-lg fs-4 btn-dark w-100 shadow-none">
                            <span v-if="busy">
                                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            </span>
                            <span v-else>
                                {{t('buy')}}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { StorecheckoutViewer } 