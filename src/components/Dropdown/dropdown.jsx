import Dropdown from "react-bootstrap/Dropdown"
import SettingsIcon from "@material-ui/icons/Settings"
import { Brightness7, NightsStay } from "@material-ui/icons"
import { Form } from "react-bootstrap"
import "./dropdown.css"
import "../../Styles/global.css"

function BasicExample(props) {
  return (
    <Dropdown className="dropdown" autoClose="outside">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        <SettingsIcon />
      </Dropdown.Toggle>

      <Dropdown.Menu variant={props.darkmode ? "dark" : "light"}>
        <Dropdown.Item
          as="button"
          onClick={() => {
            props.setLS("darkmode", !props.darkmode)
            props.setDarkmode(!props.darkmode)
          }}
        >
          <div className="d-flex btn-option">
            {/* <Brightness7 /> */}
            <Form.Check
              type="switch"
              id="darkmode-switch"
              name="darkmode"
              checked={props.darkmode}
              readOnly
            />
            {(props.darkmode && (
              <Brightness7 className="label-dark icon-option" />
            )) || <NightsStay className="icon-option" />}
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            props.setLS("labels", !props.labels)
            props.setLabels(!props.labels)
          }}
        >
          <div className="d-flex btn-option">
            <Form.Check
              type="switch"
              id="labels-switch"
              name="labels"
              checked={props.labels}
              readOnly
            />
            <div className={props.darkmode ? "label-dark" : "label"}>
              {/* {props.labels ? "No labels" : "Labels"} */}
              Labels
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => {
            props.setLS("typingX", !props.typingX)
            props.setTypingX(!props.typingX)
          }}
        >
          <div className="d-flex btn-option">
            <Form.Check
              type="switch"
              id="typingX-switch"
              name="typingX"
              checked={props.typingX}
              readOnly
            />
            <div className={props.darkmode ? "label-dark" : "label"}>
              {/* {props.typingX ? "Marks: X" : "Marks: ()"} */}
              Marks
            </div>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default BasicExample
