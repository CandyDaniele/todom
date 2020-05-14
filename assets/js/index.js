let tarefas = [
    {
        id: 1,
        texto: "escovar os dentes",
        prioridade: 3,
        feito: true
    },
    {
        id: 2,
        texto: "escovar o cabelo",
        prioridade: 1,
        feito: true
    },
    {
        id: 3,
        texto: "cozinhar",
        prioridade: 2,
        feito: false
    },
    {
        id: 4,
        texto: "cuidar dos gatos",
        prioridade: 3,
        feito: false
    }
]

const render = (tarefas) => {
    //capturar o elemento que contem a lista de tarefas
    let table = document.getElementById("table");

    //Alternativa para o document.getElementById("table");
    //table = document.querySelector("#table");
    //ou
    //table = document.querySelector("table");  pq pega a tag table e só tem uma, pq esse sempre pega 1 só que é o primeiro que encontra
    //table = document.querySelectorAll(".azul div");   pega TODAS divs com classe azul

    //console.log(table);


    //limpar lista
    table.innerText = "";
    //table.innerHTML = "<tr><td>Poder de alterar a dom! </td></tr>";



    //criar o elemento
    //Criando a lista de tarefas
    for (const tarefa of tarefas){

        //criando uma linha de tabela
        let row = document.createElement('tr');

        //criar o input checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");

        // criar a celula que vai conter o checkbox
        let tdCheck = document.createElement('td');
        tdCheck.appendChild(checkbox);

        //adicionar esse tdCheckbox à row
        row.appendChild(tdCheck);

        
        //adicionar conteudo a essa linha
        //row.innerHTML = `
        //<td>
        //    <input type="checkbox">
        //</td>
        //<td>
       //     ${tarefa.texto}
        //</td>
        //<td>
        //    <i class="material-icons">delete</i>
        //</td>`


        //criar a td de texto
        let tdTexto = document.createElement('td');
        tdTexto.innerText = tarefa.texto;
        row.appendChild(tdTexto);

        //criar td de ações
        let tdAcoes = document.createElement('td');
        let i = document.createElement('i');
        i.className = "material-icons";
        i.innerText = "delete";
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);

        //adicionar a linha a tabela
        table.appendChild(row);
    }
}


/*
Criar função create(texto, prioridade) que recebe um texto  e prioridade como parâmetro
essa funcção deve retornar um objeto literal com os seguintes campos
texto: com o texto passado por parametro
prioridade: com base na prioridade passada por parametro
feito: false
*/

const create = (texto, prioridade) => {
    return {
        id: tarefas[tarefas.length - 1].id + 1,
        texto,
        prioridade,
        feito: false
    }
}

//capturar elementos importante da página
let form = document.getElementById('form'); //capturar o form
let table = document.getElementById('table'); //capturar table

// FORMA 1 
// form.onsubmit = (evt) => {
//     evt.preventDefault();
// }

// FORMA 2
form.addEventListener('submit', (evt) => {
    
    //não envia o formulario
    // evitar o comportamento padrão de um form
    evt.preventDefault();

    //capturar o texto digitado pelo usuário
    let texto = document.getElementById("tf_2do").value;

    //testando se o texto é vazio
    if(texto.trim() == ''){
        return;
    }

    //verificar se existe prioridade setada nesse texto
    let strInicio = texto.substr(0,3);
    let prioridade;
    switch (strInicio) {
        case '#1 ':
            prioridade = 1;
            texto = texto.slice(3);
            break;

        case '#2 ':
            prioridade = 2;
            texto = texto.slice(3);
            break;
        
        case '#3 ':
            prioridade = 3;
            texto = texto.slice(3);
            break;
        
        default:
            prioridade = 1;
            break;
    }

    //criar o objeto de tarefa sabendo o texto e a prioridade
    let tarefa = create(texto, prioridade);

    //adicionar o objeto tarefa ao array de tarefas
    tarefas.push(tarefa);

    //renderizar a minha lista novamente
    render(tarefas);

    //limpar o campo de texto (input)
    document.getElementById("tf_2do").value = "";
});

render(tarefas);