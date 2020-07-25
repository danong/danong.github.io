const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

const HOME_ROW = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h']
const HOME_ROW_BONUS = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h', 'r', 'i']
const CFKLMPUV = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h', 'r', 'i', 'c', 'f', 'k', 'l', 'm', 'p', 'u', 'v']
const BGJQWXYZ = ['d', 's', 't', 'n', 'a', 'e', 'o', 'h', 'r', 'i', 'b', 'g', 'j', 'q', 'w', 'x', 'y', 'z']

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) renderNewQuote()
})

function getQuote() {
  var words = ['teens','suet','outs','nouns','ate','shah','huh','ones','ton','ensue','taunt','noose','hes','hash','seats','souse','hates','shush','oaten','sets','tooth','tees','notes','hos','tutu','thou','tenth','theta','heat','ante','eases','tent','antes','hush','shout','ohs','hat','soot','shahs','test','the','tuna','tun','non','teas','taut','heats','shot','soon','tush','sash','hue','unto','noes','oaths','henna','stats','sots','tots','sheet','tonne','thus','hunts','asses','host','teen','east','sense','anon','has','onus','haunt','tout','sane','suns','autos','stun','tho','anus','tenon','shunt','net','tunas','sheen','sates','shoon','shun','tone','shoos','ten','shoe','uses','stash','teat','neat','shots','totes','anons','shes','shoes']
  return words.join(' ')
}

async function renderNewQuote() {
  const quote = await getQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  startTimer()

}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()