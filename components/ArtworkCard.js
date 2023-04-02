import Card from 'react-bootstrap/Card';
import useSWR from 'swr'
import Error from 'next/error'
import { Button } from 'react-bootstrap';
import Link from 'next/link';

export default function ArtworkCard(props) {
  const notAvImg = 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`)

  if(error) {
    return <Error statusCode={404} />
  }

  if(!data)
    return null

  return (
    <Card className="bg-light">
      <Card.Img variant="top" src={data.primaryImageSmall ? data.primaryImageSmall : notAvImg} />
      <Card.Body>
        <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
        <Card.Text>{data.objectDate ? data.objectDate : 'N/A'}</Card.Text>
        <Card.Text>{data.classification ? data.classification : 'N/A'}</Card.Text>
        <Card.Text>{data.medium ? data.medium : 'N/A'}</Card.Text>
        <Link href={`/artwork/${props.objectID}`} passHref><Button>Details</Button></Link>
      </Card.Body>
    </Card>
  )
}
