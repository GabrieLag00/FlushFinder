import asyncio
import socketio
import serial

# Crear una instancia de Socket.IO
sio = socketio.AsyncClient()

# Conectar con el servidor Socket.IO
async def connect_socketio():
    await sio.connect('http://localhost:8655')


# Manejar eventos de conexión establecida con el servidor Socket.IO
@sio.event
async def connect():
    print('Conectado al servidor Socket.IO')

# Manejar eventos de desconexión con el servidor Socket.IO
@sio.event
async def disconnect():
    print('Desconectado del servidor Socket.IO')

# Crear conexión serial con Arduino
arduino_serial = serial.Serial('COM10', 9600, timeout=1)

# Función para enviar datos al cliente a través de Socket.IO
async def send_data_to_client(data):
    if data:
        await sio.emit('data', data)  # Asegúrate de que esto coincide con el servidor Node.js
        print(f"Enviado al cliente: {data} cm")

# Función para recibir datos del cliente y enviarlos al Arduino
@sio.event
async def command_from_client(message):
    print(f"Recibido del cliente: {message}")
    if message in ["0", "1"]:
        arduino_serial.write(message.encode())

# Función para leer datos del Arduino y enviarlos al cliente
# Función para procesar los datos de distancia del Arduino y enviarlos al cliente
async def read_from_serial_and_send():
    while True:
        if arduino_serial.inWaiting() > 0:
            data = arduino_serial.readline().decode().strip()
            # Asegúrate de que los datos tienen el formato esperado
            data_parts = data.split()
            if len(data_parts) >= 2:
                try:
                    distance = int(data_parts[1])
                    await send_data_to_client(distance)
                except ValueError:
                    # Manejar el caso en que la conversión a int falla
                    print(f"No se pudo convertir a int: {data_parts[1]}")
            else:
                print(f"Distancia: {data}")
        await asyncio.sleep(0.1)


async def main():
    await connect_socketio()
    await asyncio.gather(
        sio.wait(),
        read_from_serial_and_send()
    )

if __name__ == "__main__":
    print("Iniciando servidor Socket.IO...")
    asyncio.run(main())
