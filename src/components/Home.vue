<template>
    <div id='home'>
        <h1>Welcome to Pay It Forward Chain</h1>

        <md-card>
            <md-card-header>
                <div class="md-title">Alice</div>
                <div class="md-subhead">Fund consumer</div>
            </md-card-header>        
            <md-card-actions>
                <md-button to="/alice">Login</md-button>                
            </md-card-actions>
        </md-card>

        <md-card>
            <md-card-header>
                <div class="md-title">Bob</div>
                <div class="md-subhead">New Land Fund admin</div>
            </md-card-header>        
            <md-card-actions>
                <md-button to="/bob">Login</md-button>                
            </md-card-actions>
        </md-card>        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  props: {
    msg: String
  },
  data: () => ({
    userName: null
  })
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

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