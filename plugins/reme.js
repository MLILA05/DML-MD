const { cmd } = require('../command');
const DY_SCRAP = require('@dark-yasiya/scrap');
const dy_scrap = new DY_SCRAP();

// 📸 Command: remini (HD Enhancer)
cmd({
    pattern: "remini",
    alias: ["hd", "enhance"],
    react: "🧠",
    desc: "Make image 8K quality",
    category: "tools",
    use: ".remini (reply image)",
    filename: __filename
}, async (conn, m, mek, { from, reply }) => {
    try {
        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const imageMsg = quoted?.imageMessage;

        if (!imageMsg) {
            return await reply("❌ Please reply to an image to enhance it (8K HD).");
        }

        const media = await conn.downloadAndSaveMediaMessage(imageMsg);
        await reply("⏳ Enhancing image to 8K quality...");

        const result = await dy_scrap.remini(media);
        if (!result?.url) return await reply("❌ Failed to enhance image!");

        await conn.sendMessage(from, { image: { url: result.url }, caption: "✅ *Enhanced to 8K HD!*" }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '📸', key: mek.key } });

    } catch (error) {
        console.error("Remini Error:", error);
        await reply(`❌ *Error enhancing image:* ${error.message || "Unknown error"}`);
    }
});


// 🧹 Command: removebg (Background Remover)
cmd({
    pattern: "removebg",
    alias: ["rmbg", "bgremove"],
    react: "🧼",
    desc: "Remove image background",
    category: "tools",
    use: ".removebg (reply image)",
    filename: __filename
}, async (conn, m, mek, { from, reply }) => {
    try {
        const quoted = mek.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const imageMsg = quoted?.imageMessage;

        if (!imageMsg) {
            return await reply("❌ Please reply to an image to remove background.");
        }

        const media = await conn.downloadAndSaveMediaMessage(imageMsg);
        await reply("⏳ Removing background...");

        const result = await dy_scrap.removebg(media);
        if (!result?.url) return await reply("❌ Failed to remove background!");

        await conn.sendMessage(from, { image: { url: result.url }, caption: "✅ *Background Removed Successfully!*" }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✨', key: mek.key } });

    } catch (error) {
        console.error("RemoveBG Error:", error);
        await reply(`❌ *Error removing background:* ${error.message || "Unknown error"}`);
    }
});
