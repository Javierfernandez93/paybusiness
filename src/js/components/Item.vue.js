export default {
    props: ['title','value'],
    template : `
        <li class="list-group-item">
            <slot></slot>
        </li>
    `
}