import React, { Component } from "react"
import Lista from "../Objects/list.json"
import MarketList from "../MarketList/marketList"

const defaultList = Lista.items

class List extends Component {
    state = {
        lista: Lista.items,
    }

    add = (index) => {
        this.setState({
            ...this.state,
            lista: this.state.lista.map((obj) => {
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
        let newLista = this.state.lista
        delete newLista[index]
        this.setState({
            ...this.state,
            lista: newLista,
        })
    }

    reset = () => {
        this.state.lista === defaultList
            ? alert("List has not changed!")
            : this.setState({
                  ...this.state,
                  lista: defaultList,
              })
    }

    addList = (event) => {
        function getMax(attr, arr) {
            const max = Math.max(
                ...arr.map((obj) => {
                    return obj.id
                }),
            )
            if (max === -Infinity || max === Infinity) return 0
            else return max
        }

        if (
            !this.state.lista.filter((obj) => {
                return obj.value === event.target.newItem.value
            }).length
        ) {
            this.state.lista.push({
                id: getMax("id", this.state.lista) + 1,
                value: event.target.newItem.value,
            })
        }

        event.preventDefault()
        this.setState({
            ...this.state,
            lista: this.state.lista,
        })
    }

    removeList = () => {
        this.setState({ ...this.state, lista: [] })
    }

    render() {
        return (
            <div>
                <h1>{Lista.name}</h1>
                <MarketList
                    lista={this.state.lista}
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
