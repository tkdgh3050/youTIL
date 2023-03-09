import React, { } from 'react';

import FeatureSection from './FeatureSection';
import HowToSection from './HowToSection';
import SummarySection from './SummarySection';

import styled from 'styled-components';

const IntroDivWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;



const IntroMain = () => {
  return (
    <IntroDivWrapper>
      <SummarySection />
      <FeatureSection />
      <HowToSection />
    </IntroDivWrapper>

  )
};

export default IntroMain;