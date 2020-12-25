const cookieparser = process.server ? require('cookieparser') : undefined


export const state = () => ({
    quotes: [{
        id: '1', body: 'Quote of the day.', author: 'John Snow'
    }]
})

export const getter = {
    quotes: state => state.quotes
}

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        try {
            const parsed = cookieparser.parse(req.headers.cookie)
            console.log('nuxt server init worked in auth', JSON.parse(parsed.auth).token);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': JSON.parse(parsed.auth).token
                }
            }
            await dispatch('auth/me', { config })
        }
        catch (e) {
            console.log('----------- error nuxt server init', e);
        }



    },
}
