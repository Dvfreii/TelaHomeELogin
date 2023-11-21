document.addEventListener('DOMContentLoaded', function() {
    carregarCalendario();
});

function carregarCalendario() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'pt-br',
        timeZone: 'UTC',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: function(fetchInfo, successCallback, failureCallback) {
            carregarEventos()
                .then(eventos => {
                    const eventosTransformados = transformarFormato(eventos);
                    successCallback(eventosTransformados);
                })
                .catch(error => {
                    console.error('Erro ao carregar eventos:', error);
                    failureCallback(error);
                });
        }
    });

    calendar.render();
}

function carregarEventos() {
    return fetch('http://localhost:3000/eventos')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao carregar eventos:', error);
            return [];
        });
}

function transformarFormato(eventos) {
    return eventos.map(evento => {
        return {
            id: evento.id,
            title: evento.titulo,
            description: evento.descricao,
            start: new Date(evento.data_inicio).toISOString().split('T')[0], // Formatação da data de início
            end: new Date(evento.data_fim).toISOString().split('T')[0], // Formatação da data de fim
        };
    });
}
