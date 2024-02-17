document.addEventListener('DOMContentLoaded', () => {
  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeScreen = document.getElementById('subscribe-screen');
  const successScreen = document.getElementById('success-screen')
  const successEmailNode = document.querySelector('#success-screen > p > strong');
  const successButton = document.getElementById('dismiss-btn');
  
  function handleSubmit(event) {
    event.preventDefault();

    const formValues = getFormValues();
    const isFormValid = validateForm(formValues);

    updateInputErrorLabels(!isFormValid);
    
    if (!isFormValid) {
      return null;
    }
    subscribeScreen.classList.add('hide');
    successEmailNode.textContent = formValues.email;
    successScreen.classList.remove('hide');
    subscribeForm.reset();
  }

  function validateForm(formData) {
    const { email } = formData;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  function updateInputErrorLabels(hasError) {
    document.querySelectorAll('form > label').forEach(node => {
      node.classList.toggle('input-error', hasError);
      node.querySelector('span').style.setProperty('display', hasError ? 'inline-block' : 'none');
    });
  }

  function getFormValues() {
    const formData = new FormData(subscribeForm);
    return {
      email: formData.get('email'),
    };
  }

  function dismissSuccessEvent(event) {
    event.preventDefault();
    successScreen.classList.add('hide') 
    subscribeScreen.classList.remove('hide');
  }

  subscribeForm.addEventListener('submit', handleSubmit);
  successButton.addEventListener('click', dismissSuccessEvent);
});