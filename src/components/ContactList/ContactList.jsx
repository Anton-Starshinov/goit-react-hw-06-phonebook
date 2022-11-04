import PropTypes from 'prop-types';
import { List, ListItem, TextList, ButtonList } from './ContactsList.styled';

function ContactList({ contacts, onDelete }) {
  return (
    <List>
      {contacts.map(({ name, id, number }) => (
        <ListItem key={id}>
          <TextList>
            {name}: {number}
          </TextList>
          <ButtonList type="button" onClick={() => onDelete(id)}>
            Delete
          </ButtonList>
        </ListItem>
      ))}
    </List>
  );
}

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func.isRequired,
};
