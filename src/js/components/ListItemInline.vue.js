export default {
    props: ['title','value','myClass','type', 'showInfo'],
    mounted() {
        
    },
    template : `
        <li class="list-group-item">
            <div class="row justify-content-center align-items-center">
                <div class="col">
                    {{title}}
                </div>
                <div class="col-auto text-dark fw-bold">
                    <span v-if="type == 'money'">
                        <span v-if="showInfo" :class="value > 0 ? 'text-success' : 'text-danger'">   
                            <span v-if="value > 0">
                                <i class="bi bi-arrow-up-circle-fill"></i>
                            </span>
                            <span v-else>
                                <i class="bi bi-arrow-down-circle-fill"></i>
                            </span>

                            $ {{value.numberFormat(2)}}
                        </span>
                        <span v-else>
                            $ {{value.numberFormat(2)}}
                        </span>
                    </span> 
                    <span v-else>
                        {{value}}
                    </span>
                </div>
            </div>
        </li>
    `,
}