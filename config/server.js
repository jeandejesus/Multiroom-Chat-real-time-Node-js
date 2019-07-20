   // Importar modulo do framework express
   var express = require('express');
 
   // Importar o módulo do consign
   var consign = require('consign');
    
   // Importar o body-parser
   var bodyParser = require('body-parser');
    
   // Importar módulo do express validator
   var expressValidator = require('express-validator');
    
   // Iniciar objeto do express
   // É essa instacia que o arquivos app.js espera para iniciar o servidor, por isso precisamos exportar;
   var app = express();
    
   // Setar as variaveis 'view engine' e 'views' do express
   app.set('view engine', 'ejs');
   app.set('views', './app/views');
    
   // Configurar o middleware express.static
   app.use(express.static('./app/public'));
    
   // Configurar o middleware body-parser
   app.use(bodyParser.urlencoded({ extended: true }));
    
   // Configurar o middleware express-validator
   app.use(expressValidator());
    
   // Efetua o autoload das rotas, dos models e dos controllers para o objeto app
   consign()
       .include('app/routes')
       .then('app/models')
       .then('app/controllers')
       .into(app);
    
   // Exportar o objeto app
   module.exports = app;