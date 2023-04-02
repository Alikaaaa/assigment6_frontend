import { useAtom } from "jotai"
import { searchHistoryAtom } from "@/store"
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from "react-bootstrap";
import styles from '@/styles/History.module.css'
import { getHistory, removeFromHistory } from "@/lib/userData";

export default function History() {
  const [ searchHistoryList, setSearchHistoryList ] = useAtom(searchHistoryAtom)
  const router = useRouter()

  if(!searchHistoryList)
    return null

  let parsedHistory = [];

  searchHistoryList.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  })

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistoryList[index]}`)
  }

  const removeHistoryClicked = async (e, index) => {
    e.stopPropagation()
    await removeFromHistory(searchHistoryList[index])
    setSearchHistoryList(await getHistory());
  }

  return (
    <>
      { (parsedHistory && parsedHistory.length) ? 

        <ListGroup>
          { parsedHistory.map((historyItem, index) => {
            return <ListGroup.Item className={styles} onClick={e => historyClicked(e, index)}> 
                {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))} 
                <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
              </ListGroup.Item> 
            }) 
          } 
        </ListGroup>

       : <Card>Nothing Here Try searching for some artwork.</Card>
    } 
    </>
  )
}