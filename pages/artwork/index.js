import useSWR from 'swr'
import Error from 'next/error'
import { Button, Col, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json'

export default function ArtworkIndex(props) {
  const PER_PAGE = 12
  let [ artworkList, setArtworkList ] = useState()
  let [ page, setPage ] = useState(1)

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

  useEffect(() => {
    if(!data)
      return

    console.log(data)

    let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

    let results = []

    for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
      const chunk = filteredResults.slice(i, i + PER_PAGE);
      results.push(chunk);
    }
    
    setArtworkList(results)
    setPage(1)
  }, [ data ])

  const previousPage = () => {
    if(page <= 1) 
      return
    setPage(page - 1)
  }

  const nextPage = () => {

    if(data?.total > page * PER_PAGE)
      setPage(page + 1)
  }

  if(error) {
    return <Error statusCode={404} />
  }

  return (
    <>
      { 
        (artworkList && artworkList.length) ?
          <Row className="gy-4">
            {
              artworkList[page-1].map(currentObjectID => <Col lg={3} key={currentObjectID}><ArtworkCard objectID={currentObjectID} /></Col>)
            }
          </Row> : <h4>Nothing Here</h4>
      }
            
          <Pagination>
            <Pagination.Prev onClick={previousPage}/>
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage}/>
          </Pagination> 
    </>
  )
}
