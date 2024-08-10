export default {
    props: ['user'],
    mounted() {
        
    },
    template : `
        <div v-if="user" class="card card-body">
            <div class="row align-items-center">
                <div class="col-12 col-xl-auto">
                    <div class="avatar avatar-md">
                        <img :src="user.image ? user.image : '../../src/img/user.png'" class="avatar avatar-md rounded-circle shadow" alt="usuario" style="object-fit:cover;"/>
                    </div>
                </div>
                <div class="col-12 col-xl">
                    <div class="lead">
                        {{user.names}}
                    </div>
                    <div class="text-xs">
                        {{user.email}}
                    </div>
                </div>
            </div>
        </div>
    `,
}