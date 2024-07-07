import { writable } from 'svelte/store';

export const levelStore = writable<number>(4);
export const maxLevel = 20;
export const levelStep = 2;
