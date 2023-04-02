import Card from 'react-bootstrap/Card';
import useSWR from 'swr'
import Error from 'next/error'
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';

import { addToFavourites, removeFromFavourites, getFavourites } from '@/lib/userData'


export default function ArtworkCardDetail(props) {
  const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom)
  const [ showAdded, setShowAdded ] = useState(false)

  const notAvImg = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'
  const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null)

  useEffect(() => {
    setShowAdded(favouritesList?.includes(props.objectID))
  }, [favouritesList])

  if(error) {
    return <Error statusCode={404} />
  }

  if(!data)
    return null

  const favouritesClicked = async () => {
    if(showAdded) {
      await removeFromFavourites(props.objectID)
    } else {
      await addToFavourites(props.objectID)
    }

    setFavouritesList(await getFavourites())
    setShowAdded(!showAdded)
  }

  return (
    <Card className="bg-light">
      <Card.Img variant="top" src={data.primaryImage ? data.primaryImage : notAvImg} />
      <Card.Body>
        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
        <Card.Text>{data.objectDate ? data.objectDate : 'N/A'}</Card.Text>
        <Card.Text>{data.classification ? data.classification : 'N/A'}</Card.Text>
        <Card.Text>{data.medium ? data.medium : 'N/A'}</Card.Text>
        <br/><br/>
        <Card.Text>{data.artistDisplayName ? data.artistDisplayName : 'N/A'}</Card.Text>
        { data.artistDisplayName && <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a>}
        <Card.Text>{data.creditLine ? data.creditLine : 'N/A'}</Card.Text>
        <Card.Text>{data.dimensions ? data.dimensions : 'N/A'}</Card.Text>
        <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
          + Favourite { showAdded && '(added)' }  
        </Button> 
      </Card.Body>
    </Card>
  )
}
