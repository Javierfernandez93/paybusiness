import HeaderNoteModel from '../models/header_note.module.js?v=1.0.0'

export default {
    emits : ['openInOffCanvas','updateNoteValue','addNote'],
    props: ['header','note','value','title','code','className','catalogUrgencies','catalogNotes'],
    data() {
        return {
            currentValue : null,
            headers : HeaderNoteModel,
        }
    },
    methods: {
        changeCatalog() {
            this.$emit('updateNoteValue',{
                value: this.currentValue,
                code: this.code
            })
        },
        changeDate() {
            this.$emit('updateNoteValue',{
                value: this.currentValue,
                code: this.code
            })
        },
        change: _debounce((self) => {
            self.currentValue = self.$refs.element.innerText

            self.$emit('updateNoteValue',{
                value: self.currentValue,
                code: self.code
            })
        },500),
    },
    mounted() {      
        this.currentValue = this.value
    },
    template : `
        <div :class="className" class="col-12 show-child-on-hover">
            <div v-if="code == 'title'" class="row py-3 mx-1 align-items-center justify-content-center text-truncate">
                <div contentEditable="true" @input="change(this)" ref="element" class="p-2 mb-1 rounded content-editable text-md fw-semibold text-dark text-truncate">
                    {{value}} 
                </div>
                <div class="child-on-hover ps-1">
                    <button class="btn btn-light mb-0 px-3 btn-sm shadow-none" @click="$emit('openInOffCanvas')" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Abrir nota">
                        <i class="bi bi-plus-square-fill text-lg"></i> Abrir nota
                    </button>
                </div>
            </div>
            <div v-else-if="code == 'create_date'" ref="element" class="p-2 m-2">
                <input type="date" @input="changeDate" v-model="currentValue" class="form-control" id="date" placeholder="date">
            </div>
            <div v-else-if="code == 'names'" ref="element" class="p-2 m-2">
                <div class="row g-2 justify-content-center align-items-center">
                    <div class="col-12 col-md-auto">
                        <div class="avatar avatar-xs mt-2">
                            <img src="../../src/img/user.png" class="avatar avatar-xs rounded-circle" alt="useravatar" title="useravatar"/>
                        </div>
                    </div>
                    <div class="col-12 col-md fw-semibold text-md">
                        {{value}}
                    </div>  
                </div>
            </div>
            <div v-else-if="code == 'catalog_urgency_id'" ref="element" class="p-2 m-2">
                <select v-if="catalogUrgencies" class="form-select" v-model="currentValue" @change="changeCatalog">
                    <option value="0">Selecciona una</option>
                    <option v-for="catalogUrgency in catalogUrgencies" v-bind:value="catalogUrgency.catalog_urgency_id" >
                        {{ catalogUrgency.title }}
                    </option>
                </select>
            </div>
            <div v-else-if="code == 'catalog_note_id'" ref="element" class="p-2 m-2">
                <select v-if="catalogNotes" class="form-select" v-model="currentValue" @change="changeCatalog">
                    <option value="0">Selecciona una</option>
                    <option v-for="catalogNote in catalogNotes" v-bind:value="catalogNote.catalog_note_id">
                        {{ catalogNote.title }}
                    </option>
                </select>
            </div>
            <div v-else-if="code == 'option'" ref="element" class="child-on-hover">
                <button class="btn btn-light mb-0 px-3 btn-sm shadow-none" @click="$emit('addNote')" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Añadir nota">
                    <i class="bi bi-plus text-lead text-dark"></i>
                </button>   
            </div>
        </div>
    `,
}