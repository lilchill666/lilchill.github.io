const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close'),
      navLink = document.querySelectorAll('.nav_link')
if(navToggle){
  navToggle.addEventListener('click', () =>{
    navMenu.classList.add('show-menu')
  })
}
if(navClose){
  navClose.addEventListener('click', () =>{
    navMenu.classList.remove('show-menu')
  })
}
function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))



const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-brightness'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-brightness'


if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

const modalViews = document.querySelectorAll('.about_modal')
      modalBtns = document.querySelectorAll('.about_button')
      modalCloses = document.querySelectorAll('.about_modal-close')
let modal = function(modalClick){
  modalViews[modalClick].classList.add('active-modal')
  document.body.style.overflow = "hidden"
}

modalBtns.forEach((modalBtn, i) => {
  modalBtn.addEventListener('click',() =>{
    modal(i)
  })
})

modalCloses.forEach((modalClose) =>{
  modalClose.addEventListener('click', ()=> {
    modalViews.forEach ((modalView) =>{
      modalView.classList.remove('active-modal')
      document.body.style.overflow = "scroll"
    })
  })
})

const overlay = document.querySelectorAll('.about_modal');
overlay.forEach((over) => {
over.addEventListener('click', (e) => {
  if (e.target === over) {
    modalViews.forEach ((modalView) =>{
      modalView.classList.remove('active-modal')
      document.body.style.overflow = "scroll"
    })
  }
});
})

class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = '666!<>-_\\/[]{}—=+*^?#________666'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  const phrases = [
    'Привіт!',
    'Я Ярослав Жук.',
    'Мені 18 років.',
    'Я живу в Україні💙💛.',
    'Я розробник.',
    'Я перекладач.',
    'Я лінгвіст.',
    'Я Lil Chill.',
    '666',
  ]
  
  const el = document.querySelector('.text-change')
  const fx = new TextScramble(el)
  
  let counter = 0
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2000)
    })
    counter = (counter + 1) % phrases.length
  }
  
  next()