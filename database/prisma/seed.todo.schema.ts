import { v4 as uuid } from 'uuid';

const seedTodoSchema1 = [
  {
    id: uuid().substring(0, 8),
    text: 'Acordar',
    completed: true,
    ownerId: 1,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Tomar café',
    completed: true,
    ownerId: 1,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Terminar lista de To-Do',
    completed: false,
    ownerId: 1,
  }
];
  const seedTodoSchema2 = [
    {
    id: uuid().substring(0, 8),
    text: 'Fazer banco de dados',
    completed: true,
    ownerId: 2,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Fazer Backend',
    completed: true,
    ownerId: 2,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Fazer Frontend',
    completed: false,
    ownerId: 2,
  }
];
  const seedTodoSchema3 =[
    {
    id: uuid().substring(0, 8),
    text: 'Estudar GCP',
    completed: true,
    ownerId: 3,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Estudar AWS',
    completed: false,
    ownerId: 3,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Estudar Azure',
    completed: false,
    ownerId: 3,
  },
  {
    id: uuid().substring(0, 8),
    text: 'Estudar Docker',
    completed: false,
    ownerId: 3,
  },

];

export { seedTodoSchema1, seedTodoSchema2, seedTodoSchema3 };
