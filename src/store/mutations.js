import * as types from './mutation-types'
import store from '../store/'
import state from './state'

const mutations={
    /**
     * state:当前状态树
     * v: 提交mutations时传的参数
     */
    [types.SET_TOKEN] (state, v) {
        state.token = v;
    },
    [types.SET_TABINDEX] (state,v){
        state.tabIndex = v;
    },
    [types.SET_STATUS] (state, v) {
        state.status = v;
    },
    [types.SET_ID] (state, v) {
        state.id = v;
    },
    [types.SET_USER_INFO] (state,v) {
        state.userInfo = v;
    },
    [types.PUSH_FORM_ID] (state,v){
        state.formId.push(v);
    },
    [types.REMOVE_TABINDEX] (state){
        state.tabIndex = "";
    },
    [types.REMOVE_ALL_FORM_ID] (state){
        // state.formId.splice(0,state.formId.length)
        state.formId=[];
    },
    [types.REMOVE_TOKEN] (state){
        state.token="";
    },
    [types.REMOVE_STATUS] (state){
        state.status="";
    },
    [types.CLEAR_ALL] (){
        store.replaceState=(state);
    },
    [types.SET_ERROR_IMAGE](state,v){
        state.errorImage=v;
    },
    [types.SET_CURRENTPAGE](state,v){
        state.currentPage=v;
    },
    [types.REMOVE_CURRENTPAGE](state){
        state.currentPage="";
    }

}

export default mutations