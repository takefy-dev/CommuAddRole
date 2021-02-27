const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client();
const logs = require('discord-logs');
logs(client);


client.once('ready', () => {
	console.log(`${client.user.tag} est co`);
});

client.on("voiceStreamingStart", (member, voiceChannel) => {
    const streamRole = member.guild.roles.cache.get(config.streamRole)
    if(!member.roles.cache.has(streamRole.id)) member.roles.add(streamRole,`En stream role`)
});


client.on("voiceStreamingStop", (member, voiceChannel) => {
    const streamRole = member.guild.roles.cache.get(config.streamRole)
    if(member.roles.cache.has(streamRole.id)) member.roles.remove(streamRole, `${member.user.tag} n'est plus stream sur inlove`)
});

client.on("voiceStateUpdate", (oldState, newState) => {
    const camRole = oldState.guild.roles.cache.get(config.camRole)
    if(newState.selfVideo && !oldState.member.roles.cache.has(camRole.id) && !oldState.selfVideo){
        oldState.member.roles.add(camRole,  `En cam sur inlove`)
    }else if(!newState.selfVideo && oldState.member.roles.cache.has(camRole.id)  && !oldState.selfVideo){
        oldState.member.roles.remove(camRole,  `${oldState.member.user.tag} n'est plus cam sur inlove`)

    }
})


client.login(config.token)



