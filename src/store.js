import Vue from 'vue'
import Vuex from 'vuex'
import routes from '@/utils/staticData'

Vue.use(Vuex)
const newMenu = (menu) => {
    let _menu = JSON.parse(JSON.stringify(menu));
    return _menu;
}
export default new Vuex.Store({
    state: {
        menu: null,
        menuType: "FIRSTMENU",
        routes: routes,
        allPath: ["/commodity", "/commodity/commodityList"]
    },
    mutations: {
        SETMENU(state, menu) {
            state.menu = menu;
        },
        SETALLPATH(state, allPath) {
            state.allPath = allPath;
        },
        SETMENUTYPE(state, type) {
            state.menuType != type && (state.menu = {})
            state.menuType = type;
        },
        UPDATEMENU(state, menu) {
            Object.keys(state.menu).map(r => {
                state.menu[r] = menu[r] == undefined ? state.menu[r] : menu[r];
            })
        },
        ADDMENU(state, menu) {
            !state.menu.children && Vue.set(state.menu, 'children', [])
            state.menu.children.push(newMenu(menu))
        },
        FIRSTMENU(state, menu) {
            state.menu = state.menu || [];
            state.menu.push(newMenu(menu))
        },
        SYNCHRONIZATION(state, routes) {
            state.routes = routes;
        }
    },
    actions: {
        setMenu({ commit }, menu) {
            commit('SETMENU', menu)
        },
        setAllPath({ commit }, allPath) {
            commit('SETALLPATH', allPath)
        },
        saveMenu({ commit, state }, menu) {
            commit(state.menuType, menu)
        },
        setMenuType({ commit }, type) {
            commit('SETMENUTYPE', type)
        },
        synchronization({ commit }, routes) {
            commit('SYNCHRONIZATION', routes)
        },
    }
})