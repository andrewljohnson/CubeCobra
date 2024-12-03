import React, { useContext } from 'react';

import PropTypes from 'prop-types';
import CubePropType from 'proptypes/CubePropType';

import Text from 'components/base/Text';
import CubeListNavbar from 'components/CubeListNavbar';
import CurveView from 'components/CurveView';
import DynamicFlash from 'components/DynamicFlash';
import ErrorBoundary from 'components/ErrorBoundary';
import ListView from 'components/ListView';
import RenderToRoot from 'components/RenderToRoot';
import TableView from 'components/TableView';
import VisualSpoiler from 'components/VisualSpoiler';
import CubeContext from 'contexts/CubeContext';
import DisplayContext, { DisplayContextProvider } from 'contexts/DisplayContext';
import useQueryParam from 'hooks/useQueryParam';
import CubeLayout from 'layouts/CubeLayout';
import MainLayout from 'layouts/MainLayout';

const CubeListPageRaw = () => {
  const { changedCards, filter } = useContext(CubeContext);
  const { showMaybeboard } = useContext(DisplayContext);

  const [cubeView, setCubeView] = useQueryParam('view', 'table');

  const tagList = [];
  for (const [boardname, list] of Object.entries(changedCards)) {
    if (boardname !== 'id') {
      tagList.push(...new Set([].concat(...list.map((card) => card.tags))));
    }
  }

  return (
    <>
      <CubeListNavbar cubeView={cubeView} setCubeView={setCubeView} />
      <DynamicFlash />
      {Object.entries(changedCards)
        .map(([boardname, boardcards]) => (
          <ErrorBoundary key={boardname}>
            {(showMaybeboard || boardname !== 'maybeboard') && (
              <>
                {boardname !== 'mainboard' && <Text semibold md>{boardname}</Text>}
                {boardcards.length === 0 &&
                  (filter ? (
                    <Text semibold md>No cards match filter.</Text>
                  ) : (
                    <Text semibold md>This board is empty.</Text>
                  ))}
                {
                  {
                    table: <TableView cards={boardcards} />,
                    spoiler: <VisualSpoiler cards={boardcards} />,
                    curve: <CurveView cards={boardcards} />,
                    list: <ListView cards={boardcards} />,
                  }[cubeView]
                }
                {boardname !== 'mainboard' && <hr />}
              </>
            )}
          </ErrorBoundary>
        ))
        .reverse()}
    </>
  );
};

const CubeListPage = ({ cube, cards, loginCallback }) => (
  <MainLayout loginCallback={loginCallback}>
    <DisplayContextProvider cubeID={cube.id}>
      <CubeLayout cube={cube} cards={cards} activeLink="list" loadVersionDict useChangedCards>
        <CubeListPageRaw />
      </CubeLayout>
    </DisplayContextProvider>
  </MainLayout>
);

CubeListPage.propTypes = {
  cube: CubePropType.isRequired,
  cards: PropTypes.shape({
    boards: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  loginCallback: PropTypes.string,
};

CubeListPage.defaultProps = {
  loginCallback: '/',
};

export default RenderToRoot(CubeListPage);
