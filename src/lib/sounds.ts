import cardFlipSound from '$lib/assets/sounds/card-flip.mp3';
import successSound from '$lib/assets/sounds/success-bell.mp3';
import fanfareSound from '$lib/assets/sounds/success-fanfare.mp3';

export function playCardFlipSound() {
  const audio = new Audio(cardFlipSound);
  audio.play();
}
export function playCardMatchSound() {
  const audio = new Audio(successSound);
  audio.play();
}

export function playFanfare() {
  const audio = new Audio(fanfareSound);
  audio.play();
}
