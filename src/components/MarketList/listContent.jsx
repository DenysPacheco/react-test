import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { ListGroup, Button } from "react-bootstrap"
import { Delete, Add } from "@material-ui/icons"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "./marketList.css"

const ListContent = (props) => {
  if (props.fruitsList.length !== 0) {
    return props.fruitsList
      .filter(props.searchItem)
      .map((item, index) => (
        <ListGroup.Item
          key={index}
          title={item.value}
          className={`list-item ${props.darkmode ? "list-item-dark" : ""
            }`}
        >
          <div className="d-flex">
            <div className="list-item-id">{item.id}.&nbsp;</div>
            <div className="list-item-value">{item.value} </div>
            <div>
              {item.count ? "(" + item.count + ")" : ""}
            </div>
          </div>
          <div className="list-item-btn-group">
            <Button
              className={`list-item-btn
                          ${props.darkmode
                  ? "list-item-btn-dark list-item-btn-danger-dark"
                  : ""
                }`}
              title="Remove from list"
              variant="danger"
              onClick={() => {
                props.remove(item.id)
                toast.error(`Item removed: ${item.value}`)
              }}
            >
              Remove
              <Delete />
            </Button>
            <Button
              className={`list-item-btn
                              ${props.darkmode
                  ? "list-item-btn-dark list-item-btn-primary-dark"
                  : ""
                }`}
              title={`Maximum ${props.MAXITEMS}`}
              onClick={() => {
                let [confirmation, message] = props.add(
                  item.id,
                )
                confirmation
                  ? toast()
                  : toast.warning(message)
              }}
            >
              Add
              <Add />
            </Button>
          </div>
        </ListGroup.Item>
      ))
  }
  return false
}

export default ListContent