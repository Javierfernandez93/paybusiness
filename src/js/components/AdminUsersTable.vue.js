import AdminUsersTableRow from './AdminUsersTableRow.vue.js';
import AdminUsersTableHeaderCell from './AdminUsersTableHeaderCell.vue.js';

const AdminUsersTable = {
    props: ['sortByColumn', 'sortOrder', 'users','filterQuery'],
    emits: [ 'onChangeBusyStatus', 'onDeleteUser', 'onSort', 'openCanvas' ],
    components: {
        Row: AdminUsersTableRow,
        HeaderCell: AdminUsersTableHeaderCell,
    },
    data() {
        return {
        }
    },
    methods: {
        changeBusyStatus(newStatus){
            this.$emit('onChangeBusyStatus', newStatus);
        },
        deleteUser(userId){
            this.$emit('onDeleteUser', userId);
        },
        openCanvas(user){
            this.$emit('openCanvas', user);
        },
        orderBy(columnName) {
            return this.sortByColumn === columnName ? this.sortOrder : null
        },
        onSortBy(column, order) {
            this.$emit('onSort', column, order);
        },
    },
    template: `
        <div v-if="users?.length && campaigns?.length" class="card-body px-0 pt-0 pb-2">
            <div class="table-responsive-sm p-0">
                <table class="table table-hover mb-0">
                    <thead class="bg-white th-sticky">
                        <tr>
                            <HeaderCell @onClick="onSortBy" column="company_id" :order="orderBy('company_id')">ID</HeaderCell>
                            <HeaderCell @onClick="onSortBy" column="names" :order="orderBy('names')">Usuario</HeaderCell>
                            <HeaderCell @onClick="onSortBy" column="" :order="">Activo</HeaderCell>
                            <HeaderCell @onClick="onSortBy" column="" :order="null">Productos</HeaderCell>
                            <HeaderCell @onClick="onSortBy" column="" :order="null">Cuentas de Trading</HeaderCell>
                            <HeaderCell v-if="campaigns.length > 1" @onClick="onSortBy" column="campaign" :order="orderBy('campaign')">Campaign</HeaderCell>
                            <HeaderCell @onClick="onSortBy" column="" :order="null">Atributos</HeaderCell>
                            <HeaderCell @onClick="onSortBy" column="signup_date" :order="orderBy('signup_date')">Miembro desde</HeaderCell>
                            <HeaderCell>Opciones</HeaderCell>
                        </tr>
                    </thead>
                    <tbody>
                        <Row v-for="user in users"
                            :settings="settingsFor(user.campaign)"
                            :user="user"
                            @onChangeBusyStatus="changeBusyStatus"
                            @onDeleteUser="deleteUser"
                            @openCanvas="openCanvas"
                            :showCampaignColumn="campaigns.length > 1" />
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else-if="users == false" class="card-body">
            <div class="alert alert-dark text-white mb-0 text-center">
                <strong>Importante</strong>
                <div>No tenemos resultados para el filtro <strong>{{filterQuery}}</strong></div>
            </div>
        </div>
    `,
};

export default AdminUsersTable;