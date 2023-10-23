import { Translator } from '../../src/js/translator.module.js?v=2.3.3'   

const HomeViewer = {
    name : 'home-viewer',
    data() {
        return {
            Translator: new Translator,
            language_code: null,
            countries : [
                {
                    'country_id': 226,
                    'code': 'es',
                    'name': 'Español',
                },
                {
                    'country_id': 279,
                    'code': 'en',
                    'name': 'Inglés',
                }
            ],
        }
    },
    watch: {
        language_code: {
            async handler() {
                if(this.Translator.language != this.language_code)
                {
                    await this.Translator.changeLanguage(this.language_code)

                    location.reload()
                }
            },
            deep: true
        }
    },
    methods : {
        initScroll() {

            window.addEventListener("scroll", function(event) {
                if(this.scrollY > 100)
                {
                    $("#navbar").addClass("bg-white border-bottom")

                } else {
                    $("#navbar").removeClass("bg-white border-bottom")
                }
            })
        }
    },
    async mounted() 
    {       
        await this.Translator.init()
        
        this.language_code = this.Translator.language
        
        this.initScroll()
    },
    template : `
        <div id="section-1" class="overflow-hidden mt-6 position-relative d-flex align-items-center">
            <div class="container">
                <div class="row justify-content-center align-items-center v-100">
                    <div class="col-12 col-xl-6 text-center text-dark">
                        <div class="fs-1 mb-3" style="line-height:52px;">
                            ¿Cómo te sentirías si tuvieras <span class="fw-sembold">más control sobre tu dinero?</span>
                        </div>
                        <a href="../../apps/signup" class="btn btn-primary btn-lg mb-0 shadow-none">
                            Regístrate
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center py-5">
                <div class="col-12 col-xl-8 text-center">
                    <div class="fs-4 text-dark">
                        ¿Somos la primera comunidad de educación financiera que busca los mejores servicios <b>sin costos mensuales ni membresías.</b>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-xl-9 text-center">
                    <div class="card mb-3 bg-primary shadow-none" id="card-marketing">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-xl-auto text-start text-white">
                                    <div>
                                        <img src="../../src/img/evox-academy-white.png" alt="evox academy" title="evox academy" />
                                    </div>
                                    <div class="fs-3">EDUCACIÓN</div>
                                    <div class="align-items-center">
                                        <span class="fs-1 fw-bold">
                                            GRATUITA
                                        </span>
                                        <span class="fs-4">PARA TODOS</span>
                                    </div>
                                    <a href="../../apps/signup" class="btn text-white shadow-none mb-0">Ver más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="card-bull" class="mb-5">
                        <img src="../../src/img/banner/dummie.png" class="w-100 shadow rounded" alt="exma" title="exma" />
                    </div>
                    <div class="row mb-3 align-items-center d-none">
                        <div class="col-12 col-md-6 col-md-6 col-xl-6">
                            <div class="card shadow-none">
                                <img src="../../src/img/card-4.png" alt="brigde funds image" alt="brigde funds image" class="img-fluid"/> 
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-md-6 col-xl-6 text-start p-5">
                            <img src="../../src/img/brigde-funds.png" alt="brigde funds" title="brigde funds" />
                            <div class="mb-5 mt-3">
                                ¿Estas Listo para operar con capital del broker y ganar el 80% desde el primer día?
                            </div>

                            <a href="../../apps/signup" class="btn text-dark shadow-none mb-0">Ver más</a>
                        </div>
                    </div>
                    <div class="card mb-3 d-none bg-primary-soft shadow-none" id="card-synthetics">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-xl-6 text-start text-white">
                                    <div class="mb-3">
                                        <img src="../../src/img/evox-synthetics.png" alt="evox synthetics" title="evox synthetics" />
                                    </div>
                                    <div class="mb-3">Educación gratuita en índices sintéticos, comprende mejor este tipo de instrumentos, cómo utilizarlos en tus estrategias de inversión y accede a nuestro sistema automático de trading.</div>
                                    <a href="../../apps/signup" class="btn text-white shadow-none mb-0">Ver más</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3 bg-primary shadow-none" id="card-mentory">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-xl-6 text-start text-white">
                                    <div class="mb-3">
                                        <img src="../../src/img/evox-mentory.png" alt="evox mentory" title="evox mentory" />
                                    </div>
                                    <div class="mb-3">¿Qué pasaría si hubiera una manera de construir una vida mejor y experimentar más felicidad y satisfacción?</div>
                                    <a href="../../apps/signup" class="btn text-white shadow-none mb-0">Ver más</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row mb-3 align-items-center">
                        <div class="col-12 col-md-6 col-xl-6">
                            <div class="card shadow-none">
                                <img src="../../src/img/card-6.png" alt="evox marketing image" alt="evox marketing image" class="img-fluid"/> 
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-xl-6 text-start p-5">
                            <img src="../../src/img/evox-marketing.png" alt="brigde funds" title="brigde funds" />
                            <div class="mb-5 mt-3">
                                Conoce la manera de convertir tus redes sociales, a través de tu marca personal, en una máquina de hacer dinero.
                            </div>

                            <a href="../../apps/signup" class="btn text-dark shadow-none mb-0">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

export { HomeViewer }