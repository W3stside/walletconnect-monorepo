import { Connector } from 'js-walletconnect-core'

export default class WalletConnector extends Connector {
  constructor(opts) {
    super(opts)

    this.push = this._checkPushOptions(opts)
  }

  //
  // approve session
  //
  async approveSession(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Data parameter is missing or invalid')
    }

    data.approved = true

    const encryptionPayload = await this.encrypt(data)

    const result = await this.sendSessionStatus({
      push: this.push,
      encryptionPayload
    })

    this.expires = result.expires
    this.isConnected = true

    const session = this.toJSON()

    return session
  }

  //
  // reject session
  //
  async rejectSession() {
    const data = { approved: false }

    const encryptionPayload = await this.encrypt(data)

    await this.sendSessionStatus({
      push: null,
      encryptionPayload
    })

    this.isConnected = false

    const session = this.toJSON()

    return session
  }

  //
  // send session status
  //
  async sendSessionStatus(sessionStatus = {}) {
    const result = await this._fetchBridge(
      `/session/${this.sessionId}`,
      { method: 'PUT' },
      sessionStatus
    )

    return result
  }

  //
  // kill session
  //
  async killSession() {
    const result = await this._fetchBridge(`/session/${this.sessionId}`, {
      method: 'DELETE'
    })

    this.isConnected = false

    return result
  }

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
  }

  //
  // reject call request
  //
  async rejectCallRequest(callId) {
    if (!callId) {
      throw new Error('`callId` is required')
    }

    const data = { approved: false }

    const encryptionPayload = await this.encrypt(data)

    const result = await this.sendCallStatus(callId, {
      encryptionPayload
    })

    return result
  }

  //
  // Send call status
  //
  async sendCallStatus(callId, callStatus) {
    await this._fetchBridge(
      `/call-status/${callId}/new`,
      { method: 'POST' },
      callStatus
    )

    return true
  }

  //
  // get call request data
  //
  async getCallRequest(callId) {
    if (!callId) {
      throw new Error('callId is required')
    }

    return this._getEncryptedData(`/session/${this.sessionId}/call/${callId}`)
  }

  //
  // get all call requests data
  //
  async getAllCallRequests() {
    return this._getMultipleEncryptedData(`/session/${this.sessionId}/calls`)
  }
}
