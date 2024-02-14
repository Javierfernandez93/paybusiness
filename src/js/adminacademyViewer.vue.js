import { UserSupport } from '../../src/js/userSupport.module.js?v=1.1.0'

const AdminacademyViewer = {
    name : 'adminacademy-viewer',
    data() {
        return {
            UserSupport : new UserSupport,
            query : null,
            courses : null,
            coursesAux: null,
            grid : false
        }
    },
    watch : {
        query: {
            handler()
            {
                this.filterData()
            },
            deep: true
        },
    },
    methods: {
        filterData() {
            this.courses = this.coursesAux
            this.courses = this.courses.filter((course) => {
                return course.title.toLowerCase().includes(this.query.toLowerCase()) || course.price.toString().includes(this.query)
            })
        },
        toggleGrid()
        {
            this.grid = !this.grid
        },
        toggleGrid()
        {
            this.grid = !this.grid
        },
        goToPreview(course_id)
        {
            window.open(`../../apps/academy/lesson.php?cid=${course_id}`)
        },
        edit(course_id)
        {
            window.location.href = `../../apps/admin-academy/edit.php?cid=${course_id}`
        },
        toggleEditingRoute(sheet)
        {
            sheet.editingRoute = !sheet.editingRoute
        },
        goToSheet(proyect_id)
        {
            window.location.href = `../../apps/proyects/sheets?pid=${proyect_id}`
        },
        goToVConfigureCard(sheet_per_proyect_id)
        {
            window.location.href = `../../apps/v-card/config?sppid=${sheet_per_proyect_id}`
        },
        unpublish(course)
        {
            this.UserSupport.changeCourseStatus({course_id:course.course_id,status:0},(response)=>{
                if(response.s == 1)
                {
                    course.status = response.status
                }
            })
        },
        publish(course)
        {
            this.UserSupport.changeCourseStatus({course_id:course.course_id,status:1},(response)=>{
                if(response.s == 1)
                {
                    course.status = response.status
                }
            })
        },
        deleteCourse(course)
        {
            this.UserSupport.changeCourseStatus({course_id:course.course_id,status:-1},(response)=>{
                if(response.s == 1)
                {
                    this.getCourses()
                }
            })
        },
        getCourses() 
        {
            this.coursesAux = null
            this.courses = null

            this.UserSupport.getCourses({},(response)=>{
                if(response.s == 1)
                {
                    this.coursesAux = response.courses
                    this.courses = this.coursesAux
                } else {
                    this.coursesAux = false
                    this.courses = false
                }
            })
        }
    },
    mounted() 
    {   
        this.getCourses()
    },
    template : `
        <div class="card card-body mb-3">
            <div class="row align-items-center">
                <div class="col-12 col-xl">
                    <div v-if="courses" class="text-xs">total {{courses.length}}</div>
                    <div class="h5">
                        Cursos de academia
                    </div>
                </div>
                <div class="col-12 col-xl-auto">
                    <input :autofocus="true" v-model="query" type="text" class="form-control" placeholder="Buscar curso por nombre o precio...">
                </div>
                <div class="col-12 col-xl-auto">
                    <a href="../../apps/admin-academy/add" class="btn mb-0 btn-dark shadow-none">añadir curso</a>
                </div>
            </div>
        </div>

        <div v-if="courses" class="row animation-fall-down" style="--delay:250ms">
            <div :class="grid ? 'col-6' : 'col-12'" v-for="course in courses"> 
                <div class="card mb-3 card-body px-4">
                    <div class="row align-items-center">
                        <div class="col-12 col-xl-auto">
                            <div class="avatar">
                                <span class="avatar bg-dark">C</span>
                            </div>
                        </div>
                        <div class="col-12 col-xl">
                            <div>
                                <span class="badge border border-secondary text-secondary me-2">Creado hace {{course.create_date.timeSince()}}</span>
                                <span v-if="course.status == 0" class="badge border border-primary text-secondary me-2">
                                    Despublicado
                                </span>
                                <span v-else-if="course.status == 1" class="badge border-success border text-success me-2"> 
                                    Publicado
                                </span>
                            </div>
                            <div class="h4 text-dark" @click="goToSheet(proyect.proyect_id)">
                                {{course.title}} 
                            </div>
                            <div>
                                <span v-if="course.price > 0" class="badge bg-gradient-success me-2">
                                    {{ course.currency }} $ {{ course.price.numberFormat(2) }}
                                </span>
                                <span v-else class="text-xs me-2">
                                    <t>Gratis</t>
                                </span>
                                <span class="text-xs">
                                    {{course.type}}
                                </span>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="row">
                                <div class="col">
                                    <i class="bi bi-hand-thumbs-up"></i>
                                    <div class="h4">{{course.like}}</div>
                                </div>

                                <div class="col">
                                    <i class="bi bi-chat"></i>
                                    <div class="h4">{{course.comment}}</div>
                                </div>
                                
                                <div class="col">
                                    <i class="bi bi-person"></i>
                                    <div class="h4">{{course.user}}</div>
                                </div>

                                <div class="col">
                                    <i class="bi bi-eye"></i>
                                    <div class="h4">{{course.visit}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="col-auto">
                            <div class="dropdown">
                                <button type="button" class="btn btn-primary shadow-none mb-0 px-3 btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">

                                </button>
                                <ul class="dropdown-menu shadow">
                                    <li><button class="dropdown-item"@click="goToPreview(course.course_id)"><t>Ver previo</t></button></li>
                                    <li><button class="dropdown-item"@click="edit(course.course_id)"><t>Editar</t></button></li>
                                    <li v-if="course.status == 1"><button class="dropdown-item"@click="unpublish(course)"><t>Despublicar</t></button></li>
                                    <li v-if="course.status == 0"><button class="dropdown-item"@click="publish(course)"><t>Publicar</t></button></li>
                                    <li><button class="dropdown-item" @click="deleteCourse(course)"><t>Eliminar</t></button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="courses == false" class="alert alert-info text-white text-center">
            <strong>No has añadido cursos a tu academia</strong>
            <div>Para añadir uno, da clic en <a href="../../apps/admin-academy/add">añadir</a></div>
        </div>
    `,
}

export { AdminacademyViewer } 