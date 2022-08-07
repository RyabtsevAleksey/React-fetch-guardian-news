import "../components/main.css";
import React, { useState, useEffect } from "react";



// логотип в хедере
import Logo from '..//image/Guardian_img.png'


export default function Main() {

  const [valueArr, setNews] = useState([]);
  const [valueFromUser, setValue] = useState('');
  const [pages, setNumberPages] = useState(1);


  // функция на кнопке поиска информации
  function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    // console.log(formData)
    const data = [...formData.values()];
    console.log(data)
    let search = data[0];
    setValue(search);
    setNumberPages(1);
    event.target.reset();
};


useEffect(() => {
  getFetchData(pages, valueFromUser).then((data) => {
      setNews(data.response.results);
  })
}, [pages, valueFromUser]);




const getFetchData = (pages, valueFromUser) => {
  return fetch(`https://content.guardianapis.com/search?page=${pages}&q=${encodeURIComponent(valueFromUser)}&page-size=10&api-key=3ae4a796-1d49-4d04-8974-e3962e2fb188`)
  .then ((response) => {
      return response.json();  
  })
};

// Функция поиска по теме политика
function onHandlerValuePolitics() {
  setValue('Politics');
  setNumberPages(1);
};

// Функция поиска по теме спорт
function onHandlerValueSport() {
  setValue('Sport');
  setNumberPages(1);
};

// Функция поиска по теме финансы
function onHandlerValueFinance() {
  setValue('Finance');
  setNumberPages(1);
};

// Функция поиска по теме война
function onHandlerValueWar() {
  setValue('Ucraine war');
  setNumberPages(1);
};

// Функция поиска по теме путин
function onHandlerValuePutin() {
  setValue('Putin');
  setNumberPages(1);
};



  return (
    <>
      <div className="conteiner">
        <div className="header">
          <img src={Logo} alt="logo" />
        </div>

        <p>Cамые свежие новости от газеты</p>
        <h2>The Guardian!</h2>

      
          <div className="news-options">
            <button className="news-button" onClick={onHandlerValuePolitics}>Политика</button>
            <button className="news-button" onClick={onHandlerValueSport}>Спорт</button>
            <button className="news-button" onClick={onHandlerValueFinance}>Финансы инвестиции</button>
            <button className="news-button" onClick={onHandlerValueWar}>Война на украине</button>
            <button className="news-button" onClick={onHandlerValuePutin}>Россия Путин</button>
          </div>

          <div className="news-search">
            {/* 1 получаем данные из инпута по кнопке поиска */}
            <form  onSubmit={onSubmit} className="form">
            <label className="label">
            или введите интересующую тему:
            <input type="text" name="input" className="input" />
            </label>
            <br />
            <button className="button" type="submit">Получить список новостей</button>
            </form>
          </div >

          <div className="inform">
            {valueArr.map((item) => {   
              return <p className="list-items" key={item.id}><a href={item.webUrl}>{item.webTitle}</a></p>
            })}
          </div>
      </div>
    </>
  );
}
