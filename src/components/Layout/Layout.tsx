import React from "react";
interface propsLayout {
  children: React.ReactNode;
}
/**
Создаем компонент, который возвращает форму todo-list и список добавленных задач
 */
export function Layout({ children }: propsLayout) {
  return <div>{children}</div>;
}
