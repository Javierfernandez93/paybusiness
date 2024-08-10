export default {
    props: ['text','length'],
    methods: {
        copyToClipBoard(text) {   
            navigator.clipboard.writeText(text).then(() => {
                toastInfo({
                    message: 'Texto copiado',
                })
            })
        },
    },
    template : `
        <span class="cursor-pointer text-decoration-underline" @click="copyToClipBoard(text)">
            {{text.truncateInMiddle(length)}}
        </span>
    `,
}