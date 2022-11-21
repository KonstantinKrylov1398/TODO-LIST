import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { changetask } from "../../type/changetask";
import { task } from "../../type/task";
import style from "./edittodo.less";
interface edittodoprops {
  task: task;
  changeTask: changetask;
  setOpenEditTodo: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
Создаем компонент, который возвращает список отредактированных задач
 */
export function EditTodo({ task, changeTask, setOpenEditTodo }: edittodoprops) {
  const [headerValue, setHeaderValue] = useState(task.header);
  const [descriptionValue, setDescriptionValue] = useState(task.description);
  const [dateValue, setDateValue] = useState(task.date);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    /**
     * Закрытие модального окна
     */
    const closedModal = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        form.current &&
        !form.current.contains(event.target)
      ) {
        setOpenEditTodo(false);
      }
    };
    window.addEventListener("click", closedModal);

    return () => {
      window.removeEventListener("click", closedModal);
    };
  }, []);
  /**
   * Изменяется состояние редактирования заголовка задачи
   */
  const onChangeHeader = (event: ChangeEvent<HTMLInputElement>) => {
    setHeaderValue(event.target.value);
  };
  /**
   * Изменяется состояние редактирования описания задачи
   */
  const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  };
  /**
   * Изменяется состояние редактирования даты завершения задачи
   */
  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };
  /**
   * Отправка формы
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpenEditTodo(false);
    changeTask(headerValue, descriptionValue, dateValue, task.ID, task.id);
  };

  return (
    <div>
      <div className={style.edit_background}></div>
      <form ref={form} className={style.edit_form} onSubmit={onSubmit}>
        <label className={style.edit_label}>ОТРЕДАКТИРУЙТЕ ЗАДАЧУ</label>
        <input
          className={style.edit_input}
          value={headerValue}
          onChange={onChangeHeader}
          placeholder="Введите заголовок задачи"
        />
        <input
          className={style.edit_input}
          value={descriptionValue}
          onChange={onChangeDescription}
          placeholder="Введите описание задачи"
        />
        <input
          className={style.edit_input}
          type="date"
          value={dateValue}
          onChange={onChangeDate}
          placeholder="Введите дату завершения задачи"
        />
        <button className={style.edit_button}>Редактировать задачу</button>
      </form>
    </div>
  );
}
