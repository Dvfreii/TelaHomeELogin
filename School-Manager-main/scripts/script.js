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
                <td id="acoes"><button onclick="deletarAluno(${aluno.aluno_id})">Deletar</button></td>
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
                <td id="acoes"><button onclick="deletarProfessor(${professor.professor_id})">Deletar</button></td>
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
        listarEventos(); // Lista os eventos após criar com sucesso
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
                <td id="acoes"><button onclick="deletarEvento(${eventos.evento_id})">Deletar</button></td>
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
    listarDisciplinas();
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
                    <td id="acoes"><button onclick="deletarDisciplina(${disciplina.disciplina_id})">Deletar</button></td>
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

/*---------------------------------------------------------------------------------------------------------------------------*/
function cadastrarTurma() {
    const disciplina_id = document.getElementById('disciplinaSelect').value;
    const horario = document.getElementById('horario').value;
    const sala_aula = document.getElementById('sala_aula').value;
    const professor_id = document.getElementById('professorSelect').value;

    if (!disciplina_id || !horario || !sala_aula || !professor_id) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    const dadosTurma = {
        disciplina_id: disciplina_id,
        horario: horario,
        sala_aula: sala_aula,
        professor_id: professor_id,
    };

    fetch('http://localhost:3000/turmas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosTurma),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Turma cadastrada com sucesso:', data);
            listarTurmas(); // Atualizar a lista após o cadastro
        })
        .catch(error => {
            console.error('Erro ao cadastrar turma:', error);
        });
}


function listarTurmas() {
    document.getElementById('tabelaTurmas').innerHTML = '';

    fetch('http://localhost:3000/turmas')
        .then(response => response.json())
        .then(data => {
            data.forEach(turma => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${turma.turma_id}</td>
                <td>${turma.disciplina_id}</td>
                <td>${turma.horario}</td>
                <td>${turma.sala_aula}</td>
                <td>${turma.professor_id}</td>
                
                <td id="acoes"><button onclick="listarAlunosTurma(${turma.turma_id})">Listar Alunos</button>
                <button onclick="deletarTurma(${turma.turma_id})">Deletar</button></td>
            `;
                document.getElementById('tabelaTurmas').appendChild(row);
            });
        })
        .catch(error => {
            console.error('Erro ao obter a lista de turmas:', error);
        });
}

function listarAlunosTurma(turmaId) {
    fetch('http://localhost:3000/turmas/${turmaId}/alunos')
        .then(response => response.json())
        .then(data => {
            console.log('Alunos da turma:', data);
            // Aqui você pode fazer o que quiser com a lista de alunos da turma
        })
        .catch(error => {
            console.error('Erro ao obter a lista de alunos da turma:', error);
        });
}

function deletarTurma(turmaId) {
    fetch(`http://localhost:3000/turmas/${turmaId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Turma deletada com sucesso:', data);
            listarTurmas(); // Atualizar a lista após a exclusão
        })
        .catch(error => {
            console.error('Erro ao deletar turma:', error);
        });
}
function listarDisciplinasturma() {
    fetch('http://localhost:3000/disciplinas')
        .then(response => response.json())
        .then(data => {
            const disciplinaSelect = document.getElementById('disciplinaSelect');

            data.forEach(disciplina => {
                const option = document.createElement('option');
                option.value = disciplina.disciplina_id;
                option.textContent = disciplina.nome;
                disciplinaSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao listar disciplinas:', error);
        });
}
function listarProfessorturma() {
    fetch('http://localhost:3000/professores')
        .then(response => response.json())
        .then(data => {
            const professorSelect = document.getElementById('professorSelect');

            data.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.professor_id;
                option.textContent = professor.nome;
                professorSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao listar Professores:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    listarDisciplinasturma();
    listarProfessorturma();
    listarTurmas();
});
document.addEventListener('DOMContentLoaded', function() {
    listarProfessores();
});
document.addEventListener('DOMContentLoaded', function() {
    listarDisciplinas();
});
document.addEventListener('DOMContentLoaded', function() {
    listarAlunos();
});





