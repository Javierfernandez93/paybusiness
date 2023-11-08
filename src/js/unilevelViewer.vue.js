import { User } from '../../src/js/user.module.js';

const UnilevelViewer = {
    name : 'unilevel-viewer',
    data() {
        return {
            User : new User,
            networkAux: null,
            network: null,
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
            this.User.getNetwork({},(response)=>{
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
        <div v-if="network" class="container animation-fall-down" style="--delay:500ms">
            <div v-for="(level,levelIndex) in network" class="card mb-3">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl">
                            Nivel
                            {{levelIndex+1}}
                        </div>    
                        <div class="col-12 col-xl-auto">
                            <input type="text" @keyup="search($event.target,levelIndex)" class="form-control" placeholder="buscar..."/>
                        </div>    
                    </div>    
                </div>    

                <table class="table">
                    <thead>
                        <tr class="text-center">
                            <th class="tex-xs text-uppercase text-secondary">ID</th>
                            <th class="tex-xs text-uppercase text-secondary">Nombre</th>
                            <th class="tex-xs text-uppercase text-secondary">Fecha de registro</th>
                            <th class="tex-xs text-uppercase text-secondary">Activo hace</th>
                            <th class="tex-xs text-uppercase text-secondary">PayBusiness</th>
                            <th class="tex-xs text-uppercase text-secondary">PayAcademy</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in level" class="text-center">
                           <td>{{user.code}}</td>
                           <td>{{user.names}}</td>
                           <td>
                            {{user.signup_date.formatFullDate()}}
                           </td>
                           <td>
                            <span v-if="user.last_login_date" class="badge bg-success">
                                {{user.last_login_date.timeSince()}}
                            </span>
                            <span v-else class="badge bg-secondary">
                                Nunca
                            </span>
                           </td>
                           <td>
                            <span v-if="!user.pay_business" class="badge bg-secondary">
                                <i class="bi bi-x"></i>
                            </span>
                            <span v-else class="badge bg-success">
                                <i class="bi bi-check"></i>
                            </span>
                           </td>
                           <td>
                            <span v-if="!user.academy" class="badge bg-secondary">
                                <i class="bi bi-x"></i>
                            </span>
                            <span v-else class="badge bg-success">
                                <i class="bi bi-check"></i>
                            </span>
                           </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="network == false" class="alert alert-info">
            <div>Aún no tienes tu unilevel activo</div>
            <div class="h4">Comienza invitando personas a Unlimited</div>
        </div>
    `,
}

export { UnilevelViewer } 