
let filmes = JSON.parse(localStorage.getItem("filmes")) || [];
let editar = -1;

document.getElementById("Formulario").addEventListener("submit", salvar);

function salvar(e){

    e.preventDefault();

    let nome = document.getElementById("nome").value;
    let diretor = document.getElementById("diretor").value;
    let ano = document.getElementById("data").value;

    if(editar == -1){

        filmes.push({
            nome: nome,
            diretor: diretor,
            ano: ano
        });

    }else{

        filmes[editar].nome = nome;
        filmes[editar].diretor = diretor;
        filmes[editar].ano = ano;

        editar = -1;
    }

    localStorage.setItem("filmes", JSON.stringify(filmes));

    document.getElementById("Formulario").reset();

    listar();
}


function listar(){

    let resultado = document.getElementById("resultado_de_espera");

    resultado.innerHTML = "";

    if(filmes.length == 0){

        resultado.innerHTML = "<p>Nenhum filme cadastrado!</p>";

        return;
    }

    for(let i = 0; i < filmes.length; i++){

        resultado.innerHTML += `
            <p>
                Título: ${filmes[i].nome}<br>
                Diretor: ${filmes[i].diretor}<br>
                Ano: ${filmes[i].ano}<br>

                <button onclick="editarFilme(${i})">
                    Editar
                </button>

                <button onclick="excluir(${i})">
                    Excluir
                </button>

                <hr>
            </p>
        `;
    }
}



function editarFilme(i){

    document.getElementById("nome").value = filmes[i].nome;
    document.getElementById("diretor").value = filmes[i].diretor;
    document.getElementById("data").value = filmes[i].ano;

    editar = i;
}

function excluir(i){

    filmes.splice(i, 1);

    localStorage.setItem("filmes", JSON.stringify(filmes));

    listar();
}

listar();
