class BaseModal {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.ret_info = data
      data = null
      message = null
    }
    if (data) {
      this.ret_data = data
    }
    if (message) {
      this.ret_info = message
    }
  }
}
class SuccessModal extends BaseModal {
  constructor(data, message) {
    super(data, message)
    this.ret_code = 0
  }
}
class ErrorModal extends BaseModal {
  constructor(data, message) {
    super(data, message)
    this.ret_code = -1
  }
}
module.exports = {
  SuccessModal,
  ErrorModal
}