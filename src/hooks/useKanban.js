import { useState, useCallback } from 'react'

const INITIAL_DATA = {
  todo: [
    { id: 1, text: 'Design system audit', tag: 'task', priority: 'high', assignee: 0 },
    { id: 2, text: 'Fix login redirect bug', tag: 'bug', priority: 'high', assignee: 1 },
    { id: 3, text: 'Add dark mode toggle', tag: 'feat', priority: 'med', assignee: 2 },
    { id: 4, text: 'Brainstorm onboarding flow', tag: 'idea', priority: 'low', assignee: 0 },
  ],
  doing: [
    { id: 5, text: 'Implement JWT auth', tag: 'feat', priority: 'high', assignee: 1 },
    { id: 6, text: 'Write unit tests for API', tag: 'task', priority: 'med', assignee: 2 },
  ],
  done: [
    { id: 7, text: 'Set up CI/CD pipeline', tag: 'task', priority: 'med', assignee: 0 },
    { id: 8, text: 'DB schema migration', tag: 'feat', priority: 'high', assignee: 1 },
    { id: 9, text: 'Code review session', tag: 'task', priority: 'low', assignee: 2 },
  ],
}

let _nextId = 10

export function useKanban() {
  const [cards, setCards] = useState(INITIAL_DATA)
  const [dragState, setDragState] = useState({ cardId: null, fromCol: null })

  // Computed stats
  const stats = {
    total: Object.values(cards).flat().length,
    doing: cards.doing.length,
    done: cards.done.length,
    pct: (() => {
      const total = Object.values(cards).flat().length
      return total ? Math.round((cards.done.length / total) * 100) : 0
    })(),
  }

  const addCard = useCallback((colId, text, tag, priority) => {
    if (!text.trim()) return
    const newCard = {
      id: _nextId++,
      text: text.trim(),
      tag,
      priority,
      assignee: Math.floor(Math.random() * 3),
    }
    setCards(prev => ({
      ...prev,
      [colId]: [newCard, ...prev[colId]],
    }))
  }, [])

  const deleteCard = useCallback((cardId) => {
    setCards(prev => {
      const next = {}
      for (const col of Object.keys(prev)) {
        next[col] = prev[col].filter(c => c.id !== cardId)
      }
      return next
    })
  }, [])

  const moveCard = useCallback((cardId, fromCol, toCol) => {
    if (fromCol === toCol) return
    setCards(prev => {
      const card = prev[fromCol].find(c => c.id === cardId)
      if (!card) return prev
      return {
        ...prev,
        [fromCol]: prev[fromCol].filter(c => c.id !== cardId),
        [toCol]: [...prev[toCol], card],
      }
    })
  }, [])

  const startDrag = useCallback((cardId, fromCol) => {
    setDragState({ cardId, fromCol })
  }, [])

  const endDrag = useCallback(() => {
    setDragState({ cardId: null, fromCol: null })
  }, [])

  return { cards, stats, dragState, addCard, deleteCard, moveCard, startDrag, endDrag }
}
