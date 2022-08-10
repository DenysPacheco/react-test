import React, { useState } from "react"
// @ts-ignore
import { ListGroup, Button } from "react-bootstrap"
// @ts-ignore
import { Delete, Loop } from "@material-ui/icons"
// @ts-ignore
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./marketList.css"
import "../../Styles/global.css"
import ListContent from "./listContent"
import FormInputItem from "../Form/form"

const MarketList = (props) => {
  const [query, setQuery] = useState("")

  const totalItems = () => {
    return props.fruitsList.reduce((acc, item) => acc + (item?.count || 0), 0)
  }

  const searchItem = (item) => {
    if (query === "" || query === undefined) return true
    else {
      return item.value.toLowerCase().includes(query.toLowerCase())
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
          plus={props.plus}
          minus={props.minus}
          labels={props.labels}
          typingX={props.typingX}
        />
      </ListGroup>
      {!query && (
        <div className="marketlist-btn-group">
          <div className={`${!props.fruitsList.length && "disabled"}`}>
            <Button
              className={`marketlist-btn ${
                props.darkmode ? "btn-dark btn-danger-dark" : ""
              }
                ${
                  props.fruitsList.length
                    ? ""
                    : props.darkmode
                    ? "disabled disabled-dark"
                    : "disabled"
                }`}
              variant="danger"
              onClick={() => {
                let [confirmation, message] = props.removeList()
                confirmation ? toast.error(message) : toast.warning(message)
              }}
            >
              {props.labels && "Delete all "}
              <Delete />
            </Button>
          </div>
          <div
            className={`${
              !(totalItems() || !props.fruitsList.length) && "disabled"
            }`}
          >
            <Button
              className={`marketlist-btn text ${
                props.darkmode && "btn-dark btn-primary-dark"
              }
                  ${
                    totalItems() || !props.fruitsList.length
                      ? ""
                      : props.darkmode
                      ? "disabled disabled-dark"
                      : "disabled"
                  }`}
              variant="primary"
              onClick={() => {
                props.reset()
                // let [confirmation, message] = props.reset()
                // confirmation
                //   ? toast.success(message)
                //   : toast.warning(message)
              }}
            >
              {props.labels && "Reset "}
              {totalItems() ? "(" + totalItems() + ") " : ""}
              <Loop />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default MarketList
