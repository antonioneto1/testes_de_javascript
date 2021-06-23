function fazGet(url){
 let request = new XMLHttpRequest()
 request.open('GET', url, false)
 request.send()
 return request.responseText
}

function criaLinhas(element){

  linha = document.createElement("tr")
  tdId = document.createElement('td')
  tdNome = document.createElement('td')
  link = document.createElement('a')

  linha.setAttribute('scope',"row")
  tdId.innerHTML = element.id
  tdNome.innerHTML = element.name
  link.innerHTML = '(Link)'
  link.setAttribute('href', element.owner.html_url);


  linha.appendChild(tdId)
  linha.appendChild(tdNome)
  linha.appendChild(link)
  return linha
}

function man(){
  data = fazGet("https://api.github.com/repositories")
  repositories = JSON.parse(data)

  let tabela = document.querySelector('#tabela')
  console.log(repositories)
  repositories.forEach(element => {
    let linha = criaLinhas(element)
    tabela.appendChild(linha)
  });
}

man()