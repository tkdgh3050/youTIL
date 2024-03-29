import React, { FunctionComponent } from 'react';

import Wrapper from './styles';

// footer 부분
const Footer: FunctionComponent = () => (
  <>
    <hr />
    <Wrapper>
      <h4>About</h4>
      <span>
        This site was created by Gomsang. If you find any bugs, please send me an
        {' '}
        <a href="mailto:tkdgh3050@gmail.com">email</a>
        {' '}
        <i className="fa-regular fa-face-smile-wink" />
      </span>
    </Wrapper>
  </>
);

export default Footer;
