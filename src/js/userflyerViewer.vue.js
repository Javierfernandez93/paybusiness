import { User } from '../../src/js/user.module.js?v=2.3.4'   

const UserflyerViewer = {
    name : 'userflyer-viewer',
    data() {
        return {
            User: new User
        }
    },
    methods: {
        generateFlyer() {
            this.User.generateFlyer({},(response)=>{
                if(response.s == 1)
                {
                    window.open(response.path)
                }
            })
        },
    },
    mounted() 
    {   

    },
    template : `
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