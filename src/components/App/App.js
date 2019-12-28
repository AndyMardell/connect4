import React from 'react'
import styled from 'styled-components'
import Grid from '../Grid'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const App = () => (
  <Container>
    <Grid />
  </Container>
)

export default App
