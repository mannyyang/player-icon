import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'player-core-ui/assets/normalize.css';
import 'semantic-ui-css/semantic.css';
import 'player-core-ui/assets/csod-icons.css';

///////////////////////////////////////////////////////////////////////
// Keep the test harness reference here as order matters for styles. //
///////////////////////////////////////////////////////////////////////
import TestHarness from './TestHarness';

import 'player-core-ui/assets/csod-style-utilities.css';
import 'player-theming/theme.css';

ReactDOM.render(
  <TestHarness />,
  document.getElementById('root') as HTMLElement
);
