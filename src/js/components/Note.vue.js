import { UserSupport } from '../../../src/js/userSupport.module.js?v=1.0.0'

import HeaderNoteModel from '../models/header_note.module.js?v=1.0.0'
import NoteItem from './NoteItem.vue.js?v=1.0.0'
import OffCanvas from './OffCanvas.vue.js?v=1.0.0'
import Loader  from '../../../src/js/components/Loader.vue.js?v=1.0.0'  

export default {
    components : { 
        NoteItem,
        OffCanvas,
        Loader
    },
    emits: ['addNote'],
    props: ['note','catalogUrgencies','catalogNotes'],
    data() {
        return {
            UserSupport: new UserSupport,
            headers : HeaderNoteModel,
            busy : false,
            currentNote : null
        }
    },
    methods: {
        getItemValue(header) {
            return this.note[header.code] ?? 'a'
        },
        updateNoteValue(value) {
            this.currentNote[value.code] = value.value 

            this.updateUserNote()
        },
        updateUserNote() {  
            this.busy = true
            this.UserSupport.updateUserNote(this.note, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.currentNote.user_note_id = response.user_note_id
                }

                if(response.new_note) {
                    this.$emit('addNote')
                }

                toastInfo({
                    message: response.new_note ? 'Nota guardada' : 'Nota actualizada',
                })

                this.$refs.OffCanvas.hide()
            })  
        },
        addNote(toggleCanvas) {
            this.$emit('addNote')

            if(toggleCanvas) {
                this.$refs.OffCanvas.show()
            }
        },
        openInOffCanvas() {
            this.$refs.OffCanvas.show()
        }
    },
    mounted() {       
        this.currentNote = this.note
    },
    template : `
        <div v-if="note" class="row align-items-center border-bottom animation-fall-down" style="--delay:150ms">
            <NoteItem v-for="header in headers" 
                class="active-on-hover"
                :class="!currentNote?.user_note_id ? 'opacity-4' : ''"
                :value="getItemValue(header)" 
                :title="header.title" 
                :code="header.code"
                :className="header.className"
                @openInOffCanvas="openInOffCanvas"
                @updateNoteValue="updateNoteValue"
                @addNote="addNote"
                :catalogUrgencies="catalogUrgencies"
                :catalogNotes="catalogNotes"
                :note="note"/> 
        </div>

        <OffCanvas ref="OffCanvas" title="Editar nota">
            <div v-if="currentNote">
                <div class="card card-body bg-light mb-3">
                    <div class="row align-items-center">
                        <div class="col-12 col-md-auto">
                            <div class="avatar avatar-xs mt-2">
                                <img src="../../src/img/user.png" class="avatar avatar-xs rounded-circle" alt="useravatar" title="useravatar"/>
                            </div>
                        </div>
                        <div class="col-12 col-md">
                            {{currentNote.names}}
                        </div>
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="currentNote.title" type="text" class="form-control" id="title" placeholder="title">
                    <label for="title">Titulo</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea v-model="currentNote.description" class="form-control" id="description" placeholder="description" style="height:100px"></textarea>
                    <label for="description">Descripción</label>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="currentNote.create_date" type="date" class="form-control" id="date" placeholder="date">
                    <label for="date">Fecha</label>
                </div>
                <div class="form-floating mb-3">
                    <select v-model="currentNote.catalog_urgency_id" class="form-select" id="catalog_urgency_id">
                        <option v-for="catalogUrgency in catalogUrgencies" v-bind:value="catalogUrgency.catalog_urgency_id">
                            {{ catalogUrgency.title }}
                        </option>
                    </select>
                    <label for="catalog_urgency_id">Urgencia</label>
                </div>
                <div class="form-floating mb-3">
                    <select v-model="currentNote.catalog_note_id" class="form-select" id="catalog_note_id">
                        <option v-for="catalogNote in catalogNotes" v-bind:value="catalogNote.catalog_note_id">
                            {{ catalogNote.title }}
                        </option>
                    </select>
                    <label for="catalog_note_id">Nota</label>   
                </div>
                <div class="card-footer">        
                    <button class="btn btn-primary mb-0 shadow-none" @click="updateUserNote(true)">Guardar</button>       
                </div>
            </div>
        </div>
    `,
}