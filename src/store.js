import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        menu: null,
        menuType: "FIRSTMENU"
    },
    mutations: {
        SETMENU(state, menu) {
            state.menu = menu;
        },
        SETMENUTYPE(state, type) {
            state.menuType != type && (state.menu = {})
            state.menuType = type;
        },
        UPDATEMENU(state, menu) {
            Object.keys(state.menu).map(r => {
                state.menu[r] = menu[r] || state.menu[r];
            })
        },
        ADDMENU(state, menu) {
            state.menu.children = state.menu.children || [];
            state.menu.children.push(menu)
        },
        FIRSTMENU(state, menu) {
            state.menu = state.menu || [];
            state.menu.push(menu)
        }
    },
    actions: {
        setMenu({ commit }, menu) {
            commit('SETMENU', menu)
        },
        saveMenu({ commit, state }, menu) {

            commit(state.menuType, menu)
        },
        setMenuType({ commit }, type) {
            commit('SETMENUTYPE', type)
        }
    }
})