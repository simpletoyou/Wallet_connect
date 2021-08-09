<template>
  <div style="display: flex;justify-content: flex-start;flex-direction: column;width: 100%;">
    <!-- 测试区域  start  ······························································ -->
    <div class="wallet_contect" style="padding: 1rem;">
      <div class="connevt_box" style="margin: 10px 0">
        <button id="toConnect" v-show="!accountData.address" @click="onConnect">连接钱包</button>
        <button id="toConnect" v-show="accountData.address" @click="disConnect">断开钱包</button>
      </div>
      <div class="connect_data" style="width: 100%;">
        <p>
          <strong>连接的网络:</strong> <span>{{accountData.chainId}}</span>
        </p>
        <p>
          <strong>连接的账号:</strong> <span>{{accountData.address}}</span>
        </p>
        <p>
          <strong>余额(HT):</strong> <span>{{accountData.balance}}</span>
        </p>
      </div>
    </div>
    <!-- 测试区域  end  ······························································ -->
  </div>
</template>

<script>
  export default {
    props: ["connect"],

    data() {
      return {
        is_connect: false,

        App: {
          web3Provider: null,

          web3Modal: null,
          provide: null,
          web3: null,
          EvmChains: null,
          Web3Modal: null,
        },

        accountData: {
          chainId: 0,
          address: '',
          balance: 0
        }
      };
    },

    created() {

      let data = localStorage.getItem("accountData") ? JSON.parse(localStorage.getItem("accountData")) : null
      if (data) {
        this.accountData = data
      }
      this.initWeb3()
    },
    methods: {

      // ------------------------------------------------------
      async initWeb3() {
        let _this = this

        _this.App.EvmChains = window.evmChains,

        _this.App.Web3Modal = window.Web3Modal.default;
        _this.App.WalletConnectProvider = window.WalletConnectProvider.default;

        const providerOptions = {
          walletconnect: {
            package: _this.App.WalletConnectProvider, // required
            options: {
              infuraId: "9321e08afdc04e2c81cabc499dc5d569" // required
            }
          }
        };
        _this.App.web3Modal = new _this.App.Web3Modal({
          network: "mainnet", // optional
          cacheProvider: false, // optional
          disableInjectedProvider: false,
          providerOptions // required
        });
        if (typeof web3 !== 'undefined') {
          // 已存在web3，直接使用
          _this.App.web3Provider = web3.currentProvider;
        } else {
          // 搭建ganache节点与以太坊网络进行交互
          _this.App.web3Provider = new Web3.providers.HttpProvider('http://47.243.199.195:20384');
        }
        // 未安装小狐狸，报错：web3 is not defined
        _this.App.web3 = new Web3(_this.App.web3Provider);
        console.log('_this.App.web3', _this.App.web3)
        if (!_this.App.web3) {
          return
        }
      },
      async onConnect() {
        let _this = this
        try {
          if (_this.App.provider == null) {
            _this.App.provider = await _this.App.web3Modal.connect();
            _this.App.web3 = new Web3(_this.App.provider);
          }
        } catch (e) {
          return;
        }
        _this.App.provider.on("accountsChanged", (accounts) => {
          console.log('accounts',accounts)
          _this.App.web3Modal.clearCachedProvider()
          _this.App.fetchAccountData();
        });

        _this.App.provider.on("chainChanged", (chainId) => {
          console.log('chainId',chainId)
          _this.App.fetchAccountData();
        });
        await _this.refreshAccountData();
      },

      async refreshAccountData() {
        await this.fetchAccountData(this.App.provider);
      },

      async fetchAccountData() {
        let _this = this
        const chainId = await _this.App.web3.eth.getChainId();
        _this.accountData.chainId = chainId
        const accounts = await _this.App.web3.eth.getAccounts();
        _this.accountData.address = accounts[0]
        const balance = await _this.App.web3.eth.getBalance(_this.accountData.address);
        _this.accountData.balance = balance / Math.pow(10, 18)
        localStorage.setItem("accountData", JSON.stringify(_this.accountData))
        _this.$parent.loadData()
      },

      async disConnect() {
        let _this = this
        
        if (_this.App.provider != null) {
          console.log("disConnect");
          await _this.App.web3Modal.clearCachedProvider();
          // 数据清空
          _this.App.provider = null;
          _this.App.web3 = null;
          _this.accountData = {
            chainId: 0,
            address: '',
            balance: 0
          }
        }
        
        localStorage.setItem("accountData", '')
        _this.$parent.loadData()
      }
    }
  };
</script>
<style lang="less" scoped>
  .connect_data {
    p {
      overflow: hidden;
      overflow-wrap: break-word;
    }
  }
</style>
