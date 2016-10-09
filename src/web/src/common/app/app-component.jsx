import React from 'react';
import { Match, Redirect, Miss } from 'react-router';
import { Grid } from '../lib/bootstrap';
import {
  ConferencesList,
  ConferenceDetails,
  CONFERENCE_ROUTES,
} from '../conference';
import { APP_ROUTES } from './app-constants';
import { UserLogin, USER_ROUTES } from '../user';
import Header from '../header';
/**
 * TODO: Check why './header' path is failing in prod env.
 */
// import Header from '../header/header-tag';
import NotFound from '../not-found';
// import { LoginScreen } from '../user';
// import { VisibleConferences, VisibleDetailsIndex } from '../containers';
// import { APP, USER, CONFERENCES } from '../constants/routes';

const GoToConferences = () => (
  <Redirect to={`${CONFERENCE_ROUTES.LIST}/1`} />
);

const App = () => (
  <div>
    <Header />
    <Grid fluid>
      <Match
        exactly
        pattern={APP_ROUTES.HOME}
        component={GoToConferences}
      />
      <Match
        pattern={`${CONFERENCE_ROUTES.LIST}/:current`}
        component={ConferencesList}
      />
      <Match
        pattern={`${CONFERENCE_ROUTES.DETAILS}/:slug`}
        component={ConferenceDetails}
      />
      <Match pattern={USER_ROUTES.LOGIN} component={UserLogin} />
      <Miss component={NotFound} />
    </Grid>
  </div>
);

export default App;
