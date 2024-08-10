export default {
    props: ['value','myClass'],
    template : `
        <span class="badge" :class="myClass">
            {{value}}
        </span>
    `,
}