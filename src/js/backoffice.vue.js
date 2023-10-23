import { Translator } from '../../src/js/translator.module.js?v=2.3.3'   

import { ProfitViewer } from '../../src/js/profitViewer.vue.js?v=2.3.3'
import { NoticeViewer } from '../../src/js/noticeViewer.vue.js?v=2.3.3'
import { FlyerViewer } from '../../src/js/flyerViewer.vue.js?v=2.3.3'

import { BannertopViewer } from '../../src/js/bannertopViewer.vue.js?v=2.3.3'
import { WidgetlandingViewer } from '../../src/js/widgetlandingViewer.vue.js?v=2.3.3'
import { WidgethewalletViewer } from '../../src/js/widgethewalletViewer.vue.js?v=2.3.3'
import { WidgettelegramViewer } from '../../src/js/WidgettelegramViewer.vue.js?v=2.3.3'

import { ConferenceViewer } from '../../src/js/conferenceViewer.vue.js?v=2.3.3'
import { TradingaccountViewer } from '../../src/js/tradingaccountViewer.vue.js?v=2.3.3'
import { NotificationViewer } from '../../src/js/notificationViewer.vue.js?v=2.3.3'

/* features */
import { WidgetbottelegramViewer } from '../../src/js/widgetbottelegramViewer.vue.js?v=2.3.3'
import { WidgetinfoViewer } from '../../src/js/widgetinfoViewer.vue.js?v=2.3.3'
import { WidgetnetworkViewer } from '../../src/js/widgetnetworkViewer.vue.js?v=2.3.3'
import { WidgainsViewer } from '../../src/js/widgainsViewer.vue.js?v=2.3.3'
import { WidgetforexViewer } from '../../src/js/widgetforexViewer.vue.js?v=2.3.3'
import { ChatViewer } from '../../src/js/chatViewer.vue.js?v=2.3.3'

Vue.createApp({
    components : { 
        ProfitViewer, NoticeViewer, WidgethewalletViewer, WidgetlandingViewer, ConferenceViewer, TradingaccountViewer, NotificationViewer, WidgettelegramViewer, WidgetbottelegramViewer, WidgetinfoViewer, WidgetnetworkViewer ,WidgainsViewer, WidgetforexViewer, ChatViewer, FlyerViewer
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