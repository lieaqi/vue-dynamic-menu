import Vue from 'vue'
import Vuex from 'vuex'
import { setToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: null,
    },
    mutations: {
        SETTOKEN: (state, token) => {
            state.token = token
        },
    },
    actions: {
        setToken({ commit }, token) {
            commit('SETTOKEN', token)
            setToken(token)
        },
        loginOut({ commit }) {
            commit('SETTOKEN', null)
            removeToken()
            let url = location.origin + "/#/login"
            location.href = url
        },
    }
})