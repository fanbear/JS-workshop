const PARAM = {
    cat: 'category',
    subcat: 'subcategory',
    search: ['name', 'description', 'subcategory']
}

export const getData = {

    url: 'database/dataBase.json',
    get(process) {  //ф-я для получения данных от сервера
        fetch(this.url) //обращаемся к серверу по урл
            .then((response) => response.json()) //возвращаем полученые данные
            .then((process)) //пишем в переданы аргумент
    },
    // пишем данные списка желаных с localStorage
    wishList(list, callback) {
        this.get((data) => {
            const result = data.filter((item) => list.includes(item.id));
            callback(result);
        })
    },
    item(value, callback) {
        this.get((data) => {
            const result = data.find(item => item.id === value);
            callback(result);
        })
    },
    // пишемданные корзины с localStorage
    cart(list, callback) {
        this.get((data) => {
            const result = data.filter(item => list
                .some(obj => obj.id === item.id))
            callback(result);
        })
    },
    // пишем данные категорий
    category(prop, value, callback) {
        this.get((data) => {
            const result = data.filter(item => 
                item[PARAM[prop]].toLowerCase() === value.toLowerCase())
            callback(result);
        })
    },
    // пишем данные поиска
    search(value, callback) {
        const notFound = {
            name: 'по вашему запросу нечего не найдено'
        }
        this.get((data) => {
            const result = data.filter(item => {
                for (const prop in item) {
                    if (PARAM.search.includes(prop) && 
                    item[prop.toLowerCase()].includes(value.toLowerCase())) {
                        return true;
                    }
                }
            })
            callback(result);
        })
    },
    // пишем данные главного меню
    catalog(callback) {
        this.get((data) => {
            const result = data.map((item) => 
            item.category).filter((e,i,a) => a.indexOf(e) == i);
            callback(result);
        })
    },
    // пишем данные подменю по категориям
    subCatalog(value, callback) {
        this.get((data) => {
            const result = data
            .filter(item => item.category === value)
            .reduce((arr, item) => {
                if (!arr.includes(item.subcategory)){
                    arr.push(item.subcategory);
                }
                return arr;
            }, [])
            callback(result)
        })
    }
}

getData.get();