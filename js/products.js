// products storage
window.products = {};

// sorting order initialization
var ascendingOrderOfSortingByName = true;
var ascendingOrderOfSortingByPrice = true;
var ascendingOrderOfSortingBy = {
    name: true,
    price: true
};

// Product class
function Product(name, supplierEmail, count, price, delivery) {
    this.id = Product.getNextId();
    this.name = name;
    this.supplierEmail = supplierEmail;
    this.count = count;
    this.price = +price;
    this.delivery = delivery;
}

// Product id generator
Product.getNextId = function() {
    if (!Product._id) {
        Product._id = 0;
    }
    return Product._id++;
};

Product.prototype.update = function(productData) {
    var self = this;
    if ('id' in productData) {
        self.id = productData.id;
    }
    if ('name' in productData) {
        self.name = productData.name;
    }
    if ('supplierEmail' in productData) {
        self.supplierEmail = productData.supplierEmail;
    }
    if ('count' in productData) {
        self.count = productData.count;
    }
    if ('price' in productData && isNumeric(productData.price)) {
        self.price = +productData.price;
    }
    if ('delivery' in productData) {
        self.delivery = productData.delivery;
    }
}

// initial (demo) products
var ps = [
    new Product('j', 'abc@mail.ru', 4539, 20.8, { type: 'city', value: ['Саратов', 'Санкт-Петербург'] }),
    new Product('wwwww', 'zyx@gmail.com', 23, 3, { type: 'country', value: 'Япония' }),
    new Product('qwe', 'fufuasdas@gmail.com', 123, 1, { type: '' }),
    new Product('Нефть', 'abc@mail.ru', 3, 99.89, { type: '' }),
    new Product('Газ', 'emperor@machulaz.em', 57, 1234567.89, { type: 'city', value: ['Москва'] }),
    new Product('Бокситы', 'nik.machula@yandex.ru', 1, 1000.77, { type: 'country', value: 'США' }),
    new Product('Лампы', 'nik.machula@gmail.ru', 949, 19.6, { type: 'city', value: ['Москва', 'Санкт-Петербург', 'Саратов'] }),
];

// add initial (demo) products
ps.forEach(function(product) {
    window.products[product.id] = product;
});

// test table
function fillTable(rowCount) {
    var currentRow = 0;
    while (currentRow < rowCount) {
        var ps = [
            new Product('j', 'abc@mail.ru', 4539, 20.8, { type: 'city', value: ['Саратов', 'Санкт-Петербург'] }),
            new Product('wwwww', 'zyx@gmail.com', 23, 3, { type: 'country', value: 'Япония' }),
            new Product('qwe', 'fufuasdas@gmail.com', 123, 1, { type: '' }),
            new Product('Нефть', 'abc@mail.ru', 3, 99.89, { type: '' }),
            new Product('Газ', 'emperor@machulaz.em', 57, 1234567.89, { type: 'city', value: ['Москва'] }),
            new Product('Бокситы', 'nik.machula@yandex.ru', 1, 1000.77, { type: 'country', value: 'США' }),
            new Product('Лампы', 'nik.machula@gmail.ru', 949, 19.6, { type: 'city', value: ['Москва', 'Санкт-Петербург', 'Саратов'] }),
        ];
        for (var j = 0; j < ps.length; j++) {
            currentRow++;
            if (currentRow > rowCount) {
                break;
            }
            var product = ps[j];
            window.products[product.id] = product;
        }
    }
}

fillTable(0);