import { User } from '../../src/js/user.module.js?v=1.0.5'   

import { StoreitemsViewer } from '../../src/js/storeitemsViewer.vue.js?v=1.0.5'
import { StorepaymentmethodsViewer } from '../../src/js/storepaymentmethodsViewer.vue.js?v=1.0.5'
import { StorecheckoutViewer } from '../../src/js/storecheckoutViewer.vue.js?v=1.0.5'
import { StoreinvoiceViewer } from '../../src/js/storeinvoiceViewer.vue.js?v=1.0.5'

const StoreViewer = {
    components: {
        StoreitemsViewer, 
        StorepaymentmethodsViewer, 
        StorecheckoutViewer, 
        StoreinvoiceViewer
    },
    data() {
        return {
            User : new User,  
            STATES: {},      
            cart: {
                hasItems : false,
                activations: false,
                active: false,
                id: null,
                catalog_currency_id: null,
                catalog_payment_method_id: null,
                user_bridge_account_id: null,
                package_id: null,
                vars: null,
                state: null,
                package_type: null,
                buy_per_user : {
                    buy_per_user_id: null
                }
            }
        }
    },
    methods: {
        init(ref) {
            this.$refs[ref].init()
        },
        nextStep() {
            if(this.cart.state.code < Object.keys(this.STATES).length)
            {
                this.proccessBeforeContinue(this.cart.state).then(()=>{
                    this.cart.state = this.getStateByCode(this.cart.state.code+1)
                })
            }
        },
        proccessBeforeContinue(state) {
            return new Promise((resolve) => {
                if(state == this.STATES.CHECKOUT)
                {
                    this.saveBuy().then(()=>{
                        resolve()

                        this.$refs.invoice.init()
                    })
                } else {
                    resolve()
                }
            })
        },
        getStateByCode(code) {
            const states = Object.keys(this.STATES);
            let state = null
            
            for(let i=0; i< states.length; i++)
            {
                if(this.STATES[states[i]].code == code)
                {
                    state = this.STATES[states[i]]
                }
            }

            return state
        },
        saveBuy() {
            return new Promise((resolve) => {
                this.User.saveBuy(this.cart, (response) => {
                    if (response.s == 1) {
                        this.cart.buy_per_user.buy_per_user_id = response.buy_per_user_id
                    }

                    resolve()
                })
            })
        },
        initCart() {
            return new Promise((resolve,reject) => {
                this.User.initCart({}, (response) => {
                    if (response.s == 1) {
                        this.cart.id = response.instance_id

                        resolve()
                    }

                    reject()
                })
            })
        },
        isActive() {
            return new Promise((resolve,reject) => {
                if(['package'].includes(this.cart.package_type)) {
                    this.User.isActive({}, (response) => {
                        resolve(response)
                    })
                } else {
                    resolve(true)
                }
            })
        },
    },
    mounted() {
        this.STATES = {
            CHOICE_ITEMS: {
                code: 1,
                text: this.t('choose_item'),
            },
            CHOICE_PAYMENT_METHOD: {
                code: 2,
                text: this.t('choose_payment_method'),
            },
            CHECKOUT: {
                code: 3,
                text: this.t('check_out'),
            },
            INVOICE: {
                code: 4,
                text: this.t('ticket_payment'),
            },
            NOT_ACTIVE: {
                code: 5,
                text: this.t('configure_package'),
            }
        }

        const package_type = getLastUrlPart()
        
        if(['package'].includes(package_type))
        {
            this.cart.package_type = package_type
            this.cart.state = this.STATES.NOT_ACTIVE

            this.isActive().then((response) =>{
                this.cart.active = response.active
                this.cart.activations = response.activations

                this.cart.state = this.STATES.CHOICE_ITEMS

                this.initCart().then(() =>{
                    console.log("cart:ok")
                }).catch(() => {
                    alert("Hubo un error")
                })
            })
        }

    },
    template : `
        <div class="container">
            <div v-if="cart.state" class="text-center pb-5 h2 text-dark mb-0">
                {{cart.state.text}}
            </div>
            <div v-if="cart.state">
                <div class="animation-fall-down" style="--delay:500ms" v-show="cart.state.code == STATES.CHOICE_ITEMS.code">
                    <storeitems-viewer ref="items" :cart="cart" @init="init" @next-step="nextStep"></storeitems-viewer>
                </div>
                <div class="animation-fall-down" style="--delay:500ms" v-show="cart.state.code == STATES.CHOICE_PAYMENT_METHOD.code">
                    <storepaymentmethods-viewer ref="paymentmethods" @init="init" :cart="cart" @next-step="nextStep"></storepaymentmethods-viewer>
                </div>
                <div class="animation-fall-down" style="--delay:500ms" v-show="cart.state.code == STATES.CHECKOUT.code">
                    <storecheckout-viewer ref="checkout" :cart="cart" @init="init" @next-step="nextStep" ></storecheckout-viewer>
                </div>
                <div class="animation-fall-down" style="--delay:500ms" v-show="cart.state.code == STATES.INVOICE.code">
                    <storeinvoice-viewer ref="invoice" :cart="cart"></storeinvoice-viewer>
                </div>
            </div>
        </div>
    `,
}

export { StoreViewer }