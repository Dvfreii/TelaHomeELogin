// Fazendo conexão com o banco de dados
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432, // Porta padrão do PostgreSQL
    password: '1234' // Aqui coloca a senha que você cadastrou quando instalou o postgres
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

/////////////////////////////////////////////////////////////////////

// Rota para cadastrar aluno
app.post('/alunos', async (req, res) => {
    try {
        const { nome, data_nascimento, foto, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'INSERT INTO alunos (nome, data_nascimento, foto, endereco, telefone, email, senha) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nome, data_nascimento, foto, endereco, telefone, email, senha]
        );

        // Remover a propriedade "foto" da resposta
        // Ajustar o formato da data de nascimento
        const dataNascimento = new Date(result.rows[0].data_nascimento);
        const dataNascimentoFormatada = dataNascimento.toLocaleDateString('pt-BR'); // Altere para o formato desejado

        res.json({
            aluno_id: result.rows[0].aluno_id,
            nome: result.rows[0].nome,
            endereco: result.rows[0].endereco,
            telefone: result.rows[0].telefone,
            email: result.rows[0].email,
            senha: result.rows[0].senha,
            data_nascimento: dataNascimentoFormatada,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); // Enviar detalhes do erro como resposta
    }
});


// Rota para listar alunos
app.get('/alunos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM alunos');
        
        // Ajustar o formato da data de nascimento para cada aluno
        const alunosFormatados = result.rows.map(aluno => {
            const dataNascimento = new Date(aluno.data_nascimento);
            return {
                aluno_id: aluno.aluno_id,
                nome: aluno.nome,
                endereco: aluno.endereco,
                telefone: aluno.telefone,
                email: aluno.email,
                senha: aluno.senha,
                data_nascimento: dataNascimento.toLocaleDateString('pt-BR'), // Altere para o formato desejado
            };
        });

        res.json(alunosFormatados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); // Enviar detalhes do erro como resposta
    }
});


