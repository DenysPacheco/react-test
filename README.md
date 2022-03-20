# React test

## Mini test repo for react practice.

Honestly, 'it feels gooood' 🤩.

![Bruce meme](https://i.pinimg.com/originals/b1/ed/80/b1ed80033a3060a68fbdc5573b6f6df2.jpg)

React is nice because it centralizes the interface of data access (i.e.: `State` or [SSOT](https://en.wikipedia.org/wiki/Single_source_of_truth); or at least it should be a good practice 🤷), so any functionality that couples with the interface (or props) will have a direct effect on others as well. Plus for being simple 👍.

View: [gh-pages](https://denyspacheco.github.io/react-test/)

---

### Critique, but not detailed

#### Cons

- Hard to start (like anything)
- Data flow can be confusing (but I'm a starter, so...)
- Maintaining means lots of change in the flow for once minimal view change (depending how you structure)

#### Pros

- It's fun (my opinion)
- Simple to code or easy to create (since it's js and everything is connected)
- Like said above, auto coupling of functionalities since linked on a state
- ✨ No reload of pages for content 😍

### Side notes

#### Space

- Space = `&nbsp;`

#### [Material Icons](https://mui.com/components/material-icons/)

- `npm i @material-ui/core @material-ui/icons`
- `import { Icon } from '@material-ui/icons'`
- `<Icon />'`

> Only some icons work on the list

#### [Toastify](https://www.google.com/search?channel=fs&q=toastify)

- `import { ToastContainer, toast } from 'react-toastify'`
- `import 'react-toastify/dist/ReactToastify.css'`
- `toast("Wow so easy!")`

> [Test it out](https://fkhadra.github.io/react-toastify/introduction/)