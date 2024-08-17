import { UserSupport } from '../../../src/js/userSupport.module.js?v=1.0.0'   

import Loader from './Loader.vue.js?v=1.0.0'
import FileModel from '../../../src/js/models/file.module.js?v=1.0.0'

export default {
    components : { Loader },
    emits : ['upload'],
    props : ['user_login_id'],
    data() {
        return {
            UserSupport: new UserSupport,
            busy: true,
            acceptedFormats : [
                '.jpg', '.png', '.jpeg', '.pdf', '.pptx', '.docx', '.xlsx', '.txt', '.csv'
            ],
            acceptedFormatsString : '',
            file : FileModel
        }
    },
    methods: {
        openFileManager() 
        {
            this.$refs.file.click()
        },
        uploadFile() 
        {
            let files = $(this.$refs.file).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
            form_data.append("user_login_id",this.user_login_id);
          
            this.UserSupport.uploadFileManager(form_data,$(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.$emit('upload',response.user_file)
              }
            });
        },
    },
    mounted() {
        this.acceptedFormatsString = this.acceptedFormats.join(',')
    },
    template : `
        <div class="card card-body border border-light mt-3 bg-light">
            <div class="mb-3">
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <div @click="openFileManager($refs.file)" class="cursor-pointer text-center">
                <div class="col-12">
                    <div class="">
                        Sube o arrastra tu archivo aquí
                    </div>
                    
                    <div>
                        <span v-for="format in acceptedFormats" class="badge bg-primary">
                            {{format}}
                        </span>
                    </div>
                </div>
            </div>

            <input class="upload-file d-none" ref="file" @change="uploadFile()" capture="filesystem" type="file" :accept="acceptedFormats" />
        </div>
    `
}