// selecao dos elementos
const formCadastroAdmin = document.querySelector("#form-admin");
const inputNomeAdmin = document.querySelector("#nome-admin");
const inputEmailAdmin = document.querySelector("#email-admin");
const listaUsersAdmin = document.querySelector("#lista-admin");
const inputBusca = document.querySelector("#site-search");

const formLimpaDados = document.querySelector("#limpar-dados");
const listaLimpaUsers = document.querySelector("#delete-all");

const buttonAdmin = document.querySelector("#button-admin");

//event listeners

buttonAdmin.addEventListener('click', function() {
    window.location.href = 'admin.html'; 
});

formLimpaDados.addEventListener("click", function(event) {
    event.preventDefault();
    limparDados();
});

listaLimpaUsers.addEventListener("click", function(event) {
    event.preventDefault();
    excluirTodosUsuarios();
});

formCadastroAdmin.addEventListener("submit", function(event) {
    event.preventDefault();
    cadastrarUserAdmin();
});

// Evento para a barra de busca, acionado a cada tecla digitada
inputBusca.addEventListener("keyup", function() {
    const termoBusca = inputBusca.value.toLowerCase();
    
    const listaCompleta = JSON.parse(localStorage.getItem("users")) || [];

    const listaFiltrada = listaCompleta.filter(function(user) {
        return (
            user.nome.toLowerCase().includes(termoBusca) ||
            user.email.toLowerCase().includes(termoBusca)
        );
    });

    exibirUsersAdmin(listaFiltrada);
});


// --- FUNÇÕES ---

function cadastrarUserAdmin() {
    const lista = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
        nome: inputNomeAdmin.value,
        email: inputEmailAdmin.value,
        data: new Date().toLocaleDateString()
    };

    lista.push(newUser);
    localStorage.setItem("users", JSON.stringify(lista));

    inputNomeAdmin.value = "";
    inputEmailAdmin.value = "";
    inputNomeAdmin.focus();

    exibirUsersAdmin(lista);
}

function exibirUsersAdmin(listaParaExibir) {
    listaUsersAdmin.innerHTML = ""; 

    const listaCompleta = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < listaParaExibir.length; i++) {
        const user = listaParaExibir[i];
        const li = document.createElement("li");
        li.textContent = `Nome: ${user.nome} - Email: ${user.email} - Data: ${user.data}`;

        const buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Excluir";
        
        // Encontra o índice original do usuário na lista completa para garantir a exclusão correta
        const originalIndex = listaCompleta.findIndex(u => u.email === user.email && u.nome === user.nome);
        
        buttonDelete.setAttribute("data-index", originalIndex);
        buttonDelete.onclick = excluirUsuario;

        li.appendChild(buttonDelete);
        listaUsersAdmin.appendChild(li);
    }
}

function excluirUsuario(event) {
    const index = event.target.getAttribute("data-index");
    
    const lista = JSON.parse(localStorage.getItem("users")) || [];

    lista.splice(index, 1);

    localStorage.setItem("users", JSON.stringify(lista));

    exibirUsersAdmin(lista);
}

function excluirTodosUsuarios() {
    if (confirm("Deseja realmente deletar todos os usuários admin?")) {
        localStorage.removeItem("users"); // Mais simples que ler, esvaziar e salvar de novo
        exibirUsersAdmin([]); // Exibe uma lista vazia
    }
}

function limparDados() {
    inputNomeAdmin.value = "";
    inputEmailAdmin.value = "";
}

// --- CARREGAMENTO INICIAL ---
// Carrega a lista de usuários sempre que a página for carregada
const listaInicial = JSON.parse(localStorage.getItem("users")) || [];
exibirUsersAdmin(listaInicial);