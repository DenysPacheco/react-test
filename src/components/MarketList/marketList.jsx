import "bootstrap/dist/css/bootstrap.min.css"
import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
// get our fontawesome imports
import { faTrash, faRecycle, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MarketList = (props) => {
    const { add, remove, reset, addList, removeList } = props

    let rows = ""
    if (props.lista.length !== 0) {
        rows = props.lista.map((item, index) => (
            <ListGroup.Item
                key={index}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#a6adb9",
                    width: "auto",
                }}
            >
                <div>
                    <span
                        style={{
                            verticalAlign: "middle",
                        }}
                    >
                        {item.id}. {item.value}{" "}
                        {item.count ? "(" + item.count + ")" : ""}
                    </span>
                </div>
                <div>
                    <Button
                        variant="danger"
                        style={{
                            marginLeft: ".5rem",
                        }}
                        onClick={() => {
                            remove(index)
                        }}
                    >
                        Remove <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        style={{
                            marginLeft: ".5rem",
                        }}
                        onClick={() => {
                            add(item.id)
                        }}
                    >
                        Add <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>
            </ListGroup.Item>
        ))
    }

    const totalItems = props.lista.reduce(
        (acc, item) => acc + (item.count === undefined ? 0 : item.count),
        0,
    )

    const FormInputItem = () => {
        return (
            <form
                onSubmit={addList}
                style={{
                    marginBottom: "1rem",
                    fontSize: "20px",
                }}
            >
                <input
                    type="text"
                    name="newItem"
                    style={{
                        borderRadius: "1rem",
                        maxWidth: "12rem",
                        padding: "0 .5rem",
                    }}
                    placeholder="Insert new item"
                ></input>
            </form>
        )
    }

    return (
        <div className="m-auto">
            <FormInputItem></FormInputItem>
            <ListGroup key="group">{rows}</ListGroup>
            <Button
                style={{
                    margin: "1rem .3rem",
                }}
                variant="danger"
                onClick={() => {
                    removeList()
                }}
            >
                Excluir todos
                <FontAwesomeIcon icon={faTrash} />
            </Button>
            <Button
                style={{
                    // marginTop: "1rem",
                    margin: "1rem .3rem",
                }}
                variant="primary"
                onClick={() => {
                    reset()
                }}
            >
                Resetar {totalItems ? "(" + totalItems + ")" : ""}
                <FontAwesomeIcon icon={faRecycle} />
            </Button>
        </div>
    )
}

export default MarketList
