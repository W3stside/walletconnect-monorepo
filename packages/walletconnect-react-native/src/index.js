import checkPushOptions from './checkPushOptions'
import WalletConnector from './walletConnector'

export default class RNWalletConnectWallet {
  constructor(opts) {
    this.push = checkPushOptions(opts)
    this.walletConnectors = {}
  }

  setWalletConnector(sessionId, walletConnector) {
    this.walletConnectors[sessionId] = walletConnector
    return true
  }

  getWalletConnector(sessionId) {
    const walletConnector = this.walletConnectors[sessionId]
    return walletConnector
  }

  generateWalletConnector(session) {
    const walletConnector = new WalletConnector({ ...session, push: this.push })
    this.setWalletConnector(walletConnector.sessionId, walletConnector)
  }

  onQRCodeScan(uri) {
    this.generateWalletConnector({ uri })
  }

  onDeepLink(link) {
    const uri = 'ethereum:' + link.substring(link.indexOf(':') + 1)
    this.generateWalletConnector({ uri })
  }

  onPushNotification() {}
}
