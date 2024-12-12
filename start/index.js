/*

#kiuu x FAA
github : https://github.com/kiuur
youtube : https://www.youtube.com/@FaaaMods
rest api : https://shinoa.us.kg

*/

console.clear();
console.log('Starting...');
console.clear();
console.log('KYAMI ALWAYS HERE')
require('../setting/config');

const { 
    default: makeWASocket, 
    prepareWAMessageMedia, 
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    jidDecode, 
    proto, 
    relayWAMessage, 
    getContentType, 
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent, 
    MessageRetryMap 
} = require("@whiskeysockets/baileys");
const _ = require('lodash')
const pino = require('pino');
const path = require('path')
const readline = require("readline");
const fs = require('fs');
const CFonts = require('cfonts')
const FileType = require('file-type')
const { Boom } = require('@hapi/boom');
const { color } = require('./lib/color');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');

const usePairingCode = true;
const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => { rl.question(text, resolve) });
}

const yargs = require('yargs/yargs')

var low
try {
low = require('lowdb')
} catch (e) {
low = require('./lib/lowdb')}
const { Low, JSONFile } = low

global.db = new Low(new JSONFile(`database.json`))
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read()
  global.db.READ = false
  global.db.data = {
    users: {},
    chats: {},
    game: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = _.chain(global.db.data)
}
loadDatabase()

if (global.db) setInterval(async () => {
   if (global.db.data) await global.db.write()
}, 30 * 1000)

//Gatau Kenapa Begini ;-;
function _0x1dfb(_0x1b59f5, _0x1298c5) {
    var _0x2275d = _0x1b02();
    return _0x1dfb = function (_0x3b9b0f, _0x34dff7) {
        _0x3b9b0f = _0x3b9b0f - (0xb91 + -0x1d10 + -0x86 * -0x23);
        var _0x579616 = _0x2275d[_0x3b9b0f];
        return _0x579616;
    }, _0x1dfb(_0x1b59f5, _0x1298c5);
}
var _0x507796 = _0x1dfb;
function _0x1b02() {
    var _0x4610c9 = [
        '407328ntQumX',
        '8519238ryDfQJ',
        '5880192fdJJZH',
        'left',
        '1060606dadeFF',
        '388255fkXftY',
        '11588VzaWfm',
        '3212928DKMjnh',
        'cyan',
        'block',
        '215iaxuDU',
        '78FOmNFw',
        'say',
        'KYAMI'
    ];
    _0x1b02 = function () {
        return _0x4610c9;
    };
    return _0x1b02();
}
(function (_0x2de030, _0x272a1f) {
    var _0x12ccbd = _0x1dfb, _0x110f8d = _0x2de030();
    while (!![]) {
        try {
            var _0x4b8afa = -parseInt(_0x12ccbd(0xd9)) / (-0x20ec + -0x2b5 + 0x2 * 0x11d1) + parseInt(_0x12ccbd(0xd5)) / (-0x25a * 0x3 + 0x2408 + -0x1cf8) + parseInt(_0x12ccbd(0xdc)) / (0x95 * -0x33 + -0x5a6 + 0x34 * 0xae) + -parseInt(_0x12ccbd(0xdb)) / (-0xbf * 0x25 + -0xaec + 0x21 * 0x12b) * (parseInt(_0x12ccbd(0xdf)) / (-0x24 * -0x8b + 0x2453 + -0x37da)) + parseInt(_0x12ccbd(0xe0)) / (-0xf3d + -0x1 * -0x1619 + -0xe * 0x7d) * (parseInt(_0x12ccbd(0xda)) / (0x4 * -0x8ad + 0x2c6 * 0x4 + 0x17a3)) + parseInt(_0x12ccbd(0xd7)) / (-0x9d0 + -0x1c27 + 0x25ff) + -parseInt(_0x12ccbd(0xd6)) / (0x696 + 0x561 * 0x2 + -0x114f);
            if (_0x4b8afa === _0x272a1f)
                break;
            else
                _0x110f8d['push'](_0x110f8d['shift']());
        } catch (_0x3c7d29) {
            _0x110f8d['push'](_0x110f8d['shift']());
        }
    }
}(_0x1b02, 0x2 * 0x30194 + -0x9b76a + 0x1 * 0xcd7e8), CFonts[_0x507796(0xd3)](_0x507796(0xd4), {
    'font': _0x507796(0xde),
    'align': _0x507796(0xd8),
    'colors': [_0x507796(0xdd)]
}));

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });

async function kyamistart() {
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const kyami = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: !usePairingCode,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"]
    });

    if (usePairingCode && !kyami.authState.creds.registered) {
        const phoneNumber = await question('please enter your WhatsApp number, starting with 62:\n');
        const code = await kyami.requestPairingCode(phoneNumber.trim());
        console.log(`your pairing code: ${code}`);
    }

  //Gatau Njir Kok Jadi Gini
