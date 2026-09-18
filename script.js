const productsDiv = document.getElementById("products")
const cartItems = document.getElementById("cartItems")
const total = document.getElementById("total")
const cartTitle =document.getElementById("cartTitle")




const products = [
    {
        id: 1,
        name: "laptop",
        price: 50000
    },

    {
        id: 2,
        name: "mobile",
        price: 20000
    },

    {
        id: 3,
        name: "Grocery",
        price: 100
    }
]

let cart = [];
function displayproducts() {

    productsDiv.innerHTML = "";

    products.forEach((product) => {

        const productcard = document.createElement("div")
        productcard.classList.add("product-card")

        productcard.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button> Add To Cart </button>


    
    `;





        const addBtn = productcard.querySelector("button")
        addBtn.addEventListener("click", () => {


            const existingProduct = cart.find(item => item.id === product.id)

            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    ...product,
                    quantity: 1
                })
            }

            displaycart();
        })

        productsDiv.appendChild(productcard);

    });

}

function displaycart() {
    cartItems.innerHTML = "";

    let totalPrice = 0;
    console.log(totalPrice)

    cart.forEach((item, index) => {

        totalPrice += item.price * item.quantity

        const cartItem = document.createElement("div")
        cartItem.classList.add("cart-item")

        cartItem.innerHTML = `
       <div>
       <span>${item.name}  <br>
        ₹${item.price} <br>

        <button class="minus">-</button>
         Qty: ${item.quantity}
        </span>
        
          <button class="plus">+</button>
        </div>
            <button class="remove">Remove</button>     
       `


        const plusBtn = cartItem.querySelector(".plus")

        plusBtn.addEventListener("click", () => {
            item.quantity++

            saveCart()

            displaycart()

        })

        const minusBtn = cartItem.querySelector(".minus")

        minusBtn.addEventListener("click", () => {

            if (item.quantity > 1) {
                item.quantity--;
            }
            else {
                cart.splice(index, 1)
            }
            saveCart()
            displaycart()
        })



        const removeBtn = cartItem.querySelector(".remove")


        removeBtn.addEventListener("click", () => {

            cart.splice(index, 1)
            displaycart()
        })

        cartItems.appendChild(cartItem)




    })

    let cartCount =0;
    cart.forEach(item=>{
        cartCount += item.quantity
    })
cartTitle.textContent=`cart (${cartCount})`

    total.textContent = "Total :₹" + totalPrice;




}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function loadCart() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

}



loadCart()


displaycart()
displayproducts()



