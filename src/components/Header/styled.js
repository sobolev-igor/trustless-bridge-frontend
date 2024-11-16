import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;

  height: auto;
  min-height: 60px;

  background-color: ${({ theme }) => theme.colors.black};

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  max-width: 1000px;
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const PageLink = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.cyan : theme.colors.black};
  color: ${({ theme, active }) =>
    active ? theme.colors.black : theme.colors.white};
  width: ${({ logo }) => (logo ? '350px' : '190px')};
  height: 60px;
  &:hover {
    color: ${({ theme, active }) =>
      active ? theme.colors.black : theme.colors.cyan};
  }

  @media (max-width: 1000px) {
    width: 100%;
    height: 100px;
  }
`;

export const LogoTitle = styled.span`
  ${({ theme }) => theme.fonts.montserrat.logoBlack}
`;

export const PageTitle = styled.span`
  ${({ theme }) => theme.fonts.montserrat.headerBlack};

  @media (max-width: 1000px) {
    ${({ theme }) => theme.fonts.anton.h3Black};
  }
`;

export const AddressTitle = styled.span`
  ${({ theme }) => theme.fonts.montserrat.captionBlack};

  @media (max-width: 1000px) {
    ${({ theme }) => theme.fonts.montserrat.b1Black};
  }
`;

export const BurgerContainer = styled.button`
  height: 40px;
  width: 40px;
  border: none;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const AnimatedLink = styled.div`
  width: 100%;

  // enter from
  &.fade-enter {
    height: 0;
  }

  // enter to
  &.fade-enter-active {
    height: 100px;
    transition: height 0.5s ease-in;
  }

  // exit from
  &.fade-exit {
    height: 80px;
  }

  // exit to
  &.fade-exit-active {
    height: 0;
    transition: height 0.5s ease-in;
  }
`;
