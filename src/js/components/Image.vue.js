export default {
    props: ['src','title'],
    template : `
        <div v-if="src">
            <img :src="src" class="img-thumbnail img-thumbnail-full" :title="title"/>
        </div>
    `,
}