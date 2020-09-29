<template>
  <div class="post">
    <balance-sheet
         owner="Alice"
         v-bind:error="error"
         v-bind:post="post"
         v-bind:accountInfo="accountInfo"
         v-bind:loading="loading"                  
        >
    </balance-sheet>
                 
    <div v-if="!loading" class="content">
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
    
    <div v-if="!loading" class="content">
        <div class='viewport'>
                <md-card>
                    <md-card-header>
                        <div class="md-title">Request Token </div>
                        <div class="md-subhead">"Make a promise for giving back in future"</div>
                    </md-card-header>        

                    <md-field>
                      <label>Funds</label>
                        <md-select v-model="selectedFund" name="fundSelector">
                            <md-option value="0">New Land Fund</md-option>          
                        </md-select>       
                    </md-field>

                    <md-field>
                      <label>Requested Amount</label>
                        <md-input type="number" v-model="request.amount" placeholder="20">
                        </md-input>
                    </md-field>

                    <md-field>
                      <label>Promise Name</label>
                        <md-input v-model="promise.name" placeholder="my promise 1">
                        </md-input>
                    </md-field>

                    <md-field>
                      <label>Amount for giving back in future</label>
                        <md-input type="number" v-model="promise.amount" placeholder="20">
                        </md-input>
                    </md-field>

                    <md-card-actions>
                        <md-button @click='submitRequest'>Request</md-button>                        
                    </md-card-actions>
                </md-card>
        </div>
    </div>

    <div v-if="!loading" class="content">
        <div class='viewport'>
                <md-card>
                    <md-card-header>
                        <div class="md-title">Redeem</div>
                        <div class="md-subhead">promise</div>
                    </md-card-header>        

                    <md-field>
                      <label>Stored Promises</label>
                        <md-select v-model="selected.index" name="promiseSelector">
                          <md-option v-for="item in storedPromises" :key="item.index" :value="item.index">
                            {{item.name}}
                          </md-option>     
                        </md-select>        
                    </md-field>
                    <md-card-actions>
                        <md-button @click='redeemPromise'>Redeem</md-button>                        
                    </md-card-actions>
                </md-card>
        </div>
    </div>
    
    <div v-if="loading">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
      <md-progress-spinner class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
  
  </div>

  
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
import BalanceSheet from './BalanceSheet.vue'
import Transfer from './Transfer.vue'

export default Vue.extend({
  name: 'Alice',
  props: {
    msg: String
  },
  components: {
    BalanceSheet,
    Transfer
  },
  data () {
    return {
      accountInfo: null,
      loading: false,
      post: null,
      error: null,
      selectedFund: null,
      request: {amount: 0},
      promise: { name: null, amount: 0 },
      storedPromises: null,
      selected: { index: null}
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },  
  methods: {
    
    fetchData () {
      this.error = this.post = null
      this.loading = true
      //const fetchedId = this.$route.params.id     

      Axios
        .get('http://localhost:3000/harmonyOne/accounts/info?account=alice')
        .then( response => {
          this.accountInfo = response.data;
          this.loading = false;
          this.post = true;
          console.log(JSON.stringify(this.accountInfo));
        })
        .catch( error => {
          this.error = error
        });

      // fetch promises
      Axios
        .get('http://localhost:3000/harmonyOne/promises?account=alice')
        .then( response => {
          this.storedPromises = response.data
        })
        .catch( error => {
          this.error = error
        });

    },
    withdraw() {

      const requestBody = {
          "account": "alice",
          "amount": this.accountInfo.contractBalance
      }
      
      this.loading = true
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

    submitRequest() {
      
      this.loading = true;
      Axios
        .post(`http://localhost:3000/harmonyOne/consume/withpromise?amount=${this.request.amount}`, 
                  this.promise)
        .then( response => {

          if (response.data.success) {
              this.fetchData();
          }          
        })
        .catch( error => {
          this.error = error
        });
    },

    redeemPromise() {
      this.loading = true;
      Axios
        .delete(`http://localhost:3000/harmonyOne/promises?index=${this.selected.index}`, 
                  this.promise)
        .then( response => {

          if (response.data.success) {
              this.fetchData();
          }          
        })
        .catch( error => {
          this.error = error
        });
    }
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
  .md-field {
    margin: 4px;
    max-width: 300px;
  }
</style>
