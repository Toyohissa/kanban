export interface IBoard {
  name: string;
  id: number;
  tasks: ITask[];
  selected: boolean;
}
export interface ITask {
  boardId: number;
  title: string;
  subTasks: string[];
  status: string;
  description: string;
}
