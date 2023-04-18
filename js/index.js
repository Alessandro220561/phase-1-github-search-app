let form = document.getElementById('github-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    e.target[0].value
    fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
    .then(res => res.json())
    .then(res => {
        //login, avatar_url, url
        const userList = document.getElementById('user-list')
        userList.innerHTML = " "
        res.items.map(item => {
            const li = document.createElement('li')
            const h2 = document.createElement('h2')
            h2.innerText = item.login
            h2.addEventListener('click', e => showUserRepos(item.login, e))
            const img = document.createElement('img')
            img.src = item.avatar_url
            
            li.append(h2, img)
            userList.append(li)
        })
    })
    form.reset()
})

function showUserRepos(username, e) {
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = " "
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => {
        data.map(repo => {
            const li = document.createElement('li')
            const h1 = document.createElement('h1')
            h1.textContent = repo.name
            li.append(h1)
            reposList.append(li)
        })
    })
}