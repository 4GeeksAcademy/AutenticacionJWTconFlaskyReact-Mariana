export const initialStore = () => {
  return {
    message: null,
    token: sessionStorage.getItem("token") ?? null,
    user: JSON.parse(sessionStorage.getItem("user")) ?? null,

    todos: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    
    case "add_task": {
      const { id, color } = action.payload;

      return {
        ...store,
        todos: (store.todos ?? []).map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    }

    case "SET_TOKEN":
      return {
        ...store,
        token: action.payload,
      };

    case "SET_USER":
      return {
        ...store,
        user: action.payload,
      };

    default:
      return store;
  }
}
