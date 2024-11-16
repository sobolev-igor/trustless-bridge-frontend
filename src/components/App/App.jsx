import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Global, theme } from './theme';
import { AppBody, Content } from './styled';

import { Header } from '../Header';
import { Landing } from '../../pages/Landing';
import { Bridge } from '../../pages/Bridge';

export const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<AppBody />}>
          <Global />
          <AppBody>
            <Header />
            <Content>
              <Switch>
                <Route exact path="/bridge" component={Bridge} />
                <Route component={Landing} />
              </Switch>
            </Content>
          </AppBody>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
};
