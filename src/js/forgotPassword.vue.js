import { User } from '../../src/js/user.module.js?v=2.3.3'   

Vue.createApp({
    components : { 
        
    },
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
                        this.feedback = "Las contraseña indicada no es correcta. Intente nuevamente"
                    } else if(response.r == "NOT_FOUND_MAIL") {
                        this.feedback = "El correo proporcionado no está registrado"
                    } else if(response.r == "INVALID_CREDENTIALS") {
                        this.feedback = "Las credenciales proporcionadas no son correctas, intente nuevamente"
                    }
                })
            }
        },
    },
    mounted() 
    {
    },
}).mount('#app')