import { useState } from "react";

// ! Styles
import styles from "../CheckList/CheckList.module.scss";

export default function Checklist() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  function addItem(newItem) {
    const updatedList = [...items, newItem];
    setItems(updatedList);
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItem(newItem);
    setNewItem("");
  }

  function handleChange(event) {
    setNewItem(event.target.value);
  }

  return (
    <main className={styles.container}>
      <h1>Checklist</h1>
      <h2>To help you pack your bag so you don't forget those all important items!</h2>
      {items.length === 0 ? null : (
        <ul>
          {items.map((item, idx) => {
            return (
              <div key={idx} id="list-item">
                <li>
                  {item}
                  <input type="checkbox"></input>
                </li>
              </div>
            );
          })}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="checklistInput">Don't forget:</label>
        <input type="text" name="item" onChange={handleChange} value={newItem} />
        <button type="submit">+</button>
      </form>
    </main>
  );
}
