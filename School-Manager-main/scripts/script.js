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
/*--------------------------------------------------------------------------------------------------------------------------- 
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
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