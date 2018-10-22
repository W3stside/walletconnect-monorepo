import checkPushOptions from './checkPushOptions'

export default class RNWalletConnectWallet {
  constructor(opts) {
    this.push = checkPushOptions(opts)
  }
}
