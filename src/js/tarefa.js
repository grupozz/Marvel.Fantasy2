let tarefas = [];

//valida o preenchimento da tarefa caso nao tenha nada
function validaCampo() {
  let valida = false;
  if (document.getElementById('task').value == '') valida = true;
  return valida;
}

//funcao que adiciona a tarefa
function adcionaTarefa() {
  let linhas = document.getElementById('task');
  if (validaCampo()) {
    alert('Preencha a tarefa!');
  } else {
    tarefas.push(linhas.value);
    console.log(tarefas);
    linhas.value = '';
    listarTarefas();
  }
  document.getElementById('task').focus();
}

//funcao que mostra a lista de tarefas

function listarTarefas() {
  let valor = '';
  for (let i = 0; i < tarefas.length; i++) {
    valor += tarefas[i] + '<br/>';
  }
  document.getElementById('lista').innerHTML = valor;
}

function removeTarefa() {
  tarefas.pop();
  listarTarefas();
}
