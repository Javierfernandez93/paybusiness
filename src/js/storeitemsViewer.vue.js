import { User } from '../../src/js/user.module.js?v=1.0.2'   

const StoreitemsViewer = {
    props : ['cart','hasitems','active'],
    emits: ['nextStep','init'],
    data() {
        return {
            User: new User,
            account : null,
            viewMam : false,
            viewPackages : false,
            sponsor_activation : null,
            userAccounts : null,
            catalog_package_type_id : null,
            currentAmount : 0,
            packages : null,
            status : null,
            STATUS : {
                INVALID_MIN_AMOUNT : 1
            },
            CATALOG_PACKAGE_TYPE :{
                MEMBERSHIP : 1,
                NFT : 2
            },
            product : {
                product_id: 10,
                quantity: null,
                added: false,
            }
        }
    },
    watch : {
        'product.quantity' : {
            handler(newv,oldv) {
                this.status = null
            },
            deep: true
        },
        'cart.vars' : {
            handler(newv,oldv) {
                this.sanitize()
                this.product.quantity = this.getTotal()
            },
            deep: true
        },
        'product.added' : {
            handler() {
                this.cart.hasItems = this.product.added
            },
            deep: true
        }
    },
    methods: {
        addProduct() {
            this.User.addProduct(this.product, (response) => {
                if (response.s == 1) {
                    this.product.added = true
                }
            })
        },
        sanitize() {
            this.cart.vars.map((_var) => {
                if(_var.default_value) 
                {
                    if(_var.default_value < _var.min_value) 
                    {
                        _var.default_value = _var.min_value
                    } else if(_var.default_value >= _var.max_value) {
                        _var.default_value = _var.max_value
                    }
                }
            })
        },
        getTotal() {
            let quantity = 149

            this.cart.vars.map((_var) => {
                if(_var.name == 'trading_day') {
                    quantity *= 1 + _var.default_value/26
                } else if(_var.name == 'trading_min_day') {
                    quantity *= 1 + _var.default_value/27
                } else if(_var.name == 'drawdown_by_day') {
                    quantity *= 1 + _var.default_value/56
                } else if(_var.name == 'drawdown_total') {
                    quantity *= 1 + _var.default_value/57
                }
            })

            return Math.ceil(quantity)
        },
        addPackage(item) {
            this.User.addPackage({package_id:item.package_id},async (response) => {
                if (response.s == 1) {
                    this.cart.package_id = response.package_id
                    
                    item.selected = true

                    await sleep(500)
                    
                    this.$emit('nextStep')
                    this.$emit('init','paymentmethods')
                }
            })
        },
        deleteItem(item)
        {
            this.User.deleteItem({id:item.package_id}, (response) => {
                if (response.s == 1) {
                    item.selected = false
                }
            })
        },
        getAllUserBridgeAccounts(catalog_broker_id) {
            this.User.getAllUserBridgeAccounts({catalog_broker_id:catalog_broker_id}, (response) => {
                if (response.s == 1) {
                    this.userAccounts = response.userAccounts

                    this.cart.user_bridge_account_id = this.userAccounts[0].user_bridge_account_id
                } else {
                    this.userAccounts = null
                }
            })
        },
        getPackages(catalog_package_type_id,catalog_broker_id) {
            this.catalog_package_type_id = Number(catalog_package_type_id)

            this.packages = null

            this.User.getPackages({catalog_package_type_id:this.catalog_package_type_id}, (response) => {
                if (response.s == 1) {
                    this.currentAmount = response.currentAmount
                    this.packages = response.packages
                }
            })
        },
        getSponsorActivation() {
            this.User.getSponsorActivation({}, (response) => {
                if (response.s == 1) {
                    this.viewPackages = response.sponsor_activation
                    this.sponsor_activation = response.sponsor_activation
                } 
            })
        },
        getBridgeAccount() {
            if(this.account == null) 
            {
                this.User.getBridgeAccount({}, (response) => {
                    if (response.s == 1) {
                        this.account = response.account
                    } else {
                        this.account = false
                    }
                })
            }
        },
    },
    mounted() {
        const package_type = getLastUrlPart()

        this.catalog_package_type_id = getParam("cptid") ? getParam("cptid") : this.CATALOG_PACKAGE_TYPE.MEMBERSHIP
        
        this.getSponsorActivation()
        
        if(['package'].includes(package_type)) {
            this.getPackages(this.catalog_package_type_id)
        }
    },
    template : `
        <ul class="nav nav-pills mb-5 bg-transparent d-none" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.MEMBERSHIP)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.MEMBERSHIP ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">{{t('membership')}}</button>
            </li>
            <li v-if="cart.active" class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.NFT)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.NFT ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">NFT</button>
            </li>
        </ul>

        <div v-if="packages">
            <div v-if="!sponsor_activation && !viewPackages" class="alert  border border-light text-dark text-center animation-fall-down" style="--delay:650ms">
                <strong>{{t('important')}}</strong>
                <div class="lead">
                    <span v-html="t('sponsor_not_active')"></span>
                </div>
                <div class="mb-3 h4 text-dark">
                    {{t('do_you_want_to_continue')}}
                </div>
                <div class="row">
                    <div class="col-12">
                        <button @click="viewPackages = true" class="btn mb-0 shadow-none btn-light">{{t('continue')}}</button>
                    </div>
                </div>
            </div>
            <div v-if="viewPackages" class="row g-3 justify-content-center align-items-center">
                <div v-for="(package,index) in packages" class="col-12 col-md-4 col-xl-3">
                    <div class="card border border-light rounded animation-fall-down overflow-hidden mb-5" :style="{'--delay': (index+1)*0.3+'s'}">
                        <div v-if="package.image">
                            <img class="card-img-top" :src="package.image" :alt="package.title">
                        </div>
                        
                        <div class="position-relative z-index-1">
                            <div class="card-header bg-transparent mt-n7">
                                <div class="row justify-content-center align-items-center">
                                    <div v-if="!package.image" class="col-12 col-xl-auto">
                                        <img src="../../src/img/single-icon-white.svg" style="width:2rem"/>
                                    </div>
                                    <div class="col-12 col-xl">
                                        <div class="fw-semibold text-dark h2 fw-semibold">{{t(package.title)}}</div>
                                        <div class="text-dark">
                                            {{t(package.description,{
                                                amount : '$50.00 USD'
                                            })}}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="card-body">    
                                <ul v-if="package.products" class="list-group  my-3">
                                    <li v-for="product in package.products" class="list-group-item  py-1">
                                        <div class="row gx-0 justify-content-center align-items-center">
                                            <div class="col-auto">
                                                <i class="bi bi-check-circle-fill text-success me-2"></i>
                                            </div>
                                            <div class="col">
                                                {{t(product.product.title)}}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                
                                <div class="text-center">
                                    <div class="h1 text-dark">
                                        $ {{package.amount.numberFormat(0)}}
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="cart.activations.includes(package.package_id)" class="card-footer text-center align-items-center text-dark d-grid">
                                <div>
                                    <i class="bi bi-check-circle-fill me-2 lead"></i>
                                    {{t('already_have_package')}}
                                </div>
                            </div>
                            <div v-if="package.catalog_package_type_id == CATALOG_PACKAGE_TYPE.MEMBERSHIP" class="card-footer d-grid">
                                <div v-if="!cart.activations.includes(package.package_id)" class="card-footer d-grid">
                                    <div v-if="cart.activations">
                                        <button @click="addPackage(package)" class="btn px-3 w-100 btn-primary btn-lg mb-0 shadow-none">{{t('do_upgrade')}}</button>
                                    </div>
                                    <div v-else>
                                        <button @click="addPackage(package)" class="btn px-3 w-100 btn-primary btn-lg mb-0 shadow-none">{{t('choose_package')}}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { StoreitemsViewer } 