import { v4 as uuid } from 'uuid';

const seedPostLoginSchema = [
  {
    id: uuid().substring(0, 8),
    text: 'Fazer seu cadastro.',
    completed: true,
    ownerId: 777,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Fazer Login com e-mail e senha.',
    completed: true,
    ownerId: 777,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Cadastre suas tarefas e organize sua rotina!',
    completed: false,
    ownerId: 777,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Concluir todas as tarefas de hoje!',
    completed: true,
    ownerId: 777,
  },
];

export { seedPostLoginSchema };
