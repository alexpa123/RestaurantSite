var mealCart = [];
var cartCopy = [];

var Item = function(name, price, count) {
    this.name = name,
    this.price = price,
    this.count = count
};

function addMealToCart(name, price, count) {
    for (var i in mealCart) {    
        if (mealCart[i].name === name) {
            mealCart[i].count += count;
            saveMealCart();
            return;
        }
    }
    var addedMeal = new Item (name, price, count);
    mealCart.push(addedMeal);
    saveMealCart();
}

function removeMealFromCart(name) {
    var deletedItem = document.getElementsByClassName('deleteItem');
    deletedItem.addEventListener('click', function(){
        for (var i in mealCart) {   
            if (mealCart[i].name === name) {
                mealCart[i].count --;
                if (mealCart[i].count === 0) {
                    mealCart.splice(i, 1);
                }
                break;
            }
            saveMealCart();
        }
    });
}

function clearMealCart() {
    mealCart = [];
    cartCopy = [];
    localStorage.clear();
    saveMealCart();
    document.getElementById('displayCart').innerHTML=
    '';
}

function countMealCart() {
    var totalCount = 0;
    for (var i in mealCart) {
       totalCount += mealCart[i].count;
    }
    return totalCount;
}

//creating copy of of the cart so it does not interfere with any future changes. var p in item is looping through the properties of each object
function listMealCart() {
    var cartCopy = [];
    for (var i in mealCart) {
        var item = mealCart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        cartCopy.push(itemCopy);
    }
    return cartCopy;
}

function displayCartCopy() {
    loadCart();
    var mealCartCopy = listMealCart();
    document.getElementById('displayCart').innerHTML =  '';
    for (var i in mealCartCopy) {
        console.log(mealCartCopy[i]);
        document.getElementById('displayCart').innerHTML += 
        '<li>' + mealCartCopy[i].count + ' orders of ' + mealCartCopy[i].name
        + ' ' + mealCartCopy[i].count * mealCartCopy[i].price + '</li>' +
        '<button type="button" class="btn btn-danger deleteItem">Delete</button>';
    }
}

function totalCostMealCart() {
    var totalAmount = 0;
    for (var i in mealCart) {
       totalAmount += mealCart[i].price * mealCart[i].count;
    }
    //console.log(totalAmount);
    saveMealCart();
    document.getElementById('total').innerHTML ='Thank you for ordering ahead. Your total is $' + totalAmount.toFixed(2);
}

function saveMealCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(mealCart));
}

function loadCart() {
    mealCart = JSON.parse(localStorage.getItem('shoppingCart'));
}