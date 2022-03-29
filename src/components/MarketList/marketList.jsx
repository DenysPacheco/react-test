import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { ListGroup, Button, Form } from "react-bootstrap"
import { Delete, Add, Loop } from "@material-ui/icons"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
import "./marketList.css"

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
                        title={item.value}
                        className={`list-item ${
                            this.props.darkmode ? "list-item-dark" : ""
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
                            ${
                                this.props.darkmode
                                    ? "list-item-btn-dark list-item-btn-danger-dark"
                                    : ""
                            }`}
                                title="Remove from list"
                                variant="danger"
                                onClick={() => {
                                    this.remove(item.id)
                                    toast.error(`Item removed: ${item.value}`)
                                }}
                            >
                                Remove
                                <Delete />
                            </Button>
                            <Button
                                className={`list-item-btn
                                ${
                                    this.props.darkmode
                                        ? "list-item-btn-dark list-item-btn-primary-dark"
                                        : ""
                                }`}
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
                                Add
                                <Add />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))
        }
        return false
    }

    FormInputItem = () => {
        return (
            <Form
                className="add-list-group"
                onSubmit={(event) => {
                    this.setState({ query: "" })

                    let [confirmation, message] = this.addList(event)
                    confirmation ? toast() : toast.warning(message)
                }}
            >
                <input
                    type="text"
                    name="newItem"
                    value={this.state.query}
                    className={`input-search ${
                        this.props.darkmode ? "input-search-dark" : ""
                    }
                    `}
                    placeholder="Insert new item"
                    onChange={(event) => {
                        this.setState({ query: event.target.value })
                    }}
                ></input>
                <Button
                    type="submit"
                    className={`"list-item-btn input-add-list mx-2"
                    ${
                        this.props.darkmode
                            ? "list-item-btn-dark list-item-btn-success-dark"
                            : ""
                    }
                    ${
                        this.state.query
                            ? ""
                            : this.props.darkmode
                            ? "disabled disabled-dark"
                            : "disabled"
                    }
                    `}
                    variant="success"
                >
                    <Add />
                    &nbsp; Add to list
                </Button>
            </Form>
        )
    }

    render() {
        return (
            <div className="m-auto">
                <this.FormInputItem />
                <ListGroup className="list-group-table" key="group">
                    <this.Content />
                </ListGroup>
                {!this.state.query ? (
                    <>
                        <Button
                            className={`button
                            ${
                                this.props.darkmode
                                    ? "list-item-btn-dark list-item-btn-danger-dark"
                                    : ""
                            }
                            ${
                                this.props.fruitsList.length
                                    ? ""
                                    : this.props.darkmode
                                    ? "disabled disabled-dark"
                                    : "disabled"
                            }
                            `}
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
                            className={`button
                            ${
                                this.props.darkmode
                                    ? "list-item-btn-dark list-item-btn-primary-dark"
                                    : ""
                            }

                            ${
                                this.totalItems() ||
                                !this.props.fruitsList.length
                                    ? ""
                                    : this.props.darkmode
                                    ? "disabled disabled-dark"
                                    : "disabled"
                            }
                            `}
                            variant="primary"
                            onClick={() => {
                                let [confirmation, message] = this.reset()
                                confirmation
                                    ? toast.success(message)
                                    : toast.warning(message)
                            }}
                        >
                            Reset&nbsp;
                            {this.totalItems()
                                ? "(" + this.totalItems() + ")"
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
}

export default MarketList
