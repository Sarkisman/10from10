import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllClubs } from '../../../redux/actions/ClubActions';
import { getEvents } from '../../../redux/actions/eventActions';
import './style.css';

export default function Map() {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const clubs = useSelector((store) => store.clubs);
  const events = useSelector((store) => store.events);
  console.log(clubs);
  const dispatch = useDispatch();
  const { ymaps } = window;
  const center = [55.76, 37.64];
  function init() {
    const myMap = new ymaps.Map('map-test', {
      center,
      zoom: 10,
    });
    // myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    // myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    // myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)
    // placemark1.balloon.open();                            EXAMPLE
    dispatch(getAllClubs());
    setMap(myMap);
    return myMap;
  }

  useEffect(() => {
    ymaps.ready(init);
  }, []);

  useEffect(() => {
    dispatch(getEvents());
    setTimeout(() => {
      clubs?.forEach((el) => {
        console.log(el, 'clubevents');
        const coordinates = [el.latitude, el.longitude];
        const clubEvents = events?.filter((item) => item.club_id === el.id);
        const myPlacemarkWithContent = new ymaps.Placemark(coordinates, {
          balloonContent: `
                <div class="balloon">
                  <div class="balloon__title">клуб: ${el?.name}</div>
                  <div class="balloon__title">почта: ${el?.email}</div>
                  <div class="balloon__title">телефон: ${el?.phone}</div>
                  <button type="button" class="btn sixth" id=${el.id}>Подробнее о клубе</button>
                  <br></br>

                  
                  <div class="balloon__title"><b>События:
                  ${clubEvents?.map((e) => `<div><a href="/events/club/${e.id}">${e?.title}</div>`).join('')}
                </b></div >
                </div>
        `,
        }, {
          iconLayout: 'default#imageWithContent', // Необходимо указать данный тип макета.
          iconImageHref: clubEvents?.length ? 'https://cdn-icons-png.flaticon.com/512/1004/1004305.png' : 'https://cdn-icons-png.flaticon.com/512/1016/1016056.png', // Своё изображение иконки метки.
          iconImageSize: [40, 40], // Размеры метки.
          iconImageOffset: [-24, -24], // Смещение левого верхнего угла иконки относительно, её "ножки"
          iconContentOffset: [15, 15], // Смещение слоя с содержимым относительно слоя с картинкой.
        });
        map?.geoObjects.add(myPlacemarkWithContent);
        map?.geoObjects.events.add('balloonopen', () => {
          document.getElementById(`${el.id}`)?.addEventListener('click', () => {
            navigate(`/club/${el.id}`);
            map?.balloon.close();
          });
        });
      });
    }, 250);
  }, [clubs]);

  return (
    <div id="map-test" className="map-test" />
  );
}