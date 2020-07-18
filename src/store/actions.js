export default {
    addCart(content, payload) {
        return new Promise((resolve, reject) => {
            // state.cartList.push(payload)
            var oldProduct = null;
            for (let item of content.state.cartList) {
                if (payload.iid === item.iid) { //判断是否有这个新的pay
                    oldProduct = item //如果数组中已经存在，赋值给oldProduct
                }
            }
            if (oldProduct != null) {
                content.commit('addCounter', oldProduct)
                resolve('当前数量加一')
            } else { //没有的话，将pay添加到数组中，设置count初始化值为1
                content.commit('addToCart', payload)
                resolve('加入到购物车')
            }
        })
    }
}