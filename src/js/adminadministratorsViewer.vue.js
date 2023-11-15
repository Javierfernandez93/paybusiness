import { UserSupport } from '../../src/js/userSupport.module.js?v=2.5.0'

const AdminadministratorsViewer = {
    name : 'adminadministrators-viewer',
    data() {
        return {
            UserSupport : new UserSupport,
            administrators : null,
            columns: { // 0 DESC , 1 ASC 
                user_support_id : {
                    name: 'user_support_id',
                    desc: false,
                },
                names : {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                create_date : {
                    name: 'create_date',
                    desc: false,
                },
            }
        }
    },
    methods: {
        sortData: function (column) {
            this.administrators.sort((a,b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if(column.alphabetically)
                {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        deleteAdministrator(administrator) {
            const alert = alertCtrl.create({
                title: `Aviso`,
                subTitle: `¿Estás seguro de eliminar a <b>${administrator.names}</b>?`,
                buttons: [
                    { 
                        text: 'Aceptar',
                        handler: data => {
                            
                            this.UserSupport.deleteSupportUser({user_support_id:administrator.user_support_id},(response)=>{

                                alert.modal.dismiss();

                                if(response.s == 1)
                                {
                                    this.getAdministrators()

                                    alertInfo({
                                        icon:'<i class="bi bi-check"></i>',
                                        message: 'Eliminado correctamente',
                                        _class:'bg-gradient-success text-white'
                                    })
                                    
                                } else if(response.r == "INVALID_SUPPORT_ID") {
                                    alertInfo({
                                        icon:'<i class="bi bi-x"></i>',
                                        message: 'No puedes eliminarte a ti mismo',
                                        _class:'bg-gradient-danger text-white'
                                    })
                                }
                            })
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal);
        },
        goToEdit(company_id) {
            window.location.href = '../../apps/admin-administrators/edit?usid='+company_id
        },
        addPermission() {
            let alert = alertCtrl.create({
                title: 'Añadir permiso',
                size: 'modal-md',
                inputs: [
                    {
                        type: 'text',
                        name: 'permission',
                        id: 'permission',
                        placeholder: 'Nombre del permiso',
                        label: 'Nombre del permiso'
                    },
                    {
                        type: 'text',
                        name: 'description',
                        id: 'description',
                        placeholder: 'Descripción del permiso',
                        label: 'Descripción del permiso'
                    }
                ],  
                buttons: [
                    {
                        text: "Añadir",
                        role: "cancel",
                        handler: (data) => {
                            
                            this.UserSupport.addPermission(data,(response)=>{
                                if(response.s == 1)
                                {
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
            });
        
            alertCtrl.present(alert.modal);
        },
        getAdministrators() {
            this.UserSupport.getAdministrators({},(response)=>{
                if(response.s == 1)
                {
                    this.administrators = response.administrators.map((administrator)=>{
                        administrator['create_date'] = new Date(administrator['create_date']*1000).toLocaleDateString()
                        return administrator
                    })
                }
            })
        },
    },
    mounted() 
    {
        this.getAdministrators()
    },
    template : `
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <div class="row align-items-center">
                            <div class="col fs-4 fw-sembold text-primary">
                                <div v-if="administrators"><span class="badge p-0 text-secondary text-xxs">Total {{administrators.length}}</span></div>
                                <div>Administradores</div>
                            </div>
                            <div class="col-auto text-end">
                                <div><a href="../../apps/admin-administrators/add" type="button" class="btn shadow-none mb-2 btn-success px-3 btn-sm">Añadir adminstrador</a></div>
                                <div><button @click="addPermission" type="button" class="btn shadow-none mb-0 btn-success px-3 btn-sm">Añadir permiso</button></div>
                            </div>
                        </div>
                    </div>
                    <div class="card-header pb-0">
                        <input 
                            :autofocus="true"
                            v-model="query"
                            type="text" class="form-control" placeholder="Buscar..."/>
                    </div>
                    <div 
                        v-if="administrators"
                        class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsive p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th @click="sortData(columns.user_support_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.user_support_id.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">#</u>
                                        </th>
                                        <th @click="sortData(columns.names)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.names.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Usuario</u>
                                        </th>
                                        <th @click="sortData(columns.names)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.names.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Miembro desde</u>
                                        </th>
                                        
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="administrator in administrators">
                                        <td class="align-middle text-center text-sm">
                                            {{administrator.user_support_id}}
                                        </td>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <img src="../../src/img/user/user.png" class="avatar avatar-sm me-3" :alt="administrator.names">
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{{administrator.names}}</h6>
                                                    <p class="text-xs text-secondary mb-0">{{administrator.email}}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <p class="text-xs font-weight-bold mb-0">Fecha</p>
                                            <p class="text-xs text-secondary mb-0">{{administrator.create_date}}</p>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-outline-primary px-3 shadow-none btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    
                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    
                                                    <li><button class="dropdown-item" @click="goToEdit(administrator.user_support_id)">Editar</button></li>
                                                    
                                                    <li><hr class="dropdown-divider opacity-20"></li>
                                                    <li><button class="dropdown-item" @click="deleteAdministrator(administrator)">Eliminar</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                        
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else class="card-body">
                        <div class="alert alert-secondary text-white text-center">
                            <div>No tenemos administradores aún</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { AdminadministratorsViewer }