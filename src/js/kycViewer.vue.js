import { User } from '../../src/js/user.module.js';

const KycViewer = {
    name : 'kyc-viewer',
    data() {
        return {
            User : new User,
            kyc: null,
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
        kyc: {
            handler() {
                this.filled = this.kyc.document_front && this.kyc.document_back && this.kyc.selfie
            },
            deep: true
        }
    },
    methods: {
        sendDni() {
            let alert = alertCtrl.create({
                title: "Aviso",
                subTitle: `¿Estás seguro de guardar esta información?`,
                inputs : [
                    {
                        type: 'text',
                        placeholder: 'DNI',
                        name: 'dni',
                        id: 'dni',
                    }
                ],
                buttons: [
                    {
                        text: "Sí, enviar",
                        class: 'btn-success',
                        role: "cancel",
                        handler: (data) => {
                            if(!data.dni) {
                                alertInfo({
                                    icon:'<i class="bi bi-x"></i>',
                                    message: `<div>Debes de subir un DNI</div>`,
                                    _class:'bg-gradient-danger text-white'
                                })
                                return false
                            }

                            this.User.sendDni({dni:data.dni},(response)=>{
                                if(response.s == 1)
                                {
                                    alertInfo({
                                        icon:'<i class="bi bi-check"></i>',
                                        message: `<div>Hemos enviado tus documentos para aprobación. Pronto tendrás una respuesta</div>`,
                                        _class:'bg-gradient-success text-white'
                                    })

                                    setTimeout(()=>{
                                        this.getKyCStatus()
                                    })
                                }
                            })
                        },
                    },
                    {
                        text: "Cancelar",
                        role: "cancel",
                        handler: (data) => {
                        },
                    },
                ],
            })

            alertCtrl.present(alert.modal)  
            
        },
        sendKyCValidation() {
            this.User.sendKyCValidation({kyc:this.kyc},(response)=>{
                if(response.s == 1)
                {
                    alertInfo({
                        icon:'<i class="bi bi-check"></i>',
                        message: `<div>Hemos enviado tus documentos para aprobación. Pronto tendrás una respuesta</div>`,
                        _class:'bg-gradient-success text-white'
                    })

                    setTimeout(()=>{
                        this.getKyCStatus()
                    })
                }
            })
        },
        getKyCStatus() {
            this.User.getKyCStatus({},(response)=>{
                this.kyc = response.kyc
            })
        },
        uploadKyCFile(target,document_type) 
        {
            let files = $(target).prop('files');
            var formData = new FormData();
          
            formData.append('file', files[0], document_type);
            formData.append('file_type', document_type);
          
            this.User.uploadKyCFile(formData,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.kyc[document_type] = response.target_path
              }
            });
        },
    },
    mounted() {
        this.getKyCStatus()
    },
    template : `
        <div v-if="kyc" class="card overflow-hidden animation-fall-down" style="--delay:500ms">
            <div class="card-header">
                KyC comprobation
            </div>

            <div class="card-body">
                <div v-if="kyc.status == STATUS.NOT_UPLOADED || kyc.status == STATUS.INCOMPLETE">
                    <div v-if="kyc.status == STATUS.NOT_UPLOADED" class="alert alert-danger text-white">
                        Sube tus documentos para completar tu perfil
                    </div>
                    <div v-else-if="kyc.status == STATUS.INCOMPLETE" class="alert alert-danger text-white text-center">
                        <div>Tus documentos han sido rechazados, por favor intenta de nuevo.</div>

                        <div v-if="kyc.feedback" class="h4 text-white mt-3">
                            <div>Motivo de rechazo</div>
                            {{kyc.feedback}}
                        </div>
                    </div>

                    <div class="card card-body border shadow-none cusor-pointer zoom-element cursor-pointer mb-3 text-center position-relative">
                        <div v-if="kyc.document_front">
                            <img :src="kyc.document_front" class="img-thumbnail"/>
                        </div>

                        <div>Documento de identidad (FRENTE)</div>

                        <input type="file" ref="file" @change="uploadKyCFile($event.target,'document_front')" capture="filesystem" accept=".jpg, .png, .jpeg" class="opacity-0 position-absolute start-0 top-0 w-100 h-100" id="inputGroupFile01">
                    </div>
                    <div class="card card-body border shadow-none cusor-pointer zoom-element cursor-pointer mb-3 text-center position-relative">
                        <div v-if="kyc.document_back">
                            <img :src="kyc.document_back" class="img-thumbnail"/>
                        </div>
                            
                        <div>Documento de identidad (REVERSO)</div>

                        <input type="file" ref="file" @change="uploadKyCFile($event.target,'document_back')" capture="filesystem" accept=".jpg, .png, .jpeg" class="opacity-0 position-absolute start-0 top-0 w-100 h-100" id="inputGroupFile01">
                    </div>

                    <div class="card card-body border shadow-none cusor-pointer zoom-element cursor-pointer mb-3 text-center position-relative">
                        <div v-if="kyc.selfie">
                            <img :src="kyc.selfie" class="img-thumbnail"/>
                        </div>
                        
                        <div>Selfie sosteniendo el documento de identidad</div>
                        
                        <input type="file" ref="file" @change="uploadKyCFile($event.target,'selfie')" capture="filesystem" accept=".jpg, .png, .jpeg" class="opacity-0 position-absolute start-0 top-0 w-100 h-100" id="inputGroupFile01">
                    </div>

                    <div class="d-grid mb-3">
                        <button @click="sendKyCValidation" :disabled="!filled" type="button" class="btn mb-0 btn-primary btn-lg shadow-none">Enviar para revisión</button>
                    </div>
                    <div class="d-grid">
                        <button @click="sendDni" type="button" class="btn btn-primary btn-lg shadow-none">
                            <div>¿Ya estábas verfificado?</div>
                            Escríbenos tu DNI o tu ID anterior
                        </button>
                    </div>
                </div>
                <div v-else-if="kyc.status == STATUS.PENDING" class="text-center">
                    <div>
                        <i class="bi bi-clock h1"></i>
                    </div>
                    <div class="h4">
                        ¡Estamos revisando tus documentos!
                    </div>
                    <div class="text-secondary">
                        Vuelve más tarde
                    </div>
                </div>
                <div v-else-if="kyc.status == STATUS.PASS" class="text-center text-success">
                    <div>
                        <i class="bi bi-check h1 text-success"></i>
                    </div>
                    <div class="h4 text-success">
                        ¡Tus documentos han sido aprobados!
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { KycViewer } 