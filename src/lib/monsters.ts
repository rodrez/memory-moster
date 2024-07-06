const images = import.meta.glob('/src/lib/assets/images/monsters/*.webp', { eager: true });

const allMonsterImages: unknown[] = [];

for (const path in images) {
  const name = path?.split('/')?.pop()?.split('.').shift(); // Extract the name from the path
  allMonsterImages.push({ name, img: images[path]?.default });
}

export { allMonsterImages };
