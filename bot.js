const {
  default: makeWASocket,
  useMultiFileAuthState
} = require('@whiskeysockets/baileys');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');

  const sock = makeWASocket({
    auth: state
  });

  sock.ev.on('creds.update', saveCreds);

  const phoneNumber = '91XXXXXXXXXX'; // your number
  const code = await sock.requestPairingCode(phoneNumber);

  console.log('Pair Code:', code);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const sender = msg.key.remoteJid;
    const text = msg.message.conversation?.toLowerCase();

    if (text === 'hi') {
      await sock.sendMessage(sender, {
        text:
`📚 Welcome to Education Bot

1️⃣ Courses
2️⃣ Admission
3️⃣ Fees
4️⃣ Contact

Reply with number`
      });
    }

    if (text === '1') {
      await sock.sendMessage(sender, {
        text: '📘 Available Courses: Quran, Arabic, Islamic Studies'
      });
    }

    if (text === '2') {
      await sock.sendMessage(sender, {
        text: '📝 Admission Open Now'
      });
    }

    if (text === '3') {
      await sock.sendMessage(sender, {
        text: '💰 Fees Details Available'
      });
    }

    if (text === '4') {
      await sock.sendMessage(sender, {
        text: '☎️ Contact: +91xxxxxxxxxx'
      });
    }
  });
}

startBot();
