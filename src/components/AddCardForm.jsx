import React, { useState, useRef, useEffect } from 'react'
import styles from './AddCardForm.module.css'

export default function AddCardForm({ onAdd, onCancel }) {
  const [text, setText] = useState('')
  const [tag, setTag] = useState('task')
  const [priority, setPriority] = useState('med')
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, tag, priority)
    setText('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        className={styles.input}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Task description…"
        maxLength={80}
      />
      <div className={styles.row}>
        <select className={styles.select} value={tag} onChange={e => setTag(e.target.value)}>
          <option value="task">task</option>
          <option value="feat">feature</option>
          <option value="bug">bug</option>
          <option value="idea">idea</option>
        </select>
        <select className={styles.select} value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="high">high</option>
          <option value="med">medium</option>
          <option value="low">low</option>
        </select>
      </div>
      <div className={styles.btns}>
        <button type="submit" className={`${styles.btn} ${styles.primary}`}>Add card</button>
        <button type="button" className={styles.btn} onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
