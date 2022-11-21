import dayjs from "dayjs";
import React, { useState } from "react";
import { changetask } from "../../type/changetask";
import { missioncomplete } from "../../type/missioncomplete";
import { removetask } from "../../type/removeitem";
import { task } from "../../type/task";
import { EditTodo } from "../EditTodo";
import style from "./todo.less";
type todo = {
  task: task;
  removeItem: removetask;
  changeTask: changetask;
  missionComplete: missioncomplete;
};
/**
Создаем компонент, который возвращает список задач
 */
export function Todo({ task, removeItem, changeTask, missionComplete }: todo) {
  const [openEditTodo, setOpenEditTodo] = useState(false);
  const dateDayJs = dayjs(task.date);
  const today = dayjs(new Date());
  return (
    <tr
      className={
        task.complete || dateDayJs <= today
          ? style.table_green
          : style.table_transparent
      }
    >
      <td className={style.table_td}>{task.header}</td>
      <td className={style.table_td}>{task.description}</td>
      <td className={style.table_td}>{task.date}</td>
      <td className={style.table_td}>{task.file ? task.file : "-"}</td>
      <td className={style.table_td}>
        <button onClick={() => setOpenEditTodo(true)}>Редактировать</button>
        <button onClick={() => removeItem(task.id, task.ID)}> Удалить </button>
        <button onClick={() => missionComplete(task.id, task.ID)}>
          Задача выполнена
        </button>
        {openEditTodo && (
          <EditTodo
            task={task}
            changeTask={changeTask}
            setOpenEditTodo={setOpenEditTodo}
          />
        )}
      </td>
    </tr>
  );
}
