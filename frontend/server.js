const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
  // Se acessar / ou /index.html, serve o index.html
  let filePath = req.url === '/' ? '/index.html' : req.url;
  
  // Remove query strings
  filePath = filePath.split('?')[0];
  
  // Constrói o caminho completo
  const fullPath = path.join(__dirname, filePath);
  
  // Tenta ler o arquivo
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      // Se arquivo não existe, serve index.html (SPA - Single Page Application)
      if (err.code === 'ENOENT') {
        fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        });
      } else {
        res.writeHead(500);
        res.end(`Erro: ${err}`);
      }
    } else {
      // Define o tipo de conteúdo correto
      let contentType = 'text/html';
      if (filePath.endsWith('.css')) contentType = 'text/css';
      if (filePath.endsWith('.js')) contentType = 'application/javascript';
      if (filePath.endsWith('.json')) contentType = 'application/json';
      if (filePath.endsWith('.png')) contentType = 'image/png';
      if (filePath.endsWith('.jpg')) contentType = 'image/jpeg';
      if (filePath.endsWith('.gif')) contentType = 'image/gif';
      if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
      if (filePath.endsWith('.woff2')) contentType = 'font/woff2';
      if (filePath.endsWith('.woff')) contentType = 'font/woff';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 JUMP SaaS Frontend Server Ready!   ║
╚════════════════════════════════════════╝

✅ Servidor rodando em: http://localhost:${PORT}
✅ Acesse: http://localhost:${PORT}

Para parar o servidor: Ctrl+C

  `);
});
