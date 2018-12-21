var app = new Vue({
    el: "#app",
    data: {
        product: "Sock",
        description: "Super Sock, You're able to fly with them",
        url: "#",
        selectedVariant: 0,
        onsale: true,
        details: ["80% Cotton", "20% polyester", "Gender-Natural"],
        variants: [{
                variantsId: 2234,
                variantColor: "Green",
                variantImage: "img/vmSocks-green-onWhite.jpg",
                variantInventory: 9,
            },
            {
                variantsId: 2235,
                variantColor: "Blue",
                variantImage: "img/vmSocks-blue-onWhite.jpg",
                variantInventory: 0,
            }
        ],
        sizes: ["S", "M", "L", "XL"],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        removeFromCart() {
            this.cart -= 1;
        }
    },
    computed: {
        inStock() {
            return this.variants[this.selectedVariant].variantInventory
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        }
    }
});