import { User } from '../../src/js/user.module.js?v=2.3.3'   

const SyntheticsViewer = {
    name : 'synthetics-viewer',
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        
    },
    template : `
        <div class="row justify-content-center">
            <div class="col-12 col-xl-5 text-center">
                <div class="mb-5">
                    <img src="../../src/img/Unlimited-synthetics-logo.png" alt="Unlimited-synthetics" title="Unlimited-synthetics" class="img-fluid"/>
                </div>

                <div class="mb-5">
                    <p class="lead fw-semibold text-dark">Accede a clases pre-grabadas, tutoriales, análisis del mercado, psicotrading, plan de trading y mucho más</p>

                    <div class="d-grid">
                        <button class="btn btn-primary btn-lg shadow-none mb-0"><i class="bi me-2 bi-arrow-right-circle-fill"></i> Acceder a la academia</button>
                    </div>
                </div>
                <div>
                    <p class="lead fw-semibold text-dark">Únete al canal de Unlimited Academy y accede a clases en vivo y operativa de Índices sintéticos.</p>

                    <div class="d-grid">
                        <button class="btn btn-primary btn-lg shadow-none mb-3"><i class="bi me-2 bi-telegram"></i>Unirse al canal</button>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary btn-lg shadow-none mb-0"><i class="bi me-2 bi-telegram"></i> Canal de señales Sintéticos</button>
                    </div>
                </div>
            </div>
        </div>
    `,
}

export { SyntheticsViewer } 