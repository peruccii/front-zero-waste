const getInfoUser = async() => {
    
    const url = `http://localhost:3000/user`

    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer' + ' ' + localStorage.getItem('token')
        }
    })
    const info = await response.json()

    return info
}

const InsertInfo = (data) => {
    const container = document.createElement('div')
    const nome = data.user.pessoa_fisica[0].nome ? data.user.pessoa_fisica[0].nome : data.user.pessoa_juridica[0].nome_fantasia
    const catadorGerador = data.user.gerador.length > 0 ? 'Gerador' : 'Catador'
    const cidade = data.user.endereco_usuario[0].endereco.cidade

    container.innerHTML = `
    <h1 class="name" id="name">${nome}</h1>
    <div class="map"> 
        <span>${cidade}</span> 
    </div>
    <p>${catadorGerador}</p>
    `

    container.classList.add('userName')

    console.log(container);


    return container
}

const infoRank = (data) => {
    const container = document.createElement('div')
    
    container.innerHTML = `
    <h1 class="heading">Avaliação</h1>
                <span>8,6</span>
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
            </div>

            <div class="btns">
                <ul>
                    <li class="sendMsg">
                        <i class="ri-chat-4-fill ri"></i>
                        <a href="#">Solicite uma coleta</a>
                    </li>

                    <li class="sendMsg active">
                        <i class="ri-check-fill ri"></i>
                        <a href="#">Contatos</a>
                    </li>

                    <li class="sendMsg">
                        <a href="#">Avaliar usuario</a>
                    </li>
                </ul>

        
    
    `

    container.classList.add('rank')

    return container
}

const createMateriasCatador = (data) => {
    const li = document.createElement('li')
    console.log(data);

    li.innerHTML = 
    `
                  <span class="checkbox">
                      <i class="fa-solid fa-check check-icon"></i>
                  </span>
                  <span class="item-text">${data.material.nome}</span>
    `

    li.classList.add('item')
    li.id = data.id

    console.log(li)
    return li
}


const infoContact = (data) => {
    const container = document.createElement('div')
    const telefone = data.user.telefone
    const cep = data.user.endereco_usuario[0].endereco.cep
    const email = data.user.email
    const complemento = data.user.endereco_usuario[0].endereco.complemento

    const phone = document.createElement('li')
    phone.classList.add('phone')
    phone.innerHTML = `
                <h1 class="label">Telefone:</h1>
                <span class="info">${telefone}</span>
    `

    const adress = document.createElement('li')
    adress.classList.add('adress')
    adress.innerHTML = `
                <h1 class="label">CEP:</h1>
                <span class="info">${cep} - ${complemento}</span>
    `

    const emails = document.createElement('li')
    emails.classList.add('email')
    emails.innerHTML = `
                <h1 class="label">Email:</h1>
                <span class="info">${email}</span>
    `

    const ul = document.createElement('ul')
    ul.appendChild(phone)
    ul.appendChild(adress)
    ul.appendChild(emails)

    container.innerHTML = `
    <h1 class="heading">Informação de contato</h1>
    ` 
    container.appendChild(ul)
    container.classList.add('contact_info')

    if (data.user.catador.length > 0) {
        console.log(data.user.catador[0].materiais_catador);
        const dropdown = document.createElement('ul')
        const items = data.user.catador[0].materiais_catador.map(createMateriasCatador)
        dropdown.replaceChildren(...items)
        container.appendChild(dropdown)
    }
    
    return container

}

const infoTime = (data) => {
    const container = document.createElement('div')
    container.classList.add('basic_info')

    container.innerHTML =`
    <ul>
                    <li class="birthday">
                        <h1 class="label">Hora/Disponível:</h1>
                        <span class="info">14:00 -- 19:30</span>
                    </li>
                </ul>
    `
}


const loadInfo = async() => {
    const containerDetails = document.querySelector('.userDetails ')
    const containerAbout = document.querySelector('.timeline_about')
    const infoSideBar = document.getElementById('name_job')
    

    const data = await getInfoUser()
    console.log(data.user);

    const nome = InsertInfo(data)
    const rank = infoRank(data)
    const contact = infoContact(data)
    const time = infoTime(data)

    containerDetails.appendChild(nome)
    containerDetails.appendChild(rank)
    containerAbout.appendChild(contact)
    //containerAbout.appendChild(time)

    infoSideBar.innerHTML = `
    <div class="name" id="username">${data.user.pessoa_fisica[0].nome ? data.user.pessoa_fisica[0].nome : data.user.pessoa_juridica[0].nome_fantasia}</div>
    <div class="job" id="modo">${localStorage.getItem('modo')}</div>
    `
}

loadInfo()