
let food = ['Hot Crunchy Chicken', 'Veganer Crunchy', 'Fingerfood', 'Pizza Vegetarisch'];
let description = ['mit Crunchy Chicken, zart schmemlzendem Cheese und Tomaten.', 'mit vegan-Crunchy-Patty, Tomaten, Salat und veganem Brötchen.', 'Chicken Fingers, Chicken Nuggets und Chicken Wings.', 'mit veganen Zutaten und knuspriger Kruste.'];
let prices = [9.49, 8.99, 10.99, 8.49];
let img = ['burger.jpg', 'vegan-burger.png', 'chicken-box.png', 'pizza.png'];
let deliver = [1.99];

let basket = [];
let price = [];
let amount = [];



function render() {
    let content = document.getElementById('content');       // hier wird in die div zugegeriffen
    content.innerHTML = '';     // die div wird jedesmal geleert

    for (let i = 0; i < food.length; i++) {        // wenn du mehrere Werte aus deinem array darstellen möchtest, dann benötigt man eine for-Schleife
        const dish = food[i];
        const desc = description[i];
        const price = prices[i];
        const image = img[i];

        content.innerHTML += renderHtml(dish, desc, price, image, i);
    }
}

function renderBasket() {
    let rightsight = document.getElementById('main');
    let sum = 0;
    rightsight.innerHTML = '';

    if (basket.length >= 1) {

        for (let i = 0; i < basket.length; i++) {

            const bk = basket[i];
            const pr = price[i];
            const am = amount[i];       // wenn am = 1 dann kann sich das amount nicht erhöhen und bleibt immer 1!
            const desc = description[i];
            sum += pr * am;     // ohne das + Zeichen, überschreiben wir jedesmal den sum...  

            rightsight.innerHTML += renderHtmlBasket(bk, pr, am, desc, i);
        }
        rightsight.innerHTML += renderHtmlSum(sum);
    } else {
        rightsight.innerHTML = emptyBasket();
    }
}


function addToBasket(i) {
    let index = basket.indexOf(food[i]);        // hier wird mit idexOf aus dem basket-array nach dem [i] des food-array sucht

    if (index == -1) {      //  wenn index gleich -1 ist, dann
        basket.push(food[i]);       // hier wird zum basket zugefügt
        price.push(prices[i]);
        amount.push(1);
    } else {        // sonst wird amount um eins erhöht
        amount[index]++;
    }
    renderBasket();
}

function deleteBasket(i) {
    // if (i == -1) {         das i muss nicht auf -1 überprüft werden, weil oben in der renderBasket function (for-Schleife) i als (i = 0) angegeben wurde...
    //    basket.splice(i, 1);       
    //    price.splice(i, 1);
    //    amount.splice(i, 1); 
    if (amount[i] == 1) {      // wenn beim amount das [i] nicht angegeben wird, dann geht der amount ins Negative..
        basket.splice(i, 1);        // wenn dass 1 in der Klammer nicht angegeben wird, dann kannst du mit dem letzten angewählten Menü den ganzen Basket löschen...
        price.splice(i, 1);
        amount.splice(i, 1);
    } else {
        amount[i]--;
    }
    renderBasket();
    saveArray();
}


function saveArray() {
    let foodAsText = JSON.stringify(food);     // .stringify um ein array in einen string umzuwandeln 
    localStorage.setItem('foods', foodAsText);      // mit diesem Satz wird das array gespeichert, 'names' ist der Schlüssel und namesAsText ist das value

    let descriptionAsText = JSON.stringify(description);     // um den array in dem lokal storage zu speichern, muss man eine Variable anlegen
    localStorage.setItem('descriptions', descriptionAsText);

    let pricesAsText = JSON.stringify(prices);
    localStorage.setItem('price', pricesAsText);

    let imgAsText = JSON.stringify(img);
    localStorage.setItem('imgs', imgAsText);
}

function loadArray() {
    let foodAsText = localStorage.getItem('foods');     // .getitem um das gespeicherte wieder aufzurufen
    let descriptionAsText = localStorage.getItem('phoneNumbers');
    let pricesAsText = localStorage.getItem('price');
    let imgAsText = localStorage.getItem('imgs');

    if (foodAsText && description && pricesAsText && img) {        // if: ob das array schon existiert.. wenn du noch nie in dein localStorage etwas zugefügt hast, ist dein localStorage leer. Es funktioniert nicht etwas Leeres in einen array umzuwandeln
        food = JSON.parse(foodAsText);     // .parse um ein string umzuwandeln in ein array, um ein neuses array zuzuweisen
        description = JSON.parse(descriptionAsText);
        prices = JSON.parse(pricesAsText);
        img = JSON.parse(imgAsText);
    }
}

window.onscroll = function () {
    let main = document.getElementById('move');
    if (window.scrollY > 0) {
        main.style = 'top:0';
    } else {
        main.style = 'top: 110px';
    }
}

function renderHtml(dish, desc, price, image, i) {

    return `<div class="dishes">
    <div class="position">

      <div>
        <h2>${dish}</h2>                
        <span><h3>${desc}</h3></span>
        <h3>${price}€</h3>
      </div>

      <div class="burger">
        <img src="${image}" alt="burger">
      </div>

    </div>

    <div class="plus">
        <img src="plus.svg" alt="plus" onclick="addToBasket(${i})">
    </div>
</div>`;
}

function renderHtmlBasket(bk, pr, am, desc, i) {

    return `<div class="insert">
            <li>${am}</li>
            <span>${bk}</span>
            <span>${pr * am}€</span>
        <div>
            <div class="plus">
                <img src="minus.svg" alt="minus" onclick="deleteBasket(${i})">
                <img src="plus.svg" alt="plus" onclick="addToBasket(${i})">
            </div>
        </div>
    </div>

    <div class="insert">
        <span>${desc}</span>
    </div>  
   `;
}

function renderHtmlSum(sum) {
    if (sum < 50) {
        return `<div class="result">       
        <div class="sum">
            <span>Zwischensumme</span>
            <span>Lieferkosten</span>
            <span><b>Gesamt</b></span>
        </div>

        <div class="sum">
            <span>${sum.toFixed(2)}€</span>
            <span>${deliver}€</span>
            <span><b>${(sum + 1.99).toFixed(2)}€</b></span>     
        </div>
    </div>
        <div >
        <button class="plusButton">Bestellen</button>
        </div>
    `;
    } else {
        return `<div class="result">       
        <div class="sum">
            <span>Zwischensumme</span>
            <span>Lieferkosten</span>
            <span><b>Gesamt</b></span>
        </div>

        <div class="sum">
            <span>${sum.toFixed(2)}€</span>
            <span>${0.00.toFixed(2)}€</span>
            <span><b>${(sum + 1.99).toFixed(2)}€</b></span>     
        </div>
    </div>
    <div >
    <button class="plusButton">Bestellen</button>
    </div>
`;
    }
}

function emptyBasket() {

    return `<div id="main">
          <div class="basketInsert">
            <img class="basket" src="basket-shopping.svg" alt="shopoingBasket">
            <h3>Dein Warenkorb ist leer!</h3>
            <span>Suche worauf du Lust hast, <br>füge es in deinen Warenkorb hinzu <br>und bestelle zur Lieferung</span>
          </div>
        </div>`;
}
