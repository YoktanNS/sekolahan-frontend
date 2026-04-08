<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div class="mx-auto h-16 w-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-4">
        <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      </div>
      <h2 class="text-3xl font-extrabold text-slate-800 tracking-tight">Portal SI-SEKOLAH</h2>
      <p class="mt-2 text-sm text-slate-500 font-medium">Silakan masuk menggunakan akun Anda</p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-2xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
        <form class="space-y-6" @submit.prevent="handleLogin">
          
          <div>
            <label for="username" class="block text-sm font-bold text-slate-700 mb-1.5">Username</label>
            <div class="mt-1">
              <input 
                id="username" 
                v-model="username" 
                type="text" 
                required 
                class="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-200" 
                placeholder="Masukkan username" 
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-bold text-slate-700 mb-1.5">Password</label>
            <div class="mt-1">
              <input 
                id="password" 
                v-model="password" 
                type="password" 
                required 
                class="appearance-none block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-200" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-600/30 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition transform hover:-translate-y-0.5"
            >
              Masuk ke Dashboard
            </button>
          </div>
        </form>

        <div 
          v-if="errorMessage" 
          class="mt-6 text-center text-sm font-bold text-red-600 bg-red-50 border border-red-200 py-3 rounded-xl flex items-center justify-center"
        >
          <span class="mr-2"></span> {{ errorMessage }}
        </div>
        
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter() 
const username = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  const isSuccess = await authStore.login(username.value, password.value)

  if (isSuccess) {
    router.push('/dashboard')
  } else {
    errorMessage.value = 'Username atau Password salah!'
  }
}
</script>