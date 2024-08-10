export default {
    props: ['busy','title','size','theme'],
    data() {
        return {
            modal: null,
        }
    },
    methods: {
        loadModal()
        {
            if(!this.modal)
            {
                this.modal = new bootstrap.Modal(this.$refs.modal)
            }
        },
        show()
        {
            this.loadModal()

            this.modal.show()
        },
        hide() {
            this.loadModal()

            this.modal.hide()
        }
    },
    mounted() 
    {       
        
    },
    template : `
        <Teleport to="body">
            <div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div :class="size" class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div :class="theme == 'dark' ? 'bg-dark' : 'bg-light'" class="modal-content">
                        <div class="modal-header">
                            <h5 :class="theme == 'dark' ? 'text-white' : 'text-dark'" class="modal-title" id="exampleModalLabel">{{title}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i class="bi bi-x-lg" :class="theme == 'dark' ? 'text-white' : 'text-dark'"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    `,
}