import { UserSupport } from '../../src/js/userSupport.module.js';

const AdminkycViewer = {
    name : 'adminkyc-viewer',
    data() {
        return {
            UserSupport : new UserSupport,
            users: null,
            usersAux: null,
            query: null,
            filled : false,
            STATUS : {
                NOT_UPLOADED : 0,
                PENDING : 1,
                INCOMPLETE : -1,
                PASS : 2,
            }
        }
    },
    watch: {
        query: {
            handler() {
                this.filled = this.kyc.document_front && this.kyc.document_back && this.kyc.selfie
            },
            deep: true
        }
    },
    methods: {
        viewDocument(document) {
            window.open(document)
        },
        approbeKyc(user) {
            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `¿Estás seguro de aporbar el KYC para ${user.names}?`,
                buttons: [
                    {
                        text: "Sí, aprobar",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.approbeKyc({user_kyc_id:user.user_kyc_id},(response)=>{
                                if(response.s == 1)
                                {
                                    user.status = response.status
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
        rejectKyc(user) {
            let alert = alertCtrl.create({
                title: "Alert",
                subTitle: `¿Estás seguro de rechazar el KYC para ${user.names}?`,
                inputs : [
                    {
                        type : 'text',
                        name : 'feedback',
                        id : 'feedback',
                        placeholder : 'Escribe aquí...',
                    }
                ],
                buttons: [
                    {
                        text: "Sí, rechazar",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            this.UserSupport.rejectKyc({feedback:data.feedback,user_kyc_id:user.user_kyc_id},(response)=>{
                                if(response.s == 1)
                                {
                                    user.feedback = data.feedback
                                    user.status = response.status
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
        getKyCForAprobation() {
            this.UserSupport.getKyCForAprobation({},(response)=>{
                if(response.s == 1)
                {
                    this.users = response.users
                    this.usersAux = response.users
                }
            })
        },
    },
    mounted() 
    {
        this.getKyCForAprobation()
    },
    template : `
        <div v-if="users" class="card overflow-hidden animation-fall-down" style="--delay:500ms">
            <div class="card-header">
                KyC comprobation
            </div>

            <table class="table">
                <thead>
                    <tr class="text-center">
                        <th>Nombre</th>
                        <th>Fecha captura</th>
                        <th>Documentos</th>
                        <th>DNI</th>
                        <th>Estatus</th>
                        <th>FeedBack</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" class="text-center">
                        <td class="align-middle">{{user.names}}</td>
                        <td class="align-middle">{{user.create_date.formatFullDate()}}</td>
                        <td class="align-middle">
                            <div class="d-grid"><button @click="viewDocument(user.document_front)" class="btn mb-1 px-1 shadow-none btn-sm btn-primary">Ver Identificación Frente</button></div>
                            <div class="d-grid"><button @click="viewDocument(user.document_back)" class="btn mb-1 px-1 shadow-none btn-sm btn-primary">Ver Identificación Reverso</button></div>
                            <div class="d-grid"><button @click="viewDocument(user.selfie)" class="btn mb-1 px-1 shadow-none btn-sm btn-primary">Ver selfie</button></div>
                        </td>
                        <td class="align-middle">
                            {{user.dni}}
                        </td>
                        <td class="align-middle">
                            <span v-if="user.status == STATUS.PENDING" class="badge bg-warning">Pendiente de aprobación</span>
                            <span v-else-if="user.status == STATUS.NOT_UPLOADED" class="badge bg-secondary">Sin subir</span>
                            <span v-else-if="user.status == STATUS.INCOMPLETE" class="badge bg-secondary">Documentación incompleta</span>
                            <span v-else-if="user.status == STATUS.PASS" class="badge bg-primary">Verificado</span>
                        </td>
                        <td class="align-middle">
                            {{user.feedback}}
                        </td>
                        <td class="align-middle">
                            <div class="dropdown">
                                <button type="button" class="btn btn-outline-primary px-3 mb-0 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                </button>
                                <ul class="dropdown-menu shadow">
                                    <li v-if="user.status == STATUS.PENDING"><button class="dropdown-item" @click="approbeKyc(user)">Aprobar</button></li>
                                    <li v-if="user.status == STATUS.PENDING"><button class="dropdown-item" @click="rejectKyc(user)">Declinar</button></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
}

export { AdminkycViewer } 