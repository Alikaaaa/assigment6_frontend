import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from 'react-hook-form'
import { searchHistoryAtom } from "@/store";
import { addToHistory, getHistory } from "@/lib/userData";

export default function AdvancedSearch() {
  const [ searchHistoryList, setSearchHistoryList ] = useAtom(searchHistoryAtom)

  const router = useRouter()
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      searchBy: '',
      geoLocation: '',
      medium: '',
      isOnView: true,
      isHighlight: true,
      q: '',
    },
  });

  async function submitForm(data) {
    let queryString = Object.keys(data).map(key => data[key] != '' ? `${key}=${data[key]}` : '').filter(i => i != '').join('&')
    
    if(queryString)
      queryString = '?' + queryString
    
    await addToHistory(queryString)
    setSearchHistoryList(await getHistory())
    router.push(`/artwork${queryString}`)
  }

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control {...register("q")} type="text" placeholder="" name="q" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select {...register("searchBy")} name="searchBy" className="mb-3">
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control {...register("geoLocation")} type="text" placeholder="" name="geoLocation" />
            <Form.Text className="text-muted">
            Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
          </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control {...register("medium")}  type="text" placeholder="" name="medium"/>
            <Form.Text className="text-muted">
            Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
          </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            {...register("isHighlight")} 
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
          />
          <Form.Check
            {...register("isOnView")} 
            type="checkbox"
            label="Currently on View"
            name="isOnView"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
