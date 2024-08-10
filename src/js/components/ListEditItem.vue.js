export default {
    props: ['title','value'],
    data() {
        return {
            editing: false,
            myValue : this.value
        }
    },
    methods: {
        update(){
            this.editing = false
            this.$emit('update',this.myValue)   
        }
    },
    mounted() {
    },
    template : `
        <li class="list-group-item">
            <div v-if="!editing" class="row align-items-center" @click="editing = !editing">
                <div class="col-12 col-xl">
                    {{title}}
                </div>
                <div class="col-12 col-xl-auto">
                    {{myValue}}
                </div>
            </div>
            <div v-else class="row align-items-center">
                <div class="form-floating mb-3">
                    <input @keypress.enter.exact="update" v-model="myValue" type="number" class="form-control" id="floatingInput" :placeholder="title"> 
                    <label for="floatingInput">{{title}}</label>
                </div>
                <div class="col-12 col-xl-auto">
                    <button @click="update" class="btn btn-primary mb-0 shadow-none">Guardar</button>
                </div>
            </div>
        </li>
    `,
}