import { getData } from "./getData.js";

// const wishList = ['idd005', 'idd003', 'idd009', 'idd010'];
const wishList = [];

const generateGoodsPage = () => {

    //получаем селекторы
    const mainHeader = document.querySelector('.main-header'); 
    const goodsList = document.querySelector('.goods-list');

    //генерируем карточки товаров
    const generateCards = (data) => {
        goodsList.textContent = ''; //очистка всех карточек

        //если поиск нечего не нашел
        if (data.length === 0) {
            goodsList.insertAdjacentHTML('afterbegin', "По вашему запросу нечего не найдено")
        }
        //добавление всех данных из базы в строку
        data.forEach(item => {
            console.log(item)
            goodsList.insertAdjacentHTML('afterbegin', `
                <li class="goods-list__item">
                    <a class="goods-item__link" href="card.html#${item.id}">
                        <article class="goods-item">
                            <div class="goods-item__img">
                                <img src="${item.img[0]}"
                                data-second-image="${item.img[1]}">
                            </div>
                            <p class="goods-item__new">Новинка</p>
                            <h3 class="goods-item__header">ФАБЛЕР БЬЁРН</h3>
                            <p class="goods-item__description">${item.name}</p>
                            <p class="goods-item__price">
                                <span class="goods-item__price-value">${item.price}</span>
                                <span class="goods-item__currency"> ₽</span>
                            </p>
                            <button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="idd001"></button>
                        </article>
                    </a>
                </li>
            `)
        });
    };

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].substring(1);
        const value = search.split('=')[1];

        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
        } else if (prop === 'wishlist') {
            if (wishList.length === 0) {
                mainHeader.textContent = 'Список желаний пуст';
                goodsList.textContent = '';
            } else {
                getData.wishList(wishList, generateCards);
                mainHeader.textContent = `Список желаний`;
            }
        } else {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }

    }
};

export default generateGoodsPage;