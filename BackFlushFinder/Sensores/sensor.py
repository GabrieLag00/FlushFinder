import asyncio
import socketio
import serial

sio = socketio.AsyncClient()
arduino_serial = serial.Serial('COM10', 9600, timeout=1)

async def send_data_to_client(distance, status):
    await sio.emit('bathroomStatus', {'distance': distance, 'status': status})
    print(f"Enviado al cliente: Distancia={distance} cm, Estado={status}")

async def read_from_serial_and_send():
    while True:
        if arduino_serial.inWaiting() > 0:
            data_str = arduino_serial.readline().decode().strip()
            if data_str.startswith('D'):
                try:
                    distance = float(data_str[1:])
                    status = "El baño está libre" if distance >= 10 else "El baño está ocupado"
                    await send_data_to_client(distance, status)
                    print(status, distance)
                except ValueError as e:
                    print(f"Error al procesar la distancia: {e}")
        await asyncio.sleep(0.1)

async def connect_socketio():
    await sio.connect('http://localhost:8765')
    print('Conectado al servidor Socket.IO')
    await read_from_serial_and_send()

if __name__ == "__main__":
    asyncio.run(connect_socketio())
