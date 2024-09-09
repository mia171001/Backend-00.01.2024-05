const jwt = require('jsonwebtoken');

// Controlador que maneja el login
const loginUser = (req, res) => {
  // Generar el token JWT
  const token = jwt.sign(
    { id: req.user.id, name: req.user.name },
    process.env.SECRET_TOKEN,
    { expiresIn: '24h' }
  );

  // Redirigir al dashboard del frontend (en el puerto 5501)
  res.redirect(`http://127.0.0.1:5501/Hackaton15/SV73101361-Final/public/dashboard.html?token=${token}`);
};

module.exports = { loginUser };
