require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Cliente = require('./models/Cliente');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const email = 'admin@bellaimagen.com';
  const yaExiste = await Cliente.findOne({ email });

  if (yaExiste) {
    console.log('⚠️ El usuario admin ya existe');
  } else {
    const password = await bcrypt.hash('admin123', 10);
    const nuevoAdmin = new Cliente({
      nombre: 'Administrador General',
      email: email,
      password: password,
      rol: 'admin'
    });
    await nuevoAdmin.save();
    console.log('✅ Usuario admin creado exitosamente');
  }

  mongoose.disconnect();
});

