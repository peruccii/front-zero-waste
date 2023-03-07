const loadItems = () => {
    const name = localStorage.getItem('nome')

    document.getElementById('username').textContent = name
    document.getElementById('modo').textContent = localStorage.getItem('modo')
}

loadItems()