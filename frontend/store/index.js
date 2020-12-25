const cookieparser = process.server ? require('cookieparser') : undefined


export const state = () => ({
})

export const getter = {
}

export const actions = {
    async nuxtServerInit({ commit, dispatch }, { req }) {
        if (process.server) {
            try {
                const parsed = cookieparser.parse(req.headers.cookie)
                console.log('nuxt server init worked in auth', parsed);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': parsed.token
                    }
                }
                await dispatch('auth/me', { config })
            }
            catch (e) {
                console.log('----------- error nuxt server init', e);
            }
        }



    },
}
