import { defineStore } from "pinia";
import { IBoard } from "../ts/board.types";

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
      }
    },
    addTodo(id: any, title: string, description: string, subTasks: string[]) {
      this.boards[id].tasks.push({
        boardId: id,
        title,
        subTasks,
        status: "TODO",
        description,
      });
    },
  },
});
