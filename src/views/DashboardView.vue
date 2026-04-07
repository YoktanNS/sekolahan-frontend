<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 relative">
      
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <h1 class="text-2xl font-bold text-gray-800">Dashboard Sekolah</h1>
        <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-200">
          Logout
        </button>
      </div>

      <div v-if="user" class="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <p class="text-green-700">Selamat datang kembali, <strong>{{ user.username }}</strong>!</p>
      </div>

      <div class="mt-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-700">Data Siswa</h2>
          <button @click="bukaModalTambah" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200">
            + Tambah Siswa
          </button>
        </div>

        <div class="overflow-x-auto border border-gray-200 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIS</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Siswa</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gender</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="listSiswa.length === 0">
                <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">Data belum tersedia...</td>
              </tr>
              <tr v-for="siswa in listSiswa" :key="siswa.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm text-gray-500">{{ siswa.nis || '-' }}</td>
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ siswa.nama }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ siswa.gender }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ siswa.email }}</td>
                <td class="px-6 py-4 text-sm font-medium">
                  <button @click="bukaModalEdit(siswa)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                  <button @click="hapusSiswa(siswa.id)" class="text-red-600 hover:text-red-900">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-lg w-full max-w-md p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-gray-900">
              {{ isEditMode ? 'Edit Data Siswa' : 'Tambah Data Siswa' }}
            </h3>
            <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600 font-bold text-xl">&times;</button>
          </div>

          <form @submit.prevent="simpanSiswa" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">NIS</label>
              <input v-model="formSiswa.nis" type="text" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Nama Lengkap *</label>
              <input v-model="formSiswa.nama" type="text" required class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Gender *</label>
              <select v-model="formSiswa.gender" required class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm">
                <option value="laki-laki">Laki-laki</option>
                <option value="perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email *</label>
              <input v-model="formSiswa.email" type="email" required class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm">
            </div>

            <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
              {{ errorMessage }}
            </div>

            <div class="flex justify-end pt-4">
              <button type="button" @click="isModalOpen = false" class="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md mr-2 text-sm">Batal</button>
              <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm">
                {{ isEditMode ? 'Update Data' : 'Simpan' }}
              </button>
            </div>
          </form>

        </div>
      </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const user = ref(null);
const listSiswa = ref([]);

// State untuk Modal
const isModalOpen = ref(false);
const errorMessage = ref('');
const isEditMode = ref(false); // Penanda apakah kita sedang mode Edit
const editId = ref(null); // Menyimpan ID siswa yang sedang diedit

const formSiswa = ref({
  nis: '',
  nama: '',
  gender: 'laki-laki',
  email: ''
});

onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const responseUser = await api.get('/me');
    user.value = responseUser.data;
    await fetchSiswa();
  } catch (error) {
    localStorage.removeItem('token');
    router.push('/login');
  }
});

const fetchSiswa = async () => {
  try {
    const response = await api.get('/siswa');
    const collectionData = response.data.collection || (response.data.data && response.data.data.collection);

    if (collectionData && collectionData.items) {
        const rawItems = collectionData.items;
        listSiswa.value = rawItems.map(item => {
            let flatObj = {};
            item.data.forEach(field => { flatObj[field.name] = field.value; });
            return flatObj;
        });
    } else {
        listSiswa.value = response.data.data || response.data;
    }
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
};

// Fungsi Membuka Modal untuk TAMBAH Data Baru
const bukaModalTambah = () => {
  isEditMode.value = false;
  editId.value = null;
  errorMessage.value = '';
  formSiswa.value = { nis: '', nama: '', gender: 'laki-laki', email: '' }; // Kosongkan form
  isModalOpen.value = true;
};

// Fungsi Membuka Modal untuk EDIT Data
const bukaModalEdit = (siswa) => {
  isEditMode.value = true;
  editId.value = siswa.id;
  errorMessage.value = '';
  // Isi form dengan data siswa yang diklik
  formSiswa.value = { 
    nis: siswa.nis, 
    nama: siswa.nama, 
    gender: siswa.gender, 
    email: siswa.email 
  };
  isModalOpen.value = true;
};

// Fungsi SIMPAN (Bisa untuk Create maupun Update)
const simpanSiswa = async () => {
  errorMessage.value = ''; 
  try {
    if (isEditMode.value) {
      // Jika mode edit, gunakan PUT ke /api/siswa/{id}
      await api.put(`/siswa/${editId.value}`, formSiswa.value);
      alert('Data Siswa berhasil diperbarui!');
    } else {
      // Jika mode tambah, gunakan POST ke /api/siswa
      await api.post('/siswa', formSiswa.value);
      alert('Data Siswa berhasil ditambahkan!');
    }
    
    isModalOpen.value = false; 
    await fetchSiswa(); 

  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.message;
      const firstError = Object.values(errors)[0][0]; 
      errorMessage.value = firstError;
    } else {
      errorMessage.value = 'Terjadi kesalahan pada server.';
    }
  }
};

const hapusSiswa = async (id) => {
  if (!id) return;
  const isConfirm = confirm('Apakah Anda yakin ingin menghapus data siswa ini?');
  if (isConfirm) {
    try {
      await api.delete(`/siswa/${id}`);
      await fetchSiswa(); 
    } catch (error) {
      alert('Gagal menghapus data siswa.');
    }
  }
};

const handleLogout = async () => {
  try { await api.post('/logout'); } catch (error) {}
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  router.push('/login');
};
</script>