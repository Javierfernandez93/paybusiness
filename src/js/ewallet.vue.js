import { User } from '../../src/js/user.module.js?v=1.0.8'   

import { EwalletViewer } from './ewalletViewer.vue.js?v=1.0.8'
import { EwalletatmViewer } from './ewalletatmViewer.vue.js?v=1.0.8'
import { EwalletqrViewer } from './ewalletqrViewer.vue.js?v=1.0.8'
import { EwalletwithdrawViewer } from './ewalletwithdrawViewer.vue.js?v=1.0.8'
import { EwalletaddfundsViewer } from './ewalletaddfundsViewer.vue.js?v=1.0.8'

Vue.createApp({
    components : { 
        EwalletViewer, EwalletatmViewer, EwalletqrViewer, EwalletwithdrawViewer, EwalletaddfundsViewer
    },
    data() {
        return {
            User: new User,
            ewallets: [],
            WALLET_KIND : {
                USDT_TRC20 : 1,
                USDT_NOWITHDRAWABLE : 2,
            },
            ewallet: {
                public_key: null,
                amount: 0,
                link: null,
                amountUSD: 0,
                recipientAdress: '',
                fee: 0,
                amountToSend: 0,
                addressLenght: 66,
            }
        }
    },
    methods: {
        openAtm() {
            this.$refs.ewalletAtm.openAtm()
        },
        openWithdraw() {
            this.$refs.ewalletWithdraw.openWithdraw()
        },
        openAddFunds() {     
            this.$refs.ewalletAddFunds.openAddFunds()
        },
        getEwalletQr() {       
            this.$refs.ewalletqr.getEwalletQr()
        },
        setewallet(ewallet) {   
            this.ewallet = ewallet

            this.loadTransactions(this.ewallet.wallet_id)
        },
        getEwallet(wallet_kind_id) {            
            this.User.getEwallet({wallet_kind_id:wallet_kind_id},(response)=>{
                if(response.s == 1)
                {
                    this.ewallets.push(response.ewallet)

                    this.$refs.ewallet.getLastTransactionsWallet()
                }
            })
        },
        loadTransactions(wallet_id) {            
            this.$refs.ewallet.loadTransactions(wallet_id)
        },
    },
    mounted() 
    {   
        this.getEwallet(this.WALLET_KIND.USDT_TRC20)
        this.getEwallet(this.WALLET_KIND.USDT_NOWITHDRAWABLE)
    },
}).mount('#app')