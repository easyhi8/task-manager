// TaskEdit
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TaskEdit = ({ updateTask }) => {
    const { id } = useParams();// URLからタスクidを取得
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate(); // ページ遷移に使用するためのuseNavigateフックを初期化
    
    // コンポーネントがマウントされたときにタスクの詳細を取得するためのuseEffectフック
    useEffect(() => {
      const getTask = async () => {
        try {
            // APIからタスク詳細を取得
            const response = await axios.get(`http://localhost:3001/api/tasks/${id}`);
            console.log(response.data);
            // 取得したデータで状態を更新
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDeadline(response.data.deadline);
            setStatus(response.data.status);
          } catch (err) {
              console.error("タスク取得時のエラー:", err.response ? err.response.data : err.message);
          }
      };
  
      getTask();
    }, [id]); // idが変更されたときに再実行
    
    const handleSave = async (e) => {
        if (!title || !description || !deadline || !status) {
              alert("タイトルと説明を入力してください。");
              return;
          }
        try {
            // APIを使用してタスクを更新
            await axios.put(`http://localhost:3001/api/tasks/${id}`, {
                title,
                description,
                deadline,
                status,
            });
            alert("タスクが更新されました");
            navigate(`/tasks/${id}`); // タスク詳細ページへ遷移
        } catch (error) {
            console.error("タスク更新時のエラー:", error);
        }
    };
    
    const handleCancel = () => {
      navigate(`/tasks/${id}`);
    };
    
    const statusOptions = ["未完了", "完了"]; // ステータス選択肢の配列

  return (
    <div>
        <h2>タスク編集</h2>
        <div className="textBox">
            タスクタイトル<br/>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} /><br />
            タスク内容<br/>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="2" /><br />
            <div className="inputRow">
              <div className="inputGroup">
                <label>期限</label>
                <input type="date" id="dateInput" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
              </div>
              <div className="inputGroup">
                <label>ステータス</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>{statusOptions.map((option) => (<option key={option} value={option}>{option}</option>))}</select>
              </div>
            </div>
            <div className="buttonContainer">
              <button onClick={handleSave}>保存</button>
              <button onClick={handleCancel}>キャンセル</button>
            </div>
        </div>
    </div>
    );
};

export default TaskEdit;
