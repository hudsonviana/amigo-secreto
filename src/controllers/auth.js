import { z } from 'zod';
import * as authService from '../services/auth.js';

export const login = (req, res) => {
  const loginSchema = z.object({
    password: z.string(),
  });

  const body = loginSchema.safeParse(req.body);

  if (!body.success) {
    return res.json({ error: 'Dados inválidos.' });
  }

  // Validar a senha e gerar o token
  if (!authService.validatePassword(body.data.password)) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }

  res.json({ token: authService.createToken() });
  // Retorno da requisição
};

export const validate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }

  const token = req.headers.authorization.split(' ')[1];
  if (!authService.validateToken(token)) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }

  next();
};

// 3:02:43
// https://www.youtube.com/watch?v=mKa1MuB1HMk
