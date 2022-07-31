import React from 'react';

import Routes from './router/routes';
import SidePanel from './views/SidePanel';

function App() {
  return (
    <div className="App">
      <SidePanel />
      <Routes />
    </div>
  );
}

export default App;