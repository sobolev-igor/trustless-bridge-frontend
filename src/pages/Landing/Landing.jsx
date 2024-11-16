import React from 'react';
import { BlackBlock, FirstGradientLine } from '../../components/App';
import {Article, Heading1, Heading2} from '../../components/Typography';
import { setActivePage } from '../../services';

export const Landing = () => {
  React.useEffect(() => {
    setActivePage([true, false]);
  }, []);

  return (
    <>
      <FirstGradientLine>
        <Heading1>
          BRIDGE ASSETS
          <br />
          WITHOUT TRUST
        </Heading1>
      </FirstGradientLine>
      <BlackBlock>
        <Heading2 style={{ marginTop: '150px' }}>ABOUT TRUSTLESS BRIDGE</Heading2>
        <Article>
          Bridge that you don't need to trust to.
        </Article>
      </BlackBlock>
    </>
  );
};
