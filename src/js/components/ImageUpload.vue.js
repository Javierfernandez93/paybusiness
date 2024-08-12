import { Image } from '../../../src/js/image.module.js?v=1.0.3'
import Loader from '../../../src/js/components/Loader.vue.js?v=1.0.3'

export default {
    props: ['path','maxSize','label'],
    emits: ['upload'],
    components: {
        Loader
    },
    data() {
        return {
            Image: new Image,
            busy: false,
            target_path: null,
        }
    },
    methods: {
        openFileManager() {
            this.$refs.file.click()
        },
        uploadImage() 
        {
            this.busy = true
            let files = $(this.$refs.file).prop('files');
            var form_data = new FormData();
        
            form_data.append("file", files[0]);
            form_data.append("path",this.path);
        
            this.Image.uploadImage(form_data,(response)=>{
                this.busy = false

                if(response.s == 1)
                {
                    this.target_path = response.target_path
                    this.$emit('upload',response.target_path);
                }
            },$(".progress-chat").find(".progress-bar"))
        },
    },
    mounted() {
        
    },
    template : `
        <Loader :busy="busy"/>

        <div class="card py-3 my-3 cursor-pointer card-body border border-light shadow-none" @click="openFileManager()">
            <div v-if="label" class="text-muted text-xs text-center pb-3"> 
                {{label}}
            </div>
            <div class="progress">
                <div class="progress-bar" role="progressbar" aria-label="Progresso de carga" style="width: 0%;"></div>
            </div>
            <input type="file" ref="file" class="d-none" accept="image/*" @change="uploadImage" capture="filesystem" />

            <div class="text-center" v-text="target_path ? t('change_image') : t('upload_image')"></div>

            <img v-if="target_path" :src="target_path" class="img-fluid img-thumbnail border-0" title="profile-picture" alt="profile-picture"/>
        </div>
    `,
}                   