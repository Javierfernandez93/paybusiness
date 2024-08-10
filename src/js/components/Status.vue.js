const Status = {
    props: ['status'],
    template : `
        <span class="h4">
            <i :class="status ? 'bi bi-check-circle-fill text-success' : 'bi bi-x-circle-fill text-danger'"></i>
        </span>
        
    `,
}

export default Status