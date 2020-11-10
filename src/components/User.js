import React from "react";

// еще один способ задания стелей элементам, можно через className, можно отметить что здесь названия стилей пишутся через кэмэл кейс
const styles = {
  div: {
    padding: ".5rem",
  },
};

// Так как мы явно знаем какие сущности мы хотим передать, то мы можем указать их через {}, еще можно указать параметр proops и работать: props.id и props.name
function User({ id, name }) {
  return (
    // Просто возвращаем значения двух полей
    <div style={styles.div}>
      id: {id}
      <br />
      name: {name}
      <br />
    </div>
  );
}

export default User;
