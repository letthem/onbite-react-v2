import { useState, useMemo, useContext } from "react";
import "./List.css";
import TodoItem from "./TodoItem";
import { TodoContext } from "../App";

const List = () => {
  const { todos } = useContext(TodoContext);
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos; // 검색창에 입력값이 없으면 기존 todos 반환
    }
    // 배열의 모든 todo를 순회하면서 search state 값을 포함하는 콘텐츠 뽑아내기
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const getAnalyzedData = () => {
      const totalCount = todos.length;
      const doneCount = todos.filter((todo) => todo.isDone).length;
      const notDoneCount = totalCount - doneCount;

      return {
        totalCount,
        doneCount,
        notDoneCount,
      };
    };
    return getAnalyzedData();
  }, [todos]);
  // 의존성배열 : deps

  return (
    <div className="List">
      <h4>Todo List 🌱</h4>
      <div>total: {totalCount}</div>
      <div>done: {doneCount}</div>
      <div>notDone: {notDoneCount}</div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
