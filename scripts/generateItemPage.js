import { getData} from './getData.js';
import userData from './userData.js';

const NEW_COUNT_ITEM = 4;

const generateItemPage = () => {
    
    const renderCard = ({name: itemName, description, price, category, count, id, img, subcategory}) => {
        const goodImages = document.querySelector('.good-images');
        const goodItemNew = document.querySelector('.good-item__new');
        const goodItemHeader = document.querySelector('.good-item__header');
        const goodItemDescription = document.querySelector('.good-item__description');
        const goodItemEmpty = document.querySelector('.good-item__empty');
        const goodItemPriceValue = document.querySelector('.good-item__price-value');
        const btnGood = document.querySelector('.btn-good');
        const btnAddWishlist = document.querySelector('.btn-add-wishlist');
        const breadcrumbLink = document.querySelectorAll('.breadcrumb__link');

        goodImages.textContent = '';
        goodItemHeader.textContent = itemName;
        goodItemDescription.textContent = description;
        goodItemPriceValue.textContent = price
        btnGood.dataset.idd = id;
        btnAddWishlist.dataset.idd = id;

        breadcrumbLink[0].textContent = category;
        breadcrumbLink[0].href = `goods.html?cat=${category}`
        breadcrumbLink[1].textContent = subcategory;
        breadcrumbLink[1].href = `goods.html?subcat=${subcategory}`
        breadcrumbLink[2].textContent = itemName;

        img.forEach( item => {
            goodImages.insertAdjacentHTML('afterbegin', `
            <div class="good-image__item">
					<img src=${item} alt="${name} - ${description}">
				</div>
            `)
        })
        
        if (count >= NEW_COUNT_ITEM) {
            goodItemNew.style.display = 'block';
        } else if (!count) {
            goodItemEmpty.style.display = 'block';
            btnGood.style.display = 'none';
        }

        const checkWishlist = () => {
            if (userData.wishList.includes(id)) { /// геттер
                btnAddWishlist.classList.add('contains-wishlist');
            } else {
                btnAddWishlist.classList.remove('contains-wishlist');
            }
        };

        btnAddWishlist.addEventListener('click', () => {
            userData.wishList = id; //сеттер
            checkWishlist();
        });

        btnGood.addEventListener('click', () => {
            userData.cartList = id;
        })
        checkWishlist(); ///добавление и удаления класса для кнопки

    };
    
    if (location.hash && location.pathname.includes('card')) {
        getData.item(location.hash.substring(1), (data) => renderCard(data));
    }
};

export default generateItemPage;