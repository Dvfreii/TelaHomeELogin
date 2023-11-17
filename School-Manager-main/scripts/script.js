function criarAluno() {
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;

    if (!nome || !dataNascimento || !email || !senha || !endereco || !telefone) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const aluno = {
        nome: nome,
        data_nascimento: dataNascimento,
        email: email,
        senha: senha,
        endereco: endereco,
        telefone: telefone,
    };

    fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aluno),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Aluno criado com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro ao criar aluno:', error);
        });
}

function listarAlunos() {
    document.getElementById('tabelaAlunos').innerHTML = '';

    fetch('http://localhost:3000/alunos')
        .then(response => response.json())
        .then(data => {
            data.forEach(aluno => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${aluno.aluno_id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.data_nascimento}</td>
                <td>${aluno.email}</td>
                <td>${aluno.endereco}</td>
                <td>${aluno.telefone}</td>
                <td><button onclick="deletarAluno(${aluno.aluno_id})">Deletar</button></td>
            `;
                document.getElementById('tabelaAlunos').appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao obter a lista de alunos:', error);
        });
}

function deletarAluno(alunoId) {
    // Solicitação para deletar o aluno
    fetch(`http://localhost:3000/alunos/${alunoId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Aluno deletado com sucesso:', data);
            // Atualize a lista de alunos após a exclusão
            listarAlunos();
        })
        .catch(error => {
            console.error('Erro ao deletar aluno:', error);
        });
}

////////
function cadastrarEvento() {
    const titulo = document.getElementById('titulo').value;
    const descricao = document.getElementById('descricao').value;
    const data_inicio = document.getElementById('data_inicio').value;
    const data_fim = document.getElementById('data_fim').value;

    if (!titulo || !descricao || !data_inicio || !data_fim) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const dadosEvento = {
        titulo: titulo,
        descricao: descricao,
        data_inicio: data_inicio,
        data_fim: data_fim
    };

    // Envia os dados do evento para o servidor
    fetch('http://localhost:3000/eventos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosEvento)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao cadastrar evento. Código: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Evento cadastrado com sucesso:', data);
            // Exibir uma mensagem de sucesso na interface do usuário
            exibirMensagem('Evento cadastrado com sucesso!', 'success');
        })
        .catch(error => {
            console.error('Erro ao cadastrar evento:', error);
            // Exibir uma mensagem de erro na interface do usuário
            exibirMensagem('Erro ao cadastrar evento. Tente novamente.', 'error');
        })

    //Marca eventos
    markEventDate(date);
}

function listarEventos() {
    // Faz uma requisição GET ao servidor para obter a lista de eventos
    fetch('http://localhost:3000/eventos')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao obter a lista de eventos. Código: ${response.status}`);
            }
            return response.json();
        })
        .then(eventos => {
            // Manipula a lista de eventos, por exemplo, exibindo-os na interface do usuário
            const eventListDiv = document.getElementById('eventList');
            eventListDiv.innerHTML = '<h3>Lista de Eventos</h3>';

            if (eventos.length === 0) {
                eventListDiv.innerHTML += '<p>Nenhum evento cadastrado.</p>';
            } else {
                const ul = document.createElement('ul');
                eventos.forEach(evento => {
                    const li = document.createElement('li');
                    li.textContent = `${evento.titulo} - ${evento.descricao} - ${evento.data_inicio} - ${evento.data_fim}`;
                    ul.appendChild(li);
                });
                eventListDiv.appendChild(ul);
            }
        })
        .catch(error => {
            console.error('Erro ao listar eventos:', error);
        });
}

// Chama a função para listar os eventos quando a página carrega
window.onload = listarEventos;

function markEventDate(date) {
    var calendar = document.getElementById('calendar');
    var dayElement = document.createElement('div');
    dayElement.classList.add('day', 'event-day');
    dayElement.textContent = new Date(date).getDate();
    calendar.appendChild(dayElement);
}
