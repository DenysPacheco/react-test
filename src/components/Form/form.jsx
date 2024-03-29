import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
// @ts-ignore
import { Button, Form } from "react-bootstrap"
// @ts-ignore
import { Add } from "@material-ui/icons"
// @ts-ignore
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "./form.css"
import "../../Styles/global.css"

const FormInputItem = (props) => {
  const query = props.query
  const setQuery = props.setQuery

  return (
    <Form
      className="add-list-group d-flex flex-row justify-content-center"
      onSubmit={(event) => {
        setQuery("")

        let [confirmation, message] = props.addList(event)
        confirmation ? toast() : toast.warning(message)
      }}
    >
      <input
        type="text"
        name="newItem"
        value={query}
        className={`input-search ${props.darkmode && "input-search-dark"}`}
        placeholder="Insert new item"
        maxLength={25}
        onChange={(event) => {
          setQuery(event.target.value)
        }}
      ></input>
      <div className={`${!query && "disabled"}`}>
        <Button
          type="submit"
          className={`list-item-btn input-add-list mx-2
                    ${props.darkmode && "btn-dark btn-success-dark"}
                    ${
                      query
                        ? ""
                        : props.darkmode
                        ? "disabled disabled-dark"
                        : "disabled"
                    }
                  `}
          variant="success"
        >
          {props.labels && "Add to list "}
          <Add />
        </Button>
      </div>
    </Form>
  )
}

export default FormInputItem
