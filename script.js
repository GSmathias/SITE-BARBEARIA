
    document.getElementById('formReserva').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    
        // Captura os valores inseridos pelo usuário
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const data = document.getElementById('data').value;
        const hora = document.getElementById('hora').value;
    
        // Valida se todos os campos foram preenchidos
        if (!nome || !telefone || !data || !hora) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
    
        // Enviar os dados para o backend via POST
        fetch('http://localhost:3000/reservar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, telefone, data, hora }) // Envia os dados no corpo da requisição
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Exibe a mensagem de confirmação
                document.getElementById('dataConfirmada').textContent = data.data.data;
                document.getElementById('horaConfirmada').textContent = data.data.hora;
                document.getElementById('formReserva').reset(); // Limpa o formulário após o envio
                document.getElementById('confirmacao').style.display = 'block'; // Mostra a confirmação
            } else {
                alert('Erro ao realizar a reserva! Verifique as informações.');
            }
        })
        .catch(error => {
            console.error('Erro ao conectar ao servidor:', error);
        });
    });
    