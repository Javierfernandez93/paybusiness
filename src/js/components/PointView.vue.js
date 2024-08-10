export default {
    props : ['points','title'],
    template : `
        <div class="row justify-content-center align-items-center">
            <div class="col-12 col-xl">
                <div class="text-white text-xs">
                    {{title}}
                </div>
                <div class="h3 text-white">
                    {{points.numberFormat(0)}}
                </div>
            </div>
        </div>
    `,
}