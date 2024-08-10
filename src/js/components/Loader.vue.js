export default { 
    props : ['busy'],
    template : `
        <div v-if="busy" class="py-3">
            <div class="text-center">
                <div class="spinner-border text-primary" role="status"></div>
            </div>
        </div>
    `,
}