import { UserSupport } from '../../../src/js/userSupport.module.js?v=1.0.0'   

import Modal from './Modal.vue.js?v=1.0.0'
import Loader from './Loader.vue.js?v=1.0.0'
import FileItem from './FileItem.vue.js?v=1.0.0'
import UploadFile from './UploadFile.vue.js?v=1.0.0'
import HighLigth from './HighLigth.vue.js?v=1.0.0'

const FileManager = {
    components : { 
        Loader, 
        Modal, 
        FileItem, 
        UploadFile, 
        HighLigth 
    },
    emits : ['getLeads'],
    props : ['user_login_id'],
    data() {
        return {
            UserSupport: new UserSupport,
            busy: true,
            query: null,
            files : [],
            filesAux : [],
            user_login_id: null,
        }
    },
    watch : {
        query() {
            this.files = this.filesAux.filter((file) => {
                return file.title?.toLowerCase().includes(this.query.toLowerCase())
                || file.type?.toLowerCase().includes(this.query.toLowerCase())
            })
        }
    },
    methods: {
        _getFiles() {
            this.busy = true
            this.files = []
            this.filesAux = []
            this.UserSupport.getFiles({user_login_id:this.user_login_id}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.files = response.files
                    this.filesAux = response.files
                }
            })
        },
        updateFileTitle(file) {
            console.log(file)
            this.busy = true
            this.UserSupport.updateFileTitle({user_file_id:file.user_file_id,title:file.title}, (response) => {
                this.busy = false
                if (response.s == 1) {
                    
                }
            })  
        },
        getFiles(user_login_id) {
            this.user_login_id = user_login_id

            this.$refs.myModal.show()

            this._getFiles()
        },
        deleteFile(user_file_id) {
            this.busy = true

            this.UserSupport.deleteFileManager({user_file_id:user_file_id}, (response) => {
                this.busy = false

                if (response.s == 1) {
                    this._getFiles()
                }
            })
        },
        upload(user_file) {
            this.files.push(user_file)
            this.filesAux.push(user_file)
        }
    },
    mounted() {
        
    },
    template : `
        <Modal ref="myModal" title="Ver archivos" size="modal-fullscreen">
            <div class="container">
                <Loader :busy="busy"/>

                <div class="card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-12 col-md">
                                <div class="text-xs text-secondary">
                                    {{ files.length }} archivos
                                </div>

                                <h5>Archivos</h5>
                            </div>
                            <div class="col-12 col-md-auto">    
                                <input type="search" v-model="query" class="form-control" placeholder="Buscar archivo..."/>
                            </div>
                        </div>
                    </div>
                    
                    <HighLigth :dataLength="files.length" :query="query" :busy="busy"/>

                    <div v-if="files.length > 0" class="card-body">
                        <FileItem @update="update" @updateFileTitle="updateFileTitle" @deleteFile="deleteFile" v-for="file in files" :file="file"/>
                    </div>
                </div>


                <UploadFile ref="upload" @upload="upload" :user_login_id="user_login_id"/>
            </div>
        </Modal>
    `
}

export { FileManager }