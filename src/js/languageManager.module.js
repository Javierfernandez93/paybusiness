class LanguageManager {
    constructor() {
    }
    async getLanguage(code) {
        const res = await axios.get(`../../src/languages/${code}.json?v=1.0.2`)

        return res.data ?? {}
    }
}

export default LanguageManager 