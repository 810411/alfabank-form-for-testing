import React, {useState} from 'react';
import axios from "axios";

import Form from "arui-feather/form";
import FormField from "arui-feather/form-field";
import Input from "arui-feather/input";
import Button from "arui-feather/button";
import PhoneInput from "arui-feather/phone-input";
import CalendarInput from "arui-feather/calendar-input";

const FormOne = ({setResult, setCurrentView}) => {
  const [fields, setFields] = useState({
    name: '',
    surname: '',
    patronymic: '',
    phone: '',
    birthday: '',
    passport: ''
  });
  const [fieldsErrors, setFieldsErrors] = useState({
    name: null,
    surname: null,
    patronymic: null,
    phone: null,
    birthday: null,
    passport: null,
  });
  const handleNameChange = (value, field) => {
    const newFields = {...fields};
    const newFieldsErrors = {...fieldsErrors};
    const rule = field === 'patronymic' ? /^[а-яА-Я]+$/ : /^[а-яА-Я]+-?[а-яА-Я]+$/;
    if (value.length > 1 && !rule.test(value)) {
      if (value.substr(-1) === '-') {
        newFieldsErrors[field] = 'Значение поля не может заканчиваться на дефис'
      } else {
        newFieldsErrors[field] = `Значение поля может содержать только русские буквы ${field !== 'patronymic' ? ' и дефис' : ''}`
      }
    } else if (value.length === 1) {
      newFieldsErrors[field] = 'Значение поля должно содержать больше одной буквы'
    } else if (value.length > 64 && field !== 'surname') {
      newFieldsErrors[field] = 'Значение поля не может быть длинее 64 символов'
    } else if (field === 'surname' && value.indexOf('-') > -1) {
      newFieldsErrors[field] = 'Что-то пошло не так'
    } else {
      newFieldsErrors[field] = null
    }
    setFieldsErrors(newFieldsErrors);
    newFields[field] = ((value => {
      if (value.indexOf('-') > -1) {
        const arr = value.split('-');
        return arr[0].substr(0, 1).toUpperCase() + arr[0].substr(1).toLowerCase() + '-' +
          arr[1].substr(0, 1).toUpperCase() + arr[1].substr(1).toLowerCase()
      } else {
        return value.substr(0, 1).toUpperCase() + value.substr(1).toLowerCase()
      }
    })(value));
    setFields(newFields)
  };
  const handleDataChange = (value, field) => {
    const newFields = {...fields};
    const newFieldsErrors = {...fieldsErrors};
    if (
      (field === 'phone' && value.length < 18) ||
      (field === 'birthday' && value.length < 10) ||
      (field === 'passport' && value.length < 15)
    ) {
      newFieldsErrors[field] = 'Поле заполнено не полностью'
    } else {
      newFieldsErrors[field] = null
    }
    setFieldsErrors(newFieldsErrors);
    newFields[field] = value;
    setFields(newFields)
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newfieldsErrors = {...fieldsErrors};
    Object.keys(fields).forEach((key) => {
      if (fields[key] && fieldsErrors[key] === 'Поле обязательно для заполнения') {
        newfieldsErrors[key] = null
      } else if (!fields[key]) {
        newfieldsErrors[key] = 'Поле обязательно для заполнения';
      }
    });
    setFieldsErrors(newfieldsErrors);
    if (Object.values(newfieldsErrors).every(elem => !elem)) {
      setResult(fields);
      setCurrentView('result');
    }
  };
  return (
    <Form onSubmit={handleFormSubmit}>
      <FormField>
        <Input
          error={fieldsErrors['name']}
          clear
          label='ИМЯ'
          width='available'
          value={fields['name']}
          onChange={value => handleNameChange(value, 'name')}
        />
      </FormField>
      <FormField>
        <Input
          error={fieldsErrors['surname']}
          clear
          label='ФАМИЛИЯ'
          width='available'
          value={fields['surname']}
          onChange={value => handleNameChange(value, 'surname')}
        />
      </FormField>
      <FormField>
        <Input
          error={fieldsErrors['patronymic']}
          clear
          label='ОТЧЕСТВО'
          width='available'
          value={fields['patronymic']}
          onChange={value => handleNameChange(value, 'patronymic')}
        />
      </FormField>
      <FormField>
        <PhoneInput
          error={fieldsErrors['phone']}
          clear
          mask={'+\\7 (111)-111-11-11'}
          label='ТЕЛЕФОН'
          placeholder='+7 (900)-000-00-00'
          width='available'
          value={fields['phone']}
          onChange={value => handleDataChange(value, 'phone')}
        />
      </FormField>
      <FormField>
        <CalendarInput
          error={fieldsErrors['birthday']}
          label='ДАТА РОЖДЕНИЯ'
          width='available'
          value={fields['birthday']}
          onChange={value => handleDataChange(value, 'birthday')}
        />
      </FormField>
      <FormField>
        <Input
          error={fieldsErrors['passport']}
          clear
          mask={'**** \\№ 11111111'}
          label='ПАСПОРТ'
          placeholder='СЕРИЯ        №'
          width='available'
          value={fields['passport']}
          onChange={value => handleDataChange(value, 'passport')}
        />
      </FormField>
      <FormField>
        <Button view='extra' type='submit'>Отправить</Button>
      </FormField>
    </Form>
  )
};

export default FormOne
