const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


// Importa o pacote dotenv
require('dotenv').config();

const app = express();
const port = 3000;

// Configura o middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//URL de conexão do MongoDB
const mongoDB = process.env.MONGODB_URI;
console.log(mongoDB);

// Função para conectar ao MongoDB usando async/await
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro de conexão ao MongoDB:', error);
  }
};

connectDB();

// Definindo o modelo do Mongoose
const Schema = mongoose.Schema;
const FormSchema = new Schema({
  nomeJogador: {
    type: String,
    required: true
  },
  emailJogador: {
    type: String,
    required: true,
    unique: true // Garante que o email seja único
  },
  usuarioJogador: {
    type: String,
    required: true,
    unique: true // Garante que o usuário seja único
  },
  senhaJogador: {
    type: String,
    required: true
  },
  idadeJogador: {
    type: Number,
    required: true
  },
  generoJogador: {
    type: String,
    required: true
  },
  conhecimentoJogador: {
    type: String,
    required: true
  },
  interesseJogador: {
    type: String,
    required: true
  }
});
const Form = mongoose.model('Form', FormSchema);

// Rota para processar os dados do formulário usando async/await
app.post('/submit-form', async (req, res) => {
  try {
    console.log('Corpo da requisição:', req.body);

    // Verifica se o email já existe no banco de dados
    const existingEmail = await Form.findOne({ emailJogador: req.body.emailJogador });
    if (existingEmail) {
      return res.status(400).send('Este email já está registrado.');
    }

    // Verifica se o usuário já existe no banco de dados
    const existingUser = await Form.findOne({ usuarioJogador: req.body.usuarioJogador });
    if (existingUser) {
      return res.status(400).send('Este usuário já está registrado.');
    }

    const formData = new Form({
      nomeJogador: req.body.nomeJogador,
      emailJogador: req.body.emailJogador,
      usuarioJogador: req.body.usuarioJogador,
      senhaJogador: req.body.senhaJogador,
      idadeJogador: req.body.idadeJogador,
      generoJogador: req.body.generoJogador,
      conhecimentoJogador: req.body.conhecimentoJogador,
      interesseJogador: req.body.interesseJogador
    });

    console.log('Dados a serem salvos:', formData);

    await formData.save();
    console.log('Dados salvos com sucesso');

    res.status(200).send('Dados salvos com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).send('Erro ao salvar os dados.');
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
