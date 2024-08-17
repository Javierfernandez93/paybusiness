import Badge from './Badge.vue.js?v=1.0.0'

export default {
    components : { Badge },
    props : ['active'],
    template : `
        <Badge v-if="active" value="<i class='bi bi-check-circle-fill'></i>" myClass="border-success text-success"/>
        <Badge v-else value="<i class='bi bi-x-circle-fill'></i>" myClass="text-danger border-danger"/>
    `,
}