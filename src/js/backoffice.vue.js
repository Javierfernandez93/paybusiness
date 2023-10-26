import { Translator } from '../../src/js/translator.module.js?v=2.3.3'   
import { LastsignedwidgetViewer } from '../../src/js/LastsignedwidgetViewer.vue.js?v=2.3.3'   
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.3'   
import { RangewidgetViewer } from '../../src/js/rangewidgetViewer.vue.js?v=2.3.3'   
import { PaybusinesswidgetViewer } from '../../src/js/paybusinesswidgetViewer.vue.js?v=2.3.3'   
import { NextlevelwidgetViewer } from '../../src/js/nextlevelwidgetViewer.vue.js?v=2.3.3'   
import { LandingViewer } from '../../src/js/landingViewer.vue.js?v=2.3.3'   
import { MembershipwidgetViewer } from '../../src/js/membershipwidgetViewer.vue.js?v=2.3.3'   
import { ProfitViewer } from '../../src/js/profitViewer.vue.js?v=2.3.3'   

Vue.createApp({
    components : { 
        ProfitViewer, FlyerViewer, LastsignedwidgetViewer, RangewidgetViewer, PaybusinesswidgetViewer, NextlevelwidgetViewer, LandingViewer, MembershipwidgetViewer
    },
    data() {
        return {
            Translator: new Translator,
            language_code: null
        }
    },
    async mounted() {
        await this.Translator.init()
        
        this.language_code = this.Translator.language
    },
}).mount('#app')