const setuserId = (num)=>{
    return {
        type: "setid",
        payload: num
    } 
}
const setflag = (boolean)=>{
    return {
        type: "setflag",
        payload: boolean
    }
}
export { setuserId, setflag };