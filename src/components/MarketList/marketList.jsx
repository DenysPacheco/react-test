import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { ListGroup, Button } from "react-bootstrap"
import { Delete, Loop } from "@material-ui/icons"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "./marketList.css"
import ListContent from "./listContent"
import FormInputItem from "../Form/form"

const MarketList = (props) => {
  const [query, setQuery] = useState('')

  const totalItems = () => {
    return props.fruitsList.reduce(
      (acc, item) => acc + (item?.count || 0),
      0,
    )
  }

  const searchItem = (item) => {
    if (query === "" || query === undefined)
      return true
    else {
      return item.value
        .toLowerCase()
        .includes(query.toLowerCase())
    }
  }

  return (
    <div className="m-auto">
      <FormInputItem
        query={query}  
        setQuery={setQuery}  
      />
      <ListGroup className="list-group-table" key="group">
        <ListContent
          darkmode={props.darkmode}
          fruitsList={props.fruitsList}
          MAXITEMS={props.MAXITEMS}
          searchItem={searchItem}
        />
      </ListGroup>
      {!query ? (
        <>
          <Button
            className={`button
                            ${props.darkmode
                ? "list-item-btn-dark list-item-btn-danger-dark"
                : ""
              }
                            ${props.fruitsList.length
                ? ""
                : props.darkmode
                  ? "disabled disabled-dark"
                  : "disabled"
              }
                            `}
            variant="danger"
            onClick={() => {
              let [confirmation, message] = props.removeList()
              confirmation
                ? toast.error(message)
                : toast.warning(message)
            }}
          >
            Delete all &nbsp;
            <Delete />
          </Button>
          <Button
            className={`button
                            ${props.darkmode
                ? "list-item-btn-dark list-item-btn-primary-dark"
                : ""
              }

                            ${totalItems() ||
                !props.fruitsList.length
                ? ""
                : props.darkmode
                  ? "disabled disabled-dark"
                  : "disabled"
              }
                            `}
            variant="primary"
            onClick={() => {
              let [confirmation, message] = props.reset()
              confirmation
                ? toast.success(message)
                : toast.warning(message)
            }}
          >
            Reset&nbsp;
            {totalItems()
              ? "(" + totalItems() + ")"
              : ""}
            &nbsp;
            <Loop />
          </Button>
        </>
      ) : (
        false
      )}
    </div>
  )
}

export default MarketList
