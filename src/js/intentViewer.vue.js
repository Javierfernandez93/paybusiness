import { UserSupport } from './userSupport.module.js?v=1.0.8'
import { Loader } from './loader.module.js?v=1.0.8'

const IntentViewer = {
    name : 'intent-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            Loader: new Loader,
            query: null,
            intentsAux: null,
            intents: null,
        }
    },
    watch : {
        query: {
            handler()
            {
                this.filterData()
            },
            deep: true
        },
    },
    methods: {
        filterData() {
            this.intents = this.intentsAux
            this.intents = this.intents.filter((intent) => {
                return intent.tag.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        getAllIntents()
        {
            this.Loader.show()

            this.intentsAux = null
            this.intents = null
            
            this.UserSupport.getAllIntents({},(response)=>{
                this.Loader.hide()

                if(response.s == 1)
                {
                    this.intentsAux = response.intents
                    this.intents = this.intentsAux
                }
            })
        },
        disableIntent(intent)
        {
            this.Loader.show()

            this.UserSupport.disableIntent({intent_id:intent.intent_id},(response)=>{
                this.Loader.hide()

                if(response.s == 1)
                {
                    intent.status = 0
                    toastAlert({
                        message: 'Intent deshabilitado',
                    })
                }
            })
        },
        enableIntent(intent)
        {
            this.Loader.show()

            this.UserSupport.enableIntent({intent_id:intent.intent_id},(response)=>{
                this.Loader.hide()

                if(response.s == 1)
                {
                    intent.status = 1

                    toastAlert({
                        message: 'Intent habilitado',
                    })
                }
            })
        },
        deleteIntent(intent_id)
        {
            this.Loader.show()

            this.UserSupport.deleteIntent({intent_id:intent_id},(response)=>{
                this.Loader.hide()

                if(response.s == 1)
                {
                    toastAlert({
                        message: 'Intent eliminado',
                    })

                    this.getAllIntents()
                }
            })
        },
    },
    mounted() 
    {   
        this.getAllIntents()
    },
    template : `
        <div class="card card-body mb-3">
            <div class="row align-items-center">
                <div class="col-12 col-xl">
                    <div class="h6">Entrenamientos</div>
                </div>
                <div class="col-12 col-xl-auto">
                    <input :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar intent...">
                </div>
                <div class="col-12 col-xl-auto">
                    <a href="../../apps/admin-intent/add" class="btn mb-0 shadow-none btn-dark">Entrenar </a>
                </div>
            </div>
        </div>

        <div v-for="intent in intents" class="mb-3">
            <div class="card zoom-element">
                <div class="card-header">
                    <div class="row">
                        <div class="col-12 col-xl">
                            <div>
                                <span v-text="intent.status ? 'Habilitado' : 'Deshabilitado'" class="badge text-xs mb-3" :class="intent.status ? 'bg-success' : 'bg-secondary'"></span>
                            </div>
                            <div class="text-xs text-secondary">
                                <span v-if="intent.create_date" class="badge text-secondary p-0"><t>Actualizado hace</t> {{intent.create_date.timeSince()}}</span>
                            </div>

                            <div>
                                <span class="lead sans text-uppercase text-primary">{{intent.tag}}</span>
                            </div>
                        </div>

                        <div class="col-12 col-xl-auto">
                            <div class="dropdown">
                                <button class="btn btn-primary shadow-none mb-0 btn-sm mb-0 px-3 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                
                                </button>
                                <ul class="dropdown-menu shadow">
                                    <li v-if="intent.status == 0"><button @click="enableIntent(intent)" class="dropdown-item"><t>Habilitar</t></button></li>
                                    <li v-else><button @click="disableIntent(intent)" class="dropdown-item"><t>Deshabilitar</t></button></li>
                                    <li><button @click="deleteIntent(intent.intent_id)" class="dropdown-item"><t>Eliminar</t></button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div v-if="intent.words" class="col-12 col-xl">
                            <div><span class="badge p-0 text-secondary">Frases</span></div>

                            <div v-for="word in intent.words" class="">
                                {{word}}
                            </div>
                        </div>
                        
                        <div v-if="intent.replys" class="col-12 col-xl">
                            <div><span class="badge p-0 text-secondary">Respuestas</span></div>
                            
                            <div v-for="reply in intent.replys" class="">
                                <span v-html="reply"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { IntentViewer } 