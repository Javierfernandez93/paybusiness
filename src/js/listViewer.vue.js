import { User } from '../../src/js/user.module.js?v=1.1.9';

const ListViewer = {
    name : 'list-viewer',
    data() {
        return {
            User : new User,
            networkAux: null,
            network: null,
            SIDE: {
                START: 0,
                END: 1,
            }
        }
    },
    methods: {
        goToEvent(banner) {
            window.open(banner.link)
        },
        search(target,levelIndex) {
            let query = $(target).val()

            this.network = {...this.networkAux}

            this.network[levelIndex] = this.network[levelIndex].filter((user)=>{
                return user.names.toLowerCase().includes(query.toLowerCase())
            })
        },
        getNetwork() {
            this.User.getNetwork({limit:1},(response)=>{
                if(response.s == 1)
                {
                    this.network = response.network
                    this.networkAux = response.network
                } else {
                    this.network = false
                }
            })
        }
    },
    mounted() {
        this.getNetwork()
    },
    template : `
        <div class="container">
            <div class="alert sans bg-primary text-center">
                <div class="mb-n1 lead text-white">
                    ¡Echa un vistazo a "Mi Equipo" y conoce a tus referidos! Desde los nuevos hasta los veteranos, todos están aquí. 
                </div>
                <div class="h4 text-white">
                    ¡Descubre la red que estás construyendo en Disruptivo!
                </div>
            </div>

            <div v-if="network">
                <div v-for="(level,levelIndex) in network" class="card mb-3 animation-fall-down" :style="{'--delay':(levelIndex+1)*250+'ms'}">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl h4">
                                Nivel
                                {{levelIndex+1}}
                            </div>    
                            <div class="col-12 col-xl-auto">
                                {{level.length}} usuario(s)
                            </div>    
                            <div class="col-12 col-xl-auto">
                                <input type="text" @keyup="search($event.target,levelIndex)" class="form-control" placeholder="buscar..."/>
                            </div>    
                        </div>    
                    </div>    

                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr class="text-center">
                                    <th class="tex-xs text-uppercase text-secondary">ID</th>
                                    <th class="tex-xs text-uppercase text-secondary">Usuario</th>
                                    <th class="tex-xs text-uppercase text-secondary">LADO</th>
                                    <th class="tex-xs text-uppercase text-secondary">Teléfono</th>
                                    <th class="tex-xs text-uppercase text-secondary">País</th>
                                    <th class="tex-xs text-uppercase text-secondary">Fecha de registro</th>
                                    <th class="tex-xs text-uppercase text-secondary">Activo hace</th>
                                    <th class="tex-xs text-uppercase text-secondary">PayBusiness</th>
                                    <th class="tex-xs text-uppercase text-secondary">PayAcademy</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="(user,index) in level" class="text-center">
                                <td class="align-middle">
                                    <span>#{{index+1}}</span>
                                    <div class="sans">
                                        {{user.code}}
                                    </div>
                                </td>
                                <td class="align-middle">
                                    <div class="text-dark">{{user.names}}</div>
                                    <div class="text-secondary sans">{{user.email}}</div>
                                </td>
                                <td class="align-middle">
                                    <span v-if="user.side == SIDE.START" class="badge bg-success">
                                        Izquierda
                                    </span>
                                    <span v-else-if="user.side == SIDE.END" class="badge bg-primary">
                                        Derecha
                                    </span>
                                </td>
                                <td class="align-middle">{{user.phone}}</td>
                                <td class="align-middle">
                                    <img :src="user.country_id.getCoutryImage()" title="Country" alt="Country" class="img-flag"/>
                                </td>
                                <td class="align-middle">
                                    {{user.signup_date.formatFullDate()}}
                                </td>
                                <td class="align-middle">
                                    <span v-if="user.last_login_date" class="badge bg-success">
                                        {{user.last_login_date.timeSince()}}
                                    </span>
                                    <span v-else class="badge bg-secondary">
                                        Nunca
                                    </span>
                                </td>
                                <td class="align-middle">
                                    <span v-if="!user.pay_business" class="badge bg-secondary">
                                        <i class="bi h5 text-white bi-x"></i>
                                    </span>
                                    <span v-else class="badge bg-success">
                                        <i class="bi h5 text-white bi-check"></i>
                                    </span>
                                </td>
                                <td class="align-middle">
                                    <span v-if="!user.pay_academy" class="badge bg-secondary">
                                        <i class="bi lead text-white bi-x"></i>
                                    </span>
                                    <span v-else class="badge bg-success">
                                        <i class="bi lead text-white bi-check"></i>
                                    </span>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div v-else-if="network == false">
                <div class="alert alert-info text-center text-white">
                    <div>Aún no tienes tu unilevel activo</div>
                    <div class="h4 text-white">Comienza invitando personas a Disruptivo</div>

                    <a href="../../apps/backoffice" class="btn mt-3 btn-outline-light">Ir a mi dashboard</a>
                </div>
            </div>
        </div>
    `,
}

export { ListViewer } 