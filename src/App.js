import React, { useState } from "react";
import { validate } from "./ajv-schema/ajv"; // 경로는 프로젝트 구조에 맞게 조정하세요

function App() {
  const [data, setData] = useState({
    name: "",
    age: 0,
  });
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const convertedValue = e.target.type === 'number' ? Number(value) : value;
    setData({ ...data, [name]: convertedValue });
  };

  const validateData = () => {
    const valid = validate(data);

    if (!valid) {   
      validate.errors.forEach((error) => {
        console.log(error);
        console.log(`오류: ${error.message}`);
        console.log(`경로: ${error.instancePath}`);
        console.log(`키워드: ${error.keyword}`);
        console.log(`스키마 경로: ${error.schemaPath}`);
        console.log(`추가 정보:`, error.params);
      });
    }

    setIsValid(valid);
  };

  return (
    <div className = "App">
      <header className="App-header">
        <h1>JSON 데이터 유효성 검사</h1>
      </header>
      <div>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>;

        <label>Name: </label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={data.age}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={validateData}>검증</button>
      {isValid ? (
        <p>데이터가 유효합니다.</p>
      ) : (
        <p>데이터가 유효하지 않습니다.</p>
      )}
    </div>
  );
}

export default App;
