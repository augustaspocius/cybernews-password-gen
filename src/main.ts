import './style.css'
import './styles/header.css'
import './styles/page-content.css'
import './styles/password-generator.css'
import './styles/info-section.css'
import './reset.css';

function generatePassword(includeUpperCase: boolean, includeLowerCase: boolean, includeNumbers: boolean, includeSymbols: boolean): string {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let characterSet = '';
    if (includeUpperCase) characterSet += upperCaseLetters;
    if (includeLowerCase) characterSet += lowerCaseLetters;
    if (includeNumbers) characterSet += numbers;
    if (includeSymbols) characterSet += symbols;

    //default options
    if (!characterSet) characterSet = upperCaseLetters + lowerCaseLetters + numbers + symbols;

    let password = '';
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }
    return password;
};

document.addEventListener('DOMContentLoaded', () => {

    const passwordInput = document.querySelector('.password-generator__input') as HTMLInputElement;
    const upperCaseCheckbox = document.getElementById('include-upper-case') as HTMLInputElement;
    const lowerCaseCheckbox = document.getElementById('include-lower-case') as HTMLInputElement;
    const numbersCheckbox = document.getElementById('include-numbers') as HTMLInputElement;
    const symbolsCheckbox = document.getElementById('include-symbols') as HTMLInputElement;
    const regeneratePasswordBtn = document.querySelector('.password-generator__button--regenerate') as HTMLButtonElement;
    const copyBtn = document.querySelector('.password-generator__button--copy') as HTMLButtonElement;

    const updatePassword = () => {
        const includeUpperCase = upperCaseCheckbox.checked;
        const includeLowerCase = lowerCaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;
        const newPassword = generatePassword(includeUpperCase, includeLowerCase, includeNumbers, includeSymbols);
        passwordInput.value = newPassword;
    };

    updatePassword();
    regeneratePasswordBtn?.addEventListener('click', updatePassword);

    copyBtn?.addEventListener('click', () => {
        try {
            navigator.clipboard.writeText(passwordInput.value);
            alert(`Password "${passwordInput.value}" copied to clipboard!`);
        } catch (err) {
            console.error('Failed to copy: ', err);
            alert('Failed to copy password to clipboard. Please try again.');
        }
    });
});