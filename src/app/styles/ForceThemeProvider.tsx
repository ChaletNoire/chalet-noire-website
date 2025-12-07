'use client'

import React, { useEffect } from 'react'

export function ForceThemeProvider({ children }: { children: React.ReactNode }) {
    
    useEffect(() => {
        // Force light theme immediately
        const forceLightTheme = () => {
            document.documentElement.setAttribute('data-theme', 'light')
            document.documentElement.style.setProperty('color-scheme', 'light')
        }
        
        // Set theme immediately
        forceLightTheme()
        
        // Set it in localStorage
        localStorage.setItem('theme', 'light')
        
        // Set it again after delays to ensure it sticks
        setTimeout(forceLightTheme, 50)
        setTimeout(forceLightTheme, 200)
        setTimeout(forceLightTheme, 500)
        
        // Listen for any theme changes and override them
        const observer = new MutationObserver(() => {
            if (document.documentElement.getAttribute('data-theme') !== 'light') {
                forceLightTheme()
            }
        })
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        })
        
        return () => observer.disconnect()
    }, [])
    
    return (
        <>
            {children}
        </>
    )
}