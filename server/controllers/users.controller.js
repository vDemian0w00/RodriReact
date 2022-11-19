import { pool } from "../DB/pool.js";

export const getUsers = async (req, res) => {
  // const [rows] = await pool.query("SELECT * FROM usuarios");
};

export const createUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword, image } =
    req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    res.status(400).send("Todos los campos son obligatorios");
  }
  if (password !== confirmPassword) {
    res.status(400).send("Las contraseñas no coinciden");
  }

  const [rows] = await pool.query("SELECT * FROM usuarios WHERE correoUsu = ?", [
    email,
  ]);
  if (rows.length > 0) {
    return res.send({ message: "El correo ya está registrado", status: 400 });
  }

  const result = await pool.query(
    "INSERT INTO usuarios(nombreUsu, apellidosUsu, correoUsu, contraseñaUsu, imgurlUsu, rolUsu) values (?, ?, ?, ?, ?, ?)",
    [firstName, lastName, email, password, image, "alumno"]
  ).catch((err) => {
    console.log(err);
  });

  if (result) {
    return res.send({ message: "Usuario creado", status: 200 });
  }else{
    return res.send({ message: "Error al crear usuario, por favor intente mas tarde", status: 400 });
  }

};

export const loginUser = async (req, res) => {
  const { correo, contraseña } = req.body;
  if (!correo || !contraseña) {
    res.status(400).send("Todos los campos son obligatorios");
  }

  const [rows] = await pool.query(
    "SELECT * FROM usuarios WHERE correoUsu = ? and contraseñaUsu = ?;",
    [correo, contraseña]
  );

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
    req.session.data = { message: "Correo o contraseña incorrectos" };
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
