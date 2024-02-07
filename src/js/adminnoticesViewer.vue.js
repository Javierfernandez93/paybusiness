import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.8'

const AdminnoticesViewer = {
    name: 'adminnotices-viewer',
    data() {
        return {
            UserSupport : new UserSupport,
            notices : {},
            query : null,
            noticesAux : {},
            columns: { // 0 DESC , 1 ASC 
                notice_id : {
                    name: 'notice_id',
                    desc: true,
                },
                title : {
                    name: 'title',
                    desc: false,
                    alphabetically: true,
                },
                notice : {
                    name: 'notice',
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
    watch : {
        query : 
        {
            handler() {
                this.filterData()
            },
            deep : true
        },
    },
    methods: {
        sortData: function (column) {
            this.notices.sort((a,b) => {
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
        goToEdit(notice_id) {
            window.location.href = `../../apps/admin-news/edit?nid=${notice_id}`
        },
        publishNotice(notice_id) {
            this.UserSupport.publishNotice({notice_id:notice_id},(response)=>{
                if(response.s == 1)
                {
                    this.getNotices()

                    toastInfo({
                        message : 'Noticia publicada',
                    })
                }
            })
        },
        unpublishNotice(notice_id) {
            this.UserSupport.unpublishNotice({notice_id:notice_id},(response)=>{
                if(response.s == 1)
                {
                    this.getNotices()

                    toastInfo({
                        message : 'Noticia despublicada',
                    })
                }
            })
        },
        deleteNotice(notice_id) {
            this.UserSupport.deleteNotice({notice_id:notice_id},(response)=>{
                if(response.s == 1)
                {
                    this.getNotices()
                    
                    toastInfo({
                        message : 'Noticia eliminada',
                    })
                }
            })
        },
        filterData() {
            this.notices = this.noticesAux
            
            this.notices = this.noticesAux.filter((notice)=>{
                return notice.title.toLowerCase().includes(this.query.toLowerCase()) || notice.create_date.formatDate().toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getNotices() {
            this.noticesAux = null
            this.notices = null

            this.UserSupport.getNotices({},(response)=>{
                if(response.s == 1)
                {
                    this.noticesAux = response.notices
                    this.notices = this.noticesAux
                }
            })
        },
    },
    mounted() 
    {
        this.getNotices()
    },
    template : `
        <div class="row animation-fall-down" style="--delay:500ms">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl">
                                <span v-if="notices" class="text-xs text-secondary">Total {{notices.length}}</span>
                                <div class="h6 fw-sembold">
                                    Noticias
                                </div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <div><a href="../../apps/admin-news/add" type="button" class="btn shadow-none mb-0 btn-success btn-sm">Añadir noticia</a></div>
                            </div>
                            <div class="col-12 col-xl-auto">
                                <input v-model="query" :autofocus="true" type="text" class="form-control" placeholder="Buscar..." />
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="notices" 
                        class="card-body px-0 pt-0 pb-2">
                        <div class="table-responsives p-0">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr class="align-items-center">
                                        <th @click="sortData(columns.notice_id)" class="text-center c-pointer text-uppercase text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.notice_id">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">ID</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.title)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.title.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Título</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.notice)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.notice.desc">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Tipo</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.create_date)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Fecha</u>
                                        </th>
                                        <th 
                                            @click="sortData(columns.create_date)"
                                            class="text-center c-pointer text-uppercase text-primary text-secondary font-weight-bolder opacity-7">
                                            <span v-if="columns.create_date">
                                                <i class="bi text-primary bi-arrow-up-square-fill"></i>
                                            </span>    
                                            <span v-else>    
                                                <i class="bi text-primary bi-arrow-down-square-fill"></i>
                                            </span>    
                                            <u class="text-sm ms-2">Fecha de visualización</u>
                                        </th>
                                        <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="notice in notices" class="py-3">
                                        <td class="align-middle text-center text-sm">
                                            <p class="font-weight-bold mb-0">{{notice.notice_id}}</p>
                                        </td>
                                        <td>
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <div>
                                                        <span class="badge bg-gradient-success text-xxs" v-if="notice.status == '1'">Publicada</span>
                                                        <span class="badge bg-gradient-secondary text-xxs" v-else-if="notice.status == '0'">Sin publicar</span>
                                                    </div>

                                                    <h6 class="my-2 text-balance">{{notice.title.cutString(40)}}</h6>
                                                    <idv class="text-xs text-secondary">Por {{notice.names}}</idv>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span 
                                                :class="notice.catalog_notice_id == 1 ? 'bg-primary' : 'bg-success'"
                                                class="badge badge-sm ">
                                                {{notice.notice}}
                                            </span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <span class="text-xs text-dark mb-0">{{notice.create_date.formatDate()}}</span>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div v-if="notice.start_date && notice.end_date">
                                                <span class="badge bg-primary">{{notice.start_date.formatDate()}}</span>
                                                al
                                                <span class="badge bg-primary">{{notice.end_date.formatDate()}}</span>
                                            </div>
                                            <div v-else>
                                                N/A
                                            </div>
                                        </td>
                                        <td class="align-middle text-center text-sm">
                                            <div class="btn-group">
                                                <button type="button" class="btn mb-0 btn-primary px-3 shadow-none btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                                </button>
                                                <ul class="dropdown-menu shadow">
                                                    <li><button class="dropdown-item" @click="goToEdit(notice.notice_id)">Editar</button></li>
                                                
                                                    <li v-if="notice.status == '0'"><button class="dropdown-item" @click="publishNotice(notice.notice_id)">Publicar noticia</button></li>
                                                
                                                    <li v-if="notice.status == '1'"><button class="dropdown-item" @click="unpublishNotice(notice.notice_id)">Despublicar noticia</button></li>
                                                
                                                    <li>
                                                        <hr class="dropdown-divider opacity-1">
                                                    </li>
                                                    <li><button class="dropdown-item" @click="deleteNotice(notice.notice_id)">Eliminar</button></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-else class="card-body">
                        <div class="alert alert-danger text-white text-center mb-0">
                            <div>No tenemos noticias aún, comienza añadiendo una</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
} 

export { AdminnoticesViewer }