import React from 'react';
import img1 from './img/1427909958.png';
import img2 from './img/1427909959.png';
import img3 from './img/1427909960.png';
import img4 from './img/1427909961.png';
import img5 from './img/323.png';

const BackgroundImages = () => {
  return (
    <div className="conteiner_img">
      <div className="my-element_1" style={{ backgroundImage: `url(${img1})` }} />
      <div className="my-element_2" style={{ backgroundImage: `url(${img2})` }} />
      <div className="my-element_3" style={{ backgroundImage: `url(${img3})` }} />
      <div className="my-element_4" style={{ backgroundImage: `url(${img4})` }} />
      <div className="my-element_5" style={{ backgroundImage: `url(${img5})` }} />
    </div>
  );
};

export default BackgroundImages; 