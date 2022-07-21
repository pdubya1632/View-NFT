function getData() {
  return {
    formData: {
      email: '',
      password: '',
      password_confirm: '',
    },
    status: false,
    loading: false,
    isError: false,
    modalHeaderText: '',
    modalBodyText: '',
    buttonLabel: 'Submit',
  };
}
