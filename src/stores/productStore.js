import { defineStore } from 'pinia';

export const useProductStore = defineStore('productStore', {
    state: () => ({
        products: [
            { id: 1, category: 'notebooks', name: 'Ноутбук Acer', description: 'Опис ноутбука Acer', price: 15000, image: 'public/png-transparent-laptop-acer-aspire-intel-core-i5-laptop-electronics-netbook-computer.png' },
            { id: 2, category: 'notebooks', name: 'Ноутбук Dell', description: 'Опис ноутбука Dell', price: 20000, image: 'public/422625577.png' },
            { id: 3, category: 'notebooks', name: 'Ноутбук HP', description: 'Опис ноутбука HP', price: 18000, image: 'public/w_600.png' },
            { id: 4, category: 'notebooks', name: 'Ноутбук Lenovo', description: 'Опис ноутбука Lenovo', price: 17000, image: 'public/ww_600.png' },
            { id: 5, category: 'PC', name: 'Комп\'ютер Asus', description: 'Опис ПК Asus', price: 200000, image: 'public/завантаження.png' },
            { id: 6, category: 'PC', name: 'Комп\'ютер Dell', description: 'Опис ПК Dell', price: 250000, image: 'public/imagessfd.png' },
            { id: 7, category: 'PC', name: 'Комп\'ютер HP', description: 'Опис ПК HP', price: 220000, image: 'public/1607076835.png' },
            { id: 8, category: 'PC', name: 'Комп\'ютер Lenovo', description: 'Опис ПК Lenovo', price: 210000, image: 'public/462875.png' },
            { id: 9, category: 'TV', name: 'Телевізор LG', description: 'Опис телевізора LG', price: 40000, image: 'public/1088603_middle.png' },
            { id: 10, category: 'TV', name: 'Телевізор Samsung', description: 'Опис телевізора Samsung', price: 45000, image: 'public/3752235825.png' },
            { id: 11, category: 'TV', name: 'Телевізор Sony', description: 'Опис телевізора Sony', price: 42000, image: 'public/dwwwwimages.png' },
            { id: 12, category: 'TV', name: 'Телевізор Philips', description: 'Опис телевізора Philips', price: 43000, image: 'public/4604599062_w600_h600_4604599062.png' },
            { id: 13, category: 'phones', name: 'Телефон Samsung', description: 'Опис телефону Samsung', price: 8000, image: 'public/pngtree-samsung-galaxy-s10-mockup-violet-theme-screen-png-image_996 812.png' },
            { id: 14, category: 'phones', name: 'Телефон iPhone', description: 'Опис телефону iPhone', price: 25000, image: 'public/appleimages.png' },
            { id: 15, category: 'phones', name: 'Телефон Xiaomi', description: 'Опис телефону Xiaomi', price: 12000, image: 'public/4101012625_originalnyj-smartfon-xiaomi-800x800.png' },
            { id: 16, category: 'phones', name: 'Телефон Huawei', description: 'Опис телефону Huawei', price: 15000, image: 'public/2322233135.png' },
            { id: 17, category: 'accessories', name: 'Аксесуар для телефону Go тримач', description: 'Опис аксесуара', price: 500, image: 'public/3157552114_w640_h640_go-derzhatel-dlya.png' },
            { id: 18, category: 'accessories', name: 'Чохол для телефону', description: 'Опис чохла для телефону', price: 700, image: 'public/fefeeimages.png' },
            { id: 19, category: 'accessories', name: 'Зарядний пристрій', description: 'Опис зарядного пристрою', price: 1000, image: 'public/new-kc8n9fx1tws54vq.png' },
            { id: 20, category: 'accessories', name: 'Захисне скло', description: 'Опис захисного скла', price: 300, image: 'public/zaschitnoe-steklo-6d-full-glue-dlya-iphone-12promax-black-1-1000x1000.png' },
            { id: 21, category: 'powerbanks', name: 'Повербанк Xiaomi', description: 'Опис павербанка Xiaomi', price: 1200, image: 'public/images.png' },
            { id: 22, category: 'powerbanks', name: 'Повербанк Anker', description: 'Опис павербанка Anker', price: 1500, image: 'public/397221133.png' },
            { id: 23, category: 'powerbanks', name: 'Повербанк Samsung', description: 'Опис павербанка Samsung', price: 1300, image: 'public/sssssssimages.png' },
            { id: 24, category: 'powerbanks', name: 'Повербанк Huawei', description: 'Опис павербанка Huawei', price: 1400, image: 'public/hhhhhimages.png' },
            { id: 25, category: 'headphones', name: 'Навушники JBL', description: 'Опис навушників JBL', price: 3000, image: 'public/3810287095.jpg' },
            { id: 26, category: 'headphones', name: 'Навушники Sony', description: 'Опис навушників Sony', price: 3500, image: 'public/654a9815a67b4e7bad1b2822e4d8fd9a.png' },
            { id: 27, category: 'headphones', name: 'Навушники Bose', description: 'Опис навушників Bose', price: 4000, image: 'public/bbb1410795320000_1075804.800x600.png' },
            { id: 28, category: 'headphones', name: 'Навушники Xiaomi', description: 'Опис навушників Xiaomi', price: 3800, image: 'public/xxxxxxx1b7e082413504de495fe4de98612491c.png' },
        ]
    }),
    actions: {
        addProduct(product) {
            this.products.push(product);
            localStorage.setItem('products', JSON.stringify(this.products)); // Опціонально, збереження у localStorage
        },
        updateProduct(updatedProduct) {
            const index = this.products.findIndex(p => p.id === updatedProduct.id);
            if (index !== -1) {
                this.products.splice(index, 1, updatedProduct);
                localStorage.setItem('products', JSON.stringify(this.products)); // Опціонально, збереження у localStorage
            }
        },
        deleteProduct(productId) {
            const index = this.products.findIndex(p => p.id === productId);
            if (index !== -1) {
                this.products.splice(index, 1);
                localStorage.setItem('products', JSON.stringify(this.products)); // Опціонально, збереження у localStorage
            }
        }
    },
    getters: {
        getProducts: (state) => state.products
    }
});