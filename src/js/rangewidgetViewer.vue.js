import { User } from '../../src/js/user.module.js?v=2.3.3'   

const RangewidgetViewer = {
    name : 'rangewidget-viewer',
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
            <div class="card-header">
                <div class="row">
                    <div class="col-12 col-xl">
                        Rango Actual
                    </div>
                    <div class="col-12 col-xl-auto">
                        Contador de Miembros
                    </div>
                    <div class="col-12 col-xl-auto">
                        <i class="bi bi-check-circle-fill text-success"></i>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-xl-auto">
                        <div class="avatar avatar">
                            <img src="" class="avatar" title="user" alt="user"/>
                        </div>
                    </div>
                    <div class="col-12 col-xl">
                        <div>Alejandro serrano</div>
                        <div>ID</div>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <span class="badge p-0">Saldo historíco</span>    
                    </div>
                    <div class="col-12 col-xl-auto">
                        <span class="badge bg-success">Calificado</span>    
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { RangewidgetViewer } 