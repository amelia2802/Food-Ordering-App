import {menuArray} from "./data.js"

const inputForm = document.getElementById("input");
const payBtn = document.getElementById("pay")
document.addEventListener("click",function(e){
    if(e.target.dataset.add){
       addItems(e.target.dataset.add)
    }
    else if(e.target.dataset.cancel){
        cancelItems(e.target.dataset.cancel)
     }
    else if(e.target.id === "confirm-order"){
        document.getElementById("cart").style.visibility="hidden"
        document.getElementById("payment").style.display="block"
    }
    else if(e.target.id === "pay"){
        if(document.getElementById("payment_form").value!=null){
            closedPayment()
        }
        
       
    }
})

function addItems(orderId){
    const itemNo = menuArray.filter(function(item){
        return item.id === parseInt(orderId)
    })[0]
    if(itemNo.orderCount >= 0){
        itemNo.orderCount++
    }
    render()    
}

function cancelItems(orderId){
    const itemNo = menuArray.filter(function(item){
        return item.id === parseInt(orderId)
    })[0]

    if(itemNo.orderCount >= 1){
        itemNo.orderCount--
    }
    render()    
}

function closedPayment(){
    menuArray.forEach(function(menu){
        menu.orderCount = 0
    })
    document.getElementById("payment").style.visibility="hidden"
    location.reload()
    render() 
}



document.getElementById("payment_form").addEventListener("submit", function(e){
    if ( !inputForm.value ) {	
        e.preventDefault();
        return false;		
    }
})

function getMenuItem(){
    let menuItem = ""
    let cartItem = ""
    let orderprice = 0
    let totalprice = 0

    
    menuArray.forEach(function(menu){
        menuItem += `
        <div id="item" class="item">
            <img src="${menu.itemImg}" class="item-img" />
            <div class="item-inner>
                <div class="item-details" >
                    <h3 class="item-name">${menu.name}</h3>
                    <p class="item-ing">${menu.ingredients}</p>
                    <p class="price">₹ ${menu.price}</p>
                    <button type="submit" id="order" class="add" data-add="${menu.id}"> + </button>
                    <a class="item-no"> ${menu.orderCount}</a>
                    <button type="submit" id="cancel" class="sub" data-cancel="${menu.id}"> - </button>
                </div>
            </div>
        </div>
    </div>
    `
   
    orderprice = menu.orderCount * menu.price
    totalprice+=orderprice
   
    if(menu.orderCount>0){
        cartItem+=`
            <div id="cart-item" class="cart-item">
                    <p>${menu.emoji} ${menu.name}</p>
                    <p>₹ ${orderprice}</p>
            </div>
        `
    }

    })

    const totalEl = `
    <hr/>
    <div class="total-element">
      <p>Total Price: </p>
      <p>₹ ${totalprice}</p>
    </div>
    <button type="submit" id="confirm-order" class="confirm-order">Proceed to Pay</button>
    `
    document.getElementById("cart").innerHTML =`<h2 class="cart-header">Your Orders</h2>` + cartItem + totalEl

    payBtn.innerHTML= `Pay ₹ ${totalprice}`
    if(totalprice===0){
        document.getElementById("cart").innerHTML=``
    }
    return menuItem
}


 
 


function render(){
    document.getElementById("items").innerHTML = getMenuItem()
}

render()