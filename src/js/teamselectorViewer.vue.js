import { User } from '../../src/js/user.module.js?v=2.4.4'   

const TeamselectorViewer = {
    name : 'teamselector-viewer',
    data() {
        return {
            User: new User,
            users : null,
            SIDE : {
                LEFT : 0,
                RIGHT : 1,
            }
        }
    },
    methods: {
        getTeamPending() {
            this.users = null
            this.User.getTeamPending({},(response)=>{
                if(response.s == 1)
                {
                    this.users = response.users
                    
                }
            })
        },
        setReferralInPosition(user,side) {
            this.User.setReferralInPosition({user_login_id:user.user_login_id,side:side},(response)=>{
                if(response.s == 1)
                {
                    user.setted = true
                }
            })
        },
    },
    mounted() 
    {   
        this.getTeamPending()
    },
    template : `
        <div v-if="users" class="card mb-3">
            <div class="card-header h4">
                Usuarios pendientes por colocar en tu red
            </div>
            <ul class="list-group list-group-flush">
                <li v-for="user in users" class="list-group-item">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-md-auto">
                            <div class="avatar">
                                <img class="avatar" :src="user.image" alt="" title=""/>
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            <div class="lead">
                                {{user.names}}
                                
                            </div>
                        </div>
                        <div class="col-12 col-md-12 col-xl-auto">
                            <div v-if="!user.setted">
                                <div v-if="!user.verified" class="text-xs text-secondary">
                                    <i class="bi bi-lock"></i>
                                    Es necesario que el miembro verifique su correo para que puedas colocarlo
                                </div>
                                <div v-else>
                                    <button @click="setReferralInPosition(user,SIDE.LEFT)" class="btn btn-primary shadow-none me-2 mb-0">Izquierda</button>
                                    <button @click="setReferralInPosition(user,SIDE.RIGHT)" class="btn btn-primary shadow-none mb-0">Derecha</button>
                                </div>
                            </div>
                            <div v-else class="text-success">
                                <i class="bi bi-check-circle-fill"></i> Posicionado
                            </div>
                        </div>
                    </&div>
                </li>
            </ul>
        </div>

    `,
}

export { TeamselectorViewer } 