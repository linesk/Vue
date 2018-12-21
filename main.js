Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,

        }
    },
    template: `
    <div class="product">
      <div class="product-image"><img v-bind:src="image" /></div>

      <div class="product-info">
        <h1>{{ product }}</h1>
        <div>{{ description }}</div>
        <a :href="url">Link</a>
        <p v-if="inStock>10">In Stock!</p>
        <p v-else-if="inStock>0">Almost Gone!</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>
        <span v-show="onSale">{{ sale }}</span>

        <product-details :details="details" />
        
        <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box" :style="{ backgroundColor: variant.variantColor }"
          @mouseover="updateProduct(index)">
        </div>
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>
        <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>
        <button v-on:click="removeFromCart">Remove</button>
        <div class="cart">
          <p>Cart: {{ cart }}</p>
        </div>
      </div>
    </div>
    `,
    data() {
        return {
            Bands: "Supersuck",
            product: "Sock",
            description: "Super Sock, You're able to fly with them",
            url: "#",
            selectedVariant: 0,
            onSale: false,
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
        }
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
        },
        sale() {
            return this.Bands + ' ' + this.product + ' ' + 'On Sale! Buy Now'
        },
        shipping() {
            if (this.premium) {
                return 'Free'
            }
            return '80 baht'
        },
    }
})

Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            require: true,
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `,

})

var app = new Vue({
    el: "#app",
    data: {
        premium: false,
    }
});