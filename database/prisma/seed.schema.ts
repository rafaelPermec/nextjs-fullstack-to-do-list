import * as bcrypt from 'bcryptjs';

const seedSchema = [
  {
    email: 'test@test.com',
    name: 'Test User',
    password: bcrypt.hashSync('$Test123', 12),
    todos: ['setar banco de dados', 'programar backend', 'programar frontend'],
  },
  {
    email: 'contrate@rafaelperdigao.com',
    name: 'Test User',
    password: bcrypt.hashSync('$Test123', 12),
    todos: ['acordar', 'tomar café', 'aula mackenzie', 'aula google', 'aula AWS', 'trabalhar nos projetos', 'dormir (se der tempo)'],
  },
  {
    email: 'melhoro@todolist.com',
    name: 'Test User',
    password: bcrypt.hashSync('$Test123', 12),
    todos: ['acordar', 'tomar café', 'programar'],
  },
];

export default seedSchema;
