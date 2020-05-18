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
        if(tarefa.feito){
           // row.className="done";
           //ou
           row.classList.add("done");
        }

        //criar o input checkbox
        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = tarefa.feito;
        checkbox.id = "chk_" + tarefa.id;
        checkbox.addEventListener('click', onCheckClick);

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

        //criar a td de prioridade
        let tdPrioridade = document.createElement('td');
        let strPri;
        switch (tarefa.prioridade){
            case 3:
                strPri = "Alta";
                break;
            case 2:
                strPri = "Média";
                break;
            case 1:
                strPri = "Baixa";
                break;

        }
        tdPrioridade.innerText = strPri;
        row.appendChild(tdPrioridade);

        //criar td de ações
        let tdAcoes = document.createElement('td');
        let i = document.createElement('i');
        i.className = "material-icons";
        i.innerText = "delete";
        i.addEventListener('click', onDeleteClick);
        i.id = tarefa.id;
        // ou 
        //i.setAttribute("id", tarefa.id);
        tdAcoes.appendChild(i);
        row.appendChild(tdAcoes);

        //adicionar a linha a tabela
        table.appendChild(row);
    }
}

const onDeleteClick = (evt) => {

    //capturando id da tarefa a ser removida:
    let id = Number(evt.target.id);

    //confirma a exclusão
    if(!window.confirm("Tem certeza que deseja excluir a tarefa?")){
        
        //usuario cliclou em não. Abortando
        return;
    }

    //remover a tarefa do array
    destroy(id);

    //renderizar a lista novamente
    render(tarefas);
}

const onCheckClick = (evt) => {
    //capturando o id da tarefa clicada
    let id = Number(evt.target.id.replace('chk_', ''));

    //levantar tarefa do id capturado
    let tarefa = tarefas.find(t => t.id == id);

    // alterar o campo feito
    tarefa.feito = !tarefa.feito;

    //fazer com que a linha dela tenha class="done" ou class=""
    //alterando a classe da tr que contem o td que contem o checkbox
    evt.target.parentNode.parentNode.classList.toggle('done');

}

/*
Criar função create(texto, prioridade) que recebe um texto  e prioridade como parâmetro
essa funcção deve retornar um objeto literal com os seguintes campos
texto: com o texto passado por parametro
prioridade: com base na prioridade passada por parametro
feito: false
*/

const create = (texto, prioridade) => {
    //determinando o id do novo elemento
        let id = (tarefas.length==0 ? 1 : tarefas[tarefas.length - 1].id + 1);
    return{
        id,
        texto,
        prioridade,
        feito: false
    }
}


//Criar uma função destroy que recebo o id de uma tarefa 
//como parametro e remove essa tarefa do array
const destroy = (id) => {
    // tarefas.splice(id, 1);   => o que eu fiz funciona tbm
    // o que o professor fez
    tarefas = tarefas.filter(t => t.id != id);
}


//capturar elementos importante da página
let form = document.getElementById('form'); //capturar o form
let table = document.getElementById('table'); //capturar table

// FORMA 1 
// form.onsubmit = (evt) => {
//     evt.preventDefault();
// }

// FORMA 2
// crio a função:
const onFormSubmit = (evt) => {

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
}

//associo o evento à função
form.addEventListener('submit', onFormSubmit);
render(tarefas);