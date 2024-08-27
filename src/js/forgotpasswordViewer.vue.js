import { User } from '../../src/js/user.module.js?v=1.5.0'   

const ForgotpasswordViewer = {
    data() {
        return {
            User : new User,
            mailSent: false,
            loading: false,
            email: '',
            feedback : false
        }
    },
    methods: {
        recoverPassword() {
            if(this.email.isValidMail())
            {
                this.feedback = false
                this.loading = true
                
                this.User.recoverPassword({email:this.email},(response)=>{
                    this.loading = false

                    if(response.s == 1)
                    {
                        this.mailSent = true
                    } else if(response.r == "INVALID_PASSWORD") {
                        toastInfo({
                            message: this.t('invalid_password'),
                        })
                    } else if(response.r == "NOT_FOUND_MAIL") {
                        toastInfo({
                            message: this.t('not_found_mail'),
                        })
                    } else if(response.r == "INVALID_CREDENTIALS") {
                        toastInfo({
                            message: this.t('invalid_credentials'),
                        })
                    }
                })
            }
        },
    },
    mounted() 
    {
    },
    template : `
        <div class="row d-flex justify-content-center align-items-center vh-100">
            <div class="col-11 col-xl-4">
                <div class="card border border-light">
                    <div
                        v-if="mailSent == false" 
                        class="card bg-transparent shadow-none text-start p-3">
                        <div class="card-header text-center bg-transparent border-0">
                            <div class="fs-4 fw-bold">{{t('recover_password')}}</div>
                        </div>
                        <div class="card-body">
                            <div class="form-floating mb-3">
                                <input 
                                    :autofocus="true"
                                    :class="email.isValidMail() ? 'is-valid' : 'is-invalid'"
                                    type="email" ref="email" v-model="email" class="form-control" @keydown.enter.exact.prevent="recoverPassword" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1">

                                <label for="email">{{t('email')}}</label>
                            </div>

                            <div class="text-center">
                                <a class="text-white" href="../../apps/login/">{{t('login')}}</a>
                            </div>
                        </div>
                        <div class="card-footer pt-0">
                            
                            <div v-show="feedback" class="alert alert-secondary text-white text-center alert-dismissible fade show" role="alert">
                                {{ feedback }}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                            <button :disabled="!email.isValidMail() || loading" class="btn btn-lg btn-primary mb-0 shadow-none w-100" @click="recoverPassword" id="button">
                                <span v-if="!loading">
                                    {{t('recover_password')}}
                                </span>
                                <span v-else>
                                    <div class="spinner-border" role="status">
                                        <span class="sr-only"></span>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>    
                    <div
                        v-else
                        class="card text-start shadow p-3">
                        <div class="card-header text-center bg-transparent border-0">
                            <div class="fs-4 fw-bold">{{t('recover_password')}}</div>
                        </div>
                        <div class="card-body">
                            <strong>{{ t('warning') }}</strong>
                            <div class="mb-3">
                                <span v-html="t('recover_password_mail',{email:email})"></span>
                            </div>
                            <div class="small text-muted">
                                <span v-html="t('not_received_mail_mail')"></span>
                            </div>
                        </div>
                        <div class="card-footer pt-0">
                            <div v-show="feedback" class="alert alert-warning alert-dismissible fade show" role="alert">
                                <span v-html="feedback"></span>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                            <button :disabled="!mailSent" class="btn btn-lg btn-secondary w-100" @click="mailSent = false" id="button">
                                {{t('not_received_mail')}}
                            </button>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    `
}

export { ForgotpasswordViewer }