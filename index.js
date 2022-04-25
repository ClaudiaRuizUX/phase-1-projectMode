function fetchAllCoins(){
    return fetch('https://api.coingecko.com/api/v3/coins')
    .then(reponse => reponse.json())
    .then(json => json)
}
function onAddCoin(id, symbol, price){
    return fetch('http://localhost:3000/myCoinResearch',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"           
        },
        body: JSON.stringify({
            symbol: symbol,
            price: price
        })

    })   
}
function deleteMyCoin(id){
    return fetch(`http://localhost:3000/myCoinResearch/${id}`,{
        method: "DELETE"
    })
}
function fetchMyCoins(){
    return fetch('http://localhost:3000/myCoinResearch')
    .then(reponse => reponse.json())
    .then(json => json)
}

function loadCoins(){
    document.querySelector('#my-coins').innerHTML = "";
    document.addEventListener('DOMContentLoaded', () => {
        fetchAllCoins().then(coins => {
            Object.keys(coins).forEach(coin => {
                let list = document.createElement('tr');
                list.setAttribute("id", `${coins[coin].name}`)
    
                let coinPrice = coins[coin].market_data.current_price.usd;
                let priceConverted = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(coinPrice);
    
                list.innerHTML = `
                <td
                onclick="onAddCoin(
                    '${coins[coin].name}', 
                    '${coins[coin].symbol}', 
                    '${coins[coin].market_data.current_price.usd}')"
                >
                <img src="${coins[coin].image.small}" alt="${coins[coin].id}"></img>
                <span><strong>${coins[coin].name}</strong>${coins[coin].symbol}</span>
                </td>
                <td 
                    onclick="onAddCoin(
                        '${coins[coin].name}', 
                        '${coins[coin].symbol}', 
                        '${coins[coin].market_data.current_price.usd}')"
                    class="price">
                    $${priceConverted}
                </td>
                <td><button type="button"
                    onclick="onAddCoin(
                        '${coins[coin].name}', 
                        '${coins[coin].symbol}', 
                        '${coins[coin].market_data.current_price.usd}')"
                    class="btn btn-primary">+</button>
                </td>`;
                document.querySelector('#all-coins').appendChild(list);
            });
        })
        fetchMyCoins().then(coins => {
            Object.keys(coins).forEach(coin => {
                let list = document.createElement('tr');
                list.setAttribute("class", coins[coin].symbol)
    
                let coinPrice = coins[coin].price;
                let priceConverted = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(coinPrice);
    
                list.innerHTML =
                `
                <td onclick="deleteMyCoin(${coins[coin].id})">
                <span class="symbol">${coins[coin].symbol}</span>$${priceConverted}
                <span class="btn delete material-icons">delete_outline</span>
                </td>
                `;
                document.querySelector('#my-coins').appendChild(list);
            })
        }) 
        
    });
}

setInterval(loadCoins(), 3600000);