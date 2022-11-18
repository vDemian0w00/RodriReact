import { pool } from "../DB/pool.js";

export const getUsers = async (req, res) => {
  // const [rows] = await pool.query("SELECT * FROM usuarios");
};

export const createUser = async (req, res) => {
  const { firstname, lastname, email, password, confirmpass } = req.body;

  if (!firstname || !lastname || !email || !password || !confirmpass) {
    res.status(400).send("Todos los campos son obligatorios");
  }
  if (password !== confirmpass) {
    res.status(400).send("Las contraseñas no coinciden");
  }

  const [rows] = await pool.query("SELECT * FROM usuarios WHERE correoUsu = ?", [email]);
  if(rows.length > 0) {
    req.session.data = {message: "El correo ya está registrado"};
    req.session.save((err)=>{
      if(!err){
        res.redirect("/login");
      }else{
        res.status(500).send("Error al guardar la sesión");
      }
    })
    return;
  }

  const result = await pool.query(
    "INSERT INTO usuarios(nombreUsu, apellidosUsu, correoUsu, contraseñaUsu, imgurlUsu, rolUsu) values (?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, password, req.file.filename, "alumno"]
  );

  req.session.data = { message: "Para continuar, Inicie Sesión" };

  req.session.save((err) => {
    if (!err) {
      res.redirect("/login");
    } else {
      res.status(400).send("Error al crear usuario");
    }
  });
};

export const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;
  if (!correo || !contraseña) {
    res.status(400).send("Todos los campos son obligatorios");
  }

  const [rows] = await pool.query("SELECT * FROM usuarios WHERE correoUsu = ? and contraseñaUsu = ?;", [correo, contraseña]);

  if (rows.length > 0) {
    req.session.user = rows[0];
    req.session.save((err) => {
      if (!err) {
        res.redirect("/app");
      } else {
        res.status(400).send("Error al iniciar sesión");
      }
    });
  } else {
    req.session.data = { message: "Correo o contraseña incorrectos"};
    req.session.save((err) => {
      if (!err) {
        res.redirect("/login");
      } else {
        res.status(400).send("Error al iniciar sesión");
      }
    });
  }
};

export const getUser = async (req, res) => {};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
