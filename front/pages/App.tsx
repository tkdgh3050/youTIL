import React, { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GlobalStyle from './GlobalStyle';
import Footer from '../components/footer';
import Header from '../components/header';
import LandingPage from './LandingPage';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;