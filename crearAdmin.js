const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Cliente = require('./models/Cliente');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/peluqueria', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const adminExists = await Cliente.findOne({ email: 'admin@bellaimagen.com' });

  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const hashedCliente = await bcrypt.hash('1234', 10);

    await Cliente.create({
      nombre: 'Administrador',
      email: 'admin@bellaimagen.com',
      password: hashedPassword,
      rol: 'admin'
    });

    await Cliente.create({
      nombre: 'Héctor Domínguez',
      email: 'hdominguez17@gmail.com',
      password: hashedCliente,
      rol: 'cliente'
    });

    console.log('✅ Admin y cliente creados correctamente');
  } else {
    console.log('ℹ️ El administrador ya existe');
  }

  mongoose.connection.close();
});

