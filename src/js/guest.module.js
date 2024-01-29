import { Http } from './http.module.js?v=1.0.5';

class Guest extends Http {
    constructor() {
        super();
    }
    getInvoiceByTx(data, callback) {
        return this.call('../../app/application/getInvoiceByTx.php', data, callback);
    }
}

export { Guest }