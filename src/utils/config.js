const PREFIX = "disable_umami_";

const _k = (key) => {
  return PREFIX + String(key);
};

class Config {
  constructor() {
    this.prefix = PREFIX;
    this.configKey = _k("config");
    this.syncKey = _k("sync");
    this.storage = browser.storage;

    this.isSync = false;
    this.area = this.storage.StorageArea;
    this.sync = this.storage.sync;
    this.local = this.storage.local;
    this.config = {};
  }

  init() {
    return this.checkIsSync().then(() => {
      this.getStorageArea();
      this.read();
    });
  }
  checkIsSync() {
    const { syncKey: key } = this;
    return this.local.get(key).then((obj) => {
      if (Object.keys(obj).length) {
        const isSync = Boolean(obj[key]);
        console.debug(isSync);
        this.isSync = isSync;
        return isSync;
      } else {
        this.isSync = false;
        return false;
      }
    });
  }
  setSync(sync) {
    const { syncKey: key } = this;
    const obj = Object.fromEntries([[key, sync]]);
    return this.local.set(obj);
  }
  enableSync() {
    return this.setSync(1);
  }
  disableSync() {
    return this.setSync(0);
  }
  getStorageArea() {
    if (this.isSync) {
      this.area = this.storage.sync;
      console.info("get setting from sync storage");
    } else {
      this.area = this.storage.local;
      console.info("get setting from local storage");
    }
  }
  read() {
    const { configKey: key } = this;
    return this.area.get(key).then((obj) => {
      if (Object.keys(obj).length) {
        this.config = { ...obj[key] };
        console.info(
          "config exist in storage.",
          Object.keys(this.config).length,
        );
        return this.config;
      } else {
        console.info("config doesn't exist in storage.");
        // return this.save();
      }
    });
  }
  save() {
    const { configKey: key, config } = this;
    const obj = Object.fromEntries([[key, config]]);
    return this.area.set(obj).then(() => {
      console.info(
        `save config to ${this.isSync ? "sync" : "local"} storage. length: ${Object.keys(config).length}`,
      );
      console.debug(config);
    });
  }
  get(key) {
    return this.config[_k(key)];
  }
  set(key, value) {
    this.config[_k(key)] = value;
    console.debug(`set '${_k(key)}' to ${value}`);
    return this.save();
  }
  clear() {
    return this.area.clear();
  }
}

export { Config };
export default Config;
