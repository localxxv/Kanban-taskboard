import React, { useState } from 'react'
import KanbanBoard from './components/KanbanBoard'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⬡</span>
            <span className={styles.logoText}>Kanban</span>
          </div>
          <span className={styles.subtitle}>Project board</span>
        </div>
      </header>

      <main className={styles.main}>
        <KanbanBoard />
      </main>
    </div>
  )
}
