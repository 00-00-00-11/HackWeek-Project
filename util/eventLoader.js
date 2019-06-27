const event = (event) => require(`../events/${event}`);
// again baris
module.exports = client => {
  
  client.on("message", event("message"));
  
}