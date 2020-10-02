import { getData } from "./getData.js";
import { getLocalStorage, setLocalStorage } from "./storage.js";


const productList = getLocalStorage('cartlist');//данные хранилища

const generateCartPage = data => {
    data.forEach(element => {
        console.log(element.name);
    });
};


if (location.pathname.includes('cart')) {
    getData.cart(productList, (data) => generateCartPage(data));
}

export default generateCartPage;