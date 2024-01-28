import { User } from '../../src/js/user.module.js?v=1.0.4'   

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
            let alert = alertCtrl.create({
                title: "Importante",
                subTitle: `
                    ¿Estás seguro de colocar a <b>${user.names}</b> a la extrema <b>${side ? 'Derecha' : 'Izquierda'}</b>?
                `,
                buttons: [
                    {
                        text: "Sí, colocar",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.User.setReferralInPosition({user_login_id:user.user_login_id,side:side},(response)=>{
                                if(response.s == 1)
                                {
                                    user.setted = true
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

            alertCtrl.present(alert.modal)  
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
                                    <div class="btn-group mb-0 shadow-none" role="group" aria-label="Basic example">
                                        <button @click="setReferralInPosition(user,SIDE.LEFT)" type="button" class="btn btn-primary mb-0 shadow-none">Izquierda</button>
                                        <button @click="setReferralInPosition(user,SIDE.RIGHT)" type="button" class="btn btn-dark mb-0 shadow-none">Derecha</button>
                                    </div>
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