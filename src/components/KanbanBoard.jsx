import React from 'react'
import KanbanColumn from './KanbanColumn'
import StatsBar from './StatsBar'
import { useKanban } from '../hooks/useKanban'
import { COLUMNS } from '../constants'
import styles from './KanbanBoard.module.css'

export default function KanbanBoard() {
  const { cards, stats, dragState, addCard, deleteCard, moveCard, startDrag, endDrag } = useKanban()

  return (
    <div className={styles.board}>
      <StatsBar stats={stats} />
      <div className={styles.cols}>
        {COLUMNS.map(col => (
          <KanbanColumn
            key={col.id}
            column={col}
            cards={cards[col.id]}
            dragState={dragState}
            onAdd={addCard}
            onDelete={deleteCard}
            onDragStart={startDrag}
            onDragEnd={endDrag}
            onDrop={moveCard}
          />
        ))}
      </div>
    </div>
  )
}
