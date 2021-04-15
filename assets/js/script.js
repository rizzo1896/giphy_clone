let query = ''
let url_search = `https://api.giphy.com/v1/gifs/search?api_key=LLMSm65kdpzaKFPKScKupuZykbijQOUD&q=${query}&limit=8&offset=0&rating=g&lang=pt`

let requestOptions = {
    method: 'GET',
}

let qtd = 8
function img() {
    const url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=LLMSm65kdpzaKFPKScKupuZykbijQOUD&limit=${qtd}&rating=g`

    fetch(url_trending, requestOptions)
        .then(response => response.json())
        .then(res => queryImg(res.data))
        .catch(error => console.log('Error: ' + error))
}
img()

function queryImg(data) {
    data.map((item, index) => {
        let filhos = document.querySelector('.content--body').children.length
        let container = document.querySelector('.images').cloneNode(true)
        container.setAttribute('key', index)
        let key = container.getAttribute('key')

        if (key >= filhos) {
            container.querySelector('.images img').src = item.images.downsized_medium.url
            document.querySelector('.content--body').append(container);
        }

        console.log(`Key: ${key}, Filho: ${filhos}`)
    })
}

function loadMore() {
    img(qtd += 8)
}


function checkScrollHeight() {
    let pos = window.scrollY
    let button = document.querySelector('.goto')

    if (pos > 50) {
        button.style.display = "block"
    } else {
        button.style.display = "none"
    }
}

function goto() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

window.onscroll = function () { checkScrollHeight() }
checkScrollHeight()