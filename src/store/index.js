import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state:{
    token:''
    },
    mutations:{
        Login(state, token) {
            state.token = token
        },
        USERNAME(state, userName) {
            state.userName = userName
        }
    }
})