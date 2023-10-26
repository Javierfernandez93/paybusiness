import { User } from '../../src/js/user.module.js?v=2.3.3'   

const MembershipwidgetViewer = {
    name : 'membershipwidget-viewer',
    data() {
        return {
            User : new User,
            landing : null,
            hasLandingConfigurated : null,
        }
    },
    watch : {
        
    },
    methods: {
        getReferralLanding() {
            this.User.getReferralLanding({},(response)=>{
                if(response.s == 1)
                {
                    this.landing = response.landing
                    this.hasLandingConfigurated = response.hasLandingConfigurated
                }
            })
        },
        copyToClipBoard(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.$refs.landing.innerText = 'Copiada'
            });
        },
        sendByWhatsapp(landing) {
            window.open(`*¡Hola!* quiero invitarte a un *proyecto increíble* que te permite *ganar dinero* por el *entretenimiento* ¡regístrate ya! ${landing}`.getWhatsappLink())
        },
    },
    mounted() 
    {   
        this.getReferralLanding()
    },
    template : `
        <div class="card shadow-none border">
            <div class="card-body text-center text-center">
                <div class="lead fw-semibold text-dark mb-3">
                    Membresía
                </div>
                <div class="mb-2">
                    <span class="badge bg-success text-uppercase">Pay Business</span>
                </div>
                <div>
                    <span class="badge bg-danger text-uppercase">Pay Academy</span>
                </div>
            </div>
        </div>
    `,
}

export { MembershipwidgetViewer } 