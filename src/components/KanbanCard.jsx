import React from 'react'
import { TAGS, PRIORITIES, ASSIGNEES } from '../constants'
import styles from './KanbanCard.module.css'

export default function KanbanCard({ card, onDelete, onDragStart, onDragEnd }) {
  const tag = TAGS[card.tag] || TAGS.task
  const priority = PRIORITIES[card.priority] || PRIORITIES.med
  const assignee = ASSIGNEES[card.assignee] || ASSIGNEES[0]

  return (
    <div
      className={styles.card}
      draggable
      onDragStart={() => onDragStart(card.id)}
      onDragEnd={onDragEnd}
    >
      <p className={styles.text}>{card.text}</p>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <span
            className={styles.tag}
            style={{ background: tag.bg, color: tag.color }}
          >
            {tag.label}
          </span>
          <span
            className={styles.dot}
            style={{ background: priority.color }}
            title={`${priority.label} priority`}
          />
        </div>

        <div className={styles.right}>
          <span
            className={styles.avatar}
            style={{ background: assignee.bg, color: assignee.color }}
          >
            {assignee.initials}
          </span>
          <button
            className={styles.del}
            onClick={() => onDelete(card.id)}
            aria-label="Delete card"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
