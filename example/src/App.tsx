import React from 'react'

import FPSStats from 'react-fps-stats'
import Dottify from 'dotify-react'

const App = () => {
  return <div>
    <FPSStats />
    <Dottify dotsCount={388} />
    <div style={{ height: '100vh', textAlign: 'center' }}>
      test
    </div>
  </div>
}

export default App
