module.exports = () => {
  let identity  = new Date().getTime();
  return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (identity + Math.random()*16)%16 | 0;
    identity = Math.floor(identity/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
}
