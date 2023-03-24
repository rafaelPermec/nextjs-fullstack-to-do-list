export interface TodoPropsDTO {
  data: TodoInnerPropsDTO,
};

export interface TodoInnerPropsDTO {
  tasks: TodoResponseDTO[],
  name: string,
  updatedAt: Date,
};

export interface TodoResponseDTO {
  id: string;
  text: string;
  completed: boolean,
  ownerId: number,
};
