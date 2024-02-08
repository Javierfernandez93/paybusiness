import { UserSupport } from './userSupport.module.js?v=1.0.9'
import { Loader } from './loader.module.js?v=1.0.9'

const AddintentViewer = {
    name : 'addintent-viewer',
    data() {
        return {
            UserSupport: new UserSupport,
            Loader: new Loader,
            isLastIntentReply: false,
            isLastIntentFilled: false,
            query: null,
            intentsAux: null,
            intents: null,
            catalog_intent: {
                tag: null
            },
            replys_per_catalog_tag_intent: [],
            intents: [],
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
        replys_per_catalog_tag_intent: {
            handler()
            {
                this.isLastIntentReply = true
                    
                this.replys_per_catalog_tag_intent.map((reply_per_catalog_tag_intent)=>{
                    if(reply_per_catalog_tag_intent.reply == null)
                    {
                        this.isLastIntentReply = false
                    }
                })
            },
            deep: true
        },
        intents: {
            handler()
            {
                this.isLastIntentFilled = true
                    
                this.intents.map((intent)=>{
                    if(intent.words == null)
                    {
                        this.isLastIntentFilled = false
                    }
                })
            },
            deep: true
        },
    },
    methods: {
        filterData () {
            this.intents = this.intentsAux
            this.intents = this.intents.filter((intent) => {
                return intent.tag.toLowerCase().includes(this.query.toLowerCase()) || intent.words.toLowerCase().includes(this.query.toLowerCase())  
            })
        },
        insertReplyPerCatalogTagIntent()
        {
            this.replys_per_catalog_tag_intent.push({
                reply: null,
            })
        },
        insertIntent()
        {
            this.intents.push({
                words: null,
            })
        },
        selectIntent(intent)
        {
            this.catalog_intent.tag = intent.catalog_intent.tag
            this.replys_per_catalog_tag_intent = intent.replys_per_catalog_tag_intent
            this.intents = intent.intents
        },
        importIntents()
        {
            this.$emit('importintents');
        },
        saveIntent(event)
        {
            this.Loader.show()

            this.UserSupport.saveIntent({tag:this.catalog_intent.tag,replys_per_catalog_tag_intent:this.replys_per_catalog_tag_intent,intents:this.intents,sheet_per_proyect_id:getParam('sppid')},(response)=>{
                this.Loader.close()

                if(response.s == 1)
                {
                    event.target.innerText = 'Guardado'  
                    
                    toastInfo({
                        message: 'Entrenamiento guardado',
                    })
                }
            })
        },
        getAllIntents(sheet_per_proyect_id)
        {
            this.Loader.show()

            this.UserSupport.getAllIntents({sheet_per_proyect_id:sheet_per_proyect_id},(response)=>{
                this.Loader.close()

                if(response.s == 1)
                {
                    this.intentsAux = response.intents
                    this.intents = this.intentsAux
                }
            })
        },
    },
    mounted() 
    {   
        this.insertIntent()
        this.insertReplyPerCatalogTagIntent()
    },
    template : `
        <div class="row d-flex justify-content-center">
           <div class="col-12">
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-12 col-xl">
                                <div class="h6">
                                    Entrenar ChatBot
                                </div>
                            </div>   
                            <div class="col-12 col-xl-auto">
                                <div class="input-group input-group-lg input-group-merge">
                                    <input 
                                        :autofocus="true"
                                        @keydown.space.prevent
                                        :class="catalog_intent.tag ? 'is-valid' : ''"
                                        v-model="catalog_intent.tag" type="text" class="form-control" placeholder="Nombre del tag">
                                </div>
                            </div>   
                            <div class="col-12 col-xl-auto">
                                <button  @click="saveIntent($event)" class="btn btn-dark mb-0 shadow-none">Entrenar BOT</button>
                            </div>   
                            <div class="col-12 col-xl-auto d-none">
                                <button  @click="importIntents" class="btn btn-dark mb-0 shadow-none">importIntents</button>
                            </div>   
                        </div>   
                    </div>   
                </div>   
                
                <div class="card overflow-hidden card-body">
                    <div class="row">
                        <div class="col-12 col-xl-6 border-end">
                            <div class="card-body"> 
                                <div class="row align-items-center">
                                    <div class="col h6">
                                        Frases ({{intents.length}})
                                    </div>
                                    <div class="col-auto">
                                        <button :disabled="!isLastIntentFilled" @click="insertIntent" class="btn btn-dark shadow-none mb-0 btn-sm px-3">Añadir frase <i class="bi bi-plus-lg"></i></button>
                                    </div>
                                </div>
                            </div>

                            <ul class="list-group list-group-flush">
                                <li v-for="intent in intents"
                                    class="list-group-item">
                                    <input  @keydown.enter.exact.prevent="insertIntent" v-model="intent.words" :class="intent.words ? 'is-valid' : ''" type="text" placeholder="Escribe aquí.." class="form-control border-0">
                                </li>
                            </ul>
                        </div>
                        <div class="col-12 col-xl-6">
                            <div class="card-body"> 
                                <div class="row align-items-center">
                                    <div class="col h6">
                                        Respuestas ({{replys_per_catalog_tag_intent.length}})
                                    </div>
                                    <div class="col-auto">
                                        <button :disabled="!isLastIntentReply" @click="insertReplyPerCatalogTagIntent" class="btn btn-dark shadow-none mb-0 btn-sm px-3">Añadir respuestas <i class="bi bi-plus-lg"></i></button>
                                    </div>
                                </div>
                            </div>

                            <ul class="list-group list-group-flush">
                                <li v-for="reply_per_catalog_tag_intent in replys_per_catalog_tag_intent"
                                    class="list-group-item">
                                    <textarea  @keydown.enter.exact.prevent="insertReplyPerCatalogTagIntent" v-model="reply_per_catalog_tag_intent.reply" :class="reply_per_catalog_tag_intent.reply ? 'is-valid' : ''" type="text" placeholder="Escribe aquí..." class="form-control border-0">
                                    </textarea>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AddintentViewer } 