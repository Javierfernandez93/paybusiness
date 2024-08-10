export default {
    props: ['busy','title','busy','myClass','theme'],
    data() {
        return {
        }
    },
    methods: {
        loadCanvas()
        {
            if(!this.canvas)
            {
                this.canvas = new bootstrap.Offcanvas(this.$refs.offcanvas)
            }
        },
        show()
        {
            this.loadCanvas()

            this.canvas.show()
        },
        hide() {
            this.loadCanvas()

            this.canvas.hide()
        }
    },
    mounted() 
    {       
        
    },
    template : `
        <div class="offcanvas offcanvas-end" :class="myClass" :class="theme == 'dark' ? 'bg-dark' : ''" ref="offcanvas" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" :class="theme == 'dark' ? 'text-white' : ''" id="offcanvasRightLabel">{{title}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
                    <i class="bi bi-x-lg text-dark"></i>
                </button>
            </div>
            <div class="offcanvas-body">
                <slot></slot>
            </div>
        </div>
    `,
}