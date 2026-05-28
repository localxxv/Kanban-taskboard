import React, { useState } from 'react'
import KanbanCard from './KanbanCard'
import AddCardForm from './AddCardForm'
import styles from './KanbanColumn.module.css'

export default function KanbanColumn({ column, cards, dragState, onAdd, onDelete, onDragStart, onDragEnd, onDrop }) {
  const [showForm, setShowForm] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  function handleAdd(text, tag, priority) {
    onAdd(column.id, text, tag, priority)
    setShowForm(false)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setIsDragOver(true)
  }

  function handleDrop(e) {
    e.preventDefault()
    setIsDragOver(false)
    if (dragState.cardId !== null) {
      onDrop(dragState.cardId, dragState.fromCol, column.id)
    }
  }

  return (
    <div
      className={`${styles.col} ${isDragOver ? styles.dragOver : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      <div className={styles.header}>
        <span
          className={styles.name}
          style={{ borderLeftColor: column.accent }}
        >
          {column.label}
        </span>
        <div className={styles.headerRight}>
          <span className={styles.count}>{cards.length}</span>
          <button
            className={styles.addBtn}
            onClick={() => setShowForm(v => !v)}
            aria-label={`Add card to ${column.label}`}
          >
            +
          </button>
        </div>
      </div>

      {cards.map(card => (
        <KanbanCard
          key={card.id}
          card={card}
          onDelete={onDelete}
          onDragStart={id => onDragStart(id, column.id)}
          onDragEnd={onDragEnd}
        />
      ))}

      {showForm ? (
        <AddCardForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
      ) : (
        <button className={styles.ghostAdd} onClick={() => setShowForm(true)}>
          + Add card
        </button>
      )}
    </div>
  )
}
