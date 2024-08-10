import Loader from '../../../src/js/components/Loader.vue.js?v=1.4.7'

export default {
    components : {
        Loader
    },
    props: ['busy','dataLength','query'],
    template : `
        <Loader :busy="busy"/>

        <div v-if="busy === false" class="card-body pb-0">
            <div v-if="dataLength == 0" class="alert border border-light text-center">
                <strong>{{t('warning')}}</strong>
                <div>
                    {{t('no_results')}}
                </div>
            </div>
        </div>
    `,
}