import { HOMEWORK_ADD, HOMEWORK_REMOVE } from "../constants/homeworkConstants";

function homeworkReducer(state = { homeworks: [] }, action) {
  switch (action.type) {
    case HOMEWORK_ADD:
      const homework = action.payload;
      const task = state.homeworks.find((x) => x._id === homework._id);
      if (task) {
        return {
          ...state,
          homeworks: state.homeworks.map((x) =>
            x._id === task._id ? homework : x
          ),
        };
      }
      return { ...state, homeworks: [...state.homeworks, task] };
    case HOMEWORK_REMOVE:
      return {
        ...state,
        homeworks: state.homeworks.filter((x) => x._id !== action.payload),
      };
    default:
      return state;
  }
}

export { homeworkReducer };
