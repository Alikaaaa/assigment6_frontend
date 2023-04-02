import { Card, Form, Button, Alert } from "react-bootstrap"
import { useState } from 'react'

import { authenticateUser } from '@/lib/authenticate'
import { getFavourites, getHistory } from '@/lib/userData'
import { useRouter } from 'next/router'

import { useAtom } from 'jotai'
import { favouritesAtom, searchHistoryAtom } from '@/store'

export default function Login(props){
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [warning, setWarning] = useState('')
  const router = useRouter()

  const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom)
  const [ searchHistoryList, setSearchHistoryList ] = useAtom(searchHistoryAtom)

  async function updateAtoms() {
    setFavouritesList(await getFavourites())
    setSearchHistoryList(await getHistory())
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(login, password)
      await updateAtoms()
      router.push('/favourites');
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Login</h2>Enter your login information below:</Card.Body>
      </Card>
      { warning && ( <><br /><Alert variant="danger">{warning}</Alert></> )}
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Login:</Form.Label>
          <Form.Control type="text" value={login} id="login" name="login" onChange={e => setLogin(e.target.value)} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} id="password" name="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Login</Button>
      </Form>
    </>
  );
}