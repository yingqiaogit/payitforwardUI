<template>
    <div class="post">
        
        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="post" class="content">
            <div class='viewport'>
                <md-card>
                    <md-card-header>
                        <div class="md-title">Withdraw</div>
                        <div class="md-subhead">Fund consumer</div>
                    </md-card-header>        
                    <md-card-actions>
                        <md-button @click='withdraw'>Withdreaw</md-button>                        
                    </md-card-actions>
                </md-card>
            </div>
        </div>
    </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'

export default Vue.component(
  'Transfer', {
  props: [
    'owner',
    'loading',
    'error',
    'post',
    'accountInfo',
    'fetchData'
  ],
  methods: {
      withdraw() {

      const requestBody = {
          "account": "alice",
          "amount": this.accountInfo.contractBalance
      }
      
      Axios
        .post('http://localhost:3000/harmonyOne/contract/withdraw', requestBody)
        .then( response => {

          if (response.data.success) {
              this.fetchData();
          }          
        })
        .catch( error => {
          this.error = error
        });
    },
  }
})
</script>

<style lang="scss" scoped>
    .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .h1 {
    color:  #3342FF;
  }
</style>