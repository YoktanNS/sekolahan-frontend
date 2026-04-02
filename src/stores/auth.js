import { defineStore } from 'pinia';
import api from '../api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // Coba ambil token dari LocalStorage browser, kalau tidak ada berarti null
        token: localStorage.getItem('token') || null, 
    }),
    actions: {
        async login(username, password) {
            try {
                // Menembak endpoint login Laravel
                const response = await api.post('/login', {
                    username: username,
                    password: password
                });

                // Jika berhasil, simpan token ke state dan LocalStorage browser
                this.token = response.data.token;
                localStorage.setItem('token', this.token);

                // Pasang token ini di Axios agar otomatis terbawa saat akses rute VIP
                api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                return true; // Beri sinyal sukses
            } catch (error) {
                console.error('Gagal Login:', error);
                return false; // Beri sinyal gagal
            }
        }
    }
});