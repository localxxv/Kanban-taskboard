import React from 'react'
import styles from './StatsBar.module.css'

export default function StatsBar({ stats }) {
  return (
    <div className={styles.bar}>
      <div className={styles.stat}>
        <span className={styles.label}>total</span>
        <span className={styles.value}>{stats.total}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.label}>in progress</span>
        <span className={styles.value}>{stats.doing}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.label}>done</span>
        <span className={styles.value}>{stats.done}</span>
      </div>
      <div className={styles.stat}>
        <span className={styles.label}>completion</span>
        <span className={styles.value}>{stats.pct}%</span>
      </div>
    </div>
  )
}
