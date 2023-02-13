import React, { } from 'react';
import { Link } from 'react-router-dom';

import { Wrapper } from './styles';

const Header = () => {
  return (
    <>
      <Wrapper>
        <i className="fa-solid fa-bars"></i>
        <span><Link className='white' to={'/'}>YouTIL</Link></span>
        {/* login */}
        <Link className='white' to={'/'}><i className="fa-solid fa-right-to-bracket"></i></Link>
        {/* logout */}
        {/* <Link className='white' to={'/'}><i className="fa-solid fa-right-from-bracket"></i></Link> */}
      </Wrapper>
    </>
  )
};

export default Header;