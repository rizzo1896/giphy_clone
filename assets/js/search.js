// form param

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

// end
document.querySelector('.search--title').style.fontSize = '30px'
document.querySelector('.search--title').style.fontWeight = 'bold'
// document.querySelector('.search--title').style.textTransform = 'uppercase'
document.querySelector('.search--title').innerHTML = findGetParameter("search")

let query = findGetParameter("search")

let requestOptions = {
    method: 'GET',
}

let qtd = 8
function img() {
    let url_search = `https://api.giphy.com/v1/gifs/search?api_key=LLMSm65kdpzaKFPKScKupuZykbijQOUD&q=${query}&limit=${qtd}&offset=0&rating=g&lang=pt`

    fetch(url_search, requestOptions)
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

        // console.log(`Key: ${key}, Filho: ${filhos}`)
    })
}

function loadMore() {
    img(qtd += 8)
}


// go to page top function
// start

function checkScrollHeight() {
    let pos = window.scrollY
    let button = document.querySelector('.goto')

    if (pos > 50) {
        button.style.display = "block"
    } else {
        button.style.display = "none"
    }
}

window.onscroll = () => checkScrollHeight()

function goTo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}


document.querySelector('.goto').addEventListener('click', goTo)

// end

// open menu
// start

function menuOpener() {
    let button = document.querySelector('.menu--action')
    if (button.style.display == 'flex') {
        button.style.display = 'none'
    } else {
        button.style.display = 'flex'
    }
}

document.querySelector('.menu--opener').addEventListener('click', menuOpener)

// end