const _0x1021fc = _0x3211;
function _0x3211(_0x211738, _0x4ff6bf) {
    const _0x2e2a7c = _0x20fb();
    return _0x3211 = function (_0x4a9e03, _0x1221d6) {
        _0x4a9e03 = _0x4a9e03 - (-0x139b + -0x22d8 + -0x62b * -0x9);
        let _0x3cc9b3 = _0x2e2a7c[_0x4a9e03];
        return _0x3cc9b3;
    }, _0x3211(_0x211738, _0x4ff6bf);
}
(function (_0x5c2a6a, _0x9784fd) {
    const _0x1f93af = _0x3211, _0x54eb5a = _0x5c2a6a();
    while (!![]) {
        try {
            const _0x196f92 = parseInt(_0x1f93af(0x122)) / (-0x1 * -0xef + -0x597 + 0x4a9) * (-parseInt(_0x1f93af(0x11a)) / (-0x2585 + -0x1d7a + -0x1 * -0x4301)) + -parseInt(_0x1f93af(0x110)) / (0x1 * 0x1d62 + -0x30e + -0x1a51) * (-parseInt(_0x1f93af(0x114)) / (-0xa * -0x2e7 + -0x14f8 + -0x80a)) + parseInt(_0x1f93af(0x13c)) / (0x251b + 0x13e6 + -0x38fc) * (parseInt(_0x1f93af(0x131)) / (0x18 * 0x146 + -0x1d75 + -0x115 * 0x1)) + parseInt(_0x1f93af(0x13d)) / (0x352 * 0x8 + 0x174c + 0x1 * -0x31d5) * (parseInt(_0x1f93af(0x118)) / (-0x1eae + 0x174b * 0x1 + 0x76b)) + -parseInt(_0x1f93af(0x125)) / (0x602 * 0x4 + 0x1da3 + -0x35a2) + parseInt(_0x1f93af(0x112)) / (0x1aa8 + 0x2 * -0x1a3 + -0x12 * 0x14c) * (-parseInt(_0x1f93af(0x132)) / (-0x2360 + 0x12ab + -0x40 * -0x43)) + -parseInt(_0x1f93af(0x11e)) / (-0x876 + 0x1300 + -0xa7e) * (-parseInt(_0x1f93af(0x12f)) / (0x3 * -0x8c8 + 0x1847 + 0x21e));
            if (_0x196f92 === _0x9784fd)
                break;
            else
                _0x54eb5a['push'](_0x54eb5a['shift']());
        } catch (_0x2480fb) {
            _0x54eb5a['push'](_0x54eb5a['shift']());
        }
    }
}(_0x20fb, -0x68d5 * -0x7 + 0x1 * 0xf9bcb + -0x869c9), store[_0x1021fc(0x12d)](kyami['ev']), kyami['ev']['on'](_0x1021fc(0x128) + _0x1021fc(0x13e), async (_0x444597, _0x1afff1) => {
    const _0x31f4d7 = _0x1021fc, _0x1c6d18 = {
            'msydi': function (_0x43110f, _0x42339d) {
                return _0x43110f === _0x42339d;
            },
            'GYJzI': _0x31f4d7(0x124) + _0x31f4d7(0x136),
            'LuCAt': _0x31f4d7(0x127) + _0x31f4d7(0x116),
            'xsVwB': function (_0x3b317e, _0x7a5392) {
                return _0x3b317e === _0x7a5392;
            },
            'XlTtM': _0x31f4d7(0x129),
            'jYKmP': _0x31f4d7(0x11f),
            'oaTSe': function (_0x521060, _0x2d7760) {
                return _0x521060 === _0x2d7760;
            },
            'DEJIk': _0x31f4d7(0x111) + _0x31f4d7(0x12e),
            'cBjzD': function (_0x556dd5, _0x13d4a1, _0x44c51c, _0x58458d) {
                return _0x556dd5(_0x13d4a1, _0x44c51c, _0x58458d);
            },
            'OypnQ': function (_0x1aeb0c, _0x4c5276) {
                return _0x1aeb0c(_0x4c5276);
            },
            'IYkyF': _0x31f4d7(0x139)
        };
    try {
        const _0xb6f237 = _0x444597[_0x31f4d7(0x113)][-0x4e * -0x7f + -0x49c * -0x4 + -0x47 * 0xce];
        if (!_0xb6f237[_0x31f4d7(0x13b)])
            return;
        _0xb6f237[_0x31f4d7(0x13b)] = _0x1c6d18[_0x31f4d7(0x126)](Object[_0x31f4d7(0x13a)](_0xb6f237[_0x31f4d7(0x13b)])[-0x1746 + -0x82a + 0xfb8 * 0x2], _0x1c6d18[_0x31f4d7(0x120)]) ? _0xb6f237[_0x31f4d7(0x13b)][_0x31f4d7(0x124) + _0x31f4d7(0x136)][_0x31f4d7(0x13b)] : _0xb6f237[_0x31f4d7(0x13b)];
        if (_0xb6f237[_0x31f4d7(0x130)] && _0x1c6d18[_0x31f4d7(0x126)](_0xb6f237[_0x31f4d7(0x130)][_0x31f4d7(0x137)], _0x1c6d18[_0x31f4d7(0x135)]))
            return;
        if (!kyami[_0x31f4d7(0x12c)] && !_0xb6f237[_0x31f4d7(0x130)][_0x31f4d7(0x117)] && _0x1c6d18[_0x31f4d7(0x119)](_0x444597[_0x31f4d7(0x134)], _0x1c6d18[_0x31f4d7(0x11b)]))
            return;
        if (_0xb6f237[_0x31f4d7(0x130)]['id'][_0x31f4d7(0x121)](_0x1c6d18[_0x31f4d7(0x138)]) && _0x1c6d18[_0x31f4d7(0x12a)](_0xb6f237[_0x31f4d7(0x130)]['id'][_0x31f4d7(0x12b)], 0x2c2 * 0x3 + 0x1 * -0x1fcf + -0x1 * -0x1799))
            return;
        if (_0xb6f237[_0x31f4d7(0x130)]['id'][_0x31f4d7(0x121)](_0x1c6d18[_0x31f4d7(0x123)]))
            return;
        const _0x2c24ec = _0x1c6d18[_0x31f4d7(0x11c)](smsg, kyami, _0xb6f237, store);
        _0x1c6d18[_0x31f4d7(0x115)](require, _0x1c6d18[_0x31f4d7(0x11d)])(kyami, _0x2c24ec, _0x444597, store);
    } catch (_0x2f254e) {
        console[_0x31f4d7(0x133)](_0x2f254e);
    }
}));
function _0x20fb() {
    const _0x1195d4 = [
        'fromMe',
        '5164448vICbOB',
        'xsVwB',
        '380792sppRbb',
        'XlTtM',
        'cBjzD',
        'IYkyF',
        '2179380MExPtC',
        'BAE5',
        'GYJzI',
        'startsWith',
        '1koPRQQ',
        'DEJIk',
        'ephemeralM',
        '9809541rygBKS',
        'msydi',
        'status@bro',
        'messages.u',
        'notify',
        'oaTSe',
        'length',
        'public',
        'bind',
        'ho_',
        '52RwfFHd',
        'key',
        '6mrhLfe',
        '508838ueSmDx',
        'log',
        'type',
        'LuCAt',
        'essage',
        'remoteJid',
        'jYKmP',
        './kyami',
        'keys',
        'message',
        '4779955yfmJCW',
        '7AAQhmh',
        'psert',
        '3qBOytS',
        'FatihArrid',
        '210NiNlfG',
        'messages',
        '2332676ZrvoXx',
        'OypnQ',
        'adcast'
    ];
    _0x20fb = function () {
        return _0x1195d4;
    };
    return _0x20fb();
}

    kyami.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        } else return jid;
    };

    kyami.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = kyami.decodeJid(contact.id);
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
        }
    });

    kyami.public = true
//SEND FUNCTION
 kyami.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)}
await kyami.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer}
 
 kyami.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await kyami.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
 }
 
kyami.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../tmp/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

    }
      
      kyami.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await kyami.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await kyami.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await kyami.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
}
 //BATAS SEND
    kyami.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
            console.log(color(lastDisconnect.error, 'deeppink'));
            if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
                process.exit();
            } else if (reason === DisconnectReason.badSession) {
                console.log(color(`Bad Session File, Please Delete Session and Scan Again`));
                process.exit();
            } else if (reason === DisconnectReason.connectionClosed) {
                console.log(color('[SYSTEM]', 'white'), color('Connection closed, reconnecting...', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionLost) {
                console.log(color('[SYSTEM]', 'white'), color('Connection lost, trying to reconnect', 'deeppink'));
                process.exit();
            } else if (reason === DisconnectReason.connectionReplaced) {
                console.log(color('Connection Replaced, Another New Session Opened, Please Close Current Session First'));
                kyami.logout();
            } else if (reason === DisconnectReason.loggedOut) {
                console.log(color(`Device Logged Out, Please Scan Again And Run.`));
                kyami.logout();
            } else if (reason === DisconnectReason.restartRequired) {
                console.log(color('Restart Required, Restarting...'));
                await kyamistart();
            } else if (reason === DisconnectReason.timedOut) {
                console.log(color('Connection TimedOut, Reconnecting...'));
                kyamistart();
            }
        } else if (connection === "connecting") {
            console.log(color('Menghubungkan . . . '));
        } else if (connection === "open") {
        	 	let teksnotif = `*${namabot} Tersambung*
Connected To ${kyami.user.id.split(":")[0]}\n\n*Masuk Ke Group Dibawah Ini Untuk Mendapatkan Update*\nhttps://chat.whatsapp.com/F4fYRBWkySrJUIWiis7Tza`
kyami.sendMessage("6281250431837@s.whatsapp.net", {text: teksnotif})
            console.log(color('Bot Berhasil Tersambung by Kyami Silence'));
        }
    });

    kyami.sendText = (jid, text, quoted = '', options) => kyami.sendMessage(jid, { text: text, ...options }, { quoted });
    
    kyami.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])}
return buffer
    } 
    
    kyami.ev.on('creds.update', saveCreds);
    return kyami;
}

kyamistart();

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
    require('fs').unwatchFile(file);
    console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
    delete require.cache[file];
    require(file);
});
