import { User } from '../../src/js/user.module.js?v=2.4.8'   

const RangewidgetViewer = {
    name : 'rangewidget-viewer',
    data() {
        return {
            User: new User,
            members : 0,
            profile : 0
        }
    },
    methods: {
        getMemberCounter() {
            this.User.getMemberCounter({},(response)=>{
                if(response.s == 1)
                {
                    this.members = response.members
                    this.profile = response.profile
                } else {
                    this.members = false
                }
            })
        },
    },
    mounted() 
    {   
        this.getMemberCounter()
    },
    template : `
        <div v-if="profile" class="card shadow-none border">
            <div class="card-header">
                <div class="row align-items-center">
                    <div class="col">
                        <img :src="profile.range.image" :alt="profile.range.title" :title="profile.range.title" class="avatar avatar-md"/>
                    </div>
                    <div class="col-auto">
                        Contador de Miembros
                    </div>
                    <div class="col-auto">
                        <i class="bi bi-check-circle-fill text-success"></i>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <div class="avatar avatar">
                                    <img :src="profile.image" class="avatar rounded-circle border border-primary border-2" title="user" alt="user"/>
                                </div>
                            </div>
                            <div class="col">
                                <div class="lead sans">{{profile.names}}</div>
                                <div class="text-xs fw-bold text-dark">ID {{profile.code}}</div>
                            </div>
                            <div class="col-auto">
                                <span class="lead fw-semibold text-dark">{{members.numberFormat(0)}}</span>    
                            </div>
                            <div class="col-auto">
                                <span v-if="profile.active" class="badge bg-success">Calificado</span>    
                                <span v-else class="badge bg-secondary">No calificado</span>    
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-else-if="members == false" class="card shadow-none overflow-hidden border">
            <div class="mask bg-dark d-flex d-none justify-content-center align-items-center text-center text-white z-index-1">
                <div class="row">
                    <div class="col-12">
                        <div><i class="bi h1 text-white bi-lock-fill"></i></div>
                        Comienza a invitar a personas a Unlimited
                    </div>
                </div>
            </div>
            <div class="card-body py-5">
                <div class="row">
                    <div class="col">
                        Rango Actual
                    </div>
                    <div class="col-auto">
                        Contador de Miembros
                    </div>
                    <div class="col-auto">
                        <i class="bi bi-check-circle-fill text-success"></i>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { RangewidgetViewer } 