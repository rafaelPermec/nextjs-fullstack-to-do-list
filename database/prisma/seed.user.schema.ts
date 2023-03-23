import * as bcrypt from 'bcryptjs';
import * as seed from './seed.todo.schema';

const seedUserSchema = [
  {
    email: 'test@gmail.com',
    name: 'Test User',
    password: bcrypt.hashSync('$Test123', 12),
    tasks: JSON.stringify(seed.seedTodoSchema1)
  },
  {
    email: 'contrate@rafaelperdigao.com',
    name: 'Test User',
    password: bcrypt.hashSync('$Test123', 12),
    tasks: JSON.stringify(seed.seedTodoSchema2)
  },
  {
    email: 'melhor@todolist.com',
    name: 'Test User',
    password: bcrypt.hashSync('$Test123', 12),
    tasks: JSON.stringify(seed.seedTodoSchema3)
  },
];

export default seedUserSchema;
