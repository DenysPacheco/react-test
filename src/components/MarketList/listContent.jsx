import React from "react"
// @ts-ignore
import { ListGroup, Button } from "react-bootstrap"
// @ts-ignore
import { Delete, Add, Remove } from "@material-ui/icons"
// @ts-ignore
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./marketList.css"
import "../../Styles/global.css"
import useWindowDimensions from "../../Utils/utils"
import { LOWWIDTH } from "../../Configs/config"

const ListContent = (props) => {
  const { width } = useWindowDimensions()
  const lowWidth = width <= LOWWIDTH
  if (props.fruitsList.length !== 0) {
    return props.fruitsList.filter(props.searchItem).map((item, index) => (
      <ListGroup.Item
        key={index}
        className={`list-item ${
          props.darkmode && "list-item-dark list-background-dark"
        } ${props.labels && lowWidth && "flex-column"}`}
      >
        <div
          className={`d-flex list-item-info ${
            !props.labels && lowWidth && "list-item-info-width"
          } me-2`}
          title={item.value}
        >
          <div className="list-item-id">{item.id}. </div>
          {props.typingX && (
            <div className="list-item-count">
              {item.count ? `${item.count}x ` : ""}
            </div>
          )}

          <div
            className={`list-item-value ${
              lowWidth && props.labels ? "w-80" : "list-item-width"
            }`}
          >
            {item.value}
          </div>

          {!props.typingX && (
            <div className="list-item-count">
              {item.count ? ` (${item.count})` : ""}
            </div>
          )}
        </div>
        <div className="list-item-btn-group">
          <Button
            className={`list-item-btn ${
              props.darkmode && "btn-dark btn-danger-dark"
            }`}
            title="Remove from list"
            variant="danger"
            onClick={() => {
              props.remove(item.id)
              toast.error(`Item removed: ${item.value}`)
            }}
          >
            {props.labels && "Remove "}
            <Delete />
          </Button>
          <Button
            className={`list-item-btn ${
              props.darkmode && "btn-dark btn-secondary-dark"
            } ${
              item.count
                ? ""
                : props.darkmode
                ? "disabled disabled-dark"
                : "disabled"
            }`}
            title={`Minimum ${props.MINITEMS}`}
            variant="secondary"
            onClick={() => {
              let [confirmation, message] = props.minus(item.id)
              confirmation ? toast() : toast.warning(message)
            }}
          >
            {props.labels && "Minus "}
            <Remove />
          </Button>
          <Button
            className={`list-item-btn ${
              props.darkmode && "btn-dark btn-primary-dark"
            }`}
            title={`Maximum ${props.MAXITEMS}`}
            variant="primary"
            onClick={() => {
              let [confirmation, message] = props.plus(item.id)
              confirmation ? toast() : toast.warning(message)
            }}
          >
            {props.labels && "Plus"}
            <Add />
          </Button>
        </div>
      </ListGroup.Item>
    ))
  }
  return false
}

export default ListContent
