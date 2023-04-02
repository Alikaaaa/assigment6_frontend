import { Col, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

import { favouritesAtom } from '@/store'
import { useAtom } from 'jotai'

export default function Favourites() {
  const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom)

  if(!favouritesList) return null

  return (
    <>
      { (favouritesList && favouritesList.length) ? 
      <Row className="gy-4">
          {
            favouritesList.map(currentObjectID => <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>)
          } 
      </Row> : <h4>Nothing Here Try adding some new artwork to the list.</h4>
    } 
    </>
  )
}