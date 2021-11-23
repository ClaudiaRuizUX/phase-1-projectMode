function fetchAllCoins(){
    return fetch('https://api.coingecko.com/api/v3/coins')
    .then(reponse => reponse.json())
    .then(json => json)
}
function onAddCoin(symbol, price){
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
            list.innerHTML = `<td><img src="${coins[coin].image.small}" alt="${coins[coin].id}"></img>
            <span><strong>${coins[coin].name}</strong>${coins[coin].symbol}</span></td>
            <td>${coins[coin].market_data.current_price.usd}</td>
            <td><button type="button" onclick="onAddCoin('${coins[coin].symbol}', '${coins[coin].market_data.current_price.usd}')" class="btn btn-primary">Add</button></td>`;
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