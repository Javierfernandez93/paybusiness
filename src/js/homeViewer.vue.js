import { Translator } from '../../src/js/translator.module.js?v=2.5.0'   

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
        <section class="section-1 vh-100 d-flex justify-content-center align-items-center">
            <div class="container text-center">
                <h2 class="text-primary fw-bolder">CONVIERTETE EN TU PROYECTO MÁS IMPORTANTE</h2>
                <h3 class="text-white mb-n1">Se el cambio que quieres</h3>
                <h3 class="text-white">ver en el mundo</h3>
            </div>
        </section>
        
        <section class="section-2 vh-50 py-e-1 bg-primary d-flex justify-content-center align-items-center">
            <div class="container text-center">
                <h2 class="text-primary fw-bolder mb-n1">EL ÉXITO SUCEDE CUANDO LA OPORTNIDAD Y</h2>
                <h2 class="text-primary fw-bolder">EL CONOCIMIENTO SE ENCUENTRAN</h2>
                
                <div class="py-3">
                    <h2 class="mb-3 text-white fw-bolder">APRENDE DE:</h2>

                    <h3 class="text-white mb-3">Network Marketing , Liderazgo, Ventas, Crecimiento y Desarrollo Personal, Idiomas Educación Financiera, Marketing Digital, Marca Personal, Mercados Financieros</h3>
                    <h3 class="text-white mb-3 fw-light">Por qué sabemos que tienes el potencial para llegar a donde tú quieras, queremos ir de la mano contigo y cumplir tus sueños juntos.</h3>
                    <h3 class="text-white fw-light">Queremos proporcionarte las herramientas necesarias y el conocimiento oportuno para hacer de ti esa mejor versión que buscas.</h3>
                </div>
            </div>
        </section>

        <section class="section-3 vh-50 py-e-1 bg-secondary d-flex justify-content-center align-items-center">
            <div class="container row justify-content-end text-center">
                <div class="col-12 col-xl-8">
                    <div class="row justify-content-center mb-3">
                        <div class="col-12 col-xl-4">
                            <img src="../../src/img/logo-horizontal.svg" alt="logo" title="logo"/>
                        </div>
                    </div>
                    <div class="row justify-content-center py-3">
                        <div class="col-12 col-xl-6">
                            <div class="mb-3">
                                <span class="bg-gradient-primary h2 text-dark py-1 px-5">20 USDT</span>
                            </div>
                            <div class="h1 text-primary">PAY BUSINESS</div>
                            <p class="text-justify">Conviértete en un Profesional de Redes de Mer- cadeo liderando equipos de alto rendimiento y generando múltiples ingresos día a día. Cons- truye regalías para tu plan de retiro.</p>
                        </div>
                        <div class="col-12 col-xl-6">
                            <div class="mb-3">
                                <span class="bg-gradient-primary h2 text-dark py-1 px-5">20 USDT</span>
                            </div>
                            <div class="h1 text-primary">PAY ACADEMY</div>
                            <p class="text-justify">Edúcate por tu libertad; aprovechando al máximo nuestras herramientas y nuestro modelo educativo, desarróllate en el área en el cual mejor te identifiques y/o aprovecha todo el conocimiento que tenemos para ti. Convier- te tu vida en un instrumento de múltiples habi- lidades y ponle acción a la información (Co- nocimiento Aplicado)</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section-4 vh-50 py-e-1 bg-secondary d-flex justify-content-center align-items-center">
            <div class="d-flex align-items-bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-xl-4 mb-5 mb-xl-0">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-auto">
                                    <div class="avatar avatar-xl">
                                        <span class="avatar avatar-xl h1 text-dark bg-primary">A</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="lead mb-n2 text-white">mamos la industrial del</div>
                                    <div class="h4 fw-bold text-white">NETWORK MARKETING</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-xl-4 mb-5 mb-xl-0">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-auto">
                                    <div class="avatar avatar-xl">
                                        <span class="avatar avatar-xl h1 text-dark bg-primary">D</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="h3 mb-n2 text-white">ios en primer lugar</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-xl-4 mb-5 mb-xl-0">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-auto">
                                    <div class="avatar avatar-xl">
                                        <span class="avatar avatar-xl h1 text-dark bg-primary">N</span>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="lead mb-n2 text-white">utrimos tu mentalidad con</div>
                                    <div style="letter-spacing:-1px" class="h5 fw-bold text-white">EDUCACIÓN QUE TE TRANSFORMA</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center text-center pt-5">
                        <div class="col-12 col-xl-8">
                            <div class="h1 text-primary">NUESTRA FILOSOFIA</div>
                            <div class="h4 text-white">IMPACTAR POSITIVAMENTE EN LA VIDA Y EN LA ECONOMÍA DE TANTAS PERSONAS COMO SEA POSIBLE</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="section-end bg-xdark vh-50 py-e-1 d-flex justify-content-center align-items-center">
            <div class="container">
                <div class="row justify-content-start align-items-center">
                    <div class="col-12 col-xl-6">
                        <div class="text-primary h1 mb-3 text-uppercase">EL ABC DEL NEGOCIO</div>

                        <div class="row mb-5 justify-content-center align-items-center">
                            <div class="col-auto">
                                <div class="avatar avatar-xl">
                                    <span class="avatar avatar-xl h1 text-dark bg-primary">A</span>
                                </div>
                            </div>
                            <div class="col">
                                <div class="lead mb-n2 text-white">ates de empezar <b class="text-primary">SE CONSCIENTE</b> de donde estas,</div>
                                <div style="letter-spacing:-1px" class="h5 fw-bold text-white">para donde te diriges y el vehículo al que estas subiendo.</div>
                            </div>
                        </div>
                        <div class="row mb-5 justify-content-center align-items-center">
                            <div class="col-auto">
                                <div class="avatar avatar-xl">
                                    <span class="avatar avatar-xl h1 text-dark bg-primary">B</span>
                                </div>
                            </div>
                            <div class="col">
                                <div class="lead mb-n2 text-white">usca convertirte en <b class="text-primary">TÚ MEJOR VERSIÓN</b> aprendiendo</div>
                                <div style="letter-spacing:-1px" class="h5 fw-bold text-white">y descubriendo nuevas habilidades</div>
                            </div>
                        </div>
                        <div class="row mb-5 justify-content-center align-items-center">
                            <div class="col-auto">
                                <div class="avatar avatar-xl">
                                    <span class="avatar avatar-xl h1 text-dark bg-primary">C</span>
                                </div>
                            </div>
                            <div class="col">
                                <div class="lead mb-n2 text-white">onéctate a nuestro SISTEMA mínimo 5 años y tu</div>
                                <div style="letter-spacing:-1px" class="h5 fw-bold text-white">éxito te lo garantizarás</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}

export { HomeViewer }