import { User } from '../../src/js/user.module.js?v=1.0.4'   

const StoreinvoiceViewer = {
    props : ['cart'],
    data() {
        return {
            User: new User,
            CATALOG_PAYMENT_METHOD: {
                COINPAYMENTS: 1,
                STRIPE: 2,
                EWALLET: 3,
                PAYPAL: 4,
                CAPITALPAYMENTS: 6,
                PAYMENT_GATEWAY: 7
            }
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
        init()
        {
            this.getInvoice()
        },
        getInvoice() {
            this.User.getInvoice({buy_per_user_id:this.cart.buy_per_user.buy_per_user_id}, (response) => {
                if (response.s == 1) {
                    this.cart.buy_per_user = response.buy_per_user

                    setTimeout(() => {
                        this.runQrCode()
                    },1000);

                    if(this.cart.buy_per_user.catalog_payment_method_id == this.CATALOG_PAYMENT_METHOD.PAYMENT_GATEWAY)
                    {
                        window.location.href = this.cart.buy_per_user.checkout_data.checkout_url
                    }
                }
            })
        },
        runQrCode() {
            var qrcode = new QRCode("qrcode");

            qrcode.makeCode(this.cart.buy_per_user.checkout_data.address); // make another code.
        }
    },
    mounted() {
        
    },
    template : `
        <div v-if="cart.buy_per_user" class="row justify-content-center">
            <div class="col-12 col-xl-5">
                <div class="card border border-light rounded overflow-hidden">
                    <div v-if="cart.buy_per_user.catalog_payment_method">
                        <div class="card-header">
                            <div class="row">
                                <div class="col">
                                    <div>
                                        <span class="badge text-secondary p-0">
                                            {{t('payment_method')}}
                                        </span>
                                    </div>
                                    <div class="fs-5 text-primary text-gradient fw-sembold">{{cart.buy_per_user.catalog_payment_method.payment_method}}</div>
                                </div>
                                <div class="col-auto">
                                    <div><span class="badge text-secondary p-0">
                                        {{t('number_of_payment')}}
                                    </span></div>
                                    <div class="fs-5">{{cart.buy_per_user.invoice_id}}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="cart.buy_per_user.catalog_payment_method_id == CATALOG_PAYMENT_METHOD.COINPAYMENTS">
                            <div v-if="cart.buy_per_user.checkout_data" class="card-body text-center">
                                <div><span class="badge text-secondary p-0">{{t('total_to_pay')}}</span></div>
                                <div class="fs-4 text-sembold text-dark">{{cart.buy_per_user.checkout_data.amount.numberFormat(2)}}</div>
                                
                                <div><span class="badge text-secondary p-0">{{t('payment_address')}}</span></div>
                                <div class="fs-7">{{cart.buy_per_user.checkout_data.address}}</div>

                                <div><span class="badge text-secondary p-0">{{t('confirmations')}}</span></div>
                                <div class="fs-7">{{cart.buy_per_user.checkout_data.confirms_needed}}</div>

                                <div><span class="badge text-secondary p-0">{{t('time_left')}} </span></div>
                                <div class="fs-7">{{cart.buy_per_user.checkout_data.timeout.getSeconds()}}</div>
                            </div>
                            <div v-if="cart.buy_per_user.checkout_data" class="row bg-dark justify-content-center py-3">
                                <div class="col-12 col-xl-6">
                                    <div v-if="cart.buy_per_user.checkout_data">
                                        <div id="qrcode"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body mb-0 pb-0">
                                <div class="alert alert-light">
                                    <strong>{{t('important')}}</strong>
                                    <span v-html="t('important_message_pay')"></span>
                                </div>
                            </div>
                        </div>
                        <div v-if="cart.buy_per_user.catalog_payment_method_id == CATALOG_PAYMENT_METHOD.CAPITALPAYMENTS">
                            <div v-if="cart.buy_per_user.checkout_data" class="card-body text-center">
                                <div><span class="badge text-secondary p-0">{{t('total_to_pay')}}</span></div>
                                <div class="fs-4 text-sembold text-dark">$ {{cart.buy_per_user.checkout_data.amount}} USDT.TRC20</div>
                                
                                <div><span class="badge text-secondary p-0">{{t('payment_address')}}</span></div>
                                <div class="fs-7">{{cart.buy_per_user.checkout_data.address}}</div>

                                <div><span class="badge text-secondary p-0">{{t('time_left')}} </span></div>
                                <div class="fs-7">{{cart.buy_per_user.checkout_data.expiration_date.getSeconds()}}</div>
                            </div>
                            <div v-if="cart.buy_per_user.checkout_data" class="row bg-dark justify-content-center py-3">
                                <div class="col-12 col-xl-6">
                                    <div v-if="cart.buy_per_user.checkout_data">
                                        <div id="qrcode"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body mb-0 pb-0">
                                <div class="alert alert-light">
                                    <strong>{{t('important')}}</strong>
                                    <span v-html="t('important_message_pay')"></span>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="cart.buy_per_user.catalog_payment_method_id == CATALOG_PAYMENT_METHOD.EWALLET">
                            <div v-if="cart.buy_per_user.checkout_data" class="card-body text-center">
                                <div><span class="badge text-secondary p-0">{{t('total_to_pay')}}</span></div>
                                <div class="fs-4">$ {{cart.buy_per_user.checkout_data.amount.numberFormat(2)}}</div>
                                
                            </div>
                            <div class="card-body mb-0 pb-0">
                                <div class="alert alert-light">
                                    <strong>{{t('important')}}</strong>
                                    <span v-html="t('important_message_pay')"></span>
                                </div>
                            </div>
                        </div>
                        <div v-else-if="cart.buy_per_user.catalog_payment_method_id == CATALOG_PAYMENT_METHOD.PAYPAL">
                            <div v-if="cart.buy_per_user.checkout_data" class="card-body text-center">
                                <div><span class="badge text-secondary p-0">{{t('total_to_pay')}}</span></div>
                                <div class="fs-4 fw-sembold text-dark">$ {{(cart.buy_per_user.checkout_data.amount+cart.buy_per_user.checkout_data.fee).numberFormat(2)}} USD </div>
                            </div>
                        </div>
                        <div v-else-if="cart.buy_per_user.catalog_payment_method_id == CATALOG_PAYMENT_METHOD.PAYMENT_GATEWAY">
                            <div v-if="cart.buy_per_user.checkout_data" class="card-body text-center">
                                <div><span class="badge text-secondary p-0">{{t('total_to_pay')}}</span></div>
                                <div class="fs-4 fw-sembold text-dark">$ {{(cart.buy_per_user.checkout_data.amount+cart.buy_per_user.checkout_data.fee).numberFormat(2)}} USD </div>

                                <div>{{t('wait_payment')}}</div>
                                
                                <div class="spinner-grow" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="cart.buy_per_user.checkout_data" class="card-footer">
                            <a :href="cart.buy_per_user.checkout_data.checkout_url" target="_blank" class="btn btn-success bg-gradient-success btn-lg fs-4 shadow-none w-100 mb-0">{{t('go_to_payment')}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { StoreinvoiceViewer } 