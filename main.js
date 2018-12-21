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
      </div>
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">No reviews yet.</p>
            <ul v-else>
                <li v-for="review in reviews">
                    <p>Name: {{ review.name }}</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Rating: {{ review.rating }}</p>
                </li>
            </ul>

      <product-review @reviewed-submit="addReview"/>
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
                    variantId: 2234,
                    variantColor: "Green",
                    variantImage: "img/vmSocks-green-onWhite.jpg",
                    variantInventory: 9,
                },
                {
                    variantId: 2235,
                    variantColor: "Blue",
                    variantImage: "img/vmSocks-blue-onWhite.jpg",
                    variantInventory: 0,
                }
            ],
            sizes: ["S", "M", "L", "XL"],
            cart: 0,
            reviews: [],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name"> 
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <p for="recommended">Would you recommend this product?</p>
        <label>
          Yes
          <input type="radio" value="Yes" v-model="recommend"/>
        </label>
        <label>
          No
          <input type="radio" value="No" v-model="recommend"/>
        </label>
      
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                this.$emit('reviewed-submit', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if (!this.name) this.errors.push("Name required.")
                if (!this.review) this.errors.push("Review required.")
                if (!this.rating) this.errors.push("Rating required.")
                if (!this.recommend) this.errors.push("Recommend required.")
            }

        },
    }
})

var app = new Vue({
    el: "#app",
    data: {
        premium: false,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeCart(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        },
    }
});