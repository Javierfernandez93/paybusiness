import { User } from '../../src/js/user.module.js?v=2.4.1'   

const UserflyerViewer = {
    name : 'userflyer-viewer',
    data() {
        return {
            User: new User,
            profile: null
        }
    },
    methods: {
        generateFlyer() {
            $(this.$refs.modal).modal('show')
            // this.User.generateFlyer({},(response)=>{
            //     if(response.s == 1)
            //     {
            //         window.open(response.path)
            //     }
            // })
        },
        getProfileShort() {
            this.User.getProfileShort({},(response)=>{
                if(response.s == 1)
                {
                    this.profile = response.profile
                }
            })
        },
        downloadImage() {
            html2canvas($(this.$refs.flyer)[0]).then((canvas) => {
                var myImage = canvas.toDataURL("image/png");

                var image = myImage.replace("image/png", "image/octet-stream"); 
                window.open(image); 
            });
        },
    },
    mounted() 
    {   
        this.getProfileShort()
    },
    template : `
        <div v-if="profile" class="modal" ref="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content modal">
                    <div class="modal-header">
                        <h5 class="modal-title">Modificar foto de perfil</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mask-container position-relative justify-content-center align-items-center d-flex" ref="flyer">
                            <img src="../../src/img/mask.png" class="position-absolute flyer-mask z-index-1"/>
                            <img :src="profile.image" class="position-absolute flyer-target z-index-0"/>

                            <div class="text position-absolute z-index-2">{{profile.names}}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button @click="downloadImage" type="button" class="btn btn-primary">Descargar Flyer</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="card animation-fall-down" style="--delay: 800ms">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="background-image: url('../../assets/img/ivancik.jpg')">
                <span class="mask bg-primary"></span>
                <div class="card-body position-relative z-index-1 h-100 p-3">
                    <h4 class="text-white font-weight-bolder mb-3">¿Ya tienes tu Flyer?</h4>
                    <h6 class="text-white font-weight-bolder mb-3">¡Ya puedes generar tu flyer de bienvenida!</h6>
                    <p class="text-white mb-3">
                        Para generarlo da clic en generar flyer, ten en cuenta que debes de subir una imagen de perfil si no lo has hecho hazlo <a href="../../apps/backoffice/profile">Aquí</a>
                    </p>
                    <button @click="generateFlyer" class="btn btn-round btn-outline-white mb-0">
                        Generar flyer
                        <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>

    `,
}

export { UserflyerViewer } 