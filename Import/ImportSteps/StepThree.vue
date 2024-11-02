<template>
  <v-col
    cols="12"
    sm="12"
    class="block main-area"
  >
    <h2 class="mb-8">
      {{ $t('importPreview') }}
    </h2>



    <v-row
      v-for="(row, index) in mappedRows"
      :key="index"
      class="w-100 rounded-lg bg-gray-theme  mb-2 px-4 py-3"
    >
      <v-col
        cols="5"
        class="text-left ma-0 pa-0"
      >
        {{ row.name }}
      </v-col>
      <v-col
        cols="2"
        class="ma-0 pa-0"
      >
        <ArrowRightIcon />
      </v-col>

      <v-col
        cols="5"
        class="text-left ma-0 pa-0"
      >
        {{ body[0][row.csvHeader] }}
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
        :disabled="loading"
        @click="$emit('submit')" 
      >
        {{ $t('importAll') }}
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
    mappedRows: {
      type: Array,
      required: true
    },
    body: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
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
    };
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
