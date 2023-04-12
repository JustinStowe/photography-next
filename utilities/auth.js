export function createJWT(user) {
  return jwt.sign({ user }, process.env.Secret, { expiresIn: "24h" });
}

export function checkToken(req, res) {
  res.json(req.exp);
}
