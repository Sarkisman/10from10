import React, { useEffect } from 'react';
import './style.css';

const { ymaps } = window;
const center = [55.57281276497344, 37.463093343515226];
function init() {
  const myMap = new ymaps.Map('map-test', {
    center,
    zoom: 16,
  });

  // const placemark = new ymaps.Placemark(center, {
  //   balloonContentHeader: 'Header Of Balloon',
  //   balloonContentBody: 'Body of Balloon',
  //   balloonContentFooter: 'Footer of Balloon',
  // }, {
  //   iconLayout: 'default#image',
  //   iconImageHref: 'https://cdn-icons-png.flaticon.com/512/1016/1016056.png',
  //   iconImageSize: [50, 50],
  //   iconImageOffset: [-10, -15], // выравнивать самим
  // });

  const placemark1 = new ymaps.Placemark(center, {
    balloonContent: `
    
    <div className="balloon">
      <div className="balloon__address">Moscoe</div>
      <div class="balloon__contacts">
        <a href="tel:+7999999999999">+799999999</a>
      </div>
    </div>
    
    `,

  }, {
    iconLayout: 'default#image',
    iconImageHref: 'https://cdn-icons-png.flaticon.com/512/1016/1016056.png',
    iconImageSize: [50, 50],
    iconImageOffset: [-10, -15], // выравнивать самим
  });
  // myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  // myMap.controls.remove('searchControl'); // удаляем поиск
  // myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  // myMap.controls.remove('typeSelector'); // удаляем тип
  // myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
  // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  // myMap.controls.remove('rulerControl'); // удаляем контрол правил
  // myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  // myMap.geoObjects.add(placemark);  это балун по умолчанию, без стилей
  myMap.geoObjects.add(placemark1);

  placemark1.balloon.open();
  return myMap;
}

export default function Map() {
  useEffect(() => {
    ymaps.ready(init);
  }, []);

  return (
    <div id="map-test" className="map-test">Map</div>
  );
}