const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("auth")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  })

  sock.ev.on("creds.update", saveCreds)

  sock.ev.on("connection.update", ({ qr, connection }) => {
    if (qr) {
      qrcode.generate(qr, { small: true })
    }
    if (connection === "open") {
      console.log("✅ Bot Connected!")
    }
  })

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message) return

    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text

    const from = msg.key.remoteJid

    // 🤖 Auto replies
    if (text === "hi") {
      await sock.sendMessage(from, { text: "Hello 👋" })
    }

    if (text === "course") {
      await sock.sendMessage(from, {
        text: "📚 Courses:\n1. Quran\n2. Hadith\n3. Fiqh"
      })
    }

    if (text === "contact") {
      await sock.sendMessage(from, {
        text: "📞 Contact: +91XXXXXXXXXX"
      })
    }
  })
}

startBot()
