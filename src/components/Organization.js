import React from "react";

// еще один способ задания стелей элементам, можно через className, можно отметить что здесь названия стилей пишутся через кэмэл кейс
const styles = {
  div: {
    padding: ".5rem",
    background: "red",
  },
};

// Так как мы явно знаем какие сущности мы хотим передать, то мы можем указать их через {}, еще можно указать параметр proops и работать: props.id, props.organizations, props.clickOrg
function Organization({ id, organizations, clickOrg }) {
  return (
    <div style={styles.div}>
      {organizations.map((organization) => {
        /* Проходимся по массиву организаций */
        if (id === organization.id) {
          // Если айди организации пользователя совпадет с айди текущей организации, то мы просто возвращаем название нашей организации и ее айди
          return (
            <div
              key={organization.id}
              // Событие клика на поле "название организации", когда кликаем вызываем функцию, которую я описал в App.js
              // В данном случае вызвать ее можно через () => {...}, но  использовал bind, т.к. он здесь будет работать быстрее, контекст нам не важен, поэтому null, а в качестве аргумента мы передаем айди организации
              onClick={clickOrg.bind(null, organization.id)}
            >
              organization: {organization.name}
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Organization;
