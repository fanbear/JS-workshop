import { getData } from "./getData.js";
import userData from "./userData.js";

const COUNTER = 3;

const generateGoodsPage = () => {

    //получаем селекторы
    const mainHeader = document.querySelector('.main-header');

    //генерируем карточки товаров
    const generateCards = (data) => {
        
        const goodsList = document.querySelector('.goods-list');

        goodsList.textContent = ''; //очистка всех карточек

        //если поиск нечего не нашел
        if (data.length === 0) {
            goodsList.insertAdjacentHTML('afterbegin', "По вашему запросу нечего не найдено")
        }
        //добавление всех данных из базы в строку
        data.forEach(item => {
            const { name, count, description, id, img, price} = item;

            goodsList.insertAdjacentHTML('afterbegin', `
                <li class="goods-list__item">
                    <a class="goods-item__link" href="card.html#${id}">
                        <article class="goods-item">
                            <div class="goods-item__img">
                                <img src=${img[0]}
                                ${img[1] ? `data-second-image=${img[1]}` : ``}>
                            </div>
                            ${count > COUNTER ? `<p class="goods-item__new">Новинка</p>` : ``}
                            ${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ``}
                            <h3 class="goods-item__header">${name}</h3>
                            <p class="goods-item__description">${description}</p>
                            <p class="goods-item__price">
                                <span class="goods-item__price-value">${price}</span>
                                <span class="goods-item__currency"> ₽</span>
                            </p>
                            ${count ? 
                                `<button class="btn btn-add-card" 
                                aria-label="Добравить в корзину" 
                                data-idd=${id}></button>` : 
                                ``
                            }
                        </article>
                    </a>
                </li>
            `);
        });
        goodsList.addEventListener('click', (e) => {
            const btnAddCard = e.target.closest('.btn-add-card');
    
            if (btnAddCard) {
                e.preventDefault();
                userData.cartList = btnAddCard.dataset.idd;
            }
            
        })
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
                getData.wishList(userData.wishList, generateCards);
                mainHeader.textContent = `Список желаний`;
            }
        } else {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }

    }

};

export default generateGoodsPage;