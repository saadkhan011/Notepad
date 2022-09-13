const userid = (state = "", action)=>{
    if (action.type === "setid") {
        return action.payload
    }
    else{
        return state;
    }
}

export default userid;