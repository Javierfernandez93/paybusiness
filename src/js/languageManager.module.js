class LanguageManager {
    constructor() {
    }
    async getLanguage(code) {
        const res = await axios.get(`../../src/languages/${code}.json?v=1.4.3`)

        return res.data ?? {}
    }
}

export default LanguageManager 