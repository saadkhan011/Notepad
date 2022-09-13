const flag =  (state = true, action)=>{
    if(action.type === "setflag"){
        return action.payload
    }
    else{
        return state;
    }
}
export default flag;