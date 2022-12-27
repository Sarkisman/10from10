import React from 'react';
import { useSelector } from 'react-redux';

export default function LkClub() {
  const club = useSelector((state) => state.club);

  return (
    <div>
      {club.name}
      LkClub
    </div>
  );
}

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   Button,
//   Card, CardBody, CardImg, Col, Row, UncontrolledCarousel,
// } from 'reactstrap';
// import { useNavigate } from 'react-router-dom';
// import { getCommentsAction } from '../../../redux/actions/Comments';

// export default function Lk() {
//   const dispatch = useDispatch();
//   const user = useSelector((store) => store.user);
//   const navigate = useNavigate();
//   useEffect(() => {
//     dispatch(getCommentsAction());
//   });
//   const buttonHandler = () => {
//     navigate(`/reg/${user.id}`);
//   };
//   return (
//     <>
//       <Row>
//         <Col>
//           <Card
//             style={{
//               width: '20rem',
//             }}
//           >
//             <CardImg
//               alt="Card image cap"
//               src="https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg"
//               top
//               width="100%"
//             />
//             <CardBody>
//               <div>
//                 {' '}
//                 Арутюнян
//                 {' '}
//                 {user.name}
//                 {' '}
//                 Ваганович
//               </div>
//             </CardBody>
//           </Card>
//         </Col>
//         <Col>
//           <div>моя фотогалерея</div>
//           <UncontrolledCarousel
//             items={[
//               {
//                 altText: 'Slide 1',
//                 caption: 'Slide 1',
//                 key: 1,
//                 src: 'https://picsum.photos/id/123/1200/600',
//               },
//               {
//                 altText: 'Slide 2',
//                 caption: 'Slide 2',
//                 key: 2,
//                 src: 'https://picsum.photos/id/456/1200/600',
//               },
//               {
//                 altText: 'Slide 3',
//                 caption: 'Slide 3',
//                 key: 3,
//                 src: 'https://picsum.photos/id/678/1200/600',
//               },
//             ]}
//           />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           История комментариев
//         </Col>
//         <Col>
//           Мои события
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <Button
//             color="primary"
//             outline
//             type="button"
//             onClick={() => buttonHandler()}
//           >
//             Подать заявку на регистрацию клуба.

//           </Button>
//         </Col>
//       </Row>
//     </>
//   );
// }
