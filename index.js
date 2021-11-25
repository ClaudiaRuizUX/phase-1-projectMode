function fetchAllCoins(){
    return fetch('https://api.coingecko.com/api/v3/coins')
    .then(reponse => reponse.json())
    .then(json => json)
}
function onAddCoin(id, symbol, price){
    // let addedCoin = document.getElementById(id);
    // addedCoin.setAttribute("class", "addedCoin");

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
document.addEventListener('DOMContentLoaded', () => {
    fetchAllCoins().then(coins => {
        Object.keys(coins).forEach(coin => {
            let list = document.createElement('tr');
            list.setAttribute("id", `${coins[coin].name}`)

            let coinPrice = coins[coin].market_data.current_price.usd;
            let priceConverted = (coinPrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

            list.innerHTML = `<td><img src="${coins[coin].image.small}" alt="${coins[coin].id}"></img>
            <span><strong>${coins[coin].name}</strong>${coins[coin].symbol}</span></td>
            <td class="price">$${priceConverted}</td>
            <td><button type="button" onclick="onAddCoin('${coins[coin].name}', '${coins[coin].symbol}', '${coins[coin].market_data.current_price.usd}')" class="btn btn-primary">+</button></td>`;
            document.querySelector('#all-coins').appendChild(list);
        });
    })
    fetchMyCoins().then(coins => {
        Object.keys(coins).forEach(coin => {
            let list = document.createElement('tr');
            list.innerHTML =
            `
            <td><span>${coins[coin].symbol}</span>${coins[coin].price}</td>
            <td><button type="button" onclick="deleteMyCoin(${coins[coin].id})" class="btn btn-primary">delete</button></td>
            `;
            document.querySelector('#my-coins').appendChild(list);
        })
    })
});