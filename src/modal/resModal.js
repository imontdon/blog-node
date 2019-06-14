class BaseModal {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}
class SuccessModal extends BaseModal {
  constructor(data, message) {
    super(data, message)
    this.errNum = 0
  }
}
class ErrorModal extends BaseModal {
  constructor(data, message) {
    super(data, message)
    this.errNum = -1
  }
}
module.exports = {
  SuccessModal,
  ErrorModal
}