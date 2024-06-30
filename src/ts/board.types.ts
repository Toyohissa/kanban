export interface IBoard {
  name: string;
  id: number;
  tasks: ITask[];
  selected: boolean;
}
export interface ITask {
  boardId: number;
  title: string;
  subTasks: ISubtask[];
  status: string;
  description: string;
}

export interface ISubtask {
  title: string;
  status: boolean;
  id: number;
}
