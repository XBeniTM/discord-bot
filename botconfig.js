module.exports = {
  Admins: ["615119099881586689", "663826701133807636"], //Admins of the bot
  ExpressServer: true,//If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || ">", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/GKWFDwxXZn", //Support Server Link
  Token: process.env.Token || "ODg0Mzk3NDYwNTQwMjM5OTEy.YTX5UQ.dOP-cCQIR3nwQVEvQ05Ur8Yvwr4", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "884397460540239912", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "KvIjNq46JM0Zk0J1rcRGFJ1neZ73QbEN", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is cute", //A Secret like a password
  IconURL:
    "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
  Permissions: 2205280576, //Bot Inviting Permissions
  Website: process.env.Website || "D:\új music bot\Discord-MusicBot-master\views\/index.html", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  //Lavalink
   Lavalink: {
    id: "Main",
    host: "lava.link",
    port: 80,
    pass: "youshallnotpass", 
    secure: false, // Set this to true if you're self-hosting lavalink on replit.
  },
  
  //Alternate Lavalink
  /*
  Lavalink: {
    id: "Main",
    host: "lava.sudhan.tech",
    port: 1234,
    pass: "CodingWithSudhan", 
    secure: false // Set this to true if you're self-hosting lavalink on replit.
  },
  */

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "7f6c9433f7cb4d1e8cd1e9b90ca7a736", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "e3ee64e9b702401ab7146dfac28e0903", //Spotify Client Secret
  },
};
