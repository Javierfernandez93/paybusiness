export default { 
    props : ['active','icon','tooltip'],
    template : `
        <span class="h5 me-1" data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="tooltip">
            <i :class="active ? 'text-success' : 'text-muted'" class="bi" :class="icon"></i>
        </span>
    `,
}