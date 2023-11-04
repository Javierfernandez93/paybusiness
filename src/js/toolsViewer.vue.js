import { User } from '../../src/js/user.module.js?v=2.3.3'   

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
                }
            })
        }
    },
    mounted() 
    {   
        this.getToolsList()
    },
    template : `
        <div v-if="tools" class="container">
            <div class="card mb-3 overflow-hidden">
                <div class="card-header">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-12 col-xl">
                            <div class="h3">Tools</div>
                        </div>
                        <div class="col-12 col-xl-auto">
                            <input v-model="query" type="text" class="form-control" placeholder="Buscar herramienta..."/>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center align-items-center">
                <div v-for="tool in tools" class="col-12 col-xl-4 mb-3">
                    <div class="card shadow-xl overflow-hidden border-radius-2xl f-zoom-element-sm">
                        <img :src="tool.image" class="cad-img-top"/>

                        <div class="position-absolute top-0 row px-4 py-3">
                            
                            <span class="badge bg-primary">
                                {{tool.tool}}
                            </span>
                        </div>

                        <div class="mt-n6 row w-100 justify-content-end">
                            <div class="col-12 col-xl-auto">
                                <a class="btn btn-success me-1 " :href="tool.route" download>Descargar</a>
                                <a class="btn btn-primary " :href="tool.route">Visualizar</a>
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

                            <span class="badge mt-3 text-xxs border border-primary text-primary">Subido por {{tool.names}} hace {{tool.create_date.timeSince()}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="alert alert-light text-center">
                Aún no tenemos herramientas. Vuelve más tarde
            </div>
        </div>
    `,
}

export { ToolsViewer } 