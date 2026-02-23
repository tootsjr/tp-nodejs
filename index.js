function ipsum(options) {
  const wordsList = ["first", "second", "third", "fourth", "fifth"];

  if (options.paragrafs) {
    let result = "";
    for (let i = 0; i < options.paragrafs; i++) {
      result += wordsList.join(" ") + "\n";
    }
    return result;
  }

  if (options.words) {
    return wordsList.slice(0, options.words).join(" ");
  }
}

async function mtg(options) {
  let url = "https://api.scryfall.com/cards/random";

  if (options.id) {
    url = `https://api.scryfall.com/cards/multiverse/${options.id}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

if (typeof document !== 'undefined') {
  window.addEventListener('DOMContentLoaded', async () => {

    document.querySelectorAll('[class^="ipsum-"]').forEach(el => {
      const parts = el.className.split('-');
      const count = parseInt(parts[2]);

      if (parts[1] === 'p') el.innerText = ipsum({ paragrafs: count });
      if (parts[1] === 'w') el.innerText = ipsum({ words: count });
    });

    const randDiv = document.querySelector('.mtg-rand');
    if (randDiv) {
      const card = await mtg({ rand: true });
      randDiv.innerText = card.name;
    }
  });
}

module.exports = { ipsum, mtg };
