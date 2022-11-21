import React, { useEffect, useState } from "react";
import { Form } from "../components/Form";
import { Todo } from "../components/Todo";
import style from "./app.less";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { database } from "../index";
import { Layout } from "../components/Layout";
import { task } from "../type/task";
import { addtask } from "../type/addtask";
import { changetask } from "../type/changetask";
import { removetask } from "../type/removeitem";
import { missioncomplete } from "../type/missioncomplete";
/**
Создаем компонент, который возвращает полный функционал Todo-list
 */
export function App() {
  const collectionTasks = collection(database, "tasks");
  const [massivTask, setMassivTask] = useState<task[]>([]);

  useEffect(() => {
    const tasks = getDocs(collectionTasks);
    tasks.then((tasks) =>
      setMassivTask([
        ...tasks.docs.map((task) => ({
          ...task.data(),
          ID: task.id,
          id: task.data().id,
          header: task.data().header,
          description: task.data().description,
          date: task.data().date,
        })),
      ])
    );
  }, [massivTask]);

  /**
   * Добавление задачи в состояние massivTask и Базу данных
   * @param {string} header - заголовок задачи
   * @param {string} description - описание задачи
   * @param {string} date - дата завершения задачи
   * @param {any} file - прикрепленный файл
   */
  const addTask: addtask = (header, description, date, file) => {
    const task = {
      id: Math.random(),
      header: header,
      description: description,
      date: date,
      ID: "",
      complete: false,
      file: file,
    };
    setMassivTask([...massivTask, task]);
    addDoc(collectionTasks, task);
  };

  /**
   * В данной функции при вызове отмечается, что задача выполнена
   * @param {number} id - id задачи
   * @param {string} ID - ID задачи из БД
   */
  const missionComplete: missioncomplete = (id, ID) => {
    const changeTasks = doc(database, "tasks", ID);
    updateDoc(changeTasks, {
      complete: true,
    });
    setMassivTask([
      ...massivTask.map((task) =>
        task.id === id ? { ...task, complete: true } : { ...task }
      ),
    ]);
  };

  /**
   * При вызове данной функции, редактируются  поля в задаче
   * @param {string} header - заголовок задачи
   * @param {string} description - описание задачи
   * @param {string} date - дата завершения задачи
   * @param {string} ID - ID задачи из БД
   * @param {number} id - id задачи
   */
  const changeTask: changetask = (header, description, date, ID, id) => {
    setMassivTask([
      ...massivTask.map((task) =>
        task.id === id
          ? { ...task, header: header, description: description, date: date }
          : { ...task }
      ),
    ]);
    const changeTasks = doc(database, "tasks", ID);
    updateDoc(changeTasks, {
      header: header,
      description: description,
      date: date,
    });
  };

  /**
   * При вызове данной функции, задача удаляется
   * @param {number} id - id задачи
   * @param {string} ID - ID задачи из БД
   */
  const removeTask: removetask = (id, ID) => {
    setMassivTask([...massivTask.filter((task) => task.id !== id)]);
    const changeTasks = doc(database, "tasks", ID);
    deleteDoc(changeTasks);
  };

  return (
    <Layout>
      <Form addTask={addTask} />
      <table className={style.table}>
        <thead>
          <tr>
            <th className={style.table_th}>Заголовок задачи</th>
            <th className={style.table_th}>Описание задачи</th>
            <th className={style.table_th}>Дата завершения задачи</th>
            <th className={style.table_th}>Прикрепленные файлы</th>
            <th className={style.table_th}>Операции над задачами</th>
          </tr>
        </thead>
        <tbody>
          {massivTask.map((task) => (
            <Todo
              key={task.id}
              task={task}
              removeItem={removeTask}
              changeTask={changeTask}
              missionComplete={missionComplete}
            />
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
