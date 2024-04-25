import { useRef, useState } from "react";
import "./Editor.css";

const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === "") {
      contentRef.current.focus(); // 빈 문자열 추가시 focus & 함수 나가기
      return;
    }
    onCreate(content); // 새로운 todo 추가
    setContent(""); // 빈 문자열로 state 초기화
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) { // enter 누를 시 제출
      onSubmit();
    }
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeydown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
