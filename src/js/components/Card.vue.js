export default {
    props: ['title','value','myClass'],
    template : `
        <div class="card card-body" :class="myClass">
            <div class="row align-items-center">
                <div class="col-8">
                    <div class="text-muted text-sm">
                        {{title}}
                    </div>
                    <div class="h4">
                        {{value}}
                    </div>
                </div>
                <div class="col-4 text-end">
                    <div class="icon icon-shape bg-dark shadow text-center border-radius-md"><i class="ni ni-money-coins text-lg opacity-10" aria-hidden="true"></i></div>
                </div>
            </div>
        </div>
    `,
}