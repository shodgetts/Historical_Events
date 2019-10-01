/* eslint-disable react/prop-types */
import React from 'react';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showEdit: false };
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    const { text } = this.state;
    e.preventDefault();
    console.log(text);
  }

  editEntry(e) {
    e.preventDefault();
    this.setState(((prevState) => ({ showEdit: !prevState.showEdit })));
  }


  render() {
    const { showEdit, value } = this.state;
    const { description, category1 } = this.props;
    let editBox = <div />;
    if (showEdit) {
      editBox = (
        <div>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            New Value
            <input value={value} onChange={(e) => this.onChange(e)} type="text" name="name" />
            <input className="submit-button" type="submit" value="Submit" />
          </form>
        </div>
      );
    }
    return (
      <div className="event-container">
        <div className="description">{description}</div>
        <div className="cat">{category1}</div>
        <button type="button" onClick={(e) => this.editEntry(e)} className="edit-button">Edit this Entry</button>
        <div>
          {editBox}
        </div>
      </div>
    );
  }
}

export default Event;
