<template>
  <v-col
    cols="12"
    sm="12"
    class="block main-area"
  >
    <h2 class="mb-3">
      {{ $t('importFromCSV') }}
    </h2>
    <div class="mb-1 text-left">
      <v-label class="fs-14px text-theme-label font-weight-medium">
        {{ $t('chooseFile') }}
      </v-label>
    </div>
    <fileInput
      v-model="csvFile"
      class="w-full mb-2"
      type="text/csv"
      @onFileChange="handleChange"
    />
    <div class="mb-1 text-left">
      <v-label class="fs-14px text-theme-label font-weight-medium">
        {{ $t('importTo') }}
      </v-label>
    </div>
    <v-select
      v-model="selectedFolder"
      dense
      height="38px"
      :items="folders"
      item-value="uid"
      item-text="name"
      :placeholder="$t('selectFolder')"
      append-icon="mdi-chevron-down"
      class="rounded-lg field-theme custom-prepend"
      background-color="#F9F9FB"
    />
    <div class="mb-1 text-left">
      <v-label class="fs-14px text-theme-label font-weight-medium">
        {{ $t('template') }}
      </v-label>
    </div>
    <v-select
      v-model="selectedTemplate"
      dense
      height="38px"
      :items="templates"
      append-icon="mdi-chevron-down"
      class="rounded-lg field-theme custom-prepend"
      background-color="#F9F9FB"
      item-value="uid"
      item-text="name"
      :placeholder="$t('selectTemplate')"
    />
    <div class="mb-1 text-left">
      <v-label class="fs-14px text-theme-label font-weight-medium">
        {{ $t('name') }}
      </v-label>
    </div>
    <v-text-field
      v-model="name"
      dense
      height="38px"
      class="rounded-lg field-theme"
      background-color="#F9F9FB"
      placeholder="Name"
    />
    <v-col
      cols="12"
      sm="12"
      class="flex justify-end pa-0 ma-0"
    >
      <v-btn
        class="text-capitalize btn-theme px-6 py-2"
        color="primary"
        depressed
        height="40"
        @click="goToMapping"
      >
        {{ $t('goToColumnMapping') }}
      </v-btn>
    </v-col>
  </v-col>
</template>

<script>
import fileInput from '@/components/base/FileInput.vue';
import makeFoldersService from '@/services/api/folder';
import makeTemplateService from '@/services/api/template';
import { showErrorToast } from '@/utils/toast';
import Papa from "papaparse/papaparse.js";

let folderService;
let templateService;

export default {
  name: 'ImportStepOne',
  components: {
    fileInput,
  },
 
  data() {
    return {
      csvFile: null,
      selectedFolder: null,
      selectedTemplate: null, 
      selectedTemplateData: null,
      name: '',
      folders: [],
      templates: [],
    };
  },
    created(){
      folderService = makeFoldersService(this.$api);
    templateService = makeTemplateService(this.$api);
    this.fetchFolders();
    this.fetchTemplates();
  },
    methods: {
      handleChange(event) {
        const file = event[0];
        if (!file) {
          showErrorToast(this.$swal, 'No file selected');
          return;
        }

        if ( !file.name || !file.name.toLowerCase().endsWith('.csv')) {
          showErrorToast(this.$swal, this.$t('selectCSVFile'));
          return;
        }
        
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          Papa.parse(file, {
            header: true,
            complete: (results) => {
              const { data, meta } = results;

              this.csvFile = {
                header: meta.fields,
                body: data
              };
            }
          });
        };
        reader.onerror = () => {
          showErrorToast(this.$swal, 'Error reading file');
        };
      },
      async fetchFolders() {
      try {
        const { data: { folders } } = await folderService.getProjectFolders(
          this.$route.params.handle,
          this.$route.params.key
        );
        this.folders = this.findLeafNodes(folders);
      } catch (error) {
        console.error('Failed to fetch folders:', error);
      }
    },
      findLeafNodes(folders) {
      let nodes = [];
      for (let idx = 0; idx < folders.length; idx++) {
        let parent = {
          name: folders[idx].name,
          uid: folders[idx].uid,
        };
        if (!folders[idx].children || folders[idx].children.length < 1) {
          nodes.push(parent);
        } else {
          nodes.push(parent, ...this.findLeafNodes(folders[idx].children));
        }
      }
      return nodes;
    },
    async fetchTemplates() {
      try {
        const response = await templateService.getTemplates(
          this.$route.params.handle,
          this.$route.params.key,
          'per_page=9999&current_page=1'
        );
        this.templates = response.data.templates;
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      }
    },

    goToMapping() {
      if (!this.csvFile || !this.selectedFolder || !this.selectedTemplate || !this.name) {
        showErrorToast(this.$swal, this.$t('fillAllFields'));
        return;
      }
      const selectedData = {
        csvFile: this.csvFile,
        selectedFolder: this.selectedFolder,
        selectedTemplate: this.selectedTemplate,
        selectedTemplateData: this.templates.find(template => template.uid === this.selectedTemplate),
        name: this.name,
      };

      this.$emit('next', selectedData);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
