const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");

cmd(
  {
    pattern: "menu",
    alise: ["getmenu"],
    react: '🍑',
    desc: "get cmd list",
    category: "main",
    filename: __filename,
  },
  async (
    robin,
    mek,
    m,
    {
      from,
      quoted,
      body,
      isCmd,
      command,
      args,
      q,
      isGroup,
      sender,
      senderNumber,
      botNumber2,
      botNumber,
      pushname,
      isMe,
      isOwner,
      groupMetadata,
      groupName,
      participants,
      groupAdmins,
      isBotAdmins,
      isAdmins,
      reply,
    }
  ) => {
    try {
      const config = await readEnv();
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern && !commands[i].dontAddCommandList) {
          menu[
            commands[i].category
          ] += `${config.PREFIX}${commands[i].pattern}\n`;
        }
      }

      let madeMenu = `👋 *Hello  ${pushname}*


| *MᴀɪN CᴏᴍMᴀɴDs* |
    ▫️.alive
    ▫️.menu
    ▫️.ai <text>
    ▫️.system
    ▫️.owner
| *DᴏWɴLᴏAᴅ CᴏᴍMᴀɴDs* |
    ▫️.song <text>
    ▫️.video <text>
    ▫️.fb <link>
| *GʀOᴜP CᴏᴍMᴀɴDs* |
${menu.group}
| *OᴡᴇNᴇʀ CᴏᴍMᴀɴDs* |
    ▫️.restart
    ▫️.update
| *CᴏɴVᴇʀᴛ CᴏᴍMᴀɴDs* |
    ▫️.sticker <reply img>
    ▫️.img <reply sticker>
    ▫️.tr <lang><text>
    ▫️.tts <text>
| *SᴇᴀRᴄH CᴏᴍMᴀɴDs* |
${menu.search}


𝐌𝐀𝐃𝐄 𝐁𝐘 𝐏𝐀𝐓𝐇𝐔𝐌 𝐑𝐀𝐉𝐀𝐏𝐀𝐊𝐒𝐇𝐄

> ↪️𝙈𝘼𝙉𝙅𝙐 𝙈𝙀𝙉𝙐 𝙈𝙎𝙂 ↩️
`;
      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/Dark-Robin/Bot-Helper/refs/heads/main/autoimage/Bot%20robin%20menu.jpg",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );
    } catch (e) {
      console.log(e);
      reply(`${e}`);
    }
  }
);
