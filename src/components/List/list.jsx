import React, { Component } from "react"
import JsonList from "../Objects/list.json"
import MarketList from "../MarketList/marketList"

const defaultList = JsonList.items

class List extends Component {
    state = {
        fruitsList: JsonList.items,
    }

    add = (index) => {
        this.setState({
            ...this.state,
            fruitsList: this.state.fruitsList.map((obj) => {
                if (obj.id === index) {
                    return {
                        ...obj,
                        count: obj.count === undefined ? 1 : ++obj.count,
                    }
                }
                return obj
            }),
        })
    }

    remove = (index) => {
        let newList = this.state.fruitsList
        delete newList[index]
        this.setState({
            ...this.state,
            fruitsList: newList,
        })
    }

    reset = () => {
        if (this.state.fruitsList === defaultList) {
            // alert("List has not changed!")
            return false
        } else {
            this.setState({
                ...this.state,
                fruitsList: defaultList,
            })
            return true
        }
    }

    addList = (event) => {
        function getMax(attr, arr) {
            const max = Math.max(
                ...arr.filter(Boolean).map((obj) => {
                    return obj.id
                }),
            )
            if (max === -Infinity || max === Infinity) return 0
            else return max
        }

        if (
            !this.state.fruitsList.filter((obj) => {
                return obj.value === event.target.newItem.value
            }).length
        ) {
            this.state.fruitsList.push({
                id: getMax("id", this.state.fruitsList) + 1,
                value: event.target.newItem.value,
            })
        }

        event.preventDefault()
        this.setState({
            ...this.state,
            fruitsList: this.state.fruitsList,
        })
    }

    removeList = () => {
        this.setState({ ...this.state, fruitsList: [] })
    }

    render() {
        return (
            <div>
                <h1>{JsonList.name}</h1>
                <MarketList
                    fruitsList={this.state.fruitsList}
                    add={this.add}
                    remove={this.remove}
                    reset={this.reset}
                    addList={this.addList}
                    removeList={this.removeList}
                />
            </div>
        )
    }
}

export default List
