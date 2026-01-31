class Utils {
  constructor(locale) {
    this.locale = locale;
  }

  getDate(name) {
    const now = new Date();
    const template = this.locale.template || "Hello %1, What a beautiful day. Server current date and time is";
    const message = template.replace('%1', name);
    const fullMessage = `${message} ${now.toString()}`;
    return `<div style="color:blue">${fullMessage}</div>`;
  }
}

module.exports = Utils;
