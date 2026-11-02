const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent
  ]
});

const PREFIX = '!';

// ضع رقم رتبة الحماية هنا
const PROTECTED_ROLE_ID = 'ضع_رقم_الرتبة';

// لا تضع التوكن هنا
client.once('ready', () => {
  console.log(`Fares Shield is online as ${client.user.tag}`);
});

// أمر حظر آمن: !ban @member
client.on('messageCreate', async message => {
  if (message.author.bot || !message.guild) return;

  if (message.content.startsWith(PREFIX + 'ban')) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply('ليس لديك صلاحية الحظر.');
    }

    const member = message.mentions.members.first();
    if (!member) return message.reply('منشن العضو أولاً.');

    if (member.roles.cache.has(PROTECTED_ROLE_ID)) {
      return message.reply(`⚠️ لا يمكن حظر هذا العضو لأنه محمي من قبل فارس.`);
    }

    try {
      await member.ban();
      message.reply('تم حظر العضو.');
    } catch {
      message.reply('لم أستطع تنفيذ الحظر. تحقق من صلاحياتي.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
