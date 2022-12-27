import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllClubs } from '../../../../redux/actions/ClubActions';
import './style.css';

export default function Map() {
  const [map, setMap] = useState(null);
  const clubs = useSelector((store) => store.clubs);
  const dispatch = useDispatch();
  console.log(clubs);
  const { ymaps } = window;
  const center = [55.76, 37.64];
  function init() {
    const myMap = new ymaps.Map('map-test', {
      center,
      zoom: 16,
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
  const clubs = useSelector((store) => store.clubs);
  // console.log(clubs);
  useEffect(() => {
    ymaps.ready(init);
  }, []);

  // const myGeocoder = ymaps?.geocode('Клин');
  // myGeocoder?.then(
  //   (res) => {
  //     console.log(`Координаты объекта :${res.geoObjects.get(0).geometry.getCoordinates()}`);
  //   },
  //   (err) => {
  //     (console.log(err));
  //   },
  // );
  useEffect(() => {
    // console.log(clubs, 'CLUUUUBBBBSSSS');
    clubs?.forEach((el) => {
      const coordinates = [el.latitude, el.longitude];
      // console.log('coordinates', coordinates);
      const myPlacemarkWithContent = new ymaps.Placemark(coordinates, {
        balloonContent: `
                <div class="balloon">
                  <div class="balloon__title">${el.name}</div>
                  <button type="button" class="btn sixth" id=${el.id}>Подробнее</button>
                </div>
                `,
      }, {
        iconLayout: 'default#imageWithContent', // Необходимо указать данный тип макета.
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/1016/1016056.png', // Своё изображение иконки метки.
        iconImageSize: [40, 40], // Размеры метки.
        iconImageOffset: [-24, -24], // Смещение левого верхнего угла иконки относительно, её "ножки"
        iconContentOffset: [15, 15], // Смещение слоя с содержимым относительно слоя с картинкой.
      });
      map?.geoObjects.add(myPlacemarkWithContent);
    });
  }, [clubs]);

  // const myGeocoder = ymaps.geocode('Клин');
  // myGeocoder.then(
  //   (res) => {
  //     console.log(`Координаты объекта :${res.geoObjects.get(0).geometry.getCoordinates()}`);
  //   },
  //   (err) => {
  //     (console.log(err));
  //   },
  // );

  return (
    <div id="map-test" className="map-test" />
  );
}
