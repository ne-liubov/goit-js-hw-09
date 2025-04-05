// створення об'єкта з полями email та message
// (назви властивостей = назви атрибутів в html)
let formData = {
    email: '',
    message: '',
};

const feedbackFormEl = document.querySelector('.feedback-form');

// зчитування даних з localStorage та заповнення полів у формі
const fillFormFields = () => {
    try {

// якщо в localStorage нічого немає — виходимо
        const savedData = localStorage.getItem('feedback-form-state');
        if (savedData === null) {
            return;
        };

// парсимо JSON, оновлюємо formData
        const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state'));

// перезаписуємо для оновлення даних в formData 
// (якщо ні, то створиться пустий formData) 
        formData = formDataFromLS;
        console.log(formData);

// перебираємо об'єкт з localStorage
// значення залишються у формі після перезавантаження сторінки
// при зміні у формі та перезавантаження, все старе стирається, нове залишається
        for (const key in formDataFromLS) {
            feedbackFormEl.elements[key].value = formDataFromLS[key];
        }
    } catch (error) {
        console.log(error);
    }
};


// викликається одразу
fillFormFields();


// записує дані в formData і localStorage під час введення
const onFormFieldInput = event => {
// event.target - елемент (поле), в якому вводимо символи
    const { value, name } = event.target;
// прибирає пробіли у значеннях, які вводяться у форму
    formData[name] = value.trim();
// відправка даних до localStorage
// JSON.stringify - метод, щоб призвести до рядка JSON
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};


// обробка відправки форми
const onFeedbackFormSubmit = event => {
// заборона на оновлення сторінки
    event.preventDefault();

// перевірка: всі поля заповнені і не тільки пробілами
    const isEmptyField = Object.values(formData).some(val => val.trim() === '');

    if (isEmptyField) {
        alert('Fill please all fields');
        return;
    };
    
    console.log(formData);

// очищення форми та localStorage
    feedbackFormEl.reset();
    localStorage.removeItem('feedback-form-state');
};


// обробники подій
feedbackFormEl.addEventListener('input', onFormFieldInput);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);