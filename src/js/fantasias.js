const hamburguer = document.querySelector('.hamburguer');
const headerMenu = document.querySelector('.menu-header');

function toggleMenu() {
  hamburguer.classList.toggle('active');
  headerMenu.classList.toggle('active');
}

hamburguer.addEventListener('click', toggleMenu);
headerMenu.addEventListener('click', (event) => {
  if (event.target.classList.contains('item-menu')) {
    toggleMenu();
  }
});

// evento que Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", () => {
  // o DOM pega o id  login
  const Login = document.getElementById("login");

  if (Login) {
    //  Adiciona um event listener para abrir o modal
    Login.addEventListener("click", (e) => {
      // Previne a ação padrão do link (recarregar a página)
      e.preventDefault();

      // Função para exibir o modal de login com SweetAlert2
      abrirModalLogin();
    });
  }

  //  Implementa a função que usa SweetAlert2
  function abrirModalLogin() {
    Swal.fire({
      // função do sweet alert que mostra a mensagem
      title: "Entrar",
      // O HTML para o formulário de login
      html: `
                <div id="t1">
                    <label for="email" class="swal2-label" style="display: block; margin-bottom: 5px;">Email:</label>
                    <input id="email" class="swal2-input" placeholder="email@exemplo.com" type="email" style="width: 90%;">
                    
                    <label for="senha" class="swal2-label" style="display: block; margin-top: 15px; margin-bottom: 5px;">Senha:</label>
                    <input id="senha" class="swal2-input" placeholder="Digite sua senha" type="password" style="width: 90%;">
                    
                    <a href="#" style="display: block; margin-top: 10px; font-size: 0.9em; text-decoration: none; color: #0071eb;">Esqueceu a senha?</a>
                </div>
            `,
      focusConfirm: false, // Não foca automaticamente em nenhum input
      showCancelButton: true, //mostra  o botão cancelar
      confirmButtonText: "Entrar", //mostra o botão entrar
      cancelButtonText: "Cancelar", //mostrar o confirmar botão cancelar

      // Função que será executada quando o botão "Entrar" for clicado
      preConfirm: () => {
        const email = document.getElementById("email").value; // o dom pega o id email e o valor
        const senha = document.getElementById("senha").value; // o dom pega o id senha e o valor

        // Validação simples dos campos
        if (!email || !senha) {
          //mensagem de erro que vai aparecer se deixar os campos vazios e clicar no botão entrar
          Swal.showValidationMessage("Por favor, preencha ambos os campos.");
          //retorna falso ou seja fica na tela de login
          return false;
        }

        // Retorna os valores para o .then()
        return { email: email, senha: senha };
      },
      //promessa que vai retornar e caso não funcione retorna também a informação
    }).then((resultado) => {
      // Ocorre após o modal ser fechado (clique em "Entrar" ou "Cancelar")
      if (resultado.isConfirmed) {
        // Aqui você faria a lógica de autenticação
        const { email, senha } = resultado.value;

        // Simulação de autenticação
        if (email === "marvel@gmail.com" && senha === "123") {
          //verifica se o email e senha estão validos
          Swal.fire({
            // função do sweet alert que mostra a mensagem
            icon: "success", // icone e mensgem de sucesso
            title: "Sucesso!", //titulo da mensagem
            text: `Bem-vindo(a), ${email}!`, //texto da mensagem
            confirmButtonText: "Continuar", // botão para confirmar
          });
          window.location.href = "./tarefa.html"; //direciona para a pagina de tarefa
        } else {
          // Login falhou
          Swal.fire({ // função sweet alert que mostra a mensagem
            icon: 'error', // icone de erro
            title: 'Erro de Login', // titulo da mensagem
            text: 'Email ou senha incorretos. Tente novamente.', // texto da mensagem
            confirmButtonText: 'Tentar Novamente' // botão para tentar novamente
          });
        }
        //caso clique no botão cancelar
      } else if (resultado.dismiss === Swal.DismissReason.cancel) {
        //verifica se clicou no botão cancelar
        // Usuário cancelou
        Swal.fire({
          //função sweet alert que mostra a mensagem
          icon: "info", // icone da mensagem
          title: "Cancelado", //titulo da mensagem
          text: "Você cancelou o login.", // texto da mensagem
        });
      }
    });
  }
});
