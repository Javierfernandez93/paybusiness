export default {
    props: ['title','value','myClass'],
    mounted() {
        
    },
    template : `
        <li class="list-group-item">
            <div class="text-xs text-muted">
                {{title}}
            </div>
            <div class="fw-semibold text-break" :class="myClass">
                {{value}}
            </div>
        </li>
    `,
}