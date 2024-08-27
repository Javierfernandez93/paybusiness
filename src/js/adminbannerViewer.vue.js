import { UserSupport } from '../../src/js/userSupport.module.js?t=1.1.5'   
import Loader from '../../src/js/components/Loader.vue.js?v=1.0.6'

const AdminbannerViewer = {
    components : { 
        Loader
    },
    data() {
        return {
            UserSupport: new UserSupport,
            banners : [],
            busy : false
        }
    },
    methods: {
        getBanners() {
            this.busy = true
            this.UserSupport.getBanners({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.banners = response.banners
                }
            })
        },
        saveBanner(banner) {
            this.busy = true
            this.UserSupport.saveBanner({banner:banner},(response)=>{                
                if(response.s == 1)
                {
                    this.busy = false

                    toastInfo({
                        message: 'Banner actualizado con éxito',
                    })
                }
            })
        },
        openFileManager() 
        {
            this.$refs.file.click()
        },
        uploadFile(target,banner) 
        {
            let files = $(target).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.UserSupport.uploadImageBanner(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                banner.image = response.target_path
              }
            });
        },
    },
    mounted() 
    {   
        this.getBanners()
    },
    template : `
        <div class="card">
            <div class="card-header">
                <div class="row justify-content-center align-items-center">
                    <div class="col fs-4 fw-sembold text-primary">
                        Banners publicitarios
                    </div>
                </div>
            </div>

            <Loader :busy="busy"/>

            <div v-if="banners.length > 0">
                <div v-for="banner in banners" class="card card-body mb-3">
                    <div>
                        <div class="text-secondary mb-3 text-xs">Dimensiones recomendadas 635x230px</div>                                     
                    </div>
                    <div class="row">                                        
                        <div class="col-12 col-xl-8 position-relative">  
                            <div class="mb-3">                                        
                                <img v-if="banner.image" :src="banner.image" class="img-thumbnail w-100" style="height:25rem;object-fit:cover"/>

                                <div class="d-grid mt-2">
                                    <div class="btn btn-primary">
                                        Subir imagen
                                        <div class="position-absolute z-index-1 w-100 h-100 top-0 start-0">
                                            <input class="d-nones w-100 h-100 opacity-0" ref="file" @change="uploadFile($event.target,banner)" capture="filesystem" type="file" accept=".jpg, .png, .jpeg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-xl-4">       
                            <div class="form-group">
                                <label class="form-label" for="">Link del evento</label>
                                <input type="text" v-model="banner.link" class="form-control mb-3"/>
                            </div>                                

                            <div class="d-grid pt-3">
                                <button :disabled="banner.busy" @click="saveBanner(banner)" class="btn btn-primary mb-0 shadow-none" v-text="banner.busy ? '...': 'Actualizar'"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { AdminbannerViewer } 