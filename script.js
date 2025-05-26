// Meow on paw click
const meowSound = new Audio("./assets/sounds/meow.mp3");
document.querySelectorAll(".paw").forEach((paw) => {
  paw.addEventListener("click", () => {
    meowSound.currentTime = 0;
    meowSound.play();
  });
});

// Walking cat logic
const cat = document.getElementById("walkingCat");
const container = document.querySelector(".message-container");

let edge = 0;
let position = 0;
const speed = 1.5;
const catSize = 100;

function moveCat() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const rightLimit = width - catSize;
  const bottomLimit = height - catSize;

  if (edge === 0) {
    // Top edge
    cat.style.top = `0px`;
    cat.style.left = `${position}px`;
    cat.style.transform = "rotate(0deg)";
    position += speed;
    if (position >= rightLimit) {
      position = 0;
      edge = 1;
    }
  } else if (edge === 1) {
    // Right edge
    cat.style.top = `${position}px`;
    cat.style.left = `${rightLimit}px`;
    cat.style.transform = "rotate(90deg)";
    position += speed;
    if (position >= bottomLimit) {
      position = 0;
      edge = 2;
    }
  } else if (edge === 2) {
    // Bottom edge
    cat.style.top = `${bottomLimit}px`;
    cat.style.left = `${rightLimit - position}px`;
    cat.style.transform = "rotate(180deg)";
    position += speed;
    if (position >= rightLimit) {
      position = 0;
      edge = 3;
    }
  } else if (edge === 3) {
    // Left edge
    cat.style.top = `${bottomLimit - position}px`;
    cat.style.left = `0px`;
    cat.style.transform = "rotate(270deg)";
    position += speed;
    if (position >= bottomLimit) {
      position = 0;
      edge = 0;
    }
  }

  requestAnimationFrame(moveCat);
}

requestAnimationFrame(moveCat);

const memes = [
  { image: "./assets/memes/meme1.png", sound: "./assets/sounds/meme1.mp3" },
  { image: "./assets/memes/meme2.png", sound: "./assets/sounds/meme2.mp3" },
  { image: "./assets/memes/meme3.jpg", sound: "./assets/sounds/meme3.mp3" },
  { image: "./assets/memes/meme4.jpeg", sound: "./assets/sounds/meme4.mp3" },
  { image: "./assets/memes/meme5.png", sound: "./assets/sounds/meme5.mp3" },
  { image: "./assets/memes/meme6.jpeg", sound: "./assets/sounds/meme6.mp3" },
  { image: "./assets/memes/meme7.jpg", sound: "./assets/sounds/meme7.mp3" },
];

let memeQueue = [];
let currentAudio = null;
let isMuted = false;

const flipCard = document.getElementById("flipCard");
const memeImage = document.getElementById("memeImage");
const shuffleButton = document.getElementById("shuffleButton");
const muteToggle = document.getElementById("muteToggle");

// Shuffle utility
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// Load or refill meme queue
function getNextMeme() {
  if (memeQueue.length === 0) {
    memeQueue = shuffleArray(memes);
  }
  return memeQueue.pop();
}

// Show meme, play sound, auto flip back
function showMeme() {
  const meme = getNextMeme();
  memeImage.src = meme.image;

  // Stop any current audio
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Load new audio
  currentAudio = new Audio(meme.sound);
  currentAudio.muted = isMuted;
  currentAudio.play();

  // Flip the card
  flipCard.classList.add("flipped");

  // Flip card back when audio ends
  currentAudio.onended = () => {
    flipCard.classList.remove("flipped");
  };
}
// Flip on card click (initial trigger)
flipCard.addEventListener("click", showMeme);

// Shuffle button also shows meme
shuffleButton.addEventListener("click", () => {
  if (!flipCard.classList.contains("flipped")) {
    showMeme();
  }
});

// Mute toggle
muteToggle.addEventListener("click", () => {
  isMuted = !isMuted;
  if (currentAudio) currentAudio.muted = isMuted;
  muteToggle.textContent = isMuted ? "🔇" : "🔊";
});

function createPetal() {
  const petalContainer = document.querySelector(".petal-container");
  const petal = document.createElement("img");
  petal.src = "./assets/petal.png";
  petal.classList.add("petal");

  const size = Math.random() * 0.8 + 0.8; // increased size range
  const duration = Math.random() * 5 + 5;
  const startLeft = Math.random() * window.innerWidth;

  petal.style.left = `${startLeft}px`;
  petal.style.width = `${60 * size}px`; // increased base size
  petal.style.height = `${60 * size}px`; // increased base size
  petal.style.animationDuration = `${duration}s`;

  petalContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, duration * 1000);
}

// Loop: generate petals every 500ms

// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll(".fade-on-scroll").forEach((section) => {
  observer.observe(section);
});

// Envelope
const envelopeImage = document.getElementById("envelopeImage");
const letterPaper = document.getElementById("letterPaper");
const letterText = document.getElementById("letterText");
const heartIcon = document.querySelector(".heart-icon"); // ✅ get the heart

const message = `- We didn’t grow up together, we don’t live close by, and yet… it feels like the universe aligned just right when we met.

- When I was lost in my own silence, you quietly listened. When I couldn’t even trust myself, you trusted who I could become.

- You were patient with my moods, my overthinking, my chaos — and instead of running, you stayed.

- Somehow, between the memes, reels, and those late-night yaps about the world and everyone in it, we became more than friends — we became soul-comforts.

- We’ve laughed till our stomachs hurt, cried when the world got heavy, and through it all… we just kept showing up for each other.

- With you, the distance never felt distant.

- You’re not my childhood friend, but you’ve become someone even more irreplaceable — the kind of person I thank life for bringing into my story.

- This isn’t the end. In fact, I think it’s still just the beginning. 💙`;

let index = 0;
let typingInterval;

envelopeImage.addEventListener("click", () => {
  if (envelopeImage.classList.contains("open")) return;

  envelopeImage.classList.add("open");
  heartIcon.style.display = "none"; // ✅ hide heart on open

  typingInterval = setInterval(() => {
    if (index < message.length) {
      letterText.textContent += message.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, 40);
});

// tarrot game
const tarotCards = document.querySelectorAll(".tarot-card");
const tarrotcat = document.getElementById("tarotCat");

const purrSound = new Audio("./assets/sounds/purr.mp3");
const flipSound = new Audio("./assets/sounds/flip-chime.mp3");

const tarotMessages = [
  "You rest like royalty. Your peace is sacred.",
  "Even chaos bows to your curiosity today.",
  "The unseen is working in your favor. Trust the whiskers.",
];

// Animate cat walking in, flipping card, and walking out
function handleCardClick(card, index) {
  if (card.classList.contains("flipped")) return;

  // Show cat + purr
  tarrotcat.classList.add("active");
  tarrotcat.style.left = "-180px";
  purrSound.currentTime = 0;
  purrSound.play();

  // Move cat to selected card
  const targetX = card.offsetLeft + card.offsetWidth / 2 - cat.offsetWidth / 2;
  setTimeout(() => {
    tarrotcat.style.left = `${targetX}px`;

    // Flip card after cat reaches it
    setTimeout(() => {
      card.classList.add("flipped");
      flipSound.currentTime = 0;
      flipSound.play();
      card.setAttribute("data-message", tarotMessages[index]);

      // Walk cat back to the left
      setTimeout(() => {
        tarrotcat.style.left = "-180px";
        setTimeout(() => {
          tarrotcat.classList.remove("active");
        }, 2000);
      }, 1000);
    }, 1500);
  }, 1000);
}

// Attach event listeners to all cards
tarotCards.forEach((card, index) => {
  card.addEventListener("click", () => handleCardClick(card, index));
});

//surprise reveal button
const revealBtn = document.getElementById("revealScroll");
const revealHeading = document.getElementById("giftRevealHeading");

revealBtn.addEventListener("click", () => {
  revealHeading.scrollIntoView({ behavior: "smooth" });

  // Trigger writing animation after slight scroll delay
  setTimeout(() => {
    revealHeading.classList.add("animate");
  }, 600);
});

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    console.warn(`Section with ID '${sectionId}' not found.`);
  }
}
