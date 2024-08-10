import { User } from '../../src/js/user.module.js?v=1.0.1'   

const MembershipsViewer = {
    data() {
        return {
            User: new User,
            busy: false,
            paybusiness: null,
            query: null,
            memberships: null,
            membershipsAux: null,
            STATUS : {
                DELETED: -1,
                CANCELED: 0,
                PENDING: 1,
                PAYED: 2,
                REFUND: 3,
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
        filterData() {
            this.memberships = this.membershipsAux
            this.memberships = this.memberships.filter((invoice) => {
                return invoice.name.toLowerCase().includes(this.query.toLowerCase()) 
                    || invoice.days_to_expire.toString().includes(this.query)
            })
        },
        info() {
            alertMessage(`Tienes 5 dias para maximizar tu membresía de Paybusiness, de lo contrario perderas tus bonos binarios`, 'info')
        },
        getMemberships() {
            this.memberships = null
            this.membershipsAux = null

            this.busy = true
            this.User.getMemberships({}, (response) => {
                this.busy = false
                
                if (response.s == 1) {
                    this.memberships = response.memberships
                    this.membershipsAux = response.memberships
                } else {
                    this.memberships = false
                    this.membershipsAux = false
                }
            })
        },
        getMembershipsPaybusiness() {
            this.paybusiness = null
            this.busy = true
            this.User.getMembershipsPaybusiness({}, (response) => {
                this.busy = false
                
                if (response.s == 1) {
                    this.paybusiness = response.paybusiness
                } 
            })
        },
    },
    mounted() {
        this.getMemberships()
        this.getMembershipsPaybusiness()
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center">
            <div class="spinner-grow text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div v-if="memberships">
            <div class="card">
                <div class="card-header bg-transparent">
                    <div class="row align-items-center">
                        <div class="col fw-semibold text-dark">
                            <span class="badge p-0 text-dark">Total {{memberships.length}}</span>
                            <div class="h5">
                                Membresías
                            </div>
                        </div>
                    
                        <div class="col">
                            <input type="search" :autofocus="true" class="form-control" v-model="query" placeholder="buscar por nombre o días restantes"/>
                        </div>
                    </div>
                </div>   
                <div class="table-responsive">
                    <table class="table table-borderless table-hover">
                        <thead class="thead-light">
                            <tr class="text-xs text-center text-secondary">
                                <th class="text-uppercase">
                                    Membresía
                                </th>
                                <th class="text-uppercase">
                                    Días restantes
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="membership in memberships" class="align-middle text-center">
                                <td class="text-secondary fw-semibold">
                                    <span class="badge bg-primary">
                                        {{membership.name}}
                                    </span>
                                </td>
                                <td class="text-dark fw-semibold">
                                    {{membership.days_to_expire}} días
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-else-if="memberships == false" class="alert alert-white text-center">
            <div><strong>Importante</strong></div>
            Aquí te mostraremos las membresías que tengas activas.

            <div class="d-flex justify-content-center py-3">
                <a href="../../apps/store/package" class="btn btn-primary me-2 mb-0 shadow-none">Adquiere tus membrersías</a>
            </div>
        </div>

        <div v-if="paybusiness" class="card mt-3">
            <div class="card-header h4">
                <div class="d-flex justify-content-between align-items-center">
                    <div>Barra de Paybusiness</div>

                    <button class="btn btn-outline-primary btn-sm mb-0 px-3" @click="getMembershipsPaybusiness"><i class="fas fa-sync"></i></button>
                </div>
            </div>
            <table v-if="paybusiness" class="table">
                <thead>
                    <tr class="text-xs text-center text-secondary text-uppercase">
                        <th></th>
                        <td>Membersía</td>
                        <td>Puntos generados</td>
                        <td>Monto</td>
                        <td>Monto extra</td>
                        <td>Se lleno el</td>
                        <td>Fecha</td>
                        <td>Estatus</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="membership in paybusiness" class="text-center">
                        <td></td>
                        <td>{{membership.title}}</td>
                        <td>{{membership.point.numberFormat(0)}} pts</td>
                        <td>$ {{membership.amount.numberFormat(2)}}</td>
                        <td>$ {{membership.amount_extra.numberFormat(2)}}</td>
                        <td>
                            <span v-if="membership.fill_date">
                                {{membership.fill_date.formatDate()}}
                            </span>
                            <span v-else>
                                -
                            </span>
                        </td>
                        <td>{{membership.create_date.formatDate()}}</td>
                        <td>
                            <span v-if="membership.status == 1" class="badge bg-success">
                                actual
                            </span>
                            <span v-else-if="membership.status == 0" class="badge bg-danger cursor-pointer" @click="info">
                                <div>
                                    <i class="fas fa-exclamation-triangle"></i>
                                </div>
                                Necesitas maximizar tu membresía 

                                <div>te queda(n) {{membership.days_to_delete_binary}} dia(s) para hacerlo</div>
                            </span>
                            <span v-else-if="membership.status == 2" class="badge bg-secondary">
                                llena
                            </span>
                        </td>
                    </tr>
                </tr>
            </table>
        </div>
    `,
}

export { MembershipsViewer } 