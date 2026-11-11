function go(page) {
    setTimeout(() => {
        window.location.href = page
    }, 200)
}

function toggleMenu(open) {
    const menu = document.getElementById('menu')
    const isOpen = menu.classList.toggle('open', open)
    document.querySelector('.menu-btn').setAttribute('aria-expanded', isOpen)
}

document.addEventListener('click', e => {
    if (!e.target.closest('.header')) toggleMenu(false)
})

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false)
})

if (window.Lenis && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lenis = new Lenis({ duration: 1.2 })
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
}

function splitText(el) {
    el.setAttribute('aria-label', el.textContent.trim())
    let html = ''
    let i = 0
    el.childNodes.forEach(node => {
        const color = node.nodeType === 1 ? ' accent' : ''
        node.textContent.trim().split(/\s+/).forEach(word => {
            if (word) html += `<span class="w" aria-hidden="true"><span class="w-in${color}" style="--i:${i++}">${word}</span></span> `
        })
    })
    el.innerHTML = html
}

document.querySelectorAll('.split').forEach(splitText)

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
        }
    })
}, { threshold: 0.15 })

document.querySelectorAll('.split, .fade').forEach(el => observer.observe(el))

const form = document.querySelector('form')
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault()
        form.reset()
        document.getElementById('thanks').hidden = false
    })
}
