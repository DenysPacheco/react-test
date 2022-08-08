import React, { useState } from "react"
import { ListGroup, Button } from "react-bootstrap"
import { Delete, Loop } from "@material-ui/icons"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./marketList.css"
import "../../Styles/global.css"
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
        addList={props.addList}
        labels={props.labels}
        darkmode={props.darkmode}
      />
      <ListGroup className="list-group-table" key="group">
        <ListContent
          darkmode={props.darkmode}
          fruitsList={props.fruitsList}
          MAXITEMS={props.MAXITEMS}
          MINITEMS={props.MINITEMS}
          searchItem={searchItem}
          remove={props.remove}
          add={props.add}
          minus={props.minus}
          labels={props.labels}
          typingX={props.typingX}
        />
      </ListGroup>
      {!query ? (
        <>
          <Button
            className={`btn
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
            {!props.labels ? 'Delete all ' : ''}
            <Delete />
          </Button>
          <Button
            className={`btn
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
              props.reset()
              // let [confirmation, message] = props.reset()
              // confirmation
              //   ? toast.success(message)
              //   : toast.warning(message)
            }}
          >
            {!props.labels ? 'Reset ' : ''}
            {totalItems()
              ? "(" + totalItems() + ")"
              : ""}
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
