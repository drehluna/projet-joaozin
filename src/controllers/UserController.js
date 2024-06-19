import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function getUsers(request, response) {
  const users = await User.find();

  return response.status(200).json(users);
}

async function createUser(request, response) {
  const user = request.body;

  const existingUserByEmail = await User.findOne({ email: user.email });
  const existingUserByCpf = await User.findOne({ cpf: user.cpf });

  if (existingUserByEmail || existingUserByCpf) {
    return response
      .status(400)
      .json({ error: "Usuário com email ou cpf já existe" });
  }

  try {
    const hashedSenha = await bcrypt.hash(user.senha, 10);
    const newUser = await User.create({ ...user, senha: hashedSenha });
    const token = jwt.sign({ userId: newUser._id }, "secretpassword");
    return response.status(201).json({ newUser, token });
  } catch (error) {
    return response.status(400).json({ error: "Erro ao criar usuário", error });
  }
}

async function deleteUser(request, response) {
  const id = request.params.id;

  await User.findByIdAndDelete({ _id: id });

  return response.status(200).json({ response: "Usuário deletado" });
}

async function login(request, response) {
  const { email, senha } = request.body;

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) {
    return response.status(401).json({ error: "Usuário não encontrado" });
  }

  const validPassword = await bcrypt.compare(senha, user.senha);
  if (!validPassword) {
    return response.status(401).json({ error: "Erro com as credenciais" });
  }

  const token = jwt.sign({ userId: user._id }, "secretpassword");

  return response.status(200).json({ token });
}

async function authenticate(request, response, next) {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, "secretpassword");
    request.userId = decoded.userId;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Token inválido" });
  }
}

async function getMyProfile(request, response) {
  const userId = request.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }
    return response.status(200).json(user);
  } catch (error) {
    return response
      .status(500)
      .json({ error: "Erro ao buscar usuário", error });
  }
}

export { getUsers, createUser, deleteUser, login, authenticate, getMyProfile };
