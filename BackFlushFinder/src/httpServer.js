import http from 'http';

export function startHTTPServer(app, port) {
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Servidor HTTP iniciado en el puerto ${port}`);
  });
}

