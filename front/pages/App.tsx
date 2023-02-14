import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyle, RoutesWrapper } from './GlobalStyle';
import Footer from '../components/footer';
import Header from '../components/header';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <RoutesWrapper>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </RoutesWrapper>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;