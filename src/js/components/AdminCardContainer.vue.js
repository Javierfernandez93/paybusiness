import { LoaderViewer } from "../loaderViewer.vue.js";
import BackButton from "./BackButton.vue.js";

const AdminCardContainer = {
    props: ['busy'],
    components: {
        BackButton,
        LoaderViewer,
    },
    template: `
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-1 col-xl-auto">
                                <BackButton/>
                            </div>
                            <div class="col-11 col-xl-auto">
                                <slot name="header" />
                            </div>
                        </div>
                    </div>
                    <LoaderViewer :busy="busy" />
                    <div class="card-body">
                        <slot v-if="!busy" />
                    </div>
                </div>
            </div>
        </div> 
    `,
};

export default AdminCardContainer;