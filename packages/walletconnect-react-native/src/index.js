import checkPushOptions from './checkPushOptions'
import WalletConnector from './walletConnector'

export default class RNWalletConnectWallet {
  constructor(opts) {
    this.push = checkPushOptions(opts)
    this.walletConnectors = {}
  }

<<<<<<< HEAD
  setWalletConnector(sessionId, walletConnector) {
    this.walletConnectors[sessionId] = walletConnector
    return true
=======
  //
  // approve call request
  //
  async approveCallRequest(callId, data) {
    if (!callId) {
      throw new Error('`callId` is required')
    }

    if (!data || typeof data !== 'object') {
      throw new Error('Data parameter is missing or invalid')
    }

    data.approved = true

    const encryptionPayload = await this.encrypt(data)

    const result = await this.sendCallStatus(callId, {
      encryptionPayload
    })

    return result
>>>>>>> 2c04c0b25569575296f136e571f24ca69c6f183e
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
