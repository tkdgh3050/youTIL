import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle, RoutesWrapper } from './GlobalStyle';
import Footer from '../components/footer';
import Header from '../components/header';
import Landing from './LandingPage';
import Login from './LoginPage';
import Register from './RegisterPage';
import Notice from './NoticePage';
import MyNote from './MyNotePage';
import VideoView from './VideoViewPage';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <RoutesWrapper>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/videoView" element={<VideoView />} />
              <Route path="/notice" element={<Notice />} />
              <Route path="/myNote" element={<MyNote />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Landing />} />
            </Routes>
          </Suspense>
        </RoutesWrapper>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;