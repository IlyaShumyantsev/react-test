import React from "react";
import Organization from "./Organization";
import User from "./User";

// еще один способ задания стелей элементам, можно через className, можно отметить что здесь названия стилей пишутся через кэмэл кейс
const styles = {
  div: {
    padding: ".5rem",
  },
};

// Так как мы явно знаем какие сущности мы хотим передать, то мы можем указать их через {}, еще можно указать параметр proops и работать: props.users, props.organizations, props.clickOrg
function BlockList({ users, organizations, clickOrg }) {
  return (
    <div className="user-list">
      {users.map((user, index) => {
        // проходимся по массиву пользователей, в колбэке работаем с текущим пользователем и индексом (для удобства нумерации)
        return (
          <div className="user-list-item" key={index}>
            {/* Каждому дочернему элементу обязательно нужено свойство key, с его помощью рекат будет быстрее рендерить страницу */}
            <div style={styles.div}>index: {index}</div>
            <hr></hr>
            <div key={user.id}>
              <User id={user.id} name={user.name} />{" "}
              {/* Отрисовываем компонет пользователя, он выведет просто его айди и имя */}
              {/* Отрисовываем компонет организации, куда передаем пользователь.организация (для связи с айди организации), сам массив организаций и функцию обработчик по клику на поле организации */}
              <Organization
                id={user.organizaiton}
                organizations={organizations}
                clickOrg={clickOrg}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BlockList;
