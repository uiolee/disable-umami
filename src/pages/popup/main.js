const i18n = browser.i18n.getMessage;

(async () => {
  const l10nKey = "data-l10n";
  const elems = document.querySelectorAll(`[${l10nKey}]`);
  for (const elem of elems) {
    const msgKey = elem.getAttribute(l10nKey);
    const msgValue = i18n(msgKey);
    if (msgValue) {
      elem.textContent = msgValue;
    }
  }
})();

const sendMsg = (msg) => {
  setBusy(1);
  return browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      const tabId = tabs[0]["id"];
      return browser.tabs.sendMessage(tabId, msg).then(() => {
        console.debug(`send '${msg}' to tabId '${tabId}'`);
      });
    });
};

const Title = document.querySelector("#url");
const setUrl = (url) => {
  Title.textContent = url;
};

const setBusy = (bool) => {
  if (bool) {
    Title.setAttribute("aria-busy", true);
  } else {
    Title.removeAttribute("aria-busy");
  }
};

const showStorage = (jsonStr) => {
  setBusy(1);
  const obj = JSON.parse(jsonStr);
  const html = `
<thead>
  <tr>
      <th scope="col">Key</th>
      <th scope="col">Value</th>
    </tr>
</thead>
<tbody>
    <tr>
      <th scope="row">${Object.keys(obj)[0]}</th>
      <td>${Object.values(obj)[0]}</td>
    </tr>
</tbody>
`;
  document.querySelector("#table").innerHTML = html;
  setBusy(0);
};

(async () => {
  return browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      const { url, title, favIconUrl, status: tabStatus } = tabs[0];
      if (url && url.startsWith("http")) {
        setUrl(url);
      } else {
        setUrl(i18n("disallow"));
        document.querySelector("html").ariaDisabled = true;
        document.querySelector("input").ariaDisabled = true;
        document.querySelector("span").ariaDisabled = true;
        return Promise.reject(i18n("disallow"));
      }
      if (tabStatus == "complete") {
        setBusy(0);
      }
    });
})();

(async () => {
  const swi = document.querySelector("input[name=enable]");
  swi.addEventListener("change", (e) => {
    const checked = e.target.checked;
    if (checked) {
      sendMsg(1);
      sendMsg("check");
    } else if (!checked) {
      sendMsg(0);
      sendMsg("check");
    }
  });
})();

(async () => {
  await browser.runtime.onMessage.addListener(
    (message, sender, senderResponse) => {
      let from = sender.origin;
      console.debug(`receive '${message}' from '${from}'`);
      showStorage(message);
      setUrl(from);

      senderResponse();
    },
  );

  sendMsg("check");
})();
