<template>
  <div class="flex h-screen bg-gray-100 font-sans">
    
    <aside class="w-64 bg-slate-800 text-white flex flex-col shadow-2xl z-20">
      <div class="h-16 flex items-center justify-center bg-slate-900 border-b border-slate-700">
        <svg class="w-8 h-8 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
        <span class="text-xl font-bold tracking-wider text-emerald-50">SI-SEKOLAH</span>
      </div>

      <nav class="flex-1 overflow-y-auto py-4 space-y-1 px-3">
        <button @click="activeMenu = 'dashboard'" :class="['w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeMenu === 'dashboard' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white']">
          <span class="mr-3"></span> Beranda
        </button>

        <p class="px-4 pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Master</p>
        
        <button @click="activeMenu = 'siswa'" :class="['w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeMenu === 'siswa' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white']">
          <span class="mr-3"></span> Data Siswa
        </button>

        <button @click="activeMenu = 'guru'" :class="['w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeMenu === 'guru' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white']">
          <span class="mr-3"></span> Data Guru
        </button>

        <p class="px-4 pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Akademik</p>

        <button @click="activeMenu = 'kelas'" :class="['w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeMenu === 'kelas' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white']">
          <span class="mr-3"></span> Ruang Kelas
        </button>
        <button @click="activeMenu = 'mapel'" :class="['w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeMenu === 'mapel' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white']">
          <span class="mr-3"></span> Mata Pelajaran
        </button>
        <button @click="activeMenu = 'jadwal'" :class="['w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeMenu === 'jadwal' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white']">
          <span class="mr-3"></span> Jadwal Pelajaran
        </button>

        <div v-if="user && user.type === 'admin'">
          <p class="px-4 pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pengaturan</p>
          <button @click="activeMenu = 'users'" :class="['w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors', activeMenu === 'users' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white']">
            <span class="mr-3"></span> Manajemen User
          </button>
        </div>
      </nav>
    </aside>

    <main class="flex-1 flex flex-col overflow-hidden bg-slate-50">
      
      <header class="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-8 z-10">
        <h2 class="text-xl font-bold text-slate-800 capitalize">
          {{ activeMenu === 'dashboard' ? 'Beranda Utama' : 'Manajemen Data ' + activeMenu }}
        </h2>
        
        <div class="flex items-center space-x-4">
          <div v-if="user" class="text-right hidden md:block">
            <p class="text-sm font-bold text-slate-700">{{ user.username }}</p>
            <p class="text-xs text-emerald-600 font-semibold uppercase">{{ user.type }}</p>
          </div>
          <div class="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border border-emerald-300">
            {{ user ? user.username.charAt(0).toUpperCase() : 'U' }}
          </div>
          <button @click="handleLogout" class="ml-4 text-sm font-semibold text-red-500 hover:text-red-700 transition">
            Logout
          </button>
        </div>
      </header>

      <div class="flex-1 overflow-y-auto p-8">

        <div v-if="activeMenu === 'dashboard'" class="space-y-6 animate-fade-in">
          <div class="bg-emerald-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
            <div class="relative z-10">
              <h2 class="text-3xl font-extrabold mb-2">Selamat Datang, {{ user?.username }}!</h2>
              <p class="text-emerald-100 max-w-xl">Ini adalah pusat kendali Sistem Informasi Sekolah. Anda memiliki akses sebagai <strong class="uppercase text-white">{{ user?.type }}</strong>.</p>
            </div>
            <div class="absolute -right-10 -top-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500 hover:shadow-md transition">
              <p class="text-sm font-semibold text-gray-500">Total Siswa</p>
              <p class="text-3xl font-bold text-slate-800 mt-2">{{ totalSiswa }}</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500 hover:shadow-md transition">
              <p class="text-sm font-semibold text-gray-500">Total Guru</p>
              <p class="text-3xl font-bold text-slate-800 mt-2">{{ totalGuru }}</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-amber-500 hover:shadow-md transition">
              <p class="text-sm font-semibold text-gray-500">Total Kelas</p>
              <p class="text-3xl font-bold text-slate-800 mt-2">{{ totalKelas }}</p>
            </div>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-purple-500 hover:shadow-md transition">
              <p class="text-sm font-semibold text-gray-500">Total Mapel</p>
              <p class="text-3xl font-bold text-slate-800 mt-2">{{ totalMapel }}</p>
            </div>
          </div>
        </div>

        <div v-if="activeMenu === 'siswa'" class="animate-fade-in">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <div class="relative w-64">
                <input v-model="searchQuery" type="text" placeholder="Cari siswa (Nama/NIS)..." class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm">
                <span class="absolute left-3 top-2.5 text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
              </div>
              <button @click="bukaModalTambah" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition duration-200 flex items-center">
                <span class="mr-2 text-lg leading-none">+</span> Tambah Siswa
              </button>
            </div>
          
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">NIS</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Lengkap</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kontak</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="filteredSiswa.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 italic">Data siswa tidak ditemukan.</td>
                  </tr>
                  <tr v-for="siswa in filteredSiswa" :key="siswa.id" class="hover:bg-slate-50 transition duration-150 group">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-medium">{{ siswa.nis || '-' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-bold text-slate-800">{{ siswa.nama }}</div>
                      <div class="text-xs text-emerald-600 font-semibold">Kelas: {{ getNamaKelas(siswa.kelas_id) }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 capitalize">
                      <span :class="siswa.gender === 'laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'" class="px-2.5 py-1 rounded-full text-xs font-semibold">
                        {{ siswa.gender }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-slate-600">{{ siswa.email || '-' }}</div>
                      <div class="text-xs text-slate-400">{{ siswa.phone_number || '-' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button @click="bukaModalEdit(siswa)" class="text-emerald-600 hover:text-emerald-800 font-bold">Edit</button>
                      <button @click="hapusSiswa(siswa.id)" class="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-if="activeMenu === 'kelas'" class="animate-fade-in">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-slate-800">Manajemen Ruang Kelas</h2>
            <button @click="bukaModalTambahKelas" class="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5">
              + Tambah Kelas
            </button>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kode Kelas</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Nama Kelas</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Wali Kelas</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr v-if="listKelas.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 italic">Data kelas belum tersedia.</td>
                  </tr>
                  <tr v-for="kelas in listKelas" :key="kelas.id" class="hover:bg-slate-50 transition duration-150 group">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ kelas.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">{{ kelas.kode_kelas || '-' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{{ kelas.nama_kelas || kelas.nama }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{{ kelas.wali_kelas || '-' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button @click="bukaModalEditKelas(kelas)" class="text-emerald-600 hover:text-emerald-800 font-bold">Edit</button>
                      <button @click="hapusKelas(kelas.id)" class="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-if="activeMenu === 'guru'" class="animate-fade-in">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 class="text-2xl font-bold text-slate-800">Manajemen Data Guru</h2>
              <button @click="bukaModalTambahGuru" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition duration-200 flex items-center">
                <span class="mr-2 text-lg leading-none">+</span> Tambah Guru
              </button>
            </div>
          
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">NIP</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Profil Guru</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Gender</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kontak</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="listGuru.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 italic">Data guru tidak ditemukan.</td>
                  </tr>
                  <tr v-for="guru in listGuru" :key="guru.id" class="hover:bg-slate-50 transition duration-150 group">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">{{ guru.nip || '-' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-bold text-slate-800">{{ guru.nama }}</div>
                      <div class="text-xs text-slate-500">Pend: {{ guru.pendidikan || '-' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 capitalize">
                      <span :class="guru.gender === 'laki-laki' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'" class="px-2.5 py-1 rounded-full text-xs font-semibold">
                        {{ guru.gender || '-' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-slate-600">{{ guru.email || '-' }}</div>
                      <div class="text-xs text-slate-400">{{ guru.phone_number || '-' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button @click="bukaModalEditGuru(guru)" class="text-emerald-600 hover:text-emerald-800 font-bold">Edit</button>
                      <button @click="hapusGuru(guru.id)" class="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-if="activeMenu === 'mapel'" class="animate-fade-in">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 class="text-2xl font-bold text-slate-800">Manajemen Mata Pelajaran</h2>
              <button @click="bukaModalTambahMapel" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition duration-200 flex items-center">
                <span class="mr-2 text-lg leading-none">+</span> Tambah Mapel
              </button>
            </div>
          
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kode Mapel</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mata Pelajaran & Deskripsi</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tingkat Kelas</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="listMapel.length === 0">
                    <td colspan="4" class="px-6 py-12 text-center text-slate-400 italic">Data Mata Pelajaran belum tersedia.</td>
                  </tr>
                  <tr v-for="mapel in listMapel" :key="mapel.id" class="hover:bg-slate-50 transition duration-150 group">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-emerald-600">{{ mapel.kode_mapel }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-bold text-slate-800">{{ mapel.nama_mapel }}</div>
                      <div class="text-xs text-slate-500 truncate max-w-xs">{{ mapel.deskripsi || 'Tidak ada deskripsi' }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                        {{ mapel.tingkat || 'Umum' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button @click="bukaModalEditMapel(mapel)" class="text-emerald-600 hover:text-emerald-800 font-bold">Edit</button>
                      <button @click="hapusMapel(mapel.id)" class="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div v-if="activeMenu === 'jadwal'" class="animate-fade-in">
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
              <h2 class="text-2xl font-bold text-slate-800">Manajemen Jadwal Pelajaran</h2>
              <button @click="bukaModalTambahJadwal" class="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition duration-200 flex items-center">
                <span class="mr-2 text-lg leading-none">+</span> Tambah Jadwal
              </button>
            </div>
          
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Hari & Jam</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kelas</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mata Pelajaran</th>
                    <th class="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Guru Pengajar</th>
                    <th class="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-100">
                  <tr v-if="listJadwal.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-400 italic">Data Jadwal Pelajaran belum tersedia.</td>
                  </tr>
                  <tr v-for="jadwal in listJadwal" :key="jadwal.id" class="hover:bg-slate-50 transition duration-150 group">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-bold text-emerald-600 uppercase">{{ jadwal.hari }}</div>
                      <div class="text-xs text-slate-500 font-medium">{{ jadwal.jam_pelajaran }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-xs font-bold">{{ jadwal.nama_kelas }}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-bold text-slate-800">{{ jadwal.nama_mapel }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {{ jadwal.nama_guru }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                      <button @click="bukaModalEditJadwal(jadwal)" class="text-emerald-600 hover:text-emerald-800 font-bold">Edit</button>
                      <button @click="hapusJadwal(jadwal.id)" class="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </main>

    <div v-if="isModalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
        <div class="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <h3 class="text-xl font-bold text-slate-800">
            {{ isEditMode ? 'Update Data Siswa' : 'Registrasi Siswa Baru' }}
          </h3>
          <button @click="isModalOpen = false" class="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 rounded-full flex items-center justify-center text-2xl transition">&times;</button>
        </div>

        <form @submit.prevent="simpanSiswa" class="overflow-y-auto p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">NIS <span class="text-red-500">*</span></label>
                <input v-model="formSiswa.nis" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap <span class="text-red-500">*</span></label>
                <input v-model="formSiswa.nama" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Gender <span class="text-red-500">*</span></label>
                <select v-model="formSiswa.gender" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition cursor-pointer">
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Email Pribadi <span class="text-red-500">*</span></label>
                <input v-model="formSiswa.email" type="email" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Nomor Handphone</label>
                <input v-model="formSiswa.phone_number" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
              </div>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Tempat Lahir</label>
                <input v-model="formSiswa.tempat_lahir" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Tanggal Lahir</label>
                <input v-model="formSiswa.tgl_lahir" type="date" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition cursor-pointer">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Nama Orang Tua/Wali</label>
                <input v-model="formSiswa.nama_ortu" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Kelas Terdaftar <span class="text-red-500">*</span></label>
                <select v-model="formSiswa.kelas_id" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition cursor-pointer">
                  <option value="" disabled>-- Pilih Ruang Kelas --</option>
                  <option v-for="kls in listKelas" :key="kls.id" :value="kls.id">
                    {{ kls.nama_kelas }} ({{ kls.kode_kelas }})
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Alamat Tempat Tinggal</label>
                <textarea v-model="formSiswa.alamat" rows="2" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"></textarea>
              </div>
            </div>
          </div>

          <div v-if="errorMessage" class="text-red-700 bg-red-50 p-4 rounded-lg text-sm font-medium border border-red-200 flex items-start">
            <span class="mr-2">!</span> {{ errorMessage }}
          </div>

          <div class="flex justify-end pt-6 border-t border-slate-100 mt-8">
            <button type="button" @click="isModalOpen = false" class="bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 px-6 py-2.5 rounded-lg font-bold mr-3 transition">Batal</button>
            <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5">
              {{ isEditMode ? 'Simpan Perubahan' : 'Tambah Data' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="isModalKelasOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 class="text-lg font-bold text-slate-800">{{ isEditKelasMode ? 'Edit Data Kelas' : 'Tambah Kelas Baru' }}</h3>
          <button @click="isModalKelasOpen = false" class="text-slate-400 hover:text-red-500 transition-colors font-bold text-xl">✕</button>
        </div>

        <div class="p-6">
          <form @submit.prevent="simpanKelas" class="space-y-5">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Kode Kelas <span class="text-red-500">*</span></label>
              <input v-model="formKelas.kode_kelas" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Contoh: KLS-10A">
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Nama Kelas <span class="text-red-500">*</span></label>
              <input v-model="formKelas.nama_kelas" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Contoh: 10 MIPA 1">
            </div>
            
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Wali Kelas</label>
              <input v-model="formKelas.wali_kelas" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all" placeholder="Nama Wali Kelas (Opsional)">
            </div>

            <div v-if="errorMessage" class="text-sm font-bold text-red-600 bg-red-50 border border-red-200 py-3 px-4 rounded-xl flex items-center">
              <span class="mr-2">!</span> {{ errorMessage }}
            </div>

            <div class="pt-2 flex justify-end space-x-3">
              <button type="button" @click="isModalKelasOpen = false" class="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">Batal</button>
              <button type="submit" class="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5">Simpan Data</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="isModalGuruOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
        <div class="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-slate-50">
          <h3 class="text-xl font-bold text-slate-800">{{ isEditGuruMode ? 'Update Data Guru' : 'Registrasi Guru Baru' }}</h3>
          <button @click="isModalGuruOpen = false" class="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 rounded-full flex items-center justify-center text-2xl transition">&times;</button>
        </div>

        <form @submit.prevent="simpanGuru" class="overflow-y-auto p-8 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">NIP <span class="text-red-500">*</span></label>
                <input v-model="formGuru.nip" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">ID Akun User <span class="text-red-500">*</span></label>
                <input v-model="formGuru.user_id" type="number" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: 1">
                <p class="text-xs text-slate-400 mt-1">ID akun login guru dari tabel users.</p>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap <span class="text-red-500">*</span></label>
                <input v-model="formGuru.nama" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Gender <span class="text-red-500">*</span></label>
                <select v-model="formGuru.gender" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                  <option value="laki-laki">Laki-laki</option>
                  <option value="perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Pendidikan Terakhir</label>
                <input v-model="formGuru.pendidikan" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: S1 Matematika">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Email <span class="text-red-500">*</span></label>
                <input v-model="formGuru.email" type="email" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
              </div>
            </div>

            <div class="space-y-5">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Nomor Handphone</label>
                <input v-model="formGuru.phone_number" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Tempat Lahir</label>
                <input v-model="formGuru.tempat_lahir" type="text" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Tanggal Lahir</label>
                <input v-model="formGuru.tgl_lahir" type="date" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Alamat Tempat Tinggal</label>
                <textarea v-model="formGuru.alamat" rows="4" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"></textarea>
              </div>
            </div>
          </div>

          <div v-if="errorMessage" class="text-red-700 bg-red-50 p-4 rounded-lg text-sm font-medium border border-red-200 flex items-start">
            <span class="mr-2">!</span> {{ errorMessage }}
          </div>

          <div class="flex justify-end pt-6 border-t border-slate-100 mt-8">
            <button type="button" @click="isModalGuruOpen = false" class="bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 px-6 py-2.5 rounded-lg font-bold mr-3 transition">Batal</button>
            <button type="submit" class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5">
              {{ isEditGuruMode ? 'Simpan Perubahan' : 'Tambah Data' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="isModalMapelOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 class="text-lg font-bold text-slate-800">{{ isEditMapelMode ? 'Edit Mata Pelajaran' : 'Tambah Mapel Baru' }}</h3>
          <button @click="isModalMapelOpen = false" class="text-slate-400 hover:text-red-500 transition-colors font-bold text-xl">✕</button>
        </div>

        <div class="p-6">
          <form @submit.prevent="simpanMapel" class="space-y-5">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Kode Mapel <span class="text-red-500">*</span></label>
              <input v-model="formMapel.kode_mapel" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: MAT-10">
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Nama Mata Pelajaran <span class="text-red-500">*</span></label>
              <input v-model="formMapel.nama_mapel" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: Matematika Peminatan">
            </div>
            
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Tingkat Kelas</label>
              <select v-model="formMapel.tingkat" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                <option value="Umum">Umum / Semua Tingkat</option>
                <option value="Kelas 10">Kelas 10</option>
                <option value="Kelas 11">Kelas 11</option>
                <option value="Kelas 12">Kelas 12</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi Singkat</label>
              <textarea v-model="formMapel.deskripsi" rows="2" class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="Opsional..."></textarea>
            </div>

            <div v-if="errorMessage" class="text-sm font-bold text-red-600 bg-red-50 border border-red-200 py-3 px-4 rounded-xl flex items-center">
              <span class="mr-2">!</span> {{ errorMessage }}
            </div>

            <div class="pt-2 flex justify-end space-x-3">
              <button type="button" @click="isModalMapelOpen = false" class="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">Batal</button>
              <button type="submit" class="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5">Simpan Data</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="isModalJadwalOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 class="text-lg font-bold text-slate-800">{{ isEditJadwalMode ? 'Edit Jadwal Pelajaran' : 'Buat Jadwal Baru' }}</h3>
          <button @click="isModalJadwalOpen = false" class="text-slate-400 hover:text-red-500 transition-colors font-bold text-xl">✕</button>
        </div>

        <div class="p-6">
          <form @submit.prevent="simpanJadwal" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Hari <span class="text-red-500">*</span></label>
                <select v-model="formJadwal.hari" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                  <option value="" disabled>Pilih Hari...</option>
                  <option value="senin">Senin</option>
                  <option value="selasa">Selasa</option>
                  <option value="rabu">Rabu</option>
                  <option value="kamis">Kamis</option>
                  <option value="jumat">Jumat</option>
                  <option value="sabtu">Sabtu</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Jam Pelajaran <span class="text-red-500">*</span></label>
                <input v-model="formJadwal.jam_pelajaran" type="text" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: 07:00 - 08:30 / Ke-1">
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Ruang Kelas <span class="text-red-500">*</span></label>
                <select v-model="formJadwal.kelas_id" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                  <option value="" disabled>Pilih Kelas...</option>
                  <option v-for="kls in listKelas" :key="kls.id" :value="kls.id">
                    {{ kls.nama_kelas }}
                  </option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Mata Pelajaran <span class="text-red-500">*</span></label>
                <select v-model="formJadwal.mapel_id" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                  <option value="" disabled>Pilih Mapel...</option>
                  <option v-for="mapel in listMapel" :key="mapel.id" :value="mapel.id">
                    {{ mapel.nama_mapel }}
                  </option>
                </select>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-slate-700 mb-1.5">Guru Pengajar <span class="text-red-500">*</span></label>
                <select v-model="formJadwal.guru_id" required class="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                  <option value="" disabled>Pilih Guru...</option>
                  <option v-for="guru in listGuru" :key="guru.id" :value="guru.id">
                    {{ guru.nama }} (NIP: {{ guru.nip }})
                  </option>
                </select>
              </div>
            </div>

            <div v-if="errorMessage" class="text-sm font-bold text-red-600 bg-red-50 border border-red-200 py-3 px-4 rounded-xl flex items-center">
              <span class="mr-2">!</span> {{ errorMessage }}
            </div>

            <div class="pt-4 flex justify-end space-x-3 border-t border-slate-100">
              <button type="button" @click="isModalJadwalOpen = false" class="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-colors">Batal</button>
              <button type="submit" class="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5">Simpan Jadwal</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';

const router = useRouter();
const user = ref(null);
const activeMenu = ref('dashboard');

const listSiswa = ref([]);
const listKelas = ref([]);
const listGuru = ref([]);
const listMapel = ref([]);
const listJadwal = ref([]);

const totalSiswa = computed(() => listSiswa.value.length);
const totalKelas = computed(() => listKelas.value.length);
const totalGuru = computed(() => listGuru.value.length);
const totalMapel = computed(() => listMapel.value.length);

const searchQuery = ref(''); 
const filteredSiswa = computed(() => {
  if (!searchQuery.value) return listSiswa.value;
  const query = searchQuery.value.toLowerCase();
  return listSiswa.value.filter(siswa => {
    return (
      (siswa.nama && siswa.nama.toLowerCase().includes(query)) ||
      (siswa.nis && String(siswa.nis).includes(query)) ||
      (siswa.email && siswa.email.toLowerCase().includes(query))
    );
  });
});

const errorMessage = ref('');

// ==========================================
// FUNGSI HELPER (RELASI)
// ==========================================
const getNamaKelas = (id) => {
  if (!id) return 'Belum ada kelas';
  const kelas = listKelas.value.find(k => String(k.id) === String(id));
  return kelas ? kelas.nama_kelas : 'ID Kelas: ' + id;
};

// ==========================================
// CRUD DATA SISWA
// ==========================================
const isModalOpen = ref(false);
const isEditMode = ref(false); 
const editId = ref(null); 

const getEmptyForm = () => ({
  nis: '', nama: '', gender: 'laki-laki', email: '',
  tempat_lahir: '', tgl_lahir: '', nama_ortu: '',
  phone_number: '', alamat: '', kelas_id: ''
});

const formSiswa = ref(getEmptyForm());

const fetchSiswa = async () => {
  try {
    const response = await api.get('/siswa');
    const collectionData = response.data.collection || (response.data.data && response.data.data.collection);

    if (collectionData && collectionData.items) {
        listSiswa.value = collectionData.items.map(item => {
            let flatObj = {};
            item.data.forEach(f => { flatObj[f.name] = f.value; });
            // Pastikan ID Siswa juga masuk untuk keperluan edit/hapus
            const urlParts = item.href.split('/');
            flatObj.id = urlParts[urlParts.length - 1];
            return flatObj;
        });
    } else {
        listSiswa.value = response.data.data || response.data;
    }
  } catch (error) {
    console.error('Gagal mengambil data siswa:', error);
  }
};

const bukaModalTambah = () => {
  isEditMode.value = false; editId.value = null; errorMessage.value = '';
  formSiswa.value = getEmptyForm(); isModalOpen.value = true;
};

const bukaModalEdit = (siswa) => {
  isEditMode.value = true; editId.value = siswa.id; errorMessage.value = '';
  formSiswa.value = { ...siswa, kelas_id: siswa.kelas_id || '' };
  isModalOpen.value = true;
};

const simpanSiswa = async () => {
  errorMessage.value = ''; 
  try {
    const payload = { ...formSiswa.value };
    if (!payload.kelas_id) delete payload.kelas_id;

    if (isEditMode.value) {
      await api.put(`/siswa/${editId.value}`, payload);
      alert('Data Siswa berhasil diperbarui.');
    } else {
      await api.post('/siswa', payload);
      alert('Data Siswa berhasil ditambahkan.');
    }
    
    isModalOpen.value = false; 
    await fetchSiswa(); 
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors;
      errorMessage.value = validationErrors ? Object.values(validationErrors)[0][0] : error.response.data.message;
    } else {
      errorMessage.value = 'Terjadi kesalahan pada server.';
    }
  }
};

const hapusSiswa = async (id) => {
  if (!id) return;
  if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
    try {
      await api.delete(`/siswa/${id}`);
      await fetchSiswa(); 
    } catch (error) {
      alert('Gagal menghapus data siswa.');
    }
  }
};

// ==========================================
// CRUD DATA KELAS
// ==========================================
const isModalKelasOpen = ref(false);
const isEditKelasMode = ref(false);
const editKelasId = ref(null);
const formKelas = ref({ kode_kelas: '', nama_kelas: '', wali_kelas: '' });

const fetchKelas = async () => {
  try {
    const response = await api.get('/kelas');
    const items = response.data.data?.collection?.items || [];

    listKelas.value = items.map(item => {
      let objekKelas = {};
      const urlParts = item.href.split('/');
      objekKelas.id = urlParts[urlParts.length - 1];

      item.data.forEach(field => {
        objekKelas[field.name] = field.value;
      });
      return objekKelas;
    });
    console.log("Data Kelas diproses:", listKelas.value);
  } catch (error) {
    console.error('Gagal mengambil data kelas:', error);
  }
};

const bukaModalTambahKelas = () => {
  isEditKelasMode.value = false; editKelasId.value = null; errorMessage.value = '';
  formKelas.value = { kode_kelas: '', nama_kelas: '', wali_kelas: '' }; 
  isModalKelasOpen.value = true;
};

const bukaModalEditKelas = (kelas) => {
  isEditKelasMode.value = true; editKelasId.value = kelas.id; errorMessage.value = '';
  formKelas.value = { 
    kode_kelas: kelas.kode_kelas || '', 
    nama_kelas: kelas.nama_kelas || kelas.nama, 
    wali_kelas: kelas.wali_kelas || '' 
  };
  isModalKelasOpen.value = true;
};

const simpanKelas = async () => {
  errorMessage.value = '';
  try {
    if (isEditKelasMode.value) {
      await api.put(`/kelas/${editKelasId.value}`, formKelas.value);
      alert('Data Kelas berhasil diperbarui.');
    } else {
      await api.post('/kelas', formKelas.value);
      alert('Data Kelas berhasil ditambahkan.');
    }
    isModalKelasOpen.value = false;
    await fetchKelas();
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors;
      errorMessage.value = validationErrors ? Object.values(validationErrors)[0][0] : error.response.data.message;
    } else {
      errorMessage.value = 'Terjadi kesalahan pada server backend.';
    }
  }
};

const hapusKelas = async (id) => {
  if (confirm('Yakin ingin menghapus kelas ini?')) {
    try {
      await api.delete(`/kelas/${id}`);
      await fetchKelas();
    } catch (error) {
      alert('Gagal menghapus kelas.');
    }
  }
};

// ==========================================
// CRUD DATA GURU
// ==========================================
const isModalGuruOpen = ref(false);
const isEditGuruMode = ref(false);
const editGuruId = ref(null);

const getEmptyFormGuru = () => ({
  user_id: '', // <-- Tambahkan baris ini
  nip: '', nama: '', tempat_lahir: '', tgl_lahir: '', 
  gender: 'laki-laki', phone_number: '', email: '', 
  alamat: '', pendidikan: ''
});

const formGuru = ref(getEmptyFormGuru());

const fetchGuru = async () => {
  try {
    const response = await api.get('/guru');
    
    // Algoritma Collection sesuai dengan GuruCollection yang Anda buat
    const collectionData = response.data.collection || (response.data.data && response.data.data.collection);

    if (collectionData && collectionData.items) {
        listGuru.value = collectionData.items.map(item => {
            let flatObj = {};
            item.data.forEach(f => { flatObj[f.name] = f.value; });
            // Ambil ID dari URL href
            const urlParts = item.href.split('/');
            flatObj.id = urlParts[urlParts.length - 1];
            return flatObj;
        });
    } else {
        listGuru.value = response.data.data || response.data;
    }
  } catch (error) {
    console.error('Gagal mengambil data guru:', error);
  }
};

const bukaModalTambahGuru = () => {
  isEditGuruMode.value = false; editGuruId.value = null; errorMessage.value = '';
  formGuru.value = getEmptyFormGuru();
  isModalGuruOpen.value = true;
};

const bukaModalEditGuru = (guru) => {
  isEditGuruMode.value = true; editGuruId.value = guru.id; errorMessage.value = '';
  formGuru.value = { ...guru };
  isModalGuruOpen.value = true;
};

const simpanGuru = async () => {
  errorMessage.value = '';
  try {
    // Salin form dan ubah string kosong ('') menjadi null
    const payload = { ...formGuru.value };
    Object.keys(payload).forEach(key => {
      if (payload[key] === '') {
        payload[key] = null;
      }
    });

    if (isEditGuruMode.value) {
      await api.put(`/guru/${editGuruId.value}`, payload);
      alert('Data Guru berhasil diperbarui.');
    } else {
      await api.post('/guru', payload);
      alert('Data Guru berhasil ditambahkan.');
    }
    isModalGuruOpen.value = false;
    await fetchGuru();
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // Menampilkan pesan error validasi spesifik ke UI
      const errors = error.response.data.errors;
      errorMessage.value = errors ? Object.values(errors)[0][0] : error.response.data.message;
      console.log("Detail Error 422:", errors); // Muncul di console log agar mudah di-debug
    } else {
      errorMessage.value = 'Terjadi kesalahan pada server.';
    }
  }
};

const hapusGuru = async (id) => {
  if (confirm('Yakin ingin menghapus data guru ini?')) {
    try {
      await api.delete(`/guru/${id}`);
      await fetchGuru();
    } catch (error) {
      alert('Gagal menghapus data guru.');
    }
  }
};

// ==========================================
// CRUD DATA MATA PELAJARAN (MAPEL)
// ==========================================
const isModalMapelOpen = ref(false);
const isEditMapelMode = ref(false);
const editMapelId = ref(null);

const getEmptyFormMapel = () => ({
  kode_mapel: '', nama_mapel: '', tingkat: 'Umum', deskripsi: ''
});
const formMapel = ref(getEmptyFormMapel());

const fetchMapel = async () => {
  try {
    const response = await api.get('/mapel');
    
    // Algoritma Collection yang sama dengan Guru, Siswa, dan Kelas
    const collectionData = response.data.collection || (response.data.data && response.data.data.collection);

    if (collectionData && collectionData.items) {
        listMapel.value = collectionData.items.map(item => {
            let flatObj = {};
            item.data.forEach(f => { flatObj[f.name] = f.value; });
            const urlParts = item.href.split('/');
            flatObj.id = urlParts[urlParts.length - 1]; // Ekstrak ID untuk edit/hapus
            return flatObj;
        });
    } else {
        listMapel.value = response.data.data || response.data;
    }
  } catch (error) {
    console.error('Gagal mengambil data mapel:', error);
  }
};

const bukaModalTambahMapel = () => {
  isEditMapelMode.value = false; editMapelId.value = null; errorMessage.value = '';
  formMapel.value = getEmptyFormMapel();
  isModalMapelOpen.value = true;
};

const bukaModalEditMapel = (mapel) => {
  isEditMapelMode.value = true; editMapelId.value = mapel.id; errorMessage.value = '';
  formMapel.value = { ...mapel };
  isModalMapelOpen.value = true;
};

const simpanMapel = async () => {
  errorMessage.value = '';
  try {
    if (isEditMapelMode.value) {
      await api.put(`/mapel/${editMapelId.value}`, formMapel.value);
      alert('Mata Pelajaran berhasil diperbarui.');
    } else {
      await api.post('/mapel', formMapel.value);
      alert('Mata Pelajaran berhasil ditambahkan.');
    }
    isModalMapelOpen.value = false;
    await fetchMapel();
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data.errors;
      errorMessage.value = errors ? Object.values(errors)[0][0] : error.response.data.message;
    } else {
      errorMessage.value = 'Terjadi kesalahan pada server.';
    }
  }
};

const hapusMapel = async (id) => {
  if (confirm('Yakin ingin menghapus Mata Pelajaran ini?')) {
    try {
      await api.delete(`/mapel/${id}`);
      await fetchMapel();
    } catch (error) {
      alert('Gagal menghapus Mata Pelajaran.');
    }
  }
};

// ==========================================
// INISIALISASI
// ==========================================
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
    // Panggil fetchKelas DULU baru fetchSiswa agar relasi terbaca
    await fetchKelas();
    await fetchSiswa();
    await fetchGuru();
    await fetchMapel();
  } catch (error) {
    localStorage.removeItem('token');
    router.push('/login');
  }
});

const handleLogout = async () => {
  try { await api.post('/logout'); } catch (error) {}
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  router.push('/login');
};
</script>