import { User } from '../../src/js/user.module.js?v=1.0.2'   

const UserflyerViewer = {
    name : 'userflyer-viewer',
    data() {
        return {
            User: new User,
            ranges: null,
            profile: null,
            mask : null
        }
    },
    methods: {
        generateFlyer(mask) {
            this.mask = mask

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
        getCurrentRange() {
            this.User.getCurrentRange({},(response)=>{
                this.ranges = response.ranges
            })
        },
        downloadImage() {
            html2canvas($(this.$refs.flyer)[0]).then((canvas) => {
                var image = canvas.toDataURL("image/png");
        
                var aDownloadLink = document.createElement('a');
                aDownloadLink.download = 'flyer.png';
                aDownloadLink.href = image;
                aDownloadLink.click();
            });
        },
    },
    mounted() 
    {   
        this.getCurrentRange()
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
                            <img :src="mask" class="position-absolute flyer-mask z-index-1"/>
                            <img :src="profile.image" class="position-absolute flyer-target z-index-0"/>

                            <div class="text position-absolute text-uppercase z-index-2">{{profile.names}}</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button @click="downloadImage" type="button" class="btn btn-primary">Descargar Flyer de bienvenida</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="alert alert-secondary text-white animation-fall-down mb-3" style="--delay: 300ms">
            <div>
                <strong>Importante</strong>
            </div>
            Para generarlo da clic en generar flyer, ten en cuenta que debes de subir una imagen de perfil si no lo has hecho hazlo <a href="../../apps/backoffice/profile">Aquí</a>
        </div>
        <div class="card animation-fall-down mb-3" style="--delay: 800ms">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="background-image: url('../../assets/img/ivancik.jpg')">
                <span class="mask bg-primary"></span>
                <div class="card-body position-relative z-index-1 h-100 p-3">
                    <h4 class="text-white font-weight-bolder mb-3">Flyer de Bienvenida</h4>
                    <button @click="generateFlyer('../../src/img/mask.png')" class="btn btn-round btn-outline-white mb-3">
                        Descargar Flyer de bienvenida
                        <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="card animation-fall-down mb-3" style="--delay: 800ms">
            <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="background-image: url('../../assets/img/ivancik.jpg')">
                <span class="mask bg-primary"></span>
                <div class="card-body position-relative z-index-1 h-100 p-3">
                    <h4 class="text-white font-weight-bolder mb-3">Flyer de Lanzamiento de Negocios</h4>
                    <button @click="generateFlyer('../../src/img/mask/1.png')" class="btn btn-round btn-outline-white mb-3">
                        Descargar Flyer de Lanzamiento de Negocios
                        <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="ranges">
            <div v-if="ranges.current.catalog_range_id > 1" class="card animation-fall-down" style="--delay: 800ms">
                <div class="overflow-hidden position-relative border-radius-lg bg-cover h-100" style="background-image: url('../../assets/img/ivancik.jpg')">
                    <span class="mask bg-primary"></span>
                    <div class="card-body position-relative z-index-1 h-100 p-3">
                        <h4 class="text-white font-weight-bolder mb-3">Flyer de Rango {{ranges.current.title}}</h4>
                    
                        <button @click="generateFlyer(ranges.current.mask)" class="btn btn-round btn-outline-white mb-3">
                            Descargar Flyer de {{ranges.current.title}}
                            <i class="fas fa-arrow-right text-sm ms-1" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    `,
}

export { UserflyerViewer } 