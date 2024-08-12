import { User } from '../../src/js/user.module.js?v=1.0.2'   

const WorkingViewer = {
    data() {
        return {
            User: new User,
            query: null,
            classesAux: null,
            classes: null,
        }
    },
    watch: {
        query: {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods : {
    },
    mounted() 
    {       
        
    },
    template : `
        <div class="text-center">
            <i class="bi h1 bi-laptop-fill"></i>
            <h2>Estamos trabajando en la nueva plataforma</h2>
            <div class="lead">
                <i class="bi bi-clock"></i>
                Pronto estaremos operando
            </div>
        </div>
    `
}

export { WorkingViewer }