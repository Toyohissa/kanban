import { defineStore } from "pinia";
import { IBoard, ISubtask } from "../ts/board.types";

export const useBoardStore = defineStore("board", {
  state: (): { boards: IBoard[] } => ({
    boards: [],
  }),
  getters: {
    getAllBoards: (state) => {
      return state.boards;
    },
  },
  actions: {
    addBoard(name: string) {
      this.boards.push({ name, id: Date.now(), selected: false, tasks: [] });
    },
    changeBoard(id: number) {
      this.boards.forEach((board) => {
        board.selected = false;
      });

      const board = this.boards.find((board) => board.id === id);
      if (board) {
        board.selected = true;
        console.log(board.id);
      }
    },
    addTodo(
      boardId: number,
      title: string,
      description: string,
      subTasks: ISubtask[]
    ) {
      const board = this.boards.find((board) => board.id === boardId);

      if (board) {
        board.tasks.push({
          boardId,
          title,
          subTasks,
          status: "TODO",
          description,
        });
        console.log("Todo added successfully");
        console.log(board.tasks);
      } else {
        console.error("Board not found");
      }
    },
    changeSubtaskStatus(boardId: number, taskId: number, subTaskId: number) {
      const board = this.boards.find((board) => board.id === boardId);
      if (board) {
        const task = board.tasks.find((task) => task.boardId === taskId);
        if (task) {
          const subTask = task.subTasks.find(
            (subTask) => subTask.id === subTaskId
          );
          if (subTask) {
            subTask.status = !subTask.status;
          } else {
            console.error("Subtask not found");
          }
        } else {
          console.error("Task not found");
        }
      } else {
        console.error("Board not found");
      }
    },
  },
});
