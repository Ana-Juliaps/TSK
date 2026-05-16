function validarSeguir(req, res, next) {
  if (!req.body.userId) {
    return res.status(400).json({ error: 'userId é obrigatório' });
  }
  next();
}

module.exports = { validarSeguir };
