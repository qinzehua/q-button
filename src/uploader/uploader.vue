<template>
  <div class="g-uploader">
    <div @click="onClickUpload" class="g-upload-trigger"><slot></slot></div>
    <ol class="g-uploader-list">
      <li v-for="file in fileList" :key="file.url">
        <img class="g-uploader-d-img" :src="file.url" />
        <button @click="onRemoveFile(file)">
          删除
        </button>
        <g-icon
          class="g-uploader-icon"
          :name="getIconName(file.status)"
        ></g-icon>
      </li>
    </ol>
    <div ref="temp" style="width:0;height:0;overflow: hidden;"></div>
  </div>
</template>

<script>
import http from '../http';
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
    },
    accept: {
      type: String,
      required: true
    },
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },

  methods: {
    getIconName(status) {
      if (status === 'success') {
        return 'success';
      } else if (status === 'fail') {
        return 'fail';
      } else if (status === 'uploading') {
        return 'loading';
      }
    },
    onClickUpload() {
      const input = this.createInput();
      input.addEventListener('change', e => {
        this.uploadFiles(e.target.files);
        input.remove();
      });
      input.click();
    },
    createInput() {
      this.$refs.temp.innerHTML = '';
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = this.accept;
      input.multiple = this.multiple;
      this.$refs.temp.appendChild(input);
      return input;
    },
    beforeUploadFiles(files) {
      this.$emit('update:fileList', [...this.fileList, ...files]);
    },
    uploadFiles(rosFiles) {
      let files = [];
      for (let i = 0; i < rosFiles.length; i++) {
        const rowFile = rosFiles[i];
        let { name, size, type } = rowFile;
        const file = {
          name,
          size,
          type,
          id: new Date().valueOf() + i,
          status: 'uploading'
        };
        files.push(file);
      }
      this.beforeUploadFiles(files);

      for (let i = 0; i < rosFiles.length; i++) {
        const rowFile = rosFiles[i];
        const file = files[i];
        let formData = new FormData();
        formData.append(this.name, rowFile);
        this.sendFile(
          formData,
          response => {
            let url = this.parseResponse(response);
            this.afterUpload(file, url);
          },
          () => {
            this.uploadError(file);
          }
        );
      }
    },
    uploadError(file) {
      let fileCopy = JSON.parse(JSON.stringify(file));
      fileCopy.status = 'fail';
      let index = this.fileList.findIndex(item => item.id === file.id);

      let copyList = JSON.parse(JSON.stringify(this.fileList));
      copyList.splice(index, 1, fileCopy);
      this.$emit('update:fileList', copyList);
    },
    afterUpload(file, url) {
      const index = this.fileList.findIndex(item => item.id === file.id);
      const fileListCopy = JSON.parse(JSON.stringify(this.fileList));
      fileListCopy.splice(index, 1, { ...file, url, status: 'success' });
      this.$emit('update:fileList', fileListCopy);
    },
    sendFile(formData, success, fail) {
      http[this.method.toLowerCase()](this.action, {
        success,
        fail,
        data: formData
      });
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
  .g-uploader-list {
    list-style: none;
    li {
      display: flex;
      align-items: center;
      margin: 8px 0;
      .g-uploader-d-img {
        width: 40px;
        height: 40px;
        border: 1px solid red;
        margin-right: 20px;
      }
      .g-uploader-icon {
        margin-left: 5px;
      }
    }
  }
  .g-upload-trigger {
    display: inline-block;
  }
}
</style>
