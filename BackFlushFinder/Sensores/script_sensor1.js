document.addEventListener("DOMContentLoaded", () => {
    const socket = io('http://localhost:8765');

    socket.on('connect', () => console.log('Conectado al servidor Socket.IO'));

    socket.on('data', (data) => {
      const distance = parseFloat(data);
      console.log("Distancia recibida:", distance);
      updateTable(distance);
      console.log("Distancia recivida", distance);
    });

    function updateTable(distance) {
      const time = new Date().toLocaleTimeString();
      const tableRow = `<tr><td>${time}</td><td>${distance}</td></tr>`;
      $('#dataBody').append(tableRow);
    }
}); 