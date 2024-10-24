import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

  const AuthForm = () => {
      const [name, setName] = useState("");
      const [password, setPassword] = useState("");
      const history = useHistory();
      
      const registerClick = async () => {
          if (!name || !password) {
                alert("ユーザー名とパスワードを入力してください。");
                return;
            }
          try {
            const response = await axios.post("/register", { username: name, password });
            alert("登録成功！");
            const token = response.data.token;
            localStorage.setItem("token", token);
            history.push("/tasks");
        } catch (error) {
            alert("登録に失敗しました。");
            console.error(error);
        }
  
          setName("");
          setPassword("");
      };
      const loginClick = async () => {
          if (!name || !password) {
                alert("ユーザー名とパスワードを入力してください。");
                return;
            }
          try {
            const response = await axios.post("/login", { username: name, password });
            alert("ログイン成功！");
            const token = response.data.token;
            localStorage.setItem("token", token);
            history.push("/tasks");
        } catch (error) {
            alert("ログインに失敗しました。");
            console.error(error);
        }

        setName("");
        setPassword("");
      };

    return (
      <div>
          <h2>ログイン</h2>
          <div className="textBox">
              <input type="text" placeholder="ユーザー名" value={name} onChange={(e) => setName(e.target.value)} /><br />
              <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
              <button onClick={registerClick}>登録</button>
              <button onClick={loginClick}>ログイン</button>
          </div>
      </div>
      );
  };

  export default AuthForm;
