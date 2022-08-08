import React, { useState } from "react"
import JsonList from "../Objects/list.json"
import MarketList from "../MarketList/marketList"
import "./list.css"
import "../../Styles/global.css"

const copy = (obj) => JSON.parse(JSON.stringify(obj))
const defaultList = copy(JsonList.items)
let hist = []
const MAXITEMS = 100
const MINITEMS = 0

const List = (props) => {
  const [fruitsList, setFruitsList] = useState(defaultList)

  const add = (index) => {
    let item = fruitsList.find((obj) => obj.id === index)
    if (item.count >= MAXITEMS) return [false, "Maximum limit reached!"]
    else {
      let newList = copy(fruitsList).map((obj) => {
        if (obj.id === index) {
          return {
            ...obj,
            count: obj.count === undefined ? 1 : ++obj.count,
          }
        }
        return obj
      })

      setFruitsList(newList)

      return [true, "Added +1"]
    }
  }

  const minus = (index) => {
    let item = fruitsList.find((obj) => obj.id === index)
    if (item.count <= MINITEMS) return [false, "Minimum limit reached!"]
    else {
      let newList = copy(fruitsList).map((obj) => {
        if (obj.id === index) {
          return {
            ...obj,
            count: obj.count === undefined ? undefined : --obj.count,
          }
        }
        return obj
      })

      setFruitsList(newList)

      return [true, "Removed -1"]
    }
  }

  const remove = (index) => {
    let newList = copy(fruitsList)
    newList = newList.filter((obj) => obj.id !== index)
    setFruitsList(newList)
  }

  const reset = () => {
    let count = fruitsList.reduce(
      (acc, item) => acc + (item?.count || 0),
      0,
    )

    if (fruitsList.length && !count) {
      return [false, "List already zeroed!"]
    } else if (!fruitsList.length) {
      if (hist.length) {
        setFruitsList(hist)
        return [true, "List restored!"]
      }
      return [false, "Can't reset empty list!"]
    } else {
      let newList = copy(fruitsList).map((obj) => ({
        ...obj,
        count: 0,
      }))
      setFruitsList(newList)
      return [true, "List reseted!"]
    }
  }

  const addList = (event) => {
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
      !fruitsList.some((obj) => {
        return obj.value === item
      })
    ) {
      setFruitsList(fruitsList => [...fruitsList, {
        id: getMax("id", fruitsList) + 1,
        value: item,
      }])

      return [true, "Item added!"]
    } else {
      return [false, "Can't add existing item!"]
    }
  }

  const removeList = () => {
    if (fruitsList.length) {
      hist = copy(fruitsList)
      setFruitsList([])
      return [true, "List removed!"]
    } else {
      return [false, "Cant remove empty list!"]
    }
  }

  return (
    <div className='list-container'>
      <h1 className="list-title">{JsonList.name}</h1>
      <MarketList
        fruitsList={fruitsList}
        add={add}
        minus={minus}
        remove={remove}
        reset={reset}
        addList={addList}
        removeList={removeList}
        MAXITEMS={MAXITEMS}
        MINITEMS={MINITEMS}
        darkmode={props.darkmode}
        labels={props.labels}
        typingX={props.typingX}
      />
    </div>
  )
}

export default List
