<template>
  <div class="g-uploader">
    <div @click="onClickUpload" class="g-upload-trigger"><slot></slot></div>
    <div ref="temp" style="width:0;height:0;overflow: hidden;"></div>
    <ol>
      <li v-for="file in fileList" :key="file.url">
        <img :src="file.url" />
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'g-uploader',
  props: {
    name: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    method: {
      type: String,
      default: 'post'
    },
    parseResponse: {
      type: Function,
      required: true
    },
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },

  methods: {
    onClickUpload() {
      const input = this.createInput();
      input.addEventListener('change', e => {
        this.uploadFile(e.target.files[0]);
        input.remove();
      });
      input.click();
    },
    createInput() {
      const input = document.createElement('input');
      input.type = 'file';
      this.$refs.temp.appendChild(input);
      return input;
    },
    uploadFile(file) {
      let formData = new FormData();
      formData.append(this.name, file);
      let { name, size, type } = file;
      this.sendFile(formData, response => {
        let url = this.parseResponse(response);
        const fileListCopy = JSON.parse(JSON.stringify(this.fileList));
        fileListCopy.push({ name, size, type, url });
        this.$emit('update:fileList', fileListCopy);
      });
    },
    sendFile(formData, success) {
      var xhr = new XMLHttpRequest();
      xhr.open(this.method, this.action);
      xhr.onload = () => {
        success(xhr.response);
      };
      xhr.send(formData);
    }
  }
};
</script>

<style lang="scss" scoped>
.g-uploader {
  .g-upload-trigger {
    display: inline-block;
  }
}
</style>
