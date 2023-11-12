import { User } from '../../src/js/user.module.js?v=2.4.2'   

const ToolsViewer = {
    name : 'tools-viewer',
    data() {
        return {
            User : new User,
            query : null,
            toolsAux : null,
            tools : null
        }
    },
    watch : {
        query: {
            handler() {
                this.filterData()
            },
            deep: true
        },
    },
    methods: {
        filterData() {
            this.tools = this.toolsAux
            this.tools = this.tools.filter((tool)=>{
                return tool.tool.toLowerCase().includes(this.query.toLowerCase())
                || tool.title.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getToolsList() {
            this.User.getToolsList({},(response)=>{
                if(response.s == 1)
                {
                    this.tools = response.tools
                    this.toolsAux = response.tools
                } else {
                    this.tools = false
                }
            })
        }
    },
    mounted() 
    {   
        this.getToolsList()
    },
    template : `
        <div v-if="tools" class="container animation-fall-down" style="--delay:500ms">
            <div class="card mb-3 overflow-hidden">
                <div class="card-header">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl">
                            <div class="h3">Tools</div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <input v-model="query" type="text" class="form-control" placeholder="Buscar herramienta..."/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row align-items-center">
                <div v-for="tool in tools" class="col-12 col-xl-4 mb-3">
                    <div class="card shadow-xl overflow-hidden border-radius-2xl f-zoom-element-sm">
                        <div class="card-header">
                            <div class="justify-content-end">
                                <span class="badge bg-primary">
                                    {{tool.tool}}
                                </span>
                            </div>
                        </div>
                        <div class="card-header">
                            <div class="fw-semibold text-dark">
                                {{tool.title}}
                            </div>
                            <div v-if="tool.description">
                                <div v-html="tool.description">
        
                                </div>
                            </div>

                            <span class="badge text-xxs border border-primary text-primary">Subido por {{tool.names}} hace {{tool.create_date.timeSince()}}</span>
                        </div>

                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-xl-6">
                                    <div class="d-grid">
                                        <a class="btn shadow-none mb-3 btn-success me-0 mb-xl-0 me-xl-1" :href="tool.route" download>Descargar</a>
                                    </div>
                                </div>
                                <div class="col-12 col-xl-6">
                                    <div class="d-grid">
                                        <a class="btn shadow-none mb-0 btn-primary " :href="tool.route">Visualizar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="tools == false">
            <div class="alert alert-light text-center">
                Aún no tenemos herramientas. Vuelve más tarde
            </div>
        </div>
    `,
}

export { ToolsViewer } 