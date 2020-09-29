<template>
  <div class="post">
    <balance-sheet
         owner="New Land Fund"
         v-bind:error="error"
         v-bind:post="post"
         v-bind:accountInfo="accountInfo"
         v-bind:loading="loading"                  
        >
    </balance-sheet>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Axios from 'axios'
import BalanceSheet from './BalanceSheet.vue'

export default Vue.extend({
  name: 'Bob',
  props: {
    msg: String
  },
  components: {
    BalanceSheet
  },
  data () {
    return {
      accountInfo: null,
      loading: false,
      post: null,
      error: null      
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
        .get('http://localhost:3000/harmonyOne/accounts/info?account=newlandfund')
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
      
  }    
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
h3 {
  margin: 40px 0 0;
}  
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


