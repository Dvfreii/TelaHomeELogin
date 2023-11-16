CREATE TABLE alunos (
    aluno_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    foto VARCHAR(255),
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);
CREATE TABLE disciplinas (
    disciplina_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    carga_horaria INTEGER NOT NULL
);

CREATE TABLE professores (
    professor_id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    foto VARCHAR(255),
    siape VARCHAR(20) UNIQUE NOT NULL,
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);


CREATE TABLE turmas (
    turma_id SERIAL PRIMARY KEY,
    disciplina_id INTEGER REFERENCES disciplinas(disciplina_id) NOT NULL,
    horario VARCHAR(50) NOT NULL,
    sala_aula VARCHAR(20) NOT NULL,
    professor_id INTEGER REFERENCES professores(professor_id) NOT NULL
);

CREATE TABLE notas (
    nota_id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES alunos(aluno_id) NOT NULL,
    disciplina_id INTEGER REFERENCES disciplinas(disciplina_id) NOT NULL,
    nota NUMERIC(4,2) NOT NULL
);

CREATE TABLE matriculas (
    matricula_id SERIAL PRIMARY KEY,
    aluno_id INT REFERENCES alunos(aluno_id) ON DELETE CASCADE,
    disciplina_id INT REFERENCES disciplinas(disciplina_id) ON DELETE CASCADE,
    data_matricula DATE
);


CREATE TABLE eventos (
    evento_id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL
);

CREATE TABLE aulas (
    aula_id SERIAL PRIMARY KEY,
    turma_id INTEGER REFERENCES turmas(turma_id) NOT NULL,
    data_aula TIMESTAMP NOT NULL,
    conteudo TEXT
);

CREATE TABLE presencas (
    presenca_id SERIAL PRIMARY KEY,
    aluno_id INTEGER REFERENCES alunos(aluno_id) NOT NULL,
    aula_id INTEGER REFERENCES aulas(aula_id) NOT NULL,
    presenca BOOLEAN NOT NULL,
    justificativa TEXT
);
