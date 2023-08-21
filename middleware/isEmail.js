const isEmail = (req, res, next) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = req.body.email;

  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid Email Address");
  }
  next();
};
