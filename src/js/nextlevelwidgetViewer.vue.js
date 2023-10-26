import { User } from '../../src/js/user.module.js?v=2.3.3'   

const NextlevelwidgetViewer = {
    name : 'nextlevelwidget-viewer',
    data() {
        return {
            User: new User,
            range : null
        }
    },
    methods: {
        getCurrentRange() {
            this.User.getCurrentRange({},(response)=>{
                if(response.s == 1)
                {
                    this.range = this.range
                }
            })
        },
    },
    mounted() 
    {   
        this.getCurrentRange()
    },
    template : `
        <div class="card shadow-none border">
            <div class="card-body text-center">
                <div class="row mb-3">
                    <div class="col-12 col-xl">
                        <h2 class="text-dark">Next level</h2>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12 col-xl text-start">
                        <div class="text-xs text-dark">Rango actual</div>
                        <div class="lead text-secondary">Membresía 20 USDT</div>
                    </div>
                    <div class="col-12 col-xl-auto text-end">
                        <div class="text-xs text-dark">Próximo rango</div>
                        <div class="lead text-secondary">Membresía 20 USDT</div>
                    </div>
                </div>
                <div class="progress" style="height:1rem" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div style="height:1rem" class="progress-bar bg-success" style="width: 25%">25%</div>
                </div>
            </div>
        </div>
    `,
}

export { NextlevelwidgetViewer } 