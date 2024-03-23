import asyncio
import socketio
import serial

sio = socketio.AsyncClient()

# Conectar con el servidor Socket.IO
async def connect_socketio():
    await sio.connect('http://localhost:8765')

# Manejar eventos de conexión establecida con el servidor Socket.IO
@sio.event
async def connect():
    print('Conectado al servidor Socket.IO')

# Manejar eventos de desconexión con el servidor Socket.IO
@sio.event
async def disconnect():
    print('Desconectado del servidor Socket.IO')


arduino_serial = serial.Serial('COM10', 9600, timeout=1)


async def send_data_to_client(data):
    if data:
        await sio.emit('data', data)
        print(f"Enviado al cliente: {data} cm")


@sio.event
async def command_from_client(message):
    print(f"Recibido del cliente: {message}")
    if message in ["0", "1"]:
        arduino_serial.write(message.encode())


async def read_from_serial_and_send():
    while True:
        if arduino_serial.inWaiting() > 0:
            data = arduino_serial.readline().decode().strip()
            print(f"Dato recibido del Arduino: {data}")  # Añadido para depuración
            if data.startswith('D'):
                try:
                    distance = float(data[1:])  # Cambiado para capturar el resto del string como float
                    print('distancia', distance)  # Añadido para depuración
                    await send_data_to_client({'distance': distance})  # Cambiado para enviar un objeto
                except ValueError as e:
                    print(f"Error al procesar la distancia: {e}")
            else:
                print(f"Formato no reconocido: {data}")
        await asyncio.sleep(0.1)

    while True:
        if arduino_serial.inWaiting() > 0:
            data = arduino_serial.readline().decode().strip()
            # Asegúrate de que los datos se puedan dividir correctamente
            if data.startswith('D') and len(data.split()) > 1:
                try:
                    # Intenta convertir el segundo elemento dividido en un entero
                    distance = int(data.split()[1])
                    await send_data_to_client(distance)
                except ValueError:
                    # Si la conversión falla, imprime un error
                    print(f"No se pudo convertir {data.split()[1]} a int")
            else:
                print(f"Distancia {data}") # imprime la distancia coreectamente
        await asyncio.sleep(0.1)


async def main():
    await connect_socketio()
    await asyncio.gather(
        sio.wait(),
        read_from_serial_and_send()
    )

if __name__ == "__main__":
    asyncio.run(connect_socketio())
