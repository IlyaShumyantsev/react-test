import React from "react";

// еще один способ задания стелей элементам, можно через className, можно отметить что здесь названия стилей пишутся через кэмэл кейс
const styles = {
  div: {
    display: "flex",
    justifyContent: "center",
    mergin: ".5rem",
  },
};

// Просто рисуем спиннер загрузки
function Loader() {
  return (
    <div style={styles.div}>
      <div className="lds-dual-ring" />
    </div>
  );
}

export default Loader;
