//AuthForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
      //ユーザー名とパスワードの状態を管理するためのuseStateフック
      const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
      //ページ遷移に使うuseNavigateフックを初期化
      const navigate = useNavigate();
      
      //ユーザー登録を行う関数
      const registerClick = async () => {
          if (!userName || !password) {
                alert("ユーザー名とパスワードを入力してください。");
                return;
            }
          try {
            const response = await axios.post("http://localhost:3001/api/register", { userName, password });
            alert("登録成功！");
            const token = response.data.token; //取得したトークンを取得
            localStorage.setItem("token", token); //トークンをローカルストレージに保存
            navigate("/tasks"); //タスク管理ページへ遷移
        } catch (error) {
            alert("登録に失敗しました。");
            console.error(error);
        }
  
          //入力フィールドをリセット
          setUserName("");
          setPassword("");
      };
  
      //ユーザーログインを行う関数
      const loginClick = async () => {
          //ユーザー名またはパスワードが空の場合アラートを表示
          if (!userName || !password) {
                alert("ユーザー名とパスワードを入力してください。");
                return;
            }
          try {
            const response = await axios.post("http://localhost:3001/api/login", { userName, password });
            alert("ログインに成功しました。");
            const token = response.data.token; //取得したトークンを取得
            localStorage.setItem("token", token); //トークンをローカルストレージに保存
            navigate("/tasks");
        } catch (error) {
            alert("ログインに失敗しました。");
            console.error(error);
        }

        //入力フィールドをリセット
        setUserName("");
        setPassword("");
      };

    return (
      <div className="login">
          <h2>ログイン</h2>
          <div className="textBox">
              <input type="text" placeholder="ユーザー名" value={userName} onChange={(e) => setUserName(e.target.value)} /><br />
              <input type="password" placeholder="パスワード" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
              <button onClick={registerClick}>登録</button>
              <button onClick={loginClick}>ログイン</button>
          </div>
      </div>
      );
  };

  export default AuthForm;
