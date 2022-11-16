import { defineStore } from 'pinia';

export const useStore = defineStore('app', {
    state: () => ({
        colorMode: 0
    }),
    getters: {
        getColorMode(): 0 | 1 {
            return this.colorMode as 0 | 1;
        }
    },
    actions: {
        setColorMode(value: 0 | 1): void {
            this.colorMode = value;
            localStorage.setItem('site-color-scheme', value === 0 ? 'dark' : 'light');
            document.documentElement.setAttribute('color-scheme', value === 0 ? 'dark' : 'light');
        }
    }
});
