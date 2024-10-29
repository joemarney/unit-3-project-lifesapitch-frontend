import { useState } from 'react'

export default function Checklist() {
    const [items, setItems] = useState([])
    const [newItem, setNewItem] = useState('')

    function addItem(newItem) {
        const updatedList = [...items, newItem]
        setItems(updatedList)
    }

    function handleSubmit(event) {
        event.preventDefault()
        addItem(newItem)
        setNewItem('')
    }

    function handleChange(event) {
        setNewItem(event.target.value)
    }

    return (
        <main>
        <h1>Checklist</h1>
        <ul>
            {items.map((item, idx) => {
                return <li key={idx}>{item}</li>
            })}
        </ul>
        <form onSubmit={handleSubmit}>
            <label htmlFor='checklistInput'>Don't forget:</label>
            <input type='text' name='item' onChange={handleChange} value={newItem} />
            <button type='submit'>+</button>
            </form>
        </main>
    )
}