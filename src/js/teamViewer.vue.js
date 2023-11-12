import { User } from '../../src/js/user.module.js?v=2.3.9'   

const TeamViewer = {
    name : 'team-viewer',
    data() {
        return {
            User: new User,
            usersCalled : [],
            user_login_id : null,
            dataSource: null,
            busy : false,
            width : 50
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
                if(response.s == 1)
                {
                    this.user_login_id = response.user_login_id

                    setTimeout(()=>{
                        this.insertHtml('0',[{
                            image: response.profile.image,
                            names: response.profile.names,
                            user_login_id:this.user_login_id
                        }])
                        
                        this.insertHtml(response.user_login_id,response.team)
                    },1000)
                }
            })
        },
        insertHtml(user_login_id,users) {
            if(users && user_login_id)
            {
                if(($(`#${user_login_id}`).find("li").length) == 0)
                {
                    this.width += 7

                    let html = '<ul>'
                    users.forEach(user => {
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

                                        <div class="${!user.active ? 'd-none' : ''} position-absolute top-0 mt-2 me-2 end-0">
                                            <i class="bi lead text-success bi-check-circle-fill"></i>
                                        </div>
                                    </span>
                                </a>
                            </li>
                        `
                    });
    
                    html += '</ul>'
    
                    $(`#${user_login_id}`).append(html)

                    users.forEach(user => {
                        $(`#${user.user_login_id}`).click()
                    })
                }
            }
        },
        scrollHorizontally(elementId)
        {
            document.getElementById("tree").scrollLeft += 20;
        },
        getBinaryTree(user_login_id) {

            if(!this.isCalled(user_login_id))
            {
                this.usersCalled.push({user_login_id:user_login_id})

                this.User.getBinaryTree({user_login_id:user_login_id},(response)=>{
                    if(response.s == 1)
                    {
                        this.insertHtml(user_login_id,response.team)
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