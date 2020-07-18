let callbacks = [];

const documentClick = e => {
  let { target } = e;
  callbacks.forEach(item => {
    if (item === target || item.el.contains(target)) {
      return;
    } else {
      item.callback();
    }
  });
};

const removeListener = el => {
  callbacks.forEach((item, index) => {
    if (item.el === el) {
      callbacks.splice(index, 1);
    }
  });
};

document.addEventListener('click', documentClick);

export default {
  bind: function(el, binding, vnode) {
    callbacks.push({ el, callback: binding.value });
  }
};

export { removeListener };
