import { useEffect, useState } from 'react'

export function useScrollSpy(ids, offset = 140) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    function onScroll() {
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - offset) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])
  return active
}
