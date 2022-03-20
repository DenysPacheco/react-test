import React, { Component } from "react"
import JsonList from "../Objects/list.json"
import MarketList from "../MarketList/marketList"
import "./list.css"

const copy = (obj) => JSON.parse(JSON.stringify(obj))
const defaultList = copy(JsonList.items)
let hist = []
const MAXITEMS = 10

class List extends Component {
    state = {
        fruitsList: defaultList,
    }

    add = (index) => {
        let item = this.state.fruitsList.find((obj) => obj.id === index)
        if (item.count >= MAXITEMS) return [false, "Maximum limit reached!"]
        else {
            let newList = copy(this.state.fruitsList).map((obj) => {
                if (obj.id === index) {
                    return {
                        ...obj,
                        count: obj.count === undefined ? 1 : ++obj.count,
                    }
                }
                return obj
            })

            this.setState({
                ...this.state,
                fruitsList: newList,
            })

            return [true, "Added +1"]
        }
    }

    remove = (index) => {
        let newList = copy(this.state.fruitsList)
        newList = newList.filter((obj) => obj.id !== index)
        this.setState({
            ...this.state,
            fruitsList: newList,
        })
    }

    reset = () => {
        let count = this.state.fruitsList.reduce(
            (acc, item) => acc + (item?.count || 0),
            0,
        )

        if (this.state.fruitsList.length && !count) {
            return [false, "List already zeroed!"]
        } else if (!this.state.fruitsList.length) {
            if (hist.length) {
                this.setState({
                    ...this.state,
                    fruitsList: hist,
                })
                return [true, "List restored!"]
            }
            return [false, "Can't reset empty list!"]
        } else {
            let newList = copy(this.state.fruitsList).map((obj) => ({
                ...obj,
                count: 0,
            }))
            this.setState({
                ...this.state,
                fruitsList: newList,
            })
            return [true, "List reseted!"]
        }
    }

    addList = (event) => {
        event.preventDefault()

        const item = event.target.newItem.value

        if (item === "") {
            return [false, "Can't add empty item"]
        }

        function getMax(attr, arr) {
            const max = Math.max(
                ...arr.map((obj) => {
                    return obj.id
                }),
            )
            return isFinite(max) ? max : 0
        }

        if (
            !this.state.fruitsList.some((obj) => {
                return obj.value === item
            })
        ) {
            this.setState((prevState) => ({
                ...this.state,
                fruitsList: [
                    ...prevState.fruitsList,
                    {
                        id: getMax("id", this.state.fruitsList) + 1,
                        value: item,
                    },
                ],
            }))

            return [true, "Item added!"]
        } else {
            return [false, "Can't add existing item!"]
        }
    }

    removeList = () => {
        if (this.state.fruitsList.length) {
            hist = copy(this.state.fruitsList)
            this.setState({ ...this.state, fruitsList: [] })
            return [true, "List removed!"]
        } else {
            return [false, "Cant remove empty list!"]
        }
    }

    render() {
        return (
            <div>
                <h1 className="list-title">{JsonList.name}</h1>
                <MarketList
                    fruitsList={copy(this.state.fruitsList)}
                    add={this.add}
                    remove={this.remove}
                    reset={this.reset}
                    addList={this.addList}
                    removeList={this.removeList}
                    MAXITEMS={MAXITEMS}
                    darkmode={this.props.darkmode}
                />
            </div>
        )
    }
}

export default List
