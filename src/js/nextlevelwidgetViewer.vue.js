import { User } from '../../src/js/user.module.js?v=2.5.1'   

const NextlevelwidgetViewer = {
    name : 'nextlevelwidget-viewer',
    data() {
        return {
            User: new User,
            ranges : null
        }
    },
    methods: {
        getCurrentRange() {
            this.User.getCurrentRange({},(response)=>{
                if(response.s == 1)
                {
                    this.ranges = response.ranges
                } else {
                    this.ranges = false
                }
            })
        },
    },
    mounted() 
    {   
        this.getCurrentRange()
    },
    template : `
        <div v-if="ranges" class="card shadow-none card-height-special border">
            <div class="card-body text-center">
                <div class="row">
                    <div class="col-12 col-xl">
                        <h3 class="text-dark">Next level</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 text-start">
                        <div class="avatar avatar-xxl">
                            <img :src="ranges.current.image" alt="range" title="range" class="avatar avatar-xxl"/>
                        </div>
                        <div class="text-xs text-secondary">Rango actual</div>
                        <div class="lead fw-semibold text-dark sans">{{ranges.current.title}}</div>
                    </div>
                    <div class="col-12 col-md-6 text-end">
                        <div class="avatar avatar-xxl">
                            <img :src="ranges.next.image" alt="range" title="range" class="avatar avatar-xxl"/>
                        </div>
                        <div class="text-xs text-secondary">Próximo rango</div>
                        <div class="lead fw-semibold text-dark sans">{{ranges.next.title}}</div>
                    </div>
                </div>
                <div class="progress" style="height:1rem" role="progressbar" aria-label="Success example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div style="height:1rem" class="progress-bar bg-success" style="width: 0%">0%</div>
                </div>
            </div>
        </div>
        <div v-else-if="range == false" class="card shadow-none overflow-hidden border">
            <div class="mask bg-dark d-flex justify-content-center d-none align-items-center text-center text-white z-index-1">
                <div class="row">
                    <div class="col-12">
                        <div><i class="bi h1 text-white bi-lock-fill"></i></div>
                        Aún no alcanzas ningun rango
                    </div>
                </div>
            </div>
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
                    <div style="height:1rem" class="progress-bar bg-success" style="width: 1%">1%</div>
                </div>
            </div>
        </div>
    `,
}

export { NextlevelwidgetViewer } 