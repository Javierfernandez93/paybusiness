import { User } from '../../src/js/user.module.js?v=1.1.0'   

const TeamViewer = {
    name : 'team-viewer',
    data() {
        return {
            User: new User,
            frontals : null,
            points : null,
            rounds : 0,
            MAX_ROUNDS : 4,
            query : null,
            usersCalled : [],
            user_login_id : null,
            SIDE: {
                START: 0,
                END: 1,
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
                this.frontals = response.frontals

                setTimeout(()=>{
                    this.insertHtml({
                        user_login_id : '0',
                        main : true,
                        users : [{
                            image: response.profile.image,
                            names: response.profile.names,
                            code: response.profile.code,
                            landing: response.profile.landing,
                            user_login_id:this.user_login_id,
                            toggled : false
                        }],
                        hide:false
                    })
                    
                    if(response.s == 1)
                    {
                        this.insertHtml({
                            user_login_id:response.user_login_id,
                            users:response.team,
                            hide:false
                        })
                    }
                },500)
            })
        },
        getBinaryPoints() {
            this.busy = true
            this.User.getBinaryPoints({},(response)=>{
                this.busy = false
                if(response.s == 1)
                {
                    this.points = response.points
                }
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
                                <li id="${user.user_login_id}" class="user" onclick="getBinaryTree(${user.user_login_id})">
                                    <a class="cursor-pointer">
                                        <span class="sans text-xs shadow position-relative rounded-3 p-3 mx-3 fw-semibold">
                                            <div class="avatar">
                                                <img class="avatar avatar-md shadow rounded-circle" src="${user.image}"/>
                                            </div>
                                            
                                            <div data-landing="${user.landing}" class="text-uppercase fw-semibold sans mt-2">
                                                ${user.landing}
                                            </div>
                                            
                                            <div class="fw-semibold mt-2" data-code="${user.code}">
                                                ${user.code}
                                            </div>
                                            
                                            <div class="${data.main ? 'd-none' : ''} fw-semibold mt-2">
                                                <span class="badge bg-primary">
                                                    ${user.side == this.SIDE.START? 'Izquierda' : 'Derecha'}
                                                </span>
                                            </div>

                                            <button class="btn btn-light mb-0 shadow-none" onclick="toggleChilds(${user.user_login_id})">
                                                Ver/ocultar
                                            </button>
    
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
    
                        this.rounds += 1

                        if(this.rounds < this.MAX_ROUNDS) 
                        {
                            data.users.forEach(user => {
                                $(`#${user.user_login_id}`).click()
                            })
                        }
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
                        this.insertHtml({user_login_id:user_login_id,users:response.team,hide:true})
                    }
                })
            }
        },
        filterData: _debounce((self) => {
            let query = $("#query").val()
            
            $(".hover").removeClass("hover")
            
            $.each($("[data-landing]"),(key,element)=>{
                let landing = $(element).text().trim()

                if(landing.toLowerCase().includes(query.toLowerCase()))
                {
                    $(element).parent().addClass("hover");
                    
                    $('body, html').animate({
                        scrollTop: $(element).parent().offset().top
                    }, 250);
                }
            })

            if($(".hover").length == 0)
            {
                $.each($("[data-code]"),(key,element)=>{
                    let code = $(element).text().trim()
                    
                    if(code.toString().includes(query))
                    {
                        $(element).parent().addClass("hover");
                        
                        $('body, html').animate({
                            scrollTop: $(element).parent().offset().top
                        }, 250);
                    }
                })
            }
        },1000),
        scrollToSpan(user_login_id) {
            console.log(user_login_id);
            $("ul").removeClass("d-none")

            $(".hover").removeClass("hover");

            $(`#${user_login_id}`).find("span").addClass("hover")

            $('body, html').animate({
                scrollTop: $(`#${user_login_id}`).parent().offset().top
            }, 250);
        }
    },
    mounted() 
    {   
        let _this = this

        this.getMainBinaryTree()
        this.getBinaryPoints()

        window.getBinaryTree = function(user_login_id)
        {
            _this.getBinaryTree(user_login_id)
        }
    
        window.toggleChilds = function(user_login_id)
        {
            $(`#${user_login_id}`).find("ul").toggleClass("d-none")
        }
    },
    template : `
        <div v-if="busy" class="justify-content-center text-center py-5">
            <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        </div>

        <div v-if="frontals" class="row justify-content-center mb-3">
            <div class="col-12 col-xl-8">
                <div class="row justify-content-center align-items-center">
                    <div v-for="frontal in frontals" class="col">
                        <div class="d-grid">
                            <button @click="scrollToSpan(frontal.user_login_id)" class="btn btn-primary shadow-none">
                                Último {{frontal.side == SIDE.START ? 'Izquierda' : 'Derecha'}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="points" class="row justify-content-center align-items-center mb-3">
            <div class="col-12 col-xl-8">
                <div class="card card-body px-5">
                    <div class="row g-4 justify-content-center align-items-center">
                        <div v-if="points.start" class="col">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-xl">
                                    <div class="text-secondary text-xs">
                                        Puntos lado izquierdo 
                                    </div>
                                    <div class="h3">
                                        {{points.start.points}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="points.end" class="col">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-xl">
                                    <div class="text-secondary text-xs">
                                        Puntos lado derecho 
                                    </div>
                                    <div class="h3">
                                        {{points.end.points}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row justify-content-center align-items-center mb-5">
            <div class="col-12 col-xl-6">
                <div class="row align-items-center">
                    <div class="col-12 col-xl">
                        <input @keypress="filterData(this)" id="query" placeholder="Buscar por nombre o código..." class="form-control form-control-lg"/>
                    </div>
                    <div class="col-12 col-xl-auto">
                        <button @click="filterData(this)" class="btn mb-0 shadow-none btn-primary">Buscar</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="user_login_id" id="tree" class="tree justify-content-center w-100 animation-fall-down" style="--delay:500ms" id="trees">
            <div id="0"></div>
        </div>

        <div v-if="frontals" class="row justify-content-center mb-3">
            <div class="col-12 col-xl-8">
                <div class="row justify-content-center align-items-center">
                    <div v-for="frontal in frontals" class="col">
                        <div class="d-grid">
                            <button @click="scrollToSpan(frontal.user_login_id)" class="btn btn-primary shadow-none">
                                Último {{frontal.side == SIDE.START ? 'Izquierda' : 'Derecha'}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    `,
}

export { TeamViewer } 