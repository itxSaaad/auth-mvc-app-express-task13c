import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
  res.send('Login Route');
});

router.get('/register', (req, res) => {
  res.send('Register Route');
});

export default router;