// Rota para mostrar um aluno por ID
app.get('/alunos/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const result = await pool.query('SELECT * FROM alunos WHERE aluno_id = $1', [alunoId]);

        if (result.rows.length === 0) {
            res.status(404).send('Aluno não encontrado');
        } else {
            res.json(result.rows[0]);
        }disciplina
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar um aluno existente
app.put('/alunos/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const { nome, data_nascimento, foto, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'UPDATE alunos SET nome = $1, data_nascimento = $2, foto = $3, endereco = $4, telefone = $5, email = $6, senha = $7 WHERE aluno_id = $8 RETURNING *',
            [nome, data_nascimento, foto, endereco, telefone, email, senha, alunoId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Aluno não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para deletar um aluno cadastrado
app.delete('/alunos/:id', async (req, res) => {
    try {
        const alunoId = req.params.id;
        const result = await pool.query('DELETE FROM alunos WHERE aluno_id = $1 RETURNING *', [alunoId]);

        if (result.rows.length === 0) {
            res.status(404).send('Aluno não encontrado');
        } else {
            res.json({ mensagem: 'Aluno apagado com sucesso' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para cadastrar professor
app.post('/professores', async (req, res) => {
    try {
        const { nome, data_nascimento, foto, siape, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'INSERT INTO professores (nome, data_nascimento, foto, siape, endereco, telefone, email, senha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nome, data_nascimento, foto, siape, endereco, telefone, email, senha]
        );
        res.json(result.rows[0]);
        const dataNascimento = new Date(result.rows[0].data_nascimento);
        const dataNascimentoFormatada = dataNascimento.toLocaleDateString('pt-BR'); // Altere para o formato desejado

        res.json({
            professor_id: result.rows[0].professor_id,
            nome: result.rows[0].nome,
            siape: result.rows[0].siape,
            endereco: result.rows[0].endereco,
            telefone: result.rows[0].telefone,
            email: result.rows[0].email,
            senha: result.rows[0].senha,
            data_nascimento: dataNascimentoFormatada,
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar todos os professores
app.get('/professores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM professores');
        const professoresFormatados = result.rows.map(professor => {
            const dataNascimento = new Date(professor.data_nascimento);
            return {
                professor_id: professor.professor_id,
                nome: professor.nome,
                siape: professor.siape,
                endereco: professor.endereco,
                telefone: professor.telefone,
                email: professor.email,
                senha: professor.senha,
                data_nascimento: dataNascimento.toLocaleDateString('pt-BR'), // Altere para o formato desejado
            };
        });

        res.json(professoresFormatados);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar um professor por ID
app.get('/professores/:id', async (req, res) => {
    try {
        const professorId = req.params.id;
        const result = await pool.query('SELECT * FROM professores WHERE professor_id = $1', [professorId]);

        if (result.rows.length === 0) {
            res.status(404).send('Professor não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar um professor existente
app.put('/professores/:id', async (req, res) => {
    try {
        const professorId = req.params.id;
        const { nome, data_nascimento, foto, siape, endereco, telefone, email, senha } = req.body;
        const result = await pool.query(
            'UPDATE professores SET nome = $1, data_nascimento = $2, foto = $3, siape = $4, endereco = $5, telefone = $6, email = $7, senha = $8 WHERE professor_id = $9 RETURNING *',
            [nome, data_nascimento, foto, siape, endereco, telefone, email, senha, professorId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Professor não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para deletar um professor cadastrado
app.delete('/professores/:id', async (req, res) => {
    try {
        const professorId = req.params.id;
        const result = await pool.query('DELETE FROM professores WHERE professor_id = $1 RETURNING *', [professorId]);

        if (result.rows.length === 0) {
            res.status(404).send('Professor não encontrado');
        } else {
            res.json({ mensagem: 'Professor apagado com sucesso' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para cadastrar turma
app.post('/turmas', async (req, res) => {
    try {
        const { disciplina_id, horario, sala_aula, professor_id } = req.body;
        const result = await pool.query(
            'INSERT INTO turmas (disciplina_id, horario, sala_aula, professor_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [disciplina_id, horario, sala_aula, professor_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar todas as turmas
app.get('/turmas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM turmas');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar uma turma por ID
app.get('/turmas/:id', async (req, res) => {
    try {
        const turmaId = req.params.id;
        const result = await pool.query('SELECT * FROM turmas WHERE turma_id = $1', [turmaId]);

        if (result.rows.length === 0) {
            res.status(404).send('Turma não encontrada');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar uma turma existente
app.put('/turmas/:id', async (req, res) => {
    try {
        const turmaId = req.params.id;
        const { disciplina_id, horario, sala_aula, professor_id } = req.body;
        const result = await pool.query(
            'UPDATE turmas SET disciplina_id = $1, horario = $2, sala_aula = $3, professor_id = $4 WHERE turma_id = $5 RETURNING *',
            [disciplina_id, horario, sala_aula, professor_id, turmaId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Turma não encontrada');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para deletar uma turma cadastrada
app.delete('/turmas/:id', async (req, res) => {
    try {
        const turmaId = req.params.id;
        const result = await pool.query('DELETE FROM turmas WHERE turma_id = $1 RETURNING *', [turmaId]);

        if (result.rows.length === 0) {
            res.status(404).send('Turma não encontrada');
        } else {
            res.json({ mensagem: 'Turma apagada com sucesso' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para cadastrar disciplina
app.post('/disciplinas', async (req, res) => {
    try {
        const { nome, carga_horaria } = req.body;    
        const result = await pool.query(
            'INSERT INTO disciplinas (nome, carga_horaria) VALUES ($1, $2) RETURNING *', 
            [nome, carga_horaria] 
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});


// Rota para mostrar todas as disciplinas
app.get('/disciplinas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM disciplinas');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});
// Rota para deletar uma disciplina
app.delete('/disciplinas/:id', async (req, res) => {
    try {
        const disciplinaId = req.params.id;

        // Exclua as notas relacionadas à disciplina
        await pool.query(
            'DELETE FROM notas WHERE disciplina_id = $1',
            [disciplinaId]
        );

        // Agora, exclua a disciplina
        const result = await pool.query(
            'DELETE FROM disciplinas WHERE disciplina_id = $1 RETURNING *',
            [disciplinaId]
        );

        res.json({ mensagem: 'Disciplina deletada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});


/////////////////////////////////////////////////////////////////////

// Rota para matricular um aluno em uma disciplina
app.post('/matriculas', async (req, res) => {
    try {
        const { aluno_id, disciplina_id } = req.body;

        // Verifica se o aluno e a disciplina existem antes de realizar a matrícula
        const alunoExists = await pool.query('SELECT * FROM alunos WHERE aluno_id = $1', [aluno_id]);
        const disciplinaExists = await pool.query('SELECT * FROM disciplinas WHERE disciplina_id = $1', [disciplina_id]);

        if (alunoExists.rows.length === 0 || disciplinaExists.rows.length === 0) {
            res.status(404).send('Aluno ou disciplina não encontrados');
            return;
        }

        // Verifica se o aluno já está matriculado na disciplina
        const matriculaExists = await pool.query(
            'SELECT * FROM matriculas WHERE aluno_id = $1 AND disciplina_id = $2',
            [aluno_id, disciplina_id]
        );

        if (matriculaExists.rows.length > 0) {
            res.status(400).send('Aluno já matriculado nesta disciplina');
            return;
        }

        // Realiza a matrícula
        const result = await pool.query(
            'INSERT INTO matriculas (aluno_id, disciplina_id) VALUES ($1, $2) RETURNING *',
            [aluno_id, disciplina_id]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar a matrícula de um aluno em uma disciplina
app.get('/matriculas/:aluno_id/:disciplina_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const disciplinaId = req.params.disciplina_id;

        const result = await pool.query(
            'SELECT * FROM matriculas WHERE aluno_id = $1 AND disciplina_id = $2',
            [alunoId, disciplinaId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Matrícula não encontrada para o aluno nesta disciplina');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar a matrícula de um aluno em uma disciplina
app.put('/matriculas/:aluno_id/:disciplina_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const disciplinaId = req.params.disciplina_id;

        // Verifica se a matrícula existe antes de realizar a atualização
        const matriculaExists = await pool.query(
            'SELECT * FROM matriculas WHERE aluno_id = $1 AND disciplina_id = $2',
            [alunoId, disciplinaId]
        );

        if (matriculaExists.rows.length === 0) {
            res.status(404).send('Matrícula não encontrada para o aluno nesta disciplina');
            return;
        }

        // Realiza a atualização na matrícula
        const { novo_aluno_id, nova_disciplina_id } = req.body;
        const result = await pool.query(
            'UPDATE matriculas SET aluno_id = $1, disciplina_id = $2 WHERE aluno_id = $3 AND disciplina_id = $4 RETURNING *',
            [novo_aluno_id, nova_disciplina_id, alunoId, disciplinaId]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para deletar a matrícula de um aluno em uma disciplina
app.delete('/matriculas/:aluno_id/:disciplina_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const disciplinaId = req.params.disciplina_id;

        // Verifica se a matrícula existe antes de realizar a exclusão
        const matriculaExists = await pool.query(
            'SELECT * FROM matriculas WHERE aluno_id = $1 AND disciplina_id = $2',
            [alunoId, disciplinaId]
        );

        if (matriculaExists.rows.length === 0) {
            res.status(404).send('Matrícula não encontrada para o aluno nesta disciplina');
            return;
        }

        // Realiza a exclusão da matrícula
        const result = await pool.query(
            'DELETE FROM matriculas WHERE aluno_id = $1 AND disciplina_id = $2 RETURNING *',
            [alunoId, disciplinaId]
        );

        res.json({ mensagem: 'Matrícula deletada com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para cadastrar nota de um aluno em uma disciplina
app.post('/notas', async (req, res) => {
    try {
        const { aluno_id, disciplina_id, nota } = req.body;

        // Verifica se o aluno está matriculado na disciplina
        const matriculaExists = await pool.query(
            'SELECT * FROM matriculas WHERE aluno_id = $1 AND disciplina_id = $2',
            [aluno_id, disciplina_id]
        );

        if (matriculaExists.rows.length === 0) {
            res.status(400).send('Aluno não está matriculado nesta disciplina');
            return;
        }

        // Realiza o cadastro da nota
        const result = await pool.query(
            'INSERT INTO notas (aluno_id, disciplina_id, nota) VALUES ($1, $2, $3) RETURNING *',
            [aluno_id, disciplina_id, nota]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar todas as notas de um aluno
app.get('/notas/:aluno_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const result = await pool.query('SELECT * FROM notas WHERE aluno_id = $1', [alunoId]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar as notas de uma disciplina específica de um aluno
app.get('/notas/:aluno_id/:disciplina_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const disciplinaId = req.params.disciplina_id;

        // Verifica se o aluno está matriculado na disciplina
        const matriculaExists = await pool.query(
            'SELECT * FROM matriculas WHERE aluno_id = $1 AND disciplina_id = $2',
            [alunoId, disciplinaId]
        );

        if (matriculaExists.rows.length === 0) {
            res.status(400).send('Aluno não está matriculado nesta disciplina');
            return;
        }

        // Obtém as notas da disciplina específica
        const result = await pool.query(
            'SELECT * FROM notas WHERE aluno_id = $1 AND disciplina_id = $2',
            [alunoId, disciplinaId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para calcular a média de um aluno em todas as disciplinas
app.get('/media/:aluno_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;

        // Obter todas as disciplinas
        const disciplinasResult = await pool.query('SELECT disciplina_id FROM disciplinas');
        const disciplinas = disciplinasResult.rows;

        // Calcular a média para cada disciplina
        const medias = [];
        for (const disciplina of disciplinas) {
            const disciplinaId = disciplina.disciplina_id;

            const result = await pool.query(
                'SELECT AVG(nota) as media FROM notas WHERE aluno_id = $1 AND disciplina_id = $2',
                [alunoId, disciplinaId]
            );

            if (result.rows.length > 0 && result.rows[0].media !== null) {
                medias.push({
                    disciplina_id: disciplinaId,
                    media: result.rows[0].media,
                });
            }
        }

        res.json(medias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para calcular a média de um aluno em uma disciplina
app.get('/media/:aluno_id/:disciplina_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const disciplinaId = req.params.disciplina_id;

        const result = await pool.query(
            'SELECT AVG(nota) as media FROM notas WHERE aluno_id = $1 AND disciplina_id = $2',
            [alunoId, disciplinaId]
        );

        if (result.rows.length > 0 && result.rows[0].media !== null) {
            res.json({
                aluno_id: alunoId,
                disciplina_id: disciplinaId,
                media: result.rows[0].media,
            });
        } else {
            res.status(404).send('Média não encontrada para o aluno nesta disciplina');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para registrar presença ou falta de um aluno em uma aula
app.post('/presenca', async (req, res) => {
    try {
        const { aluno_id, aula_id, presenca, justificativa } = req.body;
        
        // Verifica se o aluno e a aula existem antes de registrar a presença
        const alunoExists = await pool.query('SELECT * FROM alunos WHERE aluno_id = $1', [aluno_id]);
        const aulaExists = await pool.query('SELECT * FROM aulas WHERE aula_id = $1', [aula_id]);

        if (alunoExists.rows.length === 0 || aulaExists.rows.length === 0) {
            res.status(404).send('Aluno ou aula não encontrados');
            return;
        }

        const result = await pool.query(
            'INSERT INTO presencas (aluno_id, aula_id, presenca, justificativa) VALUES ($1, $2, $3, $4) RETURNING *',
            [aluno_id, aula_id, presenca, justificativa]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar a presença e justificativa de um aluno em uma aula
app.get('/presenca/:aluno_id/:aula_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;
        const aulaId = req.params.aula_id;

        const result = await pool.query(
            'SELECT * FROM presencas WHERE aluno_id = $1 AND aula_id = $2',
            [alunoId, aulaId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Presença não encontrada para o aluno nesta aula');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para mostrar o histórico escolar de um aluno
app.get('/historico-escolar/:aluno_id', async (req, res) => {
    try {
        const alunoId = req.params.aluno_id;

        // mostrar anos distintos em que o aluno teve notas
        const anosResult = await pool.query(
            'SELECT DISTINCT EXTRACT(YEAR FROM data_matricula) as ano FROM matriculas WHERE aluno_id = $1',
            [alunoId]
        );

        const historicoEscolar = [];

        for (const anoObj of anosResult.rows) {
            const ano = anoObj.ano;

            // Obter notas do aluno para o ano específico
            const notasResult = await pool.query(
                'SELECT disciplinas.disciplina_id, AVG(nota) as media FROM notas ' +
                'JOIN matriculas ON notas.aluno_id = matriculas.aluno_id ' +
                'JOIN disciplinas ON notas.disciplina_id = disciplinas.disciplina_id ' +
                'WHERE notas.aluno_id = $1 AND EXTRACT(YEAR FROM matriculas.data_matricula) = $2 ' +
                'GROUP BY disciplinas.disciplina_id',
                [alunoId, ano]
            );

            historicoEscolar.push({
                ano: ano,
                notas: notasResult.rows,
            });
        }

        res.json(historicoEscolar);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

/////////////////////////////////////////////////////////////////////

// Rota para cadastrar um evento
app.post('/eventos', async (req, res) => {
    try {
        const { titulo, descricao, data_inicio, data_fim } = req.body;
        const result = await pool.query(
            'INSERT INTO eventos (titulo, descricao, data_inicio, data_fim) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, descricao, data_inicio, data_fim]
        );
        const dataInicio = new Date(result.rows[0].data_inicio);
        const dataInicioForm = dataInicio.toLocaleDateString('pt-BR'); // Altere para o formato desejado
        const dataFim = new Date(result.rows[0].data_fim);  
        const dataFimForm = dataFim.toLocaleDateString('pt-BR'); // Altere para o formato desejado
        res.json({
            evento_id: result.rows[0].evento_id,
            titulo: result.rows[0].titulo,
            descricao: result.rows[0].descricao,
            data_inicio: dataInicioForm,
            data_fim: dataFimForm,
            
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para mostrar todos os eventos
app.get('/eventos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM eventos');
            const eventosFormatados = result.rows.map(eventos => {
            const dataInicio = new Date(eventos.data_inicio);
            const dataFim = new Date(eventos.data_fim);
            return {
                evento_id: eventos.evento_id, 
                titulo: eventos.titulo,
                descricao: eventos.descricao,
                data_fim: dataFim.toLocaleDateString('pt-BR'),
                data_inicio: dataInicio.toLocaleDateString('pt-BR'), // Altere para o formato desejado
            };
        });

        res.json(eventosFormatados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); 
    }
});

// Rota para mostrar um evento por ID
app.get('/eventos/:id', async (req, res) => {
    try {
        const eventoId = req.params.id;
        const result = await pool.query('SELECT * FROM eventos WHERE evento_id = $1', [eventoId]);

        if (result.rows.length === 0) {
            res.status(404).send('Evento não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para atualizar um evento existente
app.put('/eventos/:id', async (req, res) => {
    try {
        const eventoId = req.params.id;
        const { titulo, descricao, data_inicio, data_fim } = req.body;
        const result = await pool.query(
            'UPDATE eventos SET titulo = $1, descricao = $2, data_inicio = $3, data_fim = $4 WHERE evento_id = $5 RETURNING *',
            [titulo, descricao, data_inicio, data_fim, eventoId]
        );

        if (result.rows.length === 0) {
            res.status(404).send('Evento não encontrado');
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

// Rota para apagar um evento
app.delete('/eventos/:id', async (req, res) => {
    try {
        const eventoId = req.params.id;
        const result = await pool.query('DELETE FROM eventos WHERE evento_id = $1 RETURNING *', [eventoId]);

        if (result.rows.length === 0) {
            res.status(404).send('Evento não encontrado');
        } else {
            res.json({ mensagem: 'Evento apagado com sucesso' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
