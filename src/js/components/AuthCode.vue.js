import { User } from '../../../src/js/user.module.js?v=1.0.3'   
import Loader from '../../../src/js/components/Loader.vue.js?v=1.0.3'

const AuthCode = {
    components : { Loader },
    emits : ['authenticated'],
    data() {
        return {
            User: new User,
            busy : false,
            authetificated : null,
            filled : false,
            auth_token: {
                token: null,
                key: null,
                code: ''
            },
            need_auth_to_withdraw : null,
            CODE_LENGTH : 0,
        }
    },
    watch : {
        'auth_token.code': {
            handler() {
                this.filled = this.auth_token.code.length == this.CODE_LENGTH 
            },
            deep: true
        }
    },
    methods: {
        getNeedAuthToWithdraw() {
            this.busy = true
            this.User.getNeedAuthToWithdraw({  }, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.need_auth_to_withdraw = response.need_auth_to_withdraw
                    this.CODE_LENGTH = response.code_length
                    
                    if(!this.need_auth_to_withdraw) {
                        this.$emit('authenticated')
                    }
                } else {
                    this.need_auth_to_withdraw = false
                }
            })
        },
        validateAuthCode() {
            this.busy = true
            this.User.validateAuthCode(this.auth_token, (response) => {
                this.busy = false
                if (response.s == 1) {
                    this.authetificated = true
                    toastInfo({
                        message : this.t('auth_code_validated'),
                    })

                    this.$emit('authenticated')
                } else {
                    toastInfo({
                        message : this.t('auth_code_not_validated'),
                    })
                }
            })
        },
        setTokenRequest() {
            this.busy = true
            this.User.setTokenRequest({  }, (response) => {
                this.busy = false
                if (response.s == 1) {
                    toastInfo({
                        message : this.t('auth_code_sent'),
                    })
                    this.auth_token = {
                        ...this.auth_token,
                        ...response.auth_token
                    }

                    this.$refs.code.focus()
                }
            })
        },
    },
    mounted() 
    {       
        this.getNeedAuthToWithdraw()
    },
    template : `
        <Loader :busy="busy"/>

        <div v-if="need_auth_to_withdraw" class="card">
            <div v-if="authetificated" class="alert alert-success text-white text-center">
                <div class="h2 text-white">
                    <i class="bi bi-check-circle"></i>
                </div>
                {{t('auth_code_validated')}}
            </div>
            <div v-else>
                <div class="alert alert-danger text-white">
                    <strong>{{t('important')}}</strong> {{t('auth_code_message')}}
                </div>
                
                <div class="row mb-3 justify-content-center align-items-center">
                    <div class="col-12 col-xl">
                        <input :class="auth_token.code.length == CODE_LENGTH ? 'is-valid' : 'is-invalid'" ref="code" type="text" class="form-control" placeholder="Código de autorización" v-model="auth_token.code">
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button @click="setTokenRequest" class="btn btn-light mb-0">
                            {{t('request_code')}}
                        </button>
                    </div>
                </div>
                <button :disabled="!filled" @click="validateAuthCode" class="btn btn-primary">
                    {{t('validate_code')}}
                </button>
            </div>
        </div>
        
    `,
}

export { AuthCode } 