import { User } from '../../src/js/user.module.js?v=1.1.7'   

const StoreitemsViewer = {
    name : 'storeitems-viewer',
    props : ['cart','hasitems','active'],
    emits: ['nextstep'],
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
                PAY_BUSINESS : 1,
                PAY_ACADEMY : 2
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
            this.User.addPackage({package_id:item.package_id}, (response) => {
                if (response.s == 1) {
                    this.cart.package_id = response.package_id
                    
                    item.selected = true

                    setTimeout(()=>{
                        this.$emit('nextstep')
                    },500)
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
        setViewMam() {
            this.viewMam = true
            this.getBridgeAccount()
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
            
            if([this.CATALOG_PACKAGE_TYPE.MAM,this.CATALOG_PACKAGE_TYPE.FUND,this.CATALOG_PACKAGE_TYPE.EXMA].includes(this.catalog_package_type_id))
            {
                this.getAllUserBridgeAccounts(catalog_broker_id)
            }
            
            this.viewMam = [this.CATALOG_PACKAGE_TYPE.MAM,this.CATALOG_PACKAGE_TYPE.EXMA].includes(this.catalog_package_type_id)

            console.log(this.viewMam)
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

        this.catalog_package_type_id = getParam("cptid") ? getParam("cptid") : this.CATALOG_PACKAGE_TYPE.PAY_BUSINESS
        
        this.getSponsorActivation()
        
        if(['package'].includes(package_type)) {
            this.getPackages(this.catalog_package_type_id)
        }
    },
    template : `
        <ul class="nav nav-pills mb-5 bg-transparent" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.PAY_BUSINESS)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.PAY_BUSINESS ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">PayBusinesss</button>
            </li>
            <li v-if="cart.active" class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.PAY_ACADEMY)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.PAY_ACADEMY ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">PayAcademy</button>
            </li>
        </ul>

        <div v-if="packages">
            <div v-if="!sponsor_activation && !viewPackages" class="alert alert-dark text-white text-center">
                <strong>Aviso</strong>
                <div class="lead">
                    Tu patrocinador no está activo
                </div>
                <div class="mb-3 h4 text-white">
                    ¿Deseas continuar?
                </div>
                <div class="row">
                    <div class="col-12">
                        <button @click="viewPackages = true" class="btn mb-0 shadow-none btn-light">Continuar</button>
                    </div>
                </div>
            </div>
            <div v-if="viewPackages" class="row justify-content-center align-items-center">
                <div v-for="(package,index) in packages" class="col-12 col-xl-4 col-md-4">
                    <div class="card bg-primary rounded animation-fall-down overflow-hidden mb-5" :style="{'--delay': (index+1)*0.3+'s'}">
                        <div v-if="package.image">
                            <img class="card-img-top" :src="package.image" :alt="package.title">
                        </div>
                        
                        <div class="card-header bg-transparent">
                            <div class="row justify-content-center align-items-center">
                                <div v-if="!package.image" class="col-12 col-xl-auto">
                                    <img src="../../src/img/single-icon-white.svg" style="width:2rem"/>
                                </div>
                                <div class="col-12 col-xl">
                                    <div :class="package.image ? 'text-primary' : 'text-white'" class="fw-semibold fs-4 fw-semibold">{{package.title}}</div>
                                    <div :class="package.image ? 'text-secondary' : 'text-white'" class="">{{package.description}}</div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body">    
                            <div v-if="CATALOG_PACKAGE_TYPE.FUND == package.catalog_package_type_id">
                                <span v-html="package.full_description"></span>
                            </div>
                            
                            <div class="text-center">
                                <div v-if="cart.activations.includes(package.package_id)" class="h1 text-white">
                                    $ {{package.amount.numberFormat(2)}}
                                </div>
                                <div v-else>
                                    <div v-if="currentAmount">
                                        <div class="h5 text-white"><s>$ {{(package.amount).numberFormat(2)}}</s></div>
                                        <div class="h1 text-white">
                                            $ {{(package.amount - currentAmount).numberFormat(2)}}
                                        </div>
                                    </div>
                                    <div v-else class="h1 text-white">
                                        <div>$ {{(package.amount).numberFormat(2)}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div v-if="cart.activations.includes(package.package_id)" class="card-footer text-center align-items-center text-white d-grid">
                            <div>
                                <i class="bi bi-check-circle-fill me-2 lead"></i>
                                Ya tienes este paquete
                            </div>
                        </div>
                        <div v-if="package.catalog_package_type_id == CATALOG_PACKAGE_TYPE.PAY_BUSINESS" class="card-footer d-grid">
                            <div v-if="!cart.activations.includes(package.package_id)" class="card-footer d-grid">
                                <button @click="addPackage(package)" class="btn btn-white btn-lg mb-0 shadow-none">Elegir Paquete</button>
                            </div>
                        </div>
                        <div v-else-if="package.catalog_package_type_id == CATALOG_PACKAGE_TYPE.PAY_ACADEMY" class="card-footer d-grid">
                            <button @click="addPackage(package)" class="btn btn-white btn-lg mb-0 shadow-none">Elegir Paquete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { StoreitemsViewer } 