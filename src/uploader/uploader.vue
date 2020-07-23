<template>
  <div class="g-uploader">
    <div @click="onClickUpload" class="g-upload-trigger"><slot></slot></div>
    <div ref="temp" style="width:0;height:0;overflow: hidden;"></div>
    <ol>
      <li v-for="file in fileList" :key="file.url">
        <template v-if="file.status === 'uploading'">
          <g-icon name="loading"></g-icon>
        </template>
        <img :src="file.url" />
        <button @click="onRemoveFile(file)">删除</button>
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
    beforeUploadFile(file) {
      this.$emit('update:fileList', [
        ...this.fileList,
        { ...file, status: 'uploading' }
      ]);
    },
    uploadFile(rowFile) {
      let { name, size, type } = rowFile;
      const file = { name, size, type, id: new Date().valueOf() };
      this.beforeUploadFile(file);
      let formData = new FormData();
      formData.append(this.name, rowFile);
      this.sendFile(formData, response => {
        let url = this.parseResponse(response);
        this.afterUpload(file, url);
      });
    },
    afterUpload(file, url) {
      const index = this.fileList.findIndex(item => item.id === file.id);
      const fileListCopy = JSON.parse(JSON.stringify(this.fileList));
      fileListCopy.splice(index, 1, { ...file, url, status: 'success' });
      this.$emit('update:fileList', fileListCopy);
    },
    sendFile(formData, success) {
      var xhr = new XMLHttpRequest();
      xhr.open(this.method, this.action);
      xhr.onload = () => {
        success(xhr.response);
      };
      xhr.send(formData);
    },
    onRemoveFile(rowFile) {
      let answer = window.confirm('确定删除?');
      if (answer) {
        let copy = [...this.fileList];
        let index = copy.indexOf(rowFile);
        copy.splice(index, 1);
        this.$emit('update:fileList', copy);
      }
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
