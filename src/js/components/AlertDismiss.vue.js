export default { 
    props : ['title','text','myClass'],
    data () {
        return {
            defaultClass: 'alert-light',
        }
    },
    template : `
        <div class="alert border-0 alert-dismissible fade show" role="alert" :class="myClass ? myClass : defaultClass">
            <strong>{{title}}</strong>
            
            <div v-if="text" v-html="text"></div>

            <slot></slot>

            <button type="button" class="btn-close btn-close-dark" data-bs-dismiss="alert" aria-label="Close">
                <i class="bi bi-x"></i>
            </button>
        </div>
    `,
}