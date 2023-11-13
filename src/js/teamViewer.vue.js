import { User } from '../../src/js/user.module.js?v=2.4.3'   

const TeamViewer = {
    name : 'team-viewer',
    data() {
        return {
            User: new User,
            usersCalled : [],
            user_login_id : null,
            SIDE: {
                START: 0,
                END: 0,
            },
            dataSource: null,
            busy : false
        }
    },
    methods: {
        isCalled(_user_login_id) {
            return this.usersCalled.find((user) => user.user_login_id == _user_login_id)
        },
        getMainBinaryTree() {
            this.busy = true
            this.User.getMainBinaryTree({},(response)=>{
                this.busy = false

                this.user_login_id = response.profile.user_login_id

                setTimeout(()=>{
                    this.insertHtml({
                        user_login_id : '0',
                        main : true,
                        users : [{
                            image: response.profile.image,
                            names: response.profile.names,
                            code: response.profile.code,
                            user_login_id:this.user_login_id
                        }]
                    })
                    
                    if(response.s == 1)
                    {
                        this.insertHtml({user_login_id:response.user_login_id,users:response.team})
                    }
                },500)
            })
        },
        insertHtml(data) {
            if(data)
            {
                if(($(`#${data.user_login_id}`).find("li").length) == 0)
                {
                    if(data.users)
                    {
                        let html = '<ul>'

                        data.users.forEach(user => {
                            html += `
                                <li id="${user.user_login_id}" onclick="getBinaryTree(${user.user_login_id})">
                                    <a class="cursor-pointer">
                                        <span class="sans text-xs shadow position-relative rounded-3 p-3 mx-3 fw-semibold">
                                            <div class="avatar">
                                                <img class="avatar rounded-circle" src="${user.image}"/>
                                            </div>
                                            
                                            <div class="text-uppercase fw-semibold sans mt-2">
                                                ${user.names.getFirstName()}
                                            </div>
                                            
                                            <div class="fw-semibold mt-2">
                                                ${user.code}
                                            </div>
                                            
                                            <div class="${data.main ? 'd-none' : ''} fw-semibold mt-2">
                                                <span class="badge bg-primary">
                                                    ${user.side == this.SIDE.START? 'Izquierda' : 'Derecha'}
                                                </span>
                                            </div>
    
                                            <div class="${!user.active ? 'd-none' : ''} position-absolute top-0 mt-2 me-2 end-0">
                                                <i class="bi lead text-success bi-check-circle-fill"></i>
                                            </div>
                                        </span>
                                    </a>
                                </li>
                            `
                        });
        
                        html += '</ul>'
        
                        $(`#${data.user_login_id}`).append(html)
    
                        data.users.forEach(user => {
                            $(`#${user.user_login_id}`).click()
                        })
                    }
                }
            }
        },
        getBinaryTree(user_login_id) {

            if(!this.isCalled(user_login_id))
            {
                this.usersCalled.push({user_login_id:user_login_id})

                this.User.getBinaryTree({user_login_id:user_login_id},(response)=>{
                    if(response.s == 1)
                    {
                        this.insertHtml({user_login_id:user_login_id,users:response.team})
                    }
                })
            }
        },
    },
    mounted() 
    {   
        let _this = this

        this.getMainBinaryTree()

        window.getBinaryTree = function(user_login_id)
        {
            _this.getBinaryTree(user_login_id)
        }
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center py-5">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        </div>
        
        <div v-if="user_login_id" class="tree justify-content-center w-100 animation-fall-down" style="--delay:500ms" id="trees">
            <div id="0"></div>
        </div>
    `,
}

export { TeamViewer } 