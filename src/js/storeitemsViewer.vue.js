import { User } from '../../src/js/user.module.js?v=2.3.3'   

const StoreitemsViewer = {
    name : 'storeitems-viewer',
    props : ['cart','hasitems'],
    emits: ['nextstep'],
    data() {
        return {
            User: new User,
            account : null,
            viewMam : false,
            userAccounts : null,
            catalog_package_type_id : null,
            MIN_AMMOUNT_FOR_MAM : 500,
            packages : null,
            status : null,
            CONNECTION_FEE : 4,
            CATALOG_BROKER : {
                BRIDGE: 1,
                EXMA: 2
            },
            STATUS : {
                INVALID_MIN_AMOUNT : 1
            },
            CATALOG_PACKAGE_TYPE :{
                FUND : 1,
                MARKETING : 2,
                SYNTHETIC : 3,
                MAM : 4,
                EXMA : 5,
                PAMMY : 6,
                DUMMIE_TRADING : 7,
                ATI : 8,
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

                if(this.product.quantity < this.MIN_AMMOUNT_FOR_MAM)
                {
                    this.status = this.STATUS.INVALID_MIN_AMOUNT
                } else {
                    this.product.feeQuantity = (this.CONNECTION_FEE * this.product.quantity) / 100
                    this.product.realQuantity = this.product.quantity - this.product.feeQuantity
                }
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
        addFunds() {
            let alert = alertCtrl.create({
                title: "Antes de continuar",
                subTitle: `<div class="text-dark">¿Estás seguro de depositar <b>${this.product.realQuantity.numberFormat(2)} USDT</b> a esta cuenta?.<div><div> Vas a pagar <b>${this.product.quantity.numberFormat(2)} USDT</b</div>`,
                buttons: [
                    {
                        text: "Sí, añadir",
                        role: "cancel",
                        class: 'btn-danger',
                        handler: (data) => {
                            this.User.addProduct(this.product, (response) => {
                                if (response.s == 1) {
                                    this.product.added = true
                                    
                                    setTimeout(()=>{
                                        this.$emit('nextstep')
                                    },500)
                                }
                            })
                        },
                    },
                    {
                        text: "Cancel",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal); 
        },
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

        this.catalog_package_type_id = getParam("cptid") ? getParam("cptid") : this.CATALOG_PACKAGE_TYPE.EXMA
        
        if(['package'].includes(package_type)) {
            this.getPackages(this.catalog_package_type_id,this.CATALOG_BROKER.EXMA)
        }
    },
    template : `
        <ul class="nav nav-pills mb-5 bg-transparent" id="pills-tab" role="tablist">
            <li class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.EXMA,CATALOG_BROKER.EXMA)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.EXMA ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Exma</button>
            </li>
            <li class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.PAMMY)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.PAMMY ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">PAMMyTrading</button>
            </li>
            <li class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.ATI)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.ATI ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Ati</button>
            </li>
            <li class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.DUMMIE_TRADING)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.DUMMIE_TRADING ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">DummieTrading</button>
            </li>
            <li class="nav-item d-none" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.FUND,CATALOG_BROKER.BRIDGE)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.FUND ? 'active' : ''" class="nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Bridge Funds</button>
            </li>
            <li class="nav-item" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.MARKETING)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.MARKETING ? 'active' : ''" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Evox Marketing</button>
            </li>
            <li class="nav-item d-none" role="presentation">
                <button @click="getPackages(CATALOG_PACKAGE_TYPE.MAM,CATALOG_BROKER.BRIDGE)" :class="catalog_package_type_id == CATALOG_PACKAGE_TYPE.MAM ? 'active' : ''" class="nav-link" id="pills-synthetics-tab" data-bs-toggle="pill" data-bs-target="#pills-synthetics" type="button" role="tab" aria-controls="pills-synthetics" aria-selected="false">Cuenta MAM</button>
            </li>
        </ul>

        <div v-if="viewMam == false">
            <div v-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.FUND" class="row align-items-center justify-content-center">
                <div v-if="userAccounts" class="row mb-3">
                    <div class="row mb-3">
                        <div class="col">
                            <div class="form-floating">
                                <select class="form-select" v-model="cart.user_bridge_account_id" id="user_bridge_account_id" aria-label="Selecciona tu país">
                                    <option v-for="userAccount in userAccounts" v-bind:value="userAccount.user_bridge_account_id">
                                        {{ userAccount.account }} - {{ userAccount.broker }}
                                    </option>
                                </select>
                                <label for="user_bridge_account_id">Cuenta Bridge</label>
                            </div>
                        </div>
                    </div>
                    
                    <div v-for="(package,index) in packages" class="col-12 col-xl-4 col-md-4">
                        <div class="card bg-mesh rounded-normal animation-fall-down overflow-hidden mb-5" :style="{'--delay': (index+1)*0.3+'s'}">
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
                                <div v-if="CATALOG_PACKAGE_TYPE.MARKETING == package.catalog_package_type_id">
                                    <div v-if="package.products">
                                        <ul class="list-group list-group-flush">
                                            <li v-for="item in package.products" class="list-group-item">
                                                <div class="row">
                                                    <div class="col-12 col-xl-auto">
                                                        <span class="badge text-dark p-0">
                                                            {{item.quantity}}
                                                        </span>
                                                    </div>
                                                    <div class="col-12 col-xl">
                                                        <div class="fw-semibold text-dark">
                                                            {{item.product.title}}
                                                        </div>
                                                        <div class="text-xs text-secondary">
                                                            {{item.product.description}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else-if="CATALOG_PACKAGE_TYPE.FUND == package.catalog_package_type_id">
                                    <span v-html="package.full_description"></span>
                                </div>
                                
                                <div class="fs-2 fw-sembold text-white">$ {{package.amount.numberFormat(2)}}</div>
                            </div>
                            <div class="card-footer d-grid">
                                <button @click="addPackage(package)" class="btn btn-white btn-lg mb-0 shadow-none">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center">
                    <div class="fs-5 fw-sembold text-primary">
                        No tienes cuenta en Bridge. 
                    </div>
                    <div>
                        Abre tu cuenta primero <a href="../../apps/bridge/sign">¡Abrir cuenta ya!</a>
                    </div>
                </div>
            </div>
            <div v-else-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.DUMMIE_TRADING" class="row align-items-center justify-content-center">
                <div class="row mb-3">
                    <div v-for="(package,index) in packages" class="col-12 col-xl-4 col-md-4">
                        <div class="card bg-mesh rounded-normal animation-fall-down overflow-hidden mb-5" :style="{'--delay': (index+1)*0.3+'s'}">
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
                                <div v-if="CATALOG_PACKAGE_TYPE.MARKETING == package.catalog_package_type_id">
                                    <div v-if="package.products">
                                        <ul class="list-group list-group-flush">
                                            <li v-for="item in package.products" class="list-group-item">
                                                <div class="row">
                                                    <div class="col-12 col-xl-auto">
                                                        <span class="badge text-white p-0">
                                                            {{item.quantity}}
                                                        </span>
                                                    </div>
                                                    <div class="col-12 col-xl">
                                                        <div class="fw-semibold text-white">
                                                            {{item.product.title}}
                                                        </div>
                                                        <div class="text-xs text-secondary">
                                                            {{item.product.description}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else-if="CATALOG_PACKAGE_TYPE.FUND == package.catalog_package_type_id">
                                    <span v-html="package.full_description"></span>
                                </div>
                                
                                <div class="fs-2 fw-sembold text-white">$ {{package.amount.numberFormat(2)}}</div>
                            </div>
                            <div class="card-footer d-grid">
                                <button @click="addPackage(package)" class="btn btn-white btn-lg mb-0 shadow-none">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.PAMMY" class="row align-items-center justify-content-center">
                <div class="row justify-content-center">
                    <div class="col-12 col-xl-4">
                        <div class="card overflow-hidden rounded-normal bg-mesh">
                            <div class="card-body text-center text-white">
                                <strong>Importante</strong>
                                <div class="h4 text-white py-5 fw-semibold">Para abrir tu cuenta de PammyTrading es necesario ir primero a tu cuenta de DummieTrading</div>
                                <a class="btn btn-primary btn-lg mb-0 shadow-none" href="../../apps/dummie/account">
                                    IR a Mi cuenta de DummieTrading
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.ATI" class="row align-items-center justify-content-center">
                <div class="row mb-3">
                    <div v-for="(package,index) in packages" class="col-12 col-xl-4 col-md-4">
                        <div class="card bg-mesh rounded-normal animation-fall-down overflow-hidden mb-5" :style="{'--delay': (index+1)*0.3+'s'}">
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
                                <div v-if="CATALOG_PACKAGE_TYPE.MARKETING == package.catalog_package_type_id">
                                    <div v-if="package.products">
                                        <ul class="list-group list-group-flush">
                                            <li v-for="item in package.products" class="list-group-item">
                                                <div class="row">
                                                    <div class="col-12 col-xl-auto">
                                                        <span class="badge text-dark p-0">
                                                            {{item.quantity}}
                                                        </span>
                                                    </div>
                                                    <div class="col-12 col-xl">
                                                        <div class="fw-semibold text-dark">
                                                            {{item.product.title}}
                                                        </div>
                                                        <div class="text-xs text-secondary">
                                                            {{item.product.description}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else-if="CATALOG_PACKAGE_TYPE.FUND == package.catalog_package_type_id">
                                    <span v-html="package.full_description"></span>
                                </div>
                                
                                <div class="fs-2 fw-sembold text-white">$ {{package.amount.numberFormat(2)}}</div>
                            </div>
                            <div class="card-footer d-grid">
                                <button @click="addPackage(package)" class="btn btn-white btn-lg mb-0 shadow-none">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.MARKETING" class="row align-items-center justify-content-center">
                <div class="row mb-3">
                    <div v-for="(package,index) in packages" class="col-12 col-xl-4 col-md-4">
                        <div class="card bg-mesh rounded-normal animation-fall-down overflow-hidden mb-5" :style="{'--delay': (index+1)*0.3+'s'}">
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
                                <div v-if="CATALOG_PACKAGE_TYPE.MARKETING == package.catalog_package_type_id">
                                    <div v-if="package.products">
                                        <ul class="list-group list-group-flush bg-transparent">
                                            <li v-for="item in package.products" class="list-group-item bg-transparent">
                                                <div class="row">
                                                    <div class="col-12 col-xl-auto">
                                                        <span class="badge text-white p-0">
                                                            {{item.quantity}}
                                                        </span>
                                                    </div>
                                                    <div class="col-12 col-xl">
                                                        <div class="fw-semibold text-white">
                                                            {{item.product.title}}
                                                        </div>
                                                        <div class="text-xs text-white">
                                                            {{item.product.description}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-else-if="CATALOG_PACKAGE_TYPE.FUND == package.catalog_package_type_id">
                                    <span v-html="package.full_description"></span>
                                </div>
                                
                                <div class="fs-2 fw-sembold text-white">$ {{package.amount.numberFormat(2)}}</div>
                            </div>
                            <div class="card-footer d-grid">
                                <button @click="addPackage(package)" class="btn btn-white btn-lg mb-0 shadow-none">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row justify-content-center">
                <div class="col-12 col-xl-4">
                    <div v-if="userAccounts" class="card rounded-normal bg-mesh animation-fall-down" style="--delay:400ms">
                        <div class="card-header bg-transparent h3 text-center text-white">
                            Depósito en cuenta
                        </div>
                        <div class="card-body">
                            <div v-if="userAccounts" class="form-floating mb-3">
                                <select class="form-select" v-model="cart.user_bridge_account_id" id="user_bridge_account_id" aria-label="Selecciona tu cuenta">
                                    <option v-for="userAccount in userAccounts" v-bind:value="userAccount.user_bridge_account_id">
                                        {{ userAccount.account }} - {{ userAccount.broker }}
                                    </option>
                                </select>
                                <label for="user_bridge_account_id">Cuenta</label>
                            </div>
                            <div class="form-floating">
                                <input type="number" v-model="product.quantity" class="form-control" id="quantity" placeholder="">
                                <label for="quantity">Monto en USDT</label>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div v-if="status == STATUS.INVALID_MIN_AMOUNT" class="alert alert-danger text-white">
                                El monto mínimo para depósito esta cuenta es de $ <b>{{MIN_AMMOUNT_FOR_MAM.numberFormat(2)}}</b>
                            </div>
                            <div v-else>
                                <div v-if="product.quantity" class="alert text-dark ">
                                    <div class="mb-3">
                                        <div class="text-xs">
                                            Depósito
                                        </div>
                                        <div class="fs-4 fw-semibold text-primary">
                                            $ {{product.quantity.numberFormat(2)}} USDT
                                        </div>
                                    </div>

                                    <div v-if="CONNECTION_FEE > 0" class="mb-3">
                                        <div class="text-xs">
                                            Costos de conexión ({{CONNECTION_FEE.numberFormat(2)}} %) 
                                        </div>
                                        <div v-if="product.feeQuantity" class="fs-4 fw-semibold text-primary">
                                            $ {{product.feeQuantity.numberFormat(2)}} USDT
                                        </div>
                                    </div>
                                    <div class="">
                                        <div class="text-xs">
                                            Balance en MT5
                                        </div>
                                        <div v-if="product.realQuantity" class="fs-4 fw-semibold text-primary">
                                            $ {{product.realQuantity.numberFormat(2)}} USDT
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="d-grid">
                                <button @click="addFunds" :disabled="!product.quantity || status" class="btn btn-white btn-lg mb-0 shadow-none">Depositar</button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center">
                        <div class="fs-5 fw-sembold text-primary">
                            No tienes cuenta 
                            <span v-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.MAM">
                                en bridge markets
                            </span>
                            <span v-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.EXMA">
                                en Exma
                            </span>
                        </div>
                        <div v-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.MAM">
                            Abre tu cuenta primero <a href="../../apps/bridge/sign">¡Abrir cuenta ya!</a>
                        </div>
                        <div v-if="catalog_package_type_id == CATALOG_PACKAGE_TYPE.EXMA">
                            Abre tu cuenta primero <a href="../../apps/exma/account">¡Abrir cuenta ya!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { StoreitemsViewer } 