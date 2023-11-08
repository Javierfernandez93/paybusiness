import { Translator } from '../../src/js/translator.module.js?v=2.3.4'   

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
        <section class="section-1">
            <div class="container text-center">
                <h3>CONVIERTETE EN TU PROYECTO MÁS IMPORTANTE</h3>
                <h3>Se el cambio que quieres ver en el mundo</h3>
            </div>
        </section>
    `
}

export { HomeViewer }