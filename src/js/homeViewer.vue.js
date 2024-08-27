import { Guest } from '../../src/js/guest.module.js?v=1.0.6'   
import { LanguageViewer } from '../../src/js/languageViewer.vue.js?v=1.0.6'

const HomeViewer = {
    components : {
        LanguageViewer
    },
    data() {
        return {
            Guest: new Guest,
            showing: true,
        }
    },
    methods : {
        
    },
    mounted() 
    {       
    
    },
    template : `
        <div style="z-index:10000 !important" class="position-absolute mt-6 top-0 end-0 translate-middle-y pe-5" id="banner-language">
            <LanguageViewer refresh="true"></LanguageViewer>
        </div>

        <section id="section-1" class="d-flex vh-100 align-items-center">
            <div class="mask bg-dark-translucid"></div>

            <div class="container position-relative z-index-1 justify-content-center text-center w-100" >
                <div class="row">
                    <div class="col-12">
                        <div class="py-5">
                            <img src="../../src/img/logo.png" style="width:10rem" alt="logo" title="logo" class="animation-fall-down" style="--delay:500ms"/>
                            <div style="--delay:700ms" class="fs-2 mt-3 text-uppercase animation-fall-down text-white">
                                {{t('braek_lines')}}
                            </div>
                            <div style="--delay:700ms" class="h2 text-uppercase animation-fall-down text-white">
                                {{t('powerfull_to_break_lines')}}
                            </div>
                        </div>
                        <div class="animation-fall-down" style="--delay:1280ms">
                            <a href="../../apps/signup" class="btn btn-lg px-5 fs-5 btn-light mx-1">
                                {{t('join_on_project')}}
                            </a> 
                            <a href="../../apps/login" class="btn btn-lg px-5 fs-5 btn-outline-light mx-1">
                                {{t('login_on_account')}}
                            </a> 
                        </div>
                        <div class="animation-fall-down" style="--delay:1280ms">
                        
                            <a target="_blank" href="https://www.youtube.com/@Disruptivo.academy" class="btn btn-lg px-3 fs-5 btn-light mx-1">
                                <i class="fab fa-youtube"></i>
                            </a> 
                            <a target="_blank" href="https://www.instagram.com/disruptivo.academy" class="btn btn-lg px-3 fs-5 btn-outline-light mx-1">
                                <i class="fab fa-instagram"></i>
                            </a> 
                            <a target="_blank" href="https://www.tiktok.com/@disruptivo.academy" class="btn btn-lg px-3 fs-5 btn-light mx-1">
                                <i class="fab fa-tiktok"></i>
                            </a> 
                            <a target="_blank" href="https://www.facebook.com/disruptivo.academy/" class="btn btn-lg px-3 fs-5 btn-outline-light mx-1">
                                <i class="fab fa-facebook"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
}

export { HomeViewer }