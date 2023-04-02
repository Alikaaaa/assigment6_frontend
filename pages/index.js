/**********************************************************************************  
 * WEB422 – Assignment 5  
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
 * No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 * 
 *  Name: Oleksandra Meshcheriakova Student ID: 158491191 Date: 20/03/2023
 * 
 * **********************************************************************************/ 


import MainNav from '@/components/MainNav'
import Head from 'next/head'
import { Col, Image, Row } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <Head>
        <title>App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainNav></MainNav>
        <Image fluid={true} rounded={true} src={'https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg'}></Image>
        <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">…</a>
      </main>
    </>
  )
}
