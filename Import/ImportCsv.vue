<template>
  <div class="pl-3">
    <v-container class="container--fluid rounded-lg bg-white px-0 app-height-global mt-3">
      <v-row justify="center">
        <v-col
          cols="12"
          sm="12"
        >
          <v-progress-linear
            color="#0C2FF3"
            background-color="#F2F4F7"
            value="30"
          />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          class="back-btn-container px-8"
        >
          <div
            class="back-btn"
            @click="goBack"
          >
            <v-icon>mdi-chevron-left</v-icon> {{ $t('backToTestCases') }}
          </div>
        </v-col>
      
        <StepOne
          v-if="step === 1"
          @next="handleNextOne"
        />
        <StepTwo
          v-if="step === 2"
          :header="csvFileData.header"
          :data="csvFileData.data"
          :selected-template-data="selectedTemplateData"
          @next="handleNextTwo"
        />
        <StepThree
          v-if="step === 3"
          :mapped-rows="mappedRows"
          :body="csvFileData.body"
          :loading="createBtnLoading"
          @submit="handleSubmit"
        />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StepOne from './ImportSteps/StepOne.vue';
import StepTwo from './ImportSteps/StepTwo.vue';
import StepThree from './ImportSteps/StepThree.vue';
import makeCasesService from '@/services/api/case';
import { showSuccessToast, showErrorToast } from '@/utils/toast';

let caseService;

export default {
  components: {
    StepOne,
    StepTwo,
    StepThree,
  },
  data()
  {
    return {
      selectedFolderId: this.$store.state.folder.selectedFolderUID,
      step: 1,
      csvFileData: null,
      selectedFolder: null,
      selectedTemplate: null,
      selectedTemplateData: null,
      mappedRows: null,
      createBtnLoading:false
    }
  },
  computed: {
    contentsHasData(){
      return this.contents.length > 0;
    }
  },
  async created() {
    caseService = makeCasesService(this.$api);
    this.onTest()
  },

  methods: {
    goBack()
    {
      if (this.step === 1) {
        this.$router.go(-1);
      } else {
        this.step--;
      }
    },


    handleNextOne(selectedData)
    {
      this.selectedFolder = selectedData.selectedFolder;
      this.selectedTemplate = selectedData.selectedTemplate;
      this.selectedTemplateData = selectedData.selectedTemplateData;
      this.csvFileData = selectedData.csvFile
      this.step = 2;
    },
    handleNextTwo(mappedRows){
      this.mappedRows = mappedRows;
      this.step = 3;
    },
    async handleSubmit(){
      this.createBtnLoading = true
      let sentData = []

      this.csvFileData.body.forEach((item) => {
        const data = {
          name: this.getKeyValue(item, 'name', this.mappedRows ),
          externalId: this.getKeyValue(item, 'externalId', this.mappedRows ),
          source: 'testfiesta',
          projectKey: this.$route.params.key,
          parentId: this.selectedFolder,
          templateId: this.selectedTemplate,
          customFields: {
            priority: this.getKeyValue(item, 'priority', this.mappedRows),
            templateFields: this.getCustomValues(item, this.selectedTemplateData, this.mappedRows)
          },
        }
        sentData.push(data)
      })
      sentData = sentData.filter(item => item.name)
      try {
        const response = await caseService.createTestCases(this.$route.params.handle, this.$route.params.key, sentData);
          if (response.status == 200) {
            if (this.selectedFolderUID) {
              this.$router.push({
                name: 'CasesFolder',
                params: {
                  folderUid: this.selectedFolderUID,
                },
              });
            } else {
              this.$router.push({ name: 'Cases' });
            }
          } else {
            showErrorToast(this.$swal, 'createError', { item: 'Test case' });
          }
      }catch (err) {
          showErrorToast(this.$swal, 'createError', { item: 'Test case' });
        } finally {
          this.createBtnLoading = false;
        }

    },
    getKeyValue(item, key, reference) {
      const referenceKey = reference.find(ref => ref.biddingValue === key)?.csvHeader
      return item[referenceKey]
    },

    getCustomValues(item, selectedTemplateData, reference) {
      const result = selectedTemplateData.customFields.map(field => ({
        name: field.name,
        type: field.dataType,
        value: this.getKeyValue(item, field.name, reference),
        source:"Manual"
      }))
      return result
    }
  }
}
</script>
<style scoped>
.back-btn{
    text-decoration: none;
    color: #0c2ff3 !important;
    font-weight: 600;
    cursor: pointer;
}
h2, h5{
  text-align: left;
}
h2{
  font-size: 24px !important;
  font-weight: 700;
  color: #18181A;
}
h5{
  font-size: 14px !important;
  color: #0C111D;
  font-weight: 500;
}
button {
  font-size: 14px;
}
.v-align-start {
  align-items: flex-start !important;
}
.font-inter{
  font-family: Inter;
}
.card{
  border-radius: 8px;
}
.block{
  display: block;
}
.main-area{
  max-width: 438px;
  margin-left: auto;
  margin-right: auto;
}
.round-8{
  border-radius: 8px;
}
.relative{
  position: relative;
}
.absolute{
  position: absolute;
}
.bottom-0{
  bottom: 0;
}
.justify-end{
  justify-content: flex-end;
}
.text-white{
  color: white !important;
}
.round-6{
  border-radius: 6px;
}
.flex{
  display: flex;
}
.file-input{
  border:1px solid #D0D5DD;
  border-style:dashed;
}
</style>
