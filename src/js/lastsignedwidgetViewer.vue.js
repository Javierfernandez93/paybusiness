import { User } from '../../src/js/user.module.js?v=2.3.3'   

const LastsignedwidgetViewer = {
    name : 'lastsignedwidget-viewer',
    data() {
        return {
            User : new User,
            current : null,
            TIME : 3500,
            interval : null,
            user : null,
            users : null
        }
    },
    watch : {
        
    },
    methods: {
        getUserRandom() {
            let index = Math.round(Math.random() * this.users.length)
            this.user = this.users[index]
        },
        getUserRandomInterval() {
            this.getUserRandom()

            this.interval = setInterval(() =>{
                this.getUserRandom()    
            },this.TIME)
        },
        getLastSigned() {
            this.User.getLastSigned({},(response)=>{
                if(response.s == 1)
                {
                    this.users = response.users

                    this.getUserRandomInterval()
                }
            })
        },
    },
    mounted() 
    {   
        this.getLastSigned()
    },
    template : `
        <div class="card shadow-none bg-transparent mb-3">
            <div class="card-body text-center text-center">
                <div class="h4">
                    <img :src="user.country_id.getCoutryImage()" class="me-2" title="flag" alt="flag" style="width:2rem"/>
                    {{user.names}}
                </div>
            </div>
        </div>
    `,
}

export { LastsignedwidgetViewer } 