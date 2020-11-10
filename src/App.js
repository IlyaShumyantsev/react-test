import React, { useEffect } from "react";
import { getUsers, getOrganizations } from "./api";
import Loader from "./components/Loader";
import Reset from "./components/Reset";

// определяем компонент, который будет "лениво" загружен. Она автоматически загрузит бандл, когда этот компонет будет впервые определен
const BlockList = React.lazy(() => import("./components/BlockList"));

function App() {
  // исполльзуем хуки состояния для работы со стейтами
  const [users, setUsers] = React.useState([]);
  const [organizations, setOrganizations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [reset, setReset] = React.useState(false);
  const [allUsers, setAllUsers] = React.useState([]);

  // используем хук эффекта, который позволяет выполнять побоычне эффекты в функциональном компоненте
  // хук useEffect представляет собой совокупность методов componentDidMount, componentDidUpdate и componentWillUnmount
  useEffect(() => {
    getUsers()
      .then((users) => { // используем чейны для последовательного получения данных
        setUsers(users);
      })
      .then(() => getOrganizations())
      .then((organizations) => {
        setOrganizations(organizations);
      })
      .then(() => setLoading(false));
  }, []); // указываем значения пустого массива для того, чтобы при изменении users при новом рендере React не изменял стейты

  // функция-обработчик нажатия на поле с названием организации
  // в качестве аргумента передаем айдишник организацити
  function clickOrganization(id) {
    if (!reset) { // сравниваем значения из стейта и если кнопка не активна выполняем условия
      setAllUsers(users); // копируем наш стейт пользователей в новый стейт, для работы со старым, чтобы не потерять данные и не делать еще раз запрос к серверу
      setReset(true); // меняем значение стейта, чтобы отабразить компонент кнопки
    }
    setUsers(users.filter((user) => user.organizaiton === id)); // скрываем всех пользователей, кроме тех, у которых айди работы соответствует айди работе пользователя
  }

  // возвращаем наших пользователей в "рабочий" стейт при нажатии на кнопку
  function resetState() {
    setUsers(allUsers); // берем наших скопированых пользователей и возвращаем в рабочий стейт
    setReset(false); // скрываем кнопочку ресета
  }

  return (
    <div>
      {reset && <Reset resetSt={resetState} />}  {/* компонент кнопки "ресет", отрисовывается если стейт reset === true, в компонент передаем функцию нашего ресета */}
       {/* если стейт загрузки истина - отображаем наш компонент загрузки, иначе "лениво" отрисовываем наши элементы */}
      {loading ? (
        <Loader />
      ) : (
        <React.Suspense fallback={<p>Loading...</p>}>  {/* Suspence позволяет "ждать"  загрузки кода, а пока идет загрузка отображается элемент в fallback*/}
          {/* Компонент, который отвечает за отображения пользователей на странице. Передаем туда самих пользователей, организации и функцию для обработки клика по полю с организацией*/}
          <BlockList
            users={users}
            organizations={organizations}
            clickOrg={clickOrganization}
          />
        </React.Suspense>
      )} 
    </div>
  );
}

export default App;

// Основными проблемами до рефракторинга были: не было разбиения на компоненты, из-за чего легко запутаться; большая вложенность циклов; слишком много кода, который можно упростить
// Для более удобной работы я воспользовался основным принципом реката - разбил приложение на компоненты
// Также в данном проекте можно было бы использовать компонет 'prop-types', т.к. язык с динамической типизацией и мы можем переопределить значения на другой тип
// для того, чтобы обезопасить себя от ошибок мы могли бы использовать в компонентах propTypes для указания конкретных типов, которые мы ожидаем получить
// но по заданию использовать что-то кроме react и react-dom нельзя