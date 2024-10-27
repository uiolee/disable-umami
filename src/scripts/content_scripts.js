const name = browser.i18n.getMessage("name");
const debug = (...args) => {
  return console.debug(`[${name}]:`, ...args);
};
const defaultKey = "umami.disabled";

const checkUmami = () => {
  return window.localStorage.getItem(defaultKey);
};

const setUmami = (enable) => {
  const value = enable ? "0" : "1";
  debug(`set "${defaultKey}" to ${value}`);
  window.localStorage.setItem(defaultKey, value);
};

(async () => {
  debug("content scripts start at:", window.location.href);

  const defaultValue = 1;

  let currentValue = checkUmami();
  if (!currentValue || currentValue != defaultValue) {
    setUmami(0);
  } else {
    debug(`skip setUmami.`, `"${defaultKey}" exists: ${currentValue}`);
  }
})()
  .then(() => {
    return browser.runtime.onMessage.addListener(
      (message, sender, senderResponse) => {
        let from = sender.url.replace(/.+?:\/\/.+?\//, "");
        console.debug(`receive '${message}' from '${from}'`);
        if (message == 1) {
          setUmami(0);
        } else if (message == 0) {
          setUmami(1);
        } else if (message == "check") {
          let id = sender.contexId;
          browser.runtime.sendMessage(
            id,
            JSON.stringify(Object.fromEntries([[defaultKey, checkUmami()]])),
          );
        }
        return senderResponse();
      },
    );
  })
  .finally(() => {
    debug("content scripts end");
  });
