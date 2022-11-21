import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { storage } from "../../index";
import { addtask } from "../../type/addtask";
import style from "./form.less";
interface form {
  addTask: addtask;
}
/**
Создаем компонент, который возвращает форму Todo-list
 */
export function Form({ addTask }: form) {
  const [headerValue, setHeaderValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [warning, setWarning] = useState(false);

  /**
   * Изменяется состояние заголовка задачи
   */
  const onChangeHeader = (event: ChangeEvent<HTMLInputElement>) => {
    setHeaderValue(event.target.value);
  };
  /**
   * Изменяется состояние описания задачи
   */
  const onChangeDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescriptionValue(event.target.value);
  };
  /**
   * Изменяется состояние даты завершения задачи
   */
  const onChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value);
  };
  /**
   * Изменяется состояние прикрепления файлов
   */
  const onChangeFile = (event: any) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, file.name);
    uploadBytesResumable(storageRef, file).then((url) => {
      console.log("файлы загружены в хранилище", url);
    });
    getDownloadURL(ref(storage, file.name)).then((url) => {
      setFileValue(url);
    });
  };
  /**
   * Отправка формы
   */
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!headerValue || !descriptionValue || !dateValue) {
      setWarning(true);
      return;
    } else {
      setWarning(false);
    }
    addTask(headerValue, descriptionValue, dateValue, fileValue);
    setHeaderValue("");
    setDescriptionValue("");
    setDateValue("");
    setFileValue("");
  };
  return (
    <form className={style.form} onSubmit={onSubmit} action="">
      <label className={style.form_label}>TODO-LIST</label>
      <input
        className={style.form_input}
        value={headerValue}
        onChange={onChangeHeader}
        placeholder="Введите заголовок задачи"
      />
      <input
        className={style.form_input}
        value={descriptionValue}
        onChange={onChangeDescription}
        placeholder="Введите описание задачи"
      />
      <input
        type="date"
        className={style.form_input}
        value={dateValue}
        onChange={onChangeDate}
        placeholder="Введите дату завершения задачи"
      />
      <input
        type="file"
        name="name"
        className={style.form_file}
        onChange={(event) => {
          onChangeFile(event);
        }}
      />
      {warning && (
        <label className={style.form_warning}>Введите все данные</label>
      )}
      <button className={style.form_button}>Добавить задачу</button>
    </form>
  );
}
