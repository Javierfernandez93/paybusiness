
const EmptyComponent = {
    props: [],
    emits: [],
    components: {
        // OtherComponentName,
    },
    data(){
        return {
            // myData: null,
        }
    },
    methods: {
        // newMethod() {},
    },
    mounted(){
        // add instructions here
    },
    template: `
        <div>
            My Empty Component
        </div>
    `,
};

export default {
    props: ['title','value'],
    template : `
        <li class="list-group-item">
            <div class="row align-items-center">
                <div class="col-12 col-md">
                    <div class="text-xs text-secondary">
                        {{title}}
                    </div>
                    <h5 class="mb-0">
                        {{value ? value : '-'}}
                    </h5>
                </div>
            </div>
        </li>
    `
}