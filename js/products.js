window.products = {};

var ascendingOrderOfSortingByName = true;
var ascendingOrderOfSortingByPrice = true;

function Product(name, supplierEmail, count, price, delivery) {
    this.id = Product.getNextId();
    this.name = name;
    this.supplierEmail = supplierEmail;
    this.count = count;
    this.price = price;
    this.delivery = delivery;
}

Product.getNextId = function() {
    if (!Product._id) {
        Product._id = 0;
    }
    return Product._id++;
};

var ps = [
    new Product('ass', 'abc@mail.ru', 4539, 20.8, { type: 'city', value: ['Саратов', 'Санкт-Петербург'] }),
    new Product('wwwww', 'zyx@gmail.com', 23, 3, { type: 'country', value: 'Япония' }),
    new Product('qwe', 'fufuasdas@gmail.com', 123, 1, { type: '' }),
    new Product('Нефть', 'abc@mail.ru', 3, 99.89, { type: '' }),
    new Product('Газ', 'emperor@machulaz.em', 57, 1234567.89, { type: 'city', value: ['Москва'] }),
    new Product('Бокситы', 'nik.machula@yandex.ru', 1, 1000.77, { type: 'country', value: 'США' }),
    new Product('Лампы', 'nik.machula@gmail.ru', 949, 19.6, { type: 'city', value: ['Москва', 'Санкт-Петербург', 'Саратов'] }),
    // new Product('Лампы', 'nik.machula@yandex.ru', 7, '$1,000.77', { type: 'city', value: ['Саратов', 'Санкт-Петербург'] }),
    // new Product('Лампы', 'info@myinstaspace.ru', 28, '$1,000', { type: 'city', value: ['Москва', 'Санкт-Петербург'] }),
    // new Product('Лампы', 'nik.machula@gmail.ru', 949, '$862', { type: 'city', value: ['Москва', 'Санкт-Петербург', 'Саратов'] }),
    // new Product('Книги', 'emperor@machulaz.em', 56, '$1,234,567', { type: '' }),
    // new Product('Зерно', 'emperor@machulaz.em', 57, '$31.02', { type: '' }),
    // new Product('Столы', 'emperor@machulaz.em', 10, '$398,932', { type: '' }),
    // new Product('Стулья', 'emperor@machulaz.em', 22225, '$555.55', { type: '' }),
    // new Product('Диваны', 'emperor@machulaz.em', 32954, '$198.99', { type: '' }),
    // new Product('Диваны 1', 'emperor@machulaz.em', 32954, '$198.99', { type: '' }),
    // new Product('Диваны 2', 'emperor@machulaz.em', 32954, '$200', { type: '' }),
    // new Product('Диваны 3', 'emperor@machulaz.em', 32954, '$198.99', { type: '' }),
    // new Product('Диваны 4', 'emperor@machulaz.em', 32954, '$0', { type: '' }),
    // new Product('Диваны 5', 'emperor@machulaz.em', 32954, '$0', { type: '' }),
    // new Product('', 'abc@mail.ru', 3, '', { type: '' })
];
ps.forEach(function(product) {
    window.products[product.id] = product;
});

// window.products.push(new Product('2Нефть', 'emperor@machulaz.em', 3, 999, { type: '' }));
// window.products.push(new Product('1Газ 11', 'emperor@machulaz.em', 57, 1234567, { type: '' }));