import { getLocalStorage, setLocalStorage } from "./storage.js";




const userData = {
    wishlistData: getLocalStorage('wishlist'),

    get wishList() { /// отдает данные
        return this.wishlistData;
    },
    set wishList(id) { /// записывает данные
        if (this.wishlistData.includes(id)) {
            const index = this.wishList.indexOf(id);
            this.wishlistData.splice(index, 1);
        } else {
            this.wishlistData.push(id);
        }
        setLocalStorage('wishlist', this.wishlistData);
    },

    cartListData: getLocalStorage('cart'),

    get cartList() {
        return this.cartListData;
    },

    set cartList(id) {
        let obj = this.cartListData.find(item => item.id === id)
        if (obj) {
            obj.count++
        } else {
            obj = {
                id,
                count: 1,
            };
            this.cartListData.push(obj);
        }
        setLocalStorage('cartlist', this.cartListData);
    }
};

export default userData;