import { User } from '../../src/js/user.module.js?v=2.3.3'   

const DailyViewer = {
    name : 'daily-viewer',
    data() {
        return {
            User: new User,
            range : null
        }
    },
    methods: {
        getCurrentRange() {
            this.User.getCurrentRange({},(response)=>{
                if(response.s == 1)
                {
                    this.range = this.range
                }
            })
        },
    },
    mounted() 
    {   
        
    },
    template : `
        <div class="card">
            <div class="card-header h4">
                Daily
            </div>
            <div class="card-body">
                
            </div>
        </div>

    `,
}

export { DailyViewer } 