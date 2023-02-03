let cartIcon = document.getElementById('cart-icon'),
    cart = document.querySelector('.cart'),
    closeCart = document.querySelector('#close-cart'),
    shopContent = document.querySelector('.shop-content'),
    sectionTitle = document.querySelector('.section-title'),
    productBox = document.querySelectorAll('.product-box');

cartIcon.addEventListener('click', () => {
    cart.classList.add('active');
    shopContent.classList.add('activeShop');
    sectionTitle.classList.add('activeTitle');
    productBox.forEach((e) => {
        e.classList.add('activeBox')
    })
})
closeCart.addEventListener('click', () => {
    cart.classList.remove('active');
    shopContent.classList.remove('activeShop');
    sectionTitle.classList.remove('activeTitle');
    productBox.forEach((e) => {
        e.classList.remove('activeBox')
    })
})

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let removeCartBtns = document.getElementsByClassName('cart-remove');
    for (let i = 0; i < removeCartBtns.length; i++) {
        let btn = removeCartBtns[i];
        btn.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged)
    }
    let addCart = document.getElementsByClassName('add-cart')
    for (let index = 0; index < addCart.length; index++) {
        const element = addCart[index];
        element.addEventListener('click', addCartClicked)
    }
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyBtnClicked);
}

function buyBtnClicked() {
    alert('Покупка сделено!')
    let buyed = 'Покупка прошло!';
    let utterance = new SpeechSynthesisUtterance(buyed);
    speechSynthesis.speak(utterance);
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal()
}

function removeCartItem(event) {
    let btnsClicked = event.target
    btnsClicked.parentElement.remove()
    updatetotal()
}

function addCartClicked(event) {
    let btn = event.target
    let shopProduct = btn.parentElement;
    let title = shopProduct.getElementsByClassName('product-title')[0].innerHTML;
    let price = shopProduct.getElementsByClassName('price')[0].innerHTML;
    let productImg = shopProduct.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg)
    updatetotal();
}
function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box')
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerHTML == title) {
            alert('You have already add this item to cart')
            return;
        }
    }

    let cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <i class="fas fa-trash cart-remove"></i>
`
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox)
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}

function quantityChanged(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal()

}

function updatetotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = document.getElementsByClassName('cart-quantity')[0];
        let quantity = quantityElement.value;
        let price = parseFloat(priceElement.innerHTML.replace('$', ""))
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100;




    document.getElementsByClassName('total-price')[0].innerHTML = '$' + total
}
