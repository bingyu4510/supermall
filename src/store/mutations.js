export default {
    //这里用来定义方法,state是默认传值,mutations目的是修改state中数据的状态，每个方法尽可能完成的事情比较单一
    addCounter(state, oldProduct) {
        oldProduct.count++
    },
    addToCart(state, payload) {
        state.cartList.push(payload);
        payload.count = 1;
        payload.checked = true;
    }
}