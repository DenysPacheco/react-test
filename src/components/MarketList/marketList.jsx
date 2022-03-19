import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { ListGroup, Button } from "react-bootstrap"
import { Delete, Add, Loop } from "@material-ui/icons"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"

class MarketList extends Component {
    constructor(props) {
        super(props)

        this.state = { query: "" }

        this.add = this.props.add.bind(this)
        this.remove = this.props.remove.bind(this)
        this.reset = this.props.reset.bind(this)
        this.addList = this.props.addList.bind(this)
        this.removeList = this.props.removeList.bind(this)
    }

    totalItems = () => {
        return this.props.fruitsList.reduce(
            (acc, item) => acc + (item?.count || 0),
            0,
        )
    }

    searchItem = (item) => {
        if (this.state.query === "" || this.state.query === undefined)
            return true
        else {
            return item.value
                .toLowerCase()
                .includes(this.state.query.toLowerCase())
        }
    }

    Content = () => {
        if (this.props.fruitsList.length !== 0) {
            return this.props.fruitsList
                .filter(this.searchItem)
                .map((item, index) => (
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
                        <div
                            style={{
                                marginLeft: "1rem",
                            }}
                        >
                            <Button
                                variant="danger"
                                style={{
                                    marginLeft: ".5rem",
                                }}
                                onClick={() => {
                                    this.remove(item.id)
                                    toast.error(`Item removed: ${item.value}`)
                                }}
                            >
                                Remove <Delete />
                            </Button>
                            <Button
                                style={{
                                    marginLeft: ".5rem",
                                }}
                                title={`Maximum ${this.props.MAXITEMS}`}
                                onClick={() => {
                                    let [confirmation, message] = this.add(
                                        item.id,
                                    )
                                    confirmation
                                        ? toast()
                                        : toast.warning(message)
                                }}
                            >
                                Add <Add />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))
        }
        return false
    }

    FormInputItem = () => {
        return (
            <form
                onSubmit={(event) => {
                    this.setState({ query: "" })

                    let [confirmation, message] = this.addList(event)
                    confirmation ? toast() : toast.warning(message)
                }}
                style={{
                    marginBottom: "1rem",
                    fontSize: "20px",
                }}
            >
                <input
                    type="text"
                    name="newItem"
                    value={this.state.query}
                    style={{
                        borderRadius: "1rem",
                        maxWidth: "12rem",
                        padding: "0 .5rem",
                    }}
                    placeholder="Insert new item"
                    onChange={(event) => {
                        this.setState({ query: event.target.value })
                    }}
                ></input>
                <Button type="submit" className="mx-2" variant="success">
                    <Add />
                    &nbsp; Add to list
                </Button>
            </form>
        )
    }

    render() {
        return (
            <div className="m-auto">
                <this.FormInputItem />
                <ListGroup key="group">
                    <this.Content />
                </ListGroup>
                <Button
                    style={{
                        margin: "1rem .3rem",
                    }}
                    variant="danger"
                    onClick={() => {
                        let [confirmation, message] = this.removeList()
                        confirmation
                            ? toast.error(message)
                            : toast.warning(message)
                    }}
                >
                    Delete all &nbsp;
                    <Delete />
                </Button>
                <Button
                    style={{
                        margin: "1rem .3rem",
                    }}
                    variant="primary"
                    onClick={() => {
                        let [confirmation, message] = this.reset()
                        confirmation
                            ? toast.success(message)
                            : toast.warning(message)
                    }}
                >
                    Reset&nbsp;
                    {this.totalItems() ? "(" + this.totalItems() + ")" : ""}
                    &nbsp;
                    <Loop />
                </Button>
            </div>
        )
    }
}

export default MarketList
