export default {
    props : ['query','results'],
    template : `
        <div v-if="results && query" class="alert alert-light text-center fw-semibold text-dark border-0 alert-dismissible fade show" role="alert">
            Hemos encontrado <strong>{{results}}</strong> resultado{{results > 1 ? 's' : ''}} para <strong>{{query}}</strong>
        </div> 
        <div v-else-if="results == 0" class="alert alert-light text-center fw-semibold text-dark border-0 alert-dismissible fade show" role="alert">
            No hemos encontrado ningún resultado para <strong>{{query}}</strong>
        </div>
    `,
}