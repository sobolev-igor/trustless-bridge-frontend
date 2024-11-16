import styled from 'styled-components';

export const HorizontalFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  min-height: 500px;
  width: 150%;
  max-width: 550px;
  margin-bottom: 13px;
`;

export const FrameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  border-radius: 3.5px;

  width: 85%;
  padding: 50px;
  margin: 50px;
  height: 100%;
  @media (max-width: 1000px) {
  }
  @media (max-width: 650px) {
  }
`;
