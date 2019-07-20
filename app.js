var app = require('./config/server');
 
 
/* Parametrizar a porta de escuta */
var server = app.listen(8080, function () {
    console.log('Servidor online');
});

/* recebendo requisiçoes http e socket e interpretando*/
var io = require('socket.io').listen(server)


// variavel global para ser acessada no controller 

app.set('io',io);

/* Criar a conexão por web socket*/
io.on('connection',function(socket){
  console.log('usuario conection');

  socket.on('disconnect',function(){
      console.log('usuario desconectou');
  });

// mensagem para quem enviou
socket.on('msgParaServidor',function(data){
    socket.emit('msgParaCliente',
        {
            apelido : data.apelido,
            mensagem : data.mensagem
        });
     socket.broadcast.emit('msgParaCliente',
        {
            apelido : data.apelido,
            mensagem : data.mensagem
        });
        // ATUALIZA PARTICIPANTE 

    if(data.apelido_atualizado_nos_clientes == 0){
        console.log(data.apelido_atualizado_nos_clientes);
        socket.emit('participanteParaCliente',
        {
            apelido : data.apelido,
        });
     socket.broadcast.emit('participanteParaCliente',
        {
            apelido : data.apelido,
        });
    }
});



}); // escutando eventos de connection;