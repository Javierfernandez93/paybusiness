export default { 
    props : ['currentPage','totalPages'],
    emits : ['goToPage'],
    methods : {
        goToPagePrevius(){
            if(this.currentPage > 1)
            {
                this.goToPage(this.currentPage - 1)
            }
        },
        goToPageNext(){ 
            if(this.currentPage < this.totalPages)
            {

                this.goToPage(this.currentPage + 1)
            }
        },
        goToPage(page){
            this.$emit('goToPage',page);
        }
    },
    template : `
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item">
                    <button class="page-link" @click="goToPagePrevius()">
                        <i class="bi bi-chevron-bar-left"></i>
                    </button>
                </li>

                <li class="page-item" v-for="page in totalPages">
                    <button class="page-link" :class="currentPage == page ? 'active text-white' : ''" @click="goToPage(page)">{{page}}</button>
                </li>
                
                <li class="page-item">
                    <button class="page-link" @click="goToPageNext()">
                        <i class="bi bi-chevron-bar-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    `,
}