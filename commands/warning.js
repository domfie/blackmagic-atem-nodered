module.exports = {
  get: "Warn",
  cmd: "warning",
  data: {},
  close() {
    this.data = {};
  },
  initializeData(data, flag, commandList) {
    var command = {"payload":{"data":{}}};
    this.processData(data, flag, command, commandList);
  },
  processData(data, flag, command, commandList) {
    command.payload.cmd = this.cmd;
    command.payload.data.warningMessage = data.toString("UTF8", 0, 43);
    console.log("[WARN] Blackmagic ATEM Reports an Warning: " + command.payload.data.warningMessage);
    this.data = command.payload.data;
    return true;
  },
  sendData(command, commandList) {
    var msg = {
      "direction": "node",
      "command": {
        "payload": {
          "cmd": this.cmd,
          "data": this.data
        }
      }
    }
    
    return msg;
  }
}