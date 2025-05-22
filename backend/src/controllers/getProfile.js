export const getProfile = (req, res) => {
  res.json({
    message: "Perfil acessado com sucesso",
    user: req.user, // isso vem do token decodigicado
  });
};
