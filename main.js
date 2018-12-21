var app = new Vue({
    el: "#app",
    data: {
        product: "Sock",
        description: "Super Sock, You're able to fly with them",
        image: "img/vmSocks-green-onWhite.jpg",
        url: "#",
        inventory: 4,
        onsale: true,
        details: ["80% Cotton", "20% polyester", "Gender-Natural"],
        variants: [{
                variantsId: 2234,
                variantColor: "Green",
                variantImage: "img/vmSocks-green-onWhite.jpg"
            },
            {
                variantsId: 2235,
                variantColor: "Blue",
                variantImage: "img/vmSocks-blue-onWhite.jpg"
            }
        ],
        sizes: ["S", "M", "L", "XL"],
        cart: 0
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(variantImage) {
            this.image = variantImage;
        },
        removeFromCart() {
            this.cart -= 1;
        }
    }
});