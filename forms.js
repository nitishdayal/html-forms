const $form = document.querySelector('#form-user')
const $firstInput = document.querySelector('#input-first')
const $passwordInput = document.querySelector('#input-password')
const $emailInput = document.querySelector('#input-email')
const $ageDropdown = document.querySelector('#input-age')
const $aliveCheckbox = document.querySelector('#input-alive')
const $cancelButton = document.querySelector('#button-cancel')
const $submitButton = document.querySelector('#button-send')


const init = () => {
  $cancelButton.addEventListener('click', reset)
  $submitButton.addEventListener('click', send)
}

const reset = (e) => {
  e.preventDefault()
  $form.reset()
}

const validate = () => {
  const failures = [];

  if ($firstInput.value.trim().length < 1)
    failures.push({ input: '#input-first', msg: 'Required field' })
  if ($emailInput.value.trim().length < 1 || !$emailInput.value.includes('@'))
    failures.push({ input: '#input-email', msg: 'Invalid email' })
  if ($passwordInput.value.trim().length < 8)
    failures.push({ input: '#input-password', msg: 'Must be at least 8 characters' })
  if ($ageDropdown.selectedIndex === 0)
    failures.push({ input: '#input-age', msg: 'Too young' })
  if (!$aliveCheckbox.checked)
    failures.push({ input: '#input-alive', msg: 'Must be alive to submit' })

  return failures;
}

const send = (e) => {
  e.preventDefault();

  [$firstInput, $passwordInput, $emailInput, $ageDropdown, $aliveCheckbox].forEach(el => {
    el.parentElement.setAttribute('data-errormsg', '')
  })

  const failures = validate()
  if (failures.length === 0) {
    $form.submit()
  } else {
    failures.forEach(({ input, msg }) => {
      const $inputEl = document.querySelector(input)
      $inputEl.parentElement.classList.add('error')
      $inputEl.parentElement.setAttribute('data-errormsg', msg)
    })
  }
}

document.addEventListener('DOMContentLoaded', init)
