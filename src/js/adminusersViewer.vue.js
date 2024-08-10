import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.1'

const AdminusersViewer = {
    name : 'adminusers-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            users: null,
            busy: false,
            busySmall: false,
            usersAux: null,
            query: null,
            UserType: {
                FREE : {
                    text : 'Free',
                    status : 0,
                    _class : 'bg-secondary'
                },
                DEMO : {
                    text : 'Demo',
                    status : 1,
                    _class : 'bg-primary'
                },
                TRADER : {
                    text : 'Trader',
                    status : 2,
                    _class : 'bg-success'
                }
            },
            columns: { // 0 DESC , 1 ASC 
                company_id: {
                    name: 'company_id',
                    desc: false,
                },
                kyc_approbed: {
                    name: 'kyc_approbed',
                    desc: false,
                },
                signup_date: {
                    name: 'signup_date',
                    desc: false,
                },
                licences: {
                    name: 'licences',
                    desc: false,
                },
                landing: {
                    name: 'landing',
                    desc: false,
                    alphabetically: true,
                },
                country: {
                    name: 'country',
                    desc: false,
                    alphabetically: true,
                },
                phone: {
                    name: 'phone',
                    desc: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
            }
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        sortData(column) {
            this.users.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                return column.alphabetically ? _a[column.name].localeCompare(_b[column.name]) : _a[column.name] - _b[column.name]
            })

            column.desc = !column.desc
        },
        filterData() {
            this.users = this.usersAux
            this.users = this.users.filter(user => { 
                return user.names.toLowerCase().includes(this.query.toLowerCase()) 
                || user.email.toLowerCase().includes(this.query.toLowerCase()) 
                || user.landing.toLowerCase().includes(this.query.toLowerCase()) 
                || user.code.toString().includes(this.query.toLowerCase())
                || user.company_id.toString().includes(this.query.toLowerCase())
            })
        },
        setUserAs(user,status) {
            this.busySmall = true
            this.UserSupport.setUserAs({user_login_id:user.user_login_id,status:status},(response)=>{
                this.busySmall = false
                
                user.status = status

                if(status == 0)
                {

                    toastInfo({
                        message: 'Usuario inactivado',
                    })
                } else if(status == 1) {
                    toastInfo({
                        message: 'Usuario activado',
                    })
                } else if(status == -1) {
                    toastInfo({
                        message: 'Usuario eliminando. Refrescando lista...',
                    })

                    setTimeout (() => {
                        this.getUsers()
                    },3000)
                }
            })
        },
        verifyUser(user) {
            let alert = alertCtrl.create({
                title: "Aviso",
                subTitle: `¿Estás seguro de veriricar a <b>${user.names}</b>?`,
                buttons: [
                    {
                        text: "Sí",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            
                            this.UserSupport.verifyUser({user_login_id:user.user_login_id},(response)=>{
                                if(response.s == 1)
                                {
                                    user.verified = true
                                    user.verified_mail = true

                                    alertInfo({
                                        icon:'<i class="bi bi-ui-checks"></i>',
                                        message: 'Usuario verificado',
                                        _class:'bg-gradient-success text-white'
                                    })
                                } else {
                                    alertInfo({
                                        icon:'<i class="bi bi-x"></i>',
                                        message: 'Error al verificar al usuario',
                                        _class:'bg-gradient-danger text-white'
                                    })
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                            
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
        },
        getInBackoffice(company_id) {
            this.UserSupport.getInBackoffice({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    window.open('../../apps/backoffice')
                }
            })
        },
        goToBridgeAccounts(company_id) {
            window.location.href = '../../apps/admin-users/bridge?ulid=' + company_id
        },
        deleteUser(user) {
            this.UserSupport.findFirstActive({ company_id: user.company_id }, (response) => {
                if(response.s == 1)
                {
                    let alert = alertCtrl.create({
                        title: "Aviso",
                        subTitle: `El usuario se eliminará y su red se comprimirá para su primer activo <b>${response.user.names} ID ${response.user.company_id}</b>. ¿Estás seguro de eliminar a <b>${user.names}</b>?`,
                        buttons: [
                            {
                                text: "Sí",
                                class: 'btn-success',
                                role: "cancel",
                                handler: (data) => {
                                    this.UserSupport.deleteUser({ company_id: user.company_id }, (response) => {
                                        if (response.s == 1) {
                                            this.setUserAs(user, -1)
                                        }
                                    })
                                },
                            },
                            {
                                text: "Cancelar",
                                role: "cancel",
                                handler: (data) => {
                                    
                                },
                            },
                        ],
                    })
        
                    alertCtrl.present(alert.modal)  
                    // this.deleteUserInternal()
                }
            })
            
        },
        goToEdit(company_id) {
            window.location.href = '../../apps/admin-users/edit?ulid=' + company_id
        },
        viewEwallet(user) {
            user.ewallets = []
            this._viewEwallet(user,1)
            this._viewEwallet(user,2)
        },
        _viewEwallet(user,wallet_kind_id) {
            this.UserSupport.viewEwallet({user_login_id:user.user_login_id,wallet_kind_id:wallet_kind_id}, (response) => {
                if (response.s == 1) {
                    user.ewallets.push(response.ewallet)
                } else if(response.r == 'INVALID_PERMISSION') {
                    alertHtml('No tienes permisos necesarios para hacer esta acción. <strong>El incidente será reportado.</strong>')
                }
            })
        },
        goToViewPublicKey(wallet) {
            window.location.href = `../../apps/admin-wallet/?publicKey=${wallet.public_key}&wallet_kind_id=${wallet.wallet_kind_id}`
        },
        copyPublicKey(publicKey) {
            navigator.clipboard.writeText(publicKey).then(function() {
                console.log('Async: Copying to clipboard was successful!');
            }, function(err) {
                console.error('Async: Could not copy text: ', err);
            });
        },
        getUsers() {
            this.usersAux = null
            this.users = null
            this.busy = true
            this.UserSupport.getUsers({}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.usersAux = response.users
                    this.users = response.users
                } else {
                    this.usersAux = false
                    this.users = false
                }
            })
        },
    },
    mounted() {
        this.getUsers()
    },
    template : `
        <div class="card border-radius-2xl mb-4">
            <div class="card-header pb-0">
                <div class="row align-items-center">
                    <div class="col">
                        <div v-if="users"><span class="text-xs text-secondary">Total {{users.length}}</span></div>
                        <div class="h6">Usuarios</div>
                    </div>
                    <div class="col-auto text-end">
                        <div><a href="../../apps/admin-users/add" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir usuario</a></div>
                    </div>
                    <div class="col-auto">
                        <input :disabled="busy" v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                    </div>
                    <div v-if="busySmall" class="col-auto">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
                <div v-if="busy" class="text-center py-3">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-if="users" class="table-responsive-sm p-0 animation-fall-down" style="--delay:500ms">
                    <table class="table align-items-center table-hover mb-0">
                        <thead>
                            <tr class="align-items-center">
                                <th @click="sortData(columns.company_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7 sticky">
                                    <span v-if="columns.company_id.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">ID</u>
                                </th>
                                <th @click="sortData(columns.names)" class="text-start c-pointer text-uppercase text-primary font-weight-bolder opacity-7 sticky">
                                    <span v-if="columns.names.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Usuario</u>
                                </th>
                                <th @click="sortData(columns.kyc_approbed)" class="text-start c-pointer text-uppercase text-primary font-weight-bolder opacity-7 sticky">
                                    <span v-if="columns.kyc_approbed.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Kyc</u>
                                </th>
                                <th @click="sortData(columns.country)" class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7 sticky">
                                    <span v-if="columns.country.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">País</u>
                                </th>
                                <th @click="sortData(columns.phone)" class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7 sticky">
                                    <span v-if="columns.phone.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Teléfono</u>
                                </th>
                                <th @click="sortData(columns.signup_date)" class="text-center c-pointer text-uppercase text-primary font-weight-bolder opacity-7 sticky">
                                    <span v-if="columns.signup_date.desc">
                                        <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                    </span>    
                                    <span v-else>    
                                        <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                    </span>    
                                    <u class="text-sm ms-2">Miembro desde</u>
                                </th>
                                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users">
                                <td class="align-middle text-center text-sm">
                                    <span class="badge bg-primary">{{user.code}}</span>
                                    <p class="font-weight-bold mb-0">{{user.company_id}}</p>
                                </td>
                                <td>
                                    <div class="d-flex">
                                        <div class="d-flex flex-column justify-content-center">
                                            <h6 class="mb-0 text-sm">{{user.names}}</h6>
                                            <p class="text-xs text-secondary mb-0">{{user.email}} <span class="ms-2 text-success" v-if="user.verified_mail"><i class="bi bi-check-circle-fill"></i></span></p>
                                        </div>
                                    </div>

                                    <div class="mt-1">
                                        <span class="badge border border-light text-secondary border-secondary me-2">
                                            {{user.landing}}
                                        </span>
                                        
                                        <span v-if="user.status == 1" class="badge border border-success text-success">
                                            Activo
                                        </span>
                                        <span v-else-if="user.status == 0" class="badge border border-secondary text-secondary">
                                            Inactivo
                                        </span>
                                    </div>

                                    <div v-if="user.ewallets.length > 0" class="alert alert-dark text-white mt-3">
                                        <div v-for="ewallet in user.ewallets">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <span class="badge p-0 text-xxs text-secondary">Public key ({{ewallet.kind.title}})</span>
                                                </div>
                                                <div class="col-auto">
                                                    <button @click="goToViewPublicKey(ewallet)" class="btn btn-light btn-sm px-3 me-2 mb-0 shadow-none"><i class="bi bi-arrow-90deg-up"></i></button>
                                                    <button @click="copyPublicKey(ewallet.public_key)" class="btn btn-light btn-sm px-3 mb-0 shadow-none"><i class="bi bi-clipboard"></i></button>
                                                </div>
                                                <div>
                                                    <span class="text-xxs">{{ewallet.public_key}}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span class="badge p-0 text-xxs text-secondary">Balance</span>
                                                <div>$ {{ewallet.amount.numberFormat(2)}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="align-middle text-center">
                                    <span v-if="user.kyc_approbed" class="badge bg-primary">
                                        <i class="bi bi-check"></i>
                                    </span>
                                    <span v-else="user.kyc_approbed" class="badge bg-secondary">
                                        <i class="bi bi-x"></i>
                                    </span>
                                </td>
                                <td class="align-middle text-center">
                                    <span v-if="user.country_id" class="badge text-secondary text-xs">
                                        <div><img :src="user.country_id.getCoutryImage()" style="width:16px"/></div>
                                    </span>
                                </td>
                                <td class="align-middle text-center text-xs">
                                    <span v-if="user.phone">
                                        <a class="text-sm" :href="user.phone.formatPhoneNumber(user.countryData.phone_code).sendWhatsApp('¡Hola *'+user.names+'*! te contactamos de Disruptivo')">
                                            +{{user.phone.formatPhoneNumber(user.countryData.phone_code)}}
                                        </a>
                                    </span>
                                </td>
                                <td class="align-middle text-center text-sm">
                                    {{user.signup_date.formatDate()}}
                                </td>
                                <td class="align-middle text-center text-sm">
                                    <div class="dropdown">
                                        <button type="button" class="btn btn-dark shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                        </button>
                                        <ul class="dropdown-menu shadow">
                                            <li><button class="dropdown-item" @click="goToEdit(user.user_login_id)">Editar</button></li>
                                            <li><button class="dropdown-item" @click="viewEwallet(user)">Ver e-wallet</button></li>
                                            <li><button class="dropdown-item" @click="getInBackoffice(user.user_login_id)">Acceder a backoffice</button></li>
                                            <li v-if="!user.verified_mail"><button class="dropdown-item" @click="verifyUser(user)">Verificar email</button></li>
                                            
                                            <li><button class="dropdown-item" @click="deleteUser(user,-1)">Eliminar</button></li>
                                            
                                            <li v-if="user.status == '1'"><button class="dropdown-item" @click="setUserAs(user,0)">Inactivar</button></li>
                                            <li v-if="user.status == '0'"><button class="dropdown-item" @click="setUserAs(user,1)">Activar</button></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-else-if="users == false" class="card-body">
                    <div class="alert alert-info text-dark text-center">
                        <div>No tenemos usuarios aún</div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminusersViewer } 