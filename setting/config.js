const fs = require('fs')

/* #pengembang rissxd
youtube : https://youtube.com/@rissmdbotz

HAPUS WM INI DOSA BESAR LU NJIR 
TAMBAHIN NAMALU AJA KALO LU NGEMBANGIN
NIH SC

[ ! ] JANGAN DIJUAL ANJENG LU NGAK NGEHARGAIN GW NAMANYA
*/

// Setting Utama
// GANTI NOMOR OWNER JUGA DI START/LIB/DATABASE/OWNER.JSON
global.owner = "6283199373983" //owner number
global.namabot = "Ryou Yamada-MD"
global.ownername = "KYAMI NEVER CRY"
// Watermark
global.footer = "_Slnc Kyami_" //footer section
global.packname = "Sticker By"
global.author = "Kyami-XD"

//CPANEL CIK
global.domain = 'https://hariskun.web-store.biz.id' // Isi Domain Lu jangan kasih tanda / di akhir link
global.apikey = 'ptla_ORBtvRGmSZgTYHlHgZwxmQ57xHwOgAXzMarq2PiNMZw'// Isi Apikey Plta Lu
global.capikey = 'ptlc_ig8f5Ftv9t8980RDc5Q8irxW53pk2utJ7gi5ZNaFIqe' //isi pltclu
global.eggsnya = '15' // id eggs yang dipakai
global.location = '1' // id location
global.tekspanel = `NOTE :
OWNER HANYA MENGIRIM 1X DATA 
AKUN ANDA MOHON DI SIMPAN BAIK BAIK
KALAU DATA AKUN ANDA HILANG OWNER
TIDAK DAPAT MENGIRIM AKUN ANDA LAGI
=====================================`

// Saluran Whatsapp
global.idsaluran = "https://whatsapp.com/channel/0029VaksctN4yltQhVMYdm2g"
global.namasaluran = "FOLLOW MY CHANNEL WHATSAPP"

// Image
global.thumbnail = 'https://img100.pixhost.to/images/679/540221445_skyzopedia.jpg'

//database
global.urldb = ''; // kosongin aja tapi kalo mau pake database mongo db isi url mongo
global.themeemoji = '🔥'
global.mess = {
ingroup: "It's not funny, this feature is only for groups💢",
admin: "not funny, only group admins use this feature💢",
botadmin: "bot bukan admin🤘😁✌️",
owner: "Wow! You're not my owner🗣️",
premium: "you are not a premium user",
seller: "You don't have access as a seller yet",
wait: "please just wait ngab",
daftar: "kamu belum terdaftar\nsilahkan ketik .daftar"
}

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})
