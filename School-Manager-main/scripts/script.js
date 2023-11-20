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

/*---------------------------------------------------------------------------------------------------------------------------*/
function criarProfessor() {
    const nome = document.getElementById('nome').value;
    const siape = document.getElementById('siape').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
   
    if (!nome || !siape || !dataNascimento || !email || !senha || !endereco || !telefone) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const Professor = {
        nome: nome,
        siape: siape,
        data_nascimento: dataNascimento,
        email: email,
        senha: senha,
        endereco: endereco,
        telefone: telefone,
    };

    fetch('http://localhost:3000/professores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(Professor),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Professor criado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao criar aluno:', error);
    });
}

function listarProfessores() {
    document.getElementById('tabelaProfessores').innerHTML = '';

    fetch('http://localhost:3000/professores')
    .then(response => response.json())
    .then(data => {
        data.forEach(professor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${professor.professor_id}</td>
                <td>${professor.nome}</td>
                <td>${professor.siape}</td>
                <td>${professor.data_nascimento}</td>
                <td>${professor.email}</td>
                <td>${professor.endereco}</td>
                <td>${professor.telefone}</td>
                <td><button onclick="deletarProfessor(${professor.professor_id})">Deletar</button></td>
            `;
            document.getElementById('tabelaProfessores').appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro ao obter a lista de professores:', error);
    });
}
function deletarProfessor(professorId) {
    // Solicitação para deletar o aluno
    fetch(`http://localhost:3000/professores/${professorId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Professor deletado com sucesso:', data);
        // Atualize a lista de alunos após a exclusão
        listarProfessores();
    })
    .catch(error => {
        console.error('Erro ao deletar Professor:', error);
    });
}
/* ---------------------------------------------------------------------------------------------------------------------------------*/
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
    .then(response => response.json())
    .then(data => {
        console.log('Evento criado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao criar evento:', error);
    });
}

function listarEventos() {
    // Faz uma requisição GET ao servidor para obter a lista de eventos
    document.getElementById('eventList').innerHTML = '';

    fetch('http://localhost:3000/eventos')
    .then(response => response.json())
    .then(data => {
        data.forEach(eventos => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${eventos.evento_id}</td>
                <td>${eventos.titulo}</td>
                <td>${eventos.descricao}</td>
                <td>${eventos.data_inicio}</td>
                <td>${eventos.data_fim}</td>
                <td><button onclick="deletarEvento(${eventos.evento_id})">Deletar</button></td>
            `;
            document.getElementById('eventList').appendChild(row);
        });
    })
    .catch(error => {
        console.error('Erro ao obter a lista de eventos:', error);
    });
}
function deletarEvento(eventoId) {
    // Solicitação para deletar o aluno
    fetch(`http://localhost:3000/eventos/${eventoId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('evento deletado com sucesso:', data);
        // Atualize a lista de alunos após a exclusão
        listarEventos();
    })
    .catch(error => {
        console.error('Erro ao deletar evento:', error);
    });
}
/*---------------------------------------------------------------------------------------------------------------------------*/
function cadastrarDisciplina(){
    const nome = document.getElementById('nome').value;
    const carga_horaria = document.getElementById('carga_horaria').value;

    if (!nome || !carga_horaria ) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const dadosDisciplina = {
        nome: nome,
        carga_horaria: carga_horaria,
    };

    // Envia os dados do evento para o servidor
    fetch('http://localhost:3000/disciplinas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosDisciplina),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Disciplina criado com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao criar Disciplina:', error);
    });
}
function listarDisciplinas() {
    document.getElementById('tabelaDisciplinas').innerHTML = '';

    fetch('http://localhost:3000/disciplinas')
        .then(response => response.json())
        .then(data => {
            data.forEach(disciplina => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${disciplina.disciplina_id}</td>
                    <td>${disciplina.nome}</td>
                    <td>${disciplina.carga_horaria}</td>
                    <td><button onclick="deletarDisciplina(${disciplina.disciplina_id})">Deletar</button></td>
                `;
                document.getElementById('tabelaDisciplinas').appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao obter a lista de disciplinas:', error);
        });
}
function deletarDisciplina(disciplinaId) {
    fetch(`http://localhost:3000/disciplinas/${disciplinaId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Disciplina deletada com sucesso:', data);
        listarDisciplinas(); // Atualizar a lista após a exclusão
    })
    .catch(error => {
        console.error('Erro ao deletar disciplina:', error);
    });
}
