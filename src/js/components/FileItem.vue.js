import { UserSupport } from '../../../src/js/userSupport.module.js?v=1.0.0'   

import Loader from './Loader.vue.js?v=1.0.0'
import Badge from './Badge.vue.js?v=1.0.0'

export default {    
    components : { Loader, Badge },
    props : ['file'],
    emits : ['update','deleteFile','updateFileTitle'],
    data() {
        return {
            MyUserSupport: new UserSupport,
            busy: false,
            title: null,
        }
    },
    methods : {
        changeFileName: _debounce((self) => {
            self.title = self.$refs.element.innerText

            self.$emit('updateFileTitle',{
                title: self.title,
                user_file_id: self.file.user_file_id
            })
        },500),
    },
    data() {

    },
    template : `
        <ul class="list-group">
            <li class="list-group-item">
                <div class="row align-items-center">
                    <div v-if="busy" class="col-12 col-md-auto">
                        <Loader busy="true"/>
                    </div>
                    <div class="col-12 col-md-auto">
                        <Badge :value="file.type" myClass="border-success text-success"/>
                    </div>
                    <div class="col-12 col-md">
                        <div class="mb-0 px-2" ref="element" contenteditable="true" @input="changeFileName(this)">
                            {{file.title}}
                        </div>
                    </div>
                    <div class="col-12 col-md-auto">
                        <div class="dropdown">
                            <button type="button" class="btn btn-dark mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                            </button>
                            <ul class="dropdown-menu shadow">
                                <li><a class="dropdown-item" :href="file.path" download>Descargar</a></li>
                                <li><a class="dropdown-item" :href="file.path" target="_blank">Visualizar</a></li>

                                <div class="separator"></div>

                                <li><button class="dropdown-item" @click="$emit('deleteFile',file.user_file_id)">Eliminar</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    `
}