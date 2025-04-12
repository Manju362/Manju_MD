require('./settings');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const chalk = require('chalk');
const { serialize, WAMessageStubType } = require('./lib/myfunc');
const { makeWASocket, DisconnectReason, useMultiFileAuthState, jidDecode } = require('@whiskeysockets/baileys');
const readline = require("readline");
const figlet = require("figlet");
const fs = require("fs");

const connectToWhatsApp = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const robin = makeWASocket({
    logger: pino({ level: 'silent' }),
    printQRInTerminal: true,
    auth: state,
    browser: ['Manju_MD', 'Safari', '1.0.0']
  });

  robin.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
      switch (reason) {
        case DisconnectReason.badSession:
          console.log('Bad session file. Delete session and scan again.');
          process.exit();
          break;
        case DisconnectReason.connectionClosed:
          console.log('Connection closed. Reconnecting...');
          connectToWhatsApp();
          break;
        case DisconnectReason.connectionLost:
          console.log('Connection lost. Reconnecting...');
          connectToWhatsApp();
          break;
        case DisconnectReason.connectionReplaced:
          console.log('Connection replaced. Another session opened.');
          process.exit();
          break;
        case DisconnectReason.loggedOut:
          console.log('Device logged out. Delete session and scan again.');
          process.exit();
          break;
        case DisconnectReason.restartRequired:
          console.log('Restart required. Restarting...');
          connectToWhatsApp();
          break;
        case DisconnectReason.timedOut:
          console.log('Connection timed out. Reconnecting...');
          connectToWhatsApp();
          break;
        default:
          console.log('Unknown disconnect reason. Reconnecting...');
          connectToWhatsApp();
          break;
      }
    } else if (connection === 'open') {
      console.log(chalk.green.bold("BOT ONLINE - MANJU_MD"));
    }
  });

  robin.ev.on('creds.update', saveCreds);

  robin.ev.on('messages.upsert', async (m) => {
    try {
      const mek = m.messages[0];
      if (!mek.message) return;
      mek.message = mek.message;
      const from = mek.key.remoteJid;
      const type = Object.keys(mek.message)[0];
      const content = JSON.stringify(mek.message);
      const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : '';
      const isCmd = body.startsWith(".");
      const sender = mek.key.fromMe ? robin.user.id : mek.key.participant || mek.key.remoteJid;
      const senderNumber = sender.split("@")[0];
      const isReact = type === "reactionMessage";

      const botNumber = robin.user.id.split(':')[0];

      // OWNER REACT
      if (senderNumber === "94766863255") {
        if (isReact) return;
        await robin.sendMessage(from, {
          react: {
            text: "🌝",
            key: mek.key
          }
        });
      }

      const msg = serialize(robin, mek);
      require("./Manju_MD")(robin, msg, m, mek, from, sender, senderNumber, botNumber, type, content, isCmd, body);
    } catch (e) {
      console.log(chalk.red("Message handler error:"), e);
    }
  });
};

figlet("MANJU_MD", (err, data) => {
  if (err) return;
  console.log(chalk.blue(data));
  console.log(chalk.cyan("Telegram: t.me/Manju_MD | WhatsApp Bot Status: RUNNING"));
});

connectToWhatsApp();
