function toggleReadMore () {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readMoreBtn");
    if (dots.style.display === "none")
    {
        dots.style.display = "inline";
        moreText.style.display = "none";
        btnText.innerHTML = "Read more"
    } else {
        dots.style.display = "none";
        moreText.style.display = "inline";
        btnText.innerHTML = "Read less"
    }
}

let shop = document.getElementById ("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let {id, name, price, desc, img} = x;
            let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
                <img width="200" src=${img} alt="">
                <div class="des">
                    <div class="name-price">
                        <span>${name}</span>
                        <span class="price">&#8358; ${price} </span>
                    </div>
                    <p>Select Size:</p>
                    <div class="price-quantity">
                        <div class="radio-inputs">
                        <label>
                            <input class="radio-input" type="radio" name="engine">
                            <span class="radio-tile">
                            <span class="radio-label">40</span>
                        </span>
                        </label>
                        
                        <label>
                        <input checked="" class="radio-input" type="radio" name="engine">
                        <span class="radio-tile">
                        <span class="radio-label">41</span>
                        </span>
                        </label>
                        
                        
                        <label>
                        <input class="radio-input" type="radio" name="engine">
                        <span class="radio-tile">   			
                        <span class="radio-label">42</span>
                        </span>
                        </label>

                        <label>
                        <input class="radio-input" type="radio" name="engine">
                        <span class="radio-tile">   			
                        <span class="radio-label">43</span>
                        </span>
                        </label>

                        <label>
                        <input class="radio-input" type="radio" name="engine">
                        <span class="radio-tile">   			
                        <span class="radio-label">44</span>
                        </span>
                        </label>

                    </div>
                    </div>
                    <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0 : search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        `
    })
    .join(""));
};

generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else{
        search.item += 1;
    }
    
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else{
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    //console.log(basket);

    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    //console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y) => x + y, 0);
};

calculation ();