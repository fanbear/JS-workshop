import { getData } from './getData.js';

    const cartList = [
        {
            id: 'idd001',
            conunt: 3
        },
        {
            id: 'idd002',
            conunt: 1
        },
        {
            id: 'idd003',
            conunt: 2
        }
    ];


export const loadData = () => {

    if (location.hash) {
        getData.item(location.hash.substring(1), (data) => console.log(data));
    }

    if (location.pathname.includes('cart')) {
        getData.cart(cartList, (data) => console.log(data));
    }
};