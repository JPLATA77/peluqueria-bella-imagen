const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Cliente = require('./models/Cliente');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/peluqueria', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  try {
    const adminExists = await Cliente.findOne({ email: 'admin@bellaimagen.com' });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const hashedCliente = await bcrypt.hash('1234', 10);

      await Cliente.create({
        nombre: 'Administrador General',
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
      console.log('ℹ El administrador ya existe');
    }
  } catch (error) {
    console.error('❌ Error durante la creación del admin/cliente:', error.message);
  } finally {
    await mongoose.disconnect();
  }
})
.catch(err => {
  console.error('❌ Error al conectar con MongoDB:', err.message);
});

