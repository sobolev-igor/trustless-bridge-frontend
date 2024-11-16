import React, { useState } from 'react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import {
  AddressTitle,
  AnimatedLink,
  BurgerContainer,
  HeaderContainer,
  HeaderInner,
  LogoTitle,
  PageLink,
  PageTitle,
} from './styled';
import { activePage$, displayAddress$ } from '../../services';
import { theme } from '../App/theme';
import Cross from '../../../static/assets/svg/cross.svg';
import Burger from '../../../static/assets/svg/burger.svg';
import { useRect } from '../../hooks';
import { CSSTransition } from 'react-transition-group';

export const Header = () => {
  const displayAddress = useStore(displayAddress$);
  const activePage = useStore(activePage$);

  const [menuOpened, setMenuOpened] = useState(false);
  const ref = React.useRef();
  const { width } = useRect(ref);

  const pageSelector = React.useMemo(
    () => (
      <HeaderInner>
        <Link className="header-link" to="/">
          <PageLink active={activePage[0]} logo={true}>
            <LogoTitle active={activePage[0]}>TRUSTLESS BRIDGE</LogoTitle>
          </PageLink>
        </Link>
        <Link className="header-link" to="/bridge">
          <PageLink active={activePage[1]}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <PageTitle active={activePage[1]}>BRIDGE</PageTitle>
              {displayAddress ? (
                <>
                  <AddressTitle active={activePage[1]}>
                    {displayAddress}
                  </AddressTitle>
                </>
              ) : (
                <></>
              )}
            </div>
          </PageLink>
        </Link>
      </HeaderInner>
    ),
    [activePage, displayAddress]
  );

  const pageSelectorMobile = React.useMemo(
    () => (
      <HeaderInner>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-around',
            height: '60px',
            backgroundColor: theme.colors.white,
          }}>
          {
            <Link
              className="header-link"
              to="/"
              onClick={(menuOpened) =>
                menuOpened ? setMenuOpened(!menuOpened) : null
              }
              style={{ WebkitTapHighlightColor: 'transparent' }}>
              <PageLink
                active={activePage[0]}
                logo={true}
                style={{
                  backgroundColor: 'white',
                  height: '60px',
                }}>
                <LogoTitle
                  active={activePage[0]}
                  style={{
                    color: 'black',
                  }}>
                  TRUSTLESS BRIDGE
                </LogoTitle>
              </PageLink>
            </Link>
          }
          <BurgerContainer onClick={() => setMenuOpened(!menuOpened)}>
            {menuOpened ? <Cross /> : <Burger />}
          </BurgerContainer>
        </div>
        <CSSTransition
          in={menuOpened}
          classNames="fade"
          timeout={500}
          unmountOnExit
          style={{ width: '100%' }}>
          {() => (
            <AnimatedLink key="links">
              <Link
                style={{
                  width: '100%',
                  WebkitTapHighlightColor: 'transparent',
                }}
                className="header-link"
                to="/bridge"
                onClick={() => setMenuOpened(!menuOpened)}>
                <PageLink active={activePage[1]}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}>
                    <PageTitle active={activePage[1]}>BRIDGE</PageTitle>
                    {displayAddress ? (
                      <>
                        <AddressTitle active={activePage[1]}>
                          {displayAddress}
                        </AddressTitle>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </PageLink>
              </Link>
            </AnimatedLink>
          )}
        </CSSTransition>
      </HeaderInner>
    ),
    [activePage, displayAddress, menuOpened]
  );

  return React.useMemo(
    () => (
      <>
        {width <= 1000 ? (
          <HeaderContainer width={width} ref={ref}>
            {pageSelectorMobile}
          </HeaderContainer>
        ) : (
          <HeaderContainer width={width} ref={ref}>
            {pageSelector}
          </HeaderContainer>
        )}
      </>
    ),
    [pageSelectorMobile, pageSelector, width]
  );
};
