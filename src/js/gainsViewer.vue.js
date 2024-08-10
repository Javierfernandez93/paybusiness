import { User } from '../../src/js/user.module.js?v=1.0.0'   

const GainsViewer = {
    name : 'gains-viewer',
    data() {
        return {
            User: new User,
            active: false,
            query: null,
            commissionsAux: null,
            commissions: null,
            catalog_commission_type_id: null,
            catalog_commission_types: [
                {
                    title: 'Bono patrocinio'
                },
                {
                    title: 'Bono unilevel'
                },
                {
                    title: 'Bono binario'
                }
            ],
            totals: {
                amount: 0
            },
            columns: { // 0 DESC , 1 ASC 
                create_date: {
                    name: 'create_date',
                    desc: false,
                },
                title: {
                    name: 'title',
                    desc: false,
                    alphabetically: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: false,
                },
                wallet_kind: {
                    name: 'wallet_kind',
                    desc: true,
                },
                amount: {
                    name: 'amount',
                    desc: true,
                },
                week: {
                    name: 'week',
                    desc: true,
                    alphabetically: false,
                },
            },
            STATUS: {
                RETEINED: 0,
                PENDING: 1,
                DEPOSITED: 2,
                FROZEN: -3,
            },
        }
    },
    watch: {
        query : {
            handler() {
                this.filterData()
            },
            deep : true
        },
        catalog_commission_type_id : {
            handler() {
                this.query = this.catalog_commission_type_id
                this.filterData()
            },
            deep : true
        }
    },
    methods: {
        filterData() {
            this.commissions = this.commissionsAux
            this.commissions = this.commissions.filter((commission)=>{
                let wallet_kind = commission.wallet_kind ? commission.wallet_kind.toLowerCase() : ''
                return commission.title.toLowerCase().includes(this.query.toLowerCase())
                || commission.commission_name.toLowerCase().includes(this.query.toLowerCase())
                || commission.amount.toString().includes(this.query.toString())
                || commission.names.toLowerCase().includes(this.query.toLowerCase())
                || wallet_kind.toLowerCase().includes(this.query.toLowerCase())
                || commission.create_date.includes(this.query)
            })
            
            this.calculateTotals()
        },
        sortData(column) {
            this.commissions.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            });

            column.desc = !column.desc
        },
        calculateTotals() {
            this.totals = {
                amount: 0
            }
            if(this.commissions.length > 0)
            {
                this.commissions.map((commission) => {
                    this.totals.amount += commission.amount ? parseFloat(commission.amount) : 0;
                })
            }
        },
        getCommissionsPerUserMaster() {
            this.commissions = null
            this.totals = {
                amount: 0
            }
            this.commissionsAux = null
            this.getCommissionsPerUser().then((commissions) => {
                this.commissions = commissions.map((commission) => {
                    commission.create_date = commission.create_date.formatDate()

                    return commission
                })
                this.commissionsAux = this.commissions
                
                this.calculateTotals()
            }).catch(() => this.commissions = false)
        },
        getCommissionsPerUser() {
            return new Promise((resolve,reject) => {
                this.User.getCommissionsPerUser({catalog_commission_type_id:this.catalog_commission_type_id}, (response) => {
                    if (response.s == 1) {
                        this.active = response.active

                        resolve(response.commissions)   
                    }
                    reject()
                })
            })
        },
        getCatalogCommissionTypes() {
            return new Promise((resolve,reject) => {
                this.User.getCatalogCommissionTypes({}, (response) => {
                    if (response.s == 1) {
                        resolve(response.catalog_commission_types)   
                    }
                    reject()
                })
            })
        },
    },
    mounted() {
        this.getCommissionsPerUserMaster()

        // this.getCatalogCommissionTypes().then((catalog_commission_types) => {
        //     this.catalog_commission_types = catalog_commission_types
        // })
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card mb-3 overflow-hidden">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col">
                                <div class="col-auto"><span class="badge bg-primary">Total {{commissions.length}}</span></div>
                                <h4>Ganancias</h4>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" v-model="query" placeholder="Busca por nombre, fecha, monto, o tipo de ganancia"/>
                            </div>

                            <div class="col">
                                <div class="form-floating">
                                    <select class="form-select" v-model="catalog_commission_type_id" id="catalog_commission_type_id" aria-label="Comisión">
                                        <option selected>Todas</option>
                                        <option v-for="catalog_commission_type in catalog_commission_types">
                                            {{ catalog_commission_type.title }}
                                        </option>
                                    </select>
                                    <label for="country_id">Tipo de comisión</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="commissions" class="card mb-4 overflow-hidden border-radius-xl">
                    <div class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="text-center">
                                        <th @click="sortData(columns.title)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Tipo de ganancia</u>
                                        </th>
                                        <th @click="sortData(columns.names)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Por</u>
                                        </th>
                                        <th @click="sortData(columns.create_date)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Fecha</u>
                                        </th>
                                        <th @click="sortData(columns.amount)" class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <span v-if="columns.amount.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Monto</u>
                                        </th>
                                        <th class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                            <u class="text-sm ms-2">Estatus</u>
                                        </th>
                                        <th class="text-center c-pointer text-uppercase text-xxs text-primary font-weight-bolder opacity-7">
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="commission in commissions" class="text-center">
                                        <td>
                                            <span class="badge bg-primary">
                                                {{commission.title}} - {{commission.commission_name}}
                                            </span>
                                        </td>
                                        <td class="fw-bold text-decoration-underline text-primary cursor-pointer" @click="query = commission.names">
                                            {{commission.names}}
                                        </td>
                                        <td class="fw-bold text-decoration-underline text-primary cursor-pointer" @click="query = commission.create_date">
                                            {{commission.create_date}}
                                        </td>
                                        <td class="fw-bold text-decoration-underline text-primary cursor-pointer" @click="query = commission.amount">
                                            $ {{commission.amount.numberFormat(2)}} {{commission.currency}}
                                        </td>
                                        <td>
                                            <span v-if="commission.status == STATUS.PENDING" class="badge bg-warning">
                                                <span v-if="active">Pendiente de dispersar </span>
                                                <span v-else>Necesitas activarte para recibir la comisión</span>
                                            </span>
                                            <span v-else-if="commission.status == STATUS.RETEINED" class="badge bg-danger">
                                                <span>Actualiza tu PayBusiness para recibir esta comisión</span>
                                            </span>
                                            <span v-else-if="commission.status == STATUS.DEPOSITED" class="badge bg-success">
                                                Enviada a cartera electrónica 
                                            </span>
                                            <span v-else-if="commission.status == STATUS.FROZEN" class="badge bg-secondary">
                                                <span v-if="active">Pendiente de dispersar </span>
                                                <span v-else>Necesitas activarte para recibir la comisión</span>
                                            </span>
                                        </td>
                                        <td class="fw-bold text-decoration-underline text-primary cursor-pointer" @click="query = commission.wallet_kind">
                                            <span v-if="commission.wallet_kind">
                                                {{commission.wallet_kind}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="text-center">
                                        <td></td>
                                        <td></td>
                                        <td class="text-uppercase text-dark fw-bold">Total</td>
                                        <td><p class="text-dark fw-bold">$ {{totals.amount.numberFormat(2)}}</p></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <div v-else-if="commissions == false">
                    <div class="alert alert-info text-center text-white">
                        <div>No tenemos información sobre tus ganancias.</div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { GainsViewer } 