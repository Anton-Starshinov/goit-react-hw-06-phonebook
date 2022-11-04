import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { FormStyled, LabelForm, InputForm, ButtonForm } from './Form.styled';

export default function Form({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid(3);

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit({ name, number });
    resetSubmit();
  };

  const resetSubmit = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <LabelForm htmlFor={nameId}>
        Name
        <InputForm
          id={nameId}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </LabelForm>
      <LabelForm htmlFor={nameId}>
        Number
        <InputForm
          id={nameId}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </LabelForm>
      <ButtonForm type="submit">Add contact</ButtonForm>
    </FormStyled>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
