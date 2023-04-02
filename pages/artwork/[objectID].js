import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";


export default function ArtworkObjectID(props) {
  let router = useRouter()
  const { objectID } = router.query
  
  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID}/>
        </Col>
      </Row>
    </>
  )
}
