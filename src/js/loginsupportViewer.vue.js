import { UserSupport } from '../../src/js/userSupport.module.js?v=1.0.0'
import AlertDismiss from '../../src/js/components/AlertDismiss.vue.js?v=1.0.0'
import Loader  from '../../src/js/components/Loader.vue.js?v=1.0.0'

const LoginsupportViewer = {
    components : { AlertDismiss, Loader },
    data() {
        return {
            UserSupport : new UserSupport,
            user: {
                email: '',
                password: null,
                rememberMe: true,
            },
            busy : false,
            feedback : false,
            isValidMail : false,
            fieldPasswordType : 'password',
            filled : false,
        }
    },
    watch : {
        user : {
            handler() {
                this.filled = this.user.email.isValidMail()
                && this.user.password 
            },
            deep: true
        },
    },
    methods: {
        toggleFieldPasswordType() {
            this.fieldPasswordType = this.fieldPasswordType == 'password' ? 'text' : 'password'
        },
        doLogin() {
            this.feedback = false
            this.busy = true
            
            this.UserSupport.doLoginSupport(this.user,(response)=>{
                this.busy = false
                
                if(response.s == 1)
                {
                    window.location.href = '../../apps/admin'
                } else if(response.r == "INVALID_PASSWORD") {
                    this.feedback = "Las contraseña indicada no es correcta. Intente nuevamente"
                } else if(response.r == "INVALID_CREDENTIALS") {
                    this.feedback = "Las credenciales proporcionadas no son correctas, intente nuevamente"
                }
            })
        },
    },
    mounted() 
    {
        
    },
    template: `
        <div class="card shadow-none bg-transparent">
            <div class="card-header bg-transparent fw-bold h2 text-dark text-center">
                Sign in
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="email">Correo electrónico</label>
                    <input 
                        :autofocus="true"
                        :class="user.email.isValidMail() ? 'is-valid' : 'is-invalid'"
                        @keydown.enter.exact.prevent="$refs.password.focus()"
                        ref="email"
                        v-model="user.email"
                        type="email" class="form-control" placeholder="name@example.com">

                    <div v-if="!user.email.isValidMail()" id="emailHelp" class="form-text text-warning">
                        <i class="bi bi-exclamation-triangle-fill"></i>
                        Ingresa un correo electrónico válido
                    </div>
                </div>

                <div class="mb-3">
                    <label for="password">Contraseña</label>
                    <input 
                        :type="fieldPasswordType"
                        :class="user.password ? 'is-valid' : 'is-invalid'"
                        @keydown.enter.exact.prevent="doLogin"
                        ref="password" 
                        v-model="user.password" 
                        type="password" class="form-control" placeholder="Password">
                     
                        <div v-if="!user.email" id="passwordHelp" class="form-text text-warning">
                        <i class="bi bi-exclamation-triangle-fill"></i>
                        Ingresa una contraseña
                    </div>
                </div>

                <AlertDismiss v-if="feedback" title="Aviso" myClass="alert-danger text-white">
                    <div>
                        <i class="bi bi-exclamation-triangle-fill"></i>

                        {{feedback}}
                    </div>
                </AlertDismiss>
                <button 
                    :disabled="!filled" 
                    @click="doLogin"
                    class="btn btn-success shadow-none w-100 btn-block btn-lg badge-pill mb-0" type="button">
                    <span v-if="busy">
                        <Loader busy="true"/>
                    </span>
                    <span v-else>
                        Ingresar al Admin
                    </span>
                </button>
            </div>
        </div>        
    `
}

export { LoginsupportViewer }