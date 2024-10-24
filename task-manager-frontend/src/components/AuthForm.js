import React, { useState } from "react";

const AuthForm = ({ addTask }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    
    const registerClick = (e) => {
        if (!name || !password) {
              alert("タイトルと説明を入力してください。");
              return;
          }
        addTask(name, password);
        setName("");
        setPassword("");
    };
    const loginClick = (e) => {
        if (!name || !password) {
              alert("タイトルと説明を入力してください。");
              return;
          }
        addTask(name, password);
        setName("");
        setPassword("");
    };

  return (
    <div>
        <h2>ログイン</h2>
        <div className="textBox">
            <input type="text" placeholder="ユーザー名" value={name} onChange={(e) => setName(e.target.value)} /><br />
            <input type="text" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
            <button onClick={registerClick}>登録</button>
            <button onClick={loginClick}>登録</button>
        </div>
    </div>
    );
};

export default AuthForm;
