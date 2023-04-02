import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap"
import Link from 'next/link'
import { useState } from "react"
import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import { useRouter } from "next/router"
import { addToHistory, getHistory } from "@/lib/userData"

import { getToken, readToken, removeToken } from '@/lib/authenticate'

export default function MainNav() {
  const [ searchHistoryList, setSearchHistoryList ] = useAtom(searchHistoryAtom)
  let [ isExpanded, setIsExpanded ] = useState(false)
  let [ searchValue, setSearchValue ] = useState('')

  const onSubmit = async () => {
    setIsExpanded(false)
    await addToHistory(`title=true&q=${searchValue}`)
    setSearchHistoryList(await getHistory())
  }

  const router = useRouter()

  let token = getToken()
  let user = readToken()

  function logout() {
    setIsExpanded(false)
    removeToken()
    router.push('/login')
  }

  return (
    <div>
      <Navbar className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Oleksandra Meshcheriakova</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" onToggle={() => { setIsExpanded(!isExpanded) }}/>
          <Navbar.Collapse id="navbarScroll">
            <Nav>
              <Nav.Link style={{color:"white"}} onClick={() => { setIsExpanded(false) }} as={Link} active={router.pathname === "/"} href="/" passHref>Home</Nav.Link>
              { token && <Nav.Link style={{color:"white"}} onClick={() => { setIsExpanded(false) }} as={Link} active={router.pathname === "/search"} href="/search" passHref>Advanced Search</Nav.Link> }
            </Nav>
            &nbsp;
            { token && 
              <Form className="d-flex" action="/artwork">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  name="q"
                  onChange={(e) => { setSearchValue(e.target.value + '&title=true') }}
                />
                <Button type="submit" variant="outline-success" onClick={onSubmit}>Search</Button>
            </Form>
           }
           &nbsp;
           {  
             token &&
            <Nav className="me-auto">
              <NavDropdown title={user.login} id="basic-nav-dropdown">
                <NavDropdown.Item active={router.pathname === "/favourites"} href="/favourites" as={Link} onClick={() => { setIsExpanded(false) }}>Favourites</NavDropdown.Item>
                <NavDropdown.Item active={router.pathname === "/history"} href="/history" as={Link} onClick={() => { setIsExpanded(false) }}>Search History</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { setIsExpanded(false); logout() }}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav> 
          }
          {
            !token &&
            <Nav className="me-auto">
              <Nav.Link style={{color:"white"}} as={Link} href="/login" passHref>Login</Nav.Link>
              <Nav.Link style={{color:"white"}} as={Link} href="/register" passHref>Register</Nav.Link>
            </Nav>
          }
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br/>
      <br/>
    </div>
  )
}
