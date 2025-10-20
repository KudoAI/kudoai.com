(() => {
    'use strict'

    // Insert copyright year
    document.querySelector('.copyright').innerHTML = `© ${new Date().getFullYear()} KudoAI`

    // Fade-in badges + add hover listeners
    document.addEventListener('DOMContentLoaded', () => {
        const finalOpacity = 0.8
        document.querySelectorAll('.badges img').forEach(badge => {
            badge.style.transition = 'opacity 2s ease-in-out' ; badge.style.opacity = finalOpacity
            badge.onmouseenter = () => {
                badge.style.transition = 'opacity 0.2s ease' ; badge.style.opacity = 1 }
            badge.onmouseleave = () => badge.style.opacity = finalOpacity
        })
    })

})()
