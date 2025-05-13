import viteLogo from '/vite.svg'
import reactLogo from './assets/react.svg'
import chakraLogo from './assets/chakra.png'
import './App.css'
import { Container, Link, Image } from "@chakra-ui/react"

function App() {

  return (
    <>
     <Container>
        <Link href="https://vite.dev" target="_blank">
          <Image src={viteLogo} alt="Vite logo" />
        </Link>
        <Link href="https://react.dev" target="_blank">
          <Image src={reactLogo} alt="React logo" />
        </Link> <br />
        <Link href="https://chakra-ui.com/">
          <Image src={chakraLogo} alt="Chakra logo" />
        </Link>
      </Container>
    </>
  )
}

export default App
