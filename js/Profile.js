const getInfoUser = async() => {
    
    const url = `http://localhost:3000/catador`

    const response = await fetch(url)
    const info = await response.json()

    return info
}

const InsertInfo = (data) => {
    const h1 = document.createElement('h1')

    h1.innerHTML = `
    <h1 class="name" id="name">${data.nome}</h1>
    `

    h1.id = data.id
    return h1
}

const loadInfo = async() => {
    const container = document.querySelector('.name')

    const data = await getInfoUser()

    const cards = data.message.map(InsertInfo)

    container.replaceChildren(...cards)
}

loadInfo()