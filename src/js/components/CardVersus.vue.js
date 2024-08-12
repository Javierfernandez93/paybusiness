import ListItemInline from './ListItemInline.vue.js?v=1.0.2'

export default {
    components : {
        ListItemInline
    },
    props: ['title','sells','income','commissions','fee','margin','myClass'],
    template : `
        <div class="card card-body" :class="myClass">
            <ul class="list-group list-group-flush">
                <ListItemInline title="Paquete" :value="title"/>
                <ListItemInline title="Ventas" :value="sells"/>
                <ListItemInline :showInfo="false" type="money" title="Ingresado" :value="income"/>
                <ListItemInline :showInfo="false" type="money" title="Comisiones" :value="commissions"/>
                <ListItemInline :showInfo="false" type="money" title="Fee" :value="fee"/>
                <ListItemInline :showInfo="true" type="money" title="Utilidad" :value="margin"/>
            </ul>
        </div>
    `,
}