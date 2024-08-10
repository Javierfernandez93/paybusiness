import { User } from '../../src/js/user.module.js?v=1.0.0'   
import { Cookie } from '../../src/js/cookie.module.js?v=1.6.4'

const LanguageViewer = {
    emits : ['languageUpdated'],
    props : ['refresh'],
    data() {
        return {
            User: new User,
            Cookie : new Cookie,
            languages : [
                {
                    language : "en",
                    name : "English",
                },
                {
                    language : "es",
                    name : "Español",
                },
                {
                    language : "pt",
                    name : "Português",
                }
            ]
        }
    },
    methods : {
        selectLanguageMain(language) {
            this.selectLanguage(language)

            this.$emit("languageUpdated")

            this.User.selectLanguage({language:language},(response)=>{

            })

            if(this.refresh) {
                window.location.reload()
            }
        }
    },
    mounted() 
    {       
    },
    template : `
        <div class="dropdown" class="ms-3">
            <button type="button" class="btn btn-primary mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {{t('language')}}
            </button>
            <ul class="dropdown-menu shadow">
                <li v-for="(language,index) in languages" :key="index">
                    <button @click="selectLanguageMain(language.language)" class="dropdown-item">
                        {{language.name}}
                    </button>
                </li>
            </ul>
        </div>
    `
}

export { LanguageViewer }