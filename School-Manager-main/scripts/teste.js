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
      events: 'eventos.json' // Carrega os eventos a partir de um arquivo JSON
  });

  calendar.render();
}

function carregarEventos(fetchInfo) {
    return fetch('http://localhost:3000/eventos')
        .then(response => response.json())
        .then(data => {
            var eventosFormatados = data.map(evento => {
                return {
                    id: evento.id,
                    title: evento.titulo,
                    description: evento.descricao,
                    start: new Date(evento.data_inicio).toISOString().split('T')[0], // Formatação da data de início
                    end: new Date(evento.data_fim).toISOString().split('T')[0], // Formatação da data de fim
                };
            });
            return eventosFormatados;
        })
        .catch(error => {
            console.error('Erro ao carregar eventos:', error);
            return [];
        });
}
