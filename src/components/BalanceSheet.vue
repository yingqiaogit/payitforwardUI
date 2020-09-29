<template>
    <div class="post">
        <h1>{{ owner }}</h1> 
        <div v-if="loading" class="loading">
            Loading...
        </div>

        <div v-if="error" class="error">
            {{ error }}
        </div>

        <div v-if="post" class="content">
            <div class='viewport'>
                <md-card>
                <md-toolbar :md-elevation="1">
                    <span class="md-title">Account Information</span>
                </md-toolbar>

                <md-list class="md-double-line">
                    <md-subheader>Address</md-subheader>
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>{{ accountInfo.ownerAddress }}</span>
                            <span>Owner</span>
                        </div>
                    </md-list-item>
                    
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>{{ accountInfo.contractAddress }}</span>
                            <span>Contract</span>
                        </div>
                    </md-list-item>

                    <md-divider></md-divider>
                    <md-subheader>Balance</md-subheader>

                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>{{ accountInfo.ownerBalance }}</span>
                            <span>Owner</span>
                        </div>
                    </md-list-item>
                    
                    <md-list-item>
                        <div class="md-list-item-text">
                            <span>{{ accountInfo.contractBalance }}</span>
                            <span>Contract</span>
                        </div>
                    </md-list-item>
                </md-list>
            </md-card>
            </div>
        </div>
    </div> 
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.component(
  'BalanceSheet', {
  props: [
    'owner',
    'loading',
    'error',
    'post',
    'accountInfo'
  ]  
})
</script>

<style lang="scss" scoped>
  .viewport {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
  }
</style>