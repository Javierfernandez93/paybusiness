import { User } from '../../src/js/user.module.js?v=1.1.8'   

const PaybusinesswidgetViewer = {
    name : 'paybusinesswidget-viewer',
    data() {
        return {
            User: new User,
            membership : null
        }
    },
    methods: {
        getPercentajes(membership) {
            membership.percentaje = 0

            if(membership.amount > 0) 
            {
                membership.percentaje = Math.round((membership.amount * 100) / membership.target)
                membership.percentaje = membership.percentaje > 100 ? 100 : membership.percentaje
            }

            return membership
        },
        getCurrentMembership() {
            this.User.getCurrentMembership({},(response)=>{
                if(response.s == 1)
                {
                    this.membership = this.getPercentajes(response.membership)
                } else {
                    this.membership = false
                }
            })
        },
    },
    mounted() 
    {   
        this.getCurrentMembership()
    },
    template : `
        <div v-if="membership" class="card shadow-none card-height-special border">
            <div class="card-body text-center py-5">
                <div class="row mb-3">
                    <div class="col-12 col-xl">
                        <h1 class="text-dark">Pay Business</h1>
                        <h3 class="text-secondary fw-semilight">{{membership.title}}</h3>
                    </div>
                </div>
                <div v-if="membership.amount_extra > 0" class="text-center">
                    <span class="border border-secondary px-3 py-1 rounded mb-3">
                        Stand by $ {{membership.amount_extra.numberFormat(2)}} USD
                    </span>
                </div>

                <div class="text-center text-dark fw-bold">
                    $ {{membership.amount.numberFormat(2)}} / $ {{membership.target.numberFormat(2)}} 
                </div>

                <div class="progress" style="height:1rem" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div style="height:1rem" class="progress-bar bg-success" :style="{width: membership.percentaje+'%'}">{{membership.percentaje}}%</div>
                </div>
            </div>
        </div>
        <div v-else-if="membership == false" class="card shadow-none card-height-special overflow-hidden border">
            <div class="card-body py-5 text-center position-relative z-index-0">
                <div class="row mb-3">
                    <div class="col-12 col-xl">
                        <h1 class="text-dark sans">Pay Business</h1>
                        <h3 class="text-secondary fw-semilight">Activa tu licencia</h3>
                    </div>
                </div>
                <div class="progress" style="height:1rem" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div style="height:1rem" class="progress-bar bg-success" style="width: 0%">0%</div>
                </div>
            </div>
        </div>
    `,
}

export { PaybusinesswidgetViewer } 