export default {
    props: ['src','title','myClass'],
    template : `
        <img v-if="src" :src="src" class="avatar" :title="title" :class="myClass"/>
    `,
}