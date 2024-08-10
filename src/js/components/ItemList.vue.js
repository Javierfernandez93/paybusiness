export default {
    props: ['title','value'],
    template : `
        <li class="list-group-item border-0 bg-transparent">
            <div class="row align-items-center">
                <div class="col-12">
                    <div class="text-md fw-semibold text-muted"> 
                        {{title}}
                    </div>
                    <div class="lead text-white">
                        {{value}}
                    </div>
                </div>  
            </div>
        </li>
    `,
}