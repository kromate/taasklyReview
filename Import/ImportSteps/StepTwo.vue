<template>
  <v-col
    cols="12"
    sm="12"
    class="block main-area"
  >
    <h2 class="mb-3">
      {{ $t('columnMapping') }}
    </h2>

    <!-- Add this section to render the mapping rows -->

  
    <v-row
      v-for="(row, index) in mappingRows"
      :key="index"
      class="mb-2"
    >
      <v-col
        cols="5"
        class="text-left mx-0 px-0"
      >
        <v-label class="text-left fs-14px text-theme-label font-weight-medium">
          {{ $t('testFiestaField') }}
        </v-label>
        <div class="rounded-lg field-theme custom-prepend input-field">
          {{ row.name }}
        </div>
      </v-col>
      <v-col
        cols="2"
        class="mt-12 ma-0 pa-0"
      >
        <ArrowRightIcon />
      </v-col>
      <v-col
        cols="5"
        class="text-left mx-0 px-0"
      >
        <v-label class="text-left fs-14px text-theme-label font-weight-medium">
          {{ $t('csvField') }}
        </v-label>
        <v-select 
          v-model="row.csvHeader"
          :items="header"
          :hide-details="true" 
          append-icon="mdi-chevron-down"
          class="mt-0 pt-1 rounded-lg field-theme custom-prepend mb-4"
          height="38px"
          background-color="#F9F9FB"  
          :menu-props="{'offset-y': true}"
        />
      </v-col>
    </v-row>

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
        @click="goToPreview"
      >
        {{ $t('goToPreview') }}
      </v-btn>
    </v-col>
  </v-col>
</template>

<script>
import ArrowRightIcon from '@/assets/svg/arrow-right.svg'

export default {
  name: 'ImportStepOne',

  components: {
    ArrowRightIcon
  },

  props: {
    header: {
      type: Array,
      required: true
    },
    selectedTemplateData: {
      type: Object,
      required: true
    }
  },
 
  data() {
    return {
      csvFile: null,
      selectedFolder: null,
      selectedTemplate: null, 
      name: '',
      folders: [],
      templates: [],
      mappingRows: [
        { key: 'id', name: 'ID', biddingValue: 'externalId' },
        { key: 'title', name: 'Title', biddingValue: 'name' },
        { key: 'priority', name: 'Priority', biddingValue: 'priority' },
        { key: 'description', name: 'Description', biddingValue: '' },
      ],
    };
  },

  mounted(){
    const formattedData = this.selectedTemplateData.customFields.map(item => ({
      key: item.name,
      name: item.name,
      biddingValue: item.name,
      type: item.dataType
    }));

    this.mappingRows.push(...formattedData);
  },

  methods: {
    goToPreview() {   
           
      this.$emit('next', this.mappingRows);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  background-color: #F9F9FB;
  padding: 7px 14px;
  border-radius: 5px;
  margin-top: 4px;
}
</style>
