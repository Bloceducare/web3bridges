'use client'

import { useEffect } from 'react'

export function CrispChat() {
  useEffect(() => {
    const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID
    if (!websiteId) return

    // Dynamically import to avoid SSR issues
    import('crisp-sdk-web').then(({ Crisp }) => {
      Crisp.configure(websiteId)
    })
  }, [])

  return null
}

// Call this after a user logs in to identify them in Crisp
export function identifyUserInCrisp(user: { name: string; email: string; cohort?: string }) {
  import('crisp-sdk-web').then(({ Crisp }) => {
    Crisp.user.setEmail(user.email)
    Crisp.user.setNickname(user.name)
    if (user.cohort) {
      Crisp.session.setData({ cohort: user.cohort })
    }
  })
}
