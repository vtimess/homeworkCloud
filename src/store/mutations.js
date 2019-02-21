import * as types from './mutation-types'

const mutations={
    /**
     * state:当前状态树
     * v: 提交mutations时传的参数
     */
    [types.SET_TOKEN] (state, v) {
        state.token = v;
    },
    [types.SET_ID] (state, v) {
        state.id = v;
    },
    [types.SET_USER_INFO] (state,v) {
        state.userInfo = v;
    },
    [types.PUSH_FORM_ID] (state,v){
        state.formId.push(v)
    },
    [types.REMOVE_ALL_FORM_ID] (state){
        // state.formId.splice(0,state.formId.length)
        state.formId=[];
    },
    [types.REMOVE_TOKEN] (state){
        // state.formId.splice(0,state.formId.length)
        state.token="";
    },

}

export default mutations