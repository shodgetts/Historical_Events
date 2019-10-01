import React from 'react';
import ReactPaginate from 'react-paginate';
import Event from './event.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      data: [],
      perPage: 5,
      currentPage: 0,
      elements: [],
      offset: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  setElementsForCurrentPage() {
    const { data, offset, perPage } = this.state;
    const elements = data
      .slice(offset, offset + perPage)
      .map((post, index) => (<Event description={post.description} key={index} />));
    this.setState({ elements });
  }

  handleSubmit(e) {
    console.log('here');
    e.preventDefault();
    const { value } = this.state;
    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);
    let date = '';
    if (day.length > 1) {
      date = `${year}/${month}/${day}`;
    } else {
      date = year;
    }
    console.log(date);
    fetch(`http://localhost:3000/events?date=${date}`)
      .then((results) => results.json())
      .then((data) => {
        const { perPage } = this.state;
        this.setState({ data, pageCount: Math.ceil(data.length / perPage) });
      })
      .then(() => this.setElementsForCurrentPage());
  }

  handlePageClick(data) {
    const selectedPage = data.selected;
    const offset = selectedPage * 5;
    this.setState({ currentPage: selectedPage, offset }, () => {
      this.setElementsForCurrentPage();
    });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { pageCount, currentPage } = this.state;
    let paginationElement;
    if (pageCount > 1) {
      paginationElement = (
        <ReactPaginate
          className="pagination"
          previousLabel="← Previous"
          nextLabel="Next →"
          breakLabel={<span className="gap">...</span>}
          pageCount={pageCount}
          onPageChange={this.handlePageClick}
          forcePage={currentPage}
          containerClassName="pagination"
          previousLinkClassName="previous_page"
          nextLinkClassName="next_page"
          disabledClassName="disabled"
          activeClassName="active"
        />
      );
    }
    const { value, elements } = this.state;
    return (
      <div className="container">
        <div className="top-row">
          <div className="header">
            <h1>Search The Database For Historic Events</h1>
          </div>
          <div className="form-container">
            <div className="form">
              Search by Date
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="date" value={value} onChange={(e) => this.handleChange(e)} />
                <input className="submit-button" type="submit" value="Submit" />
              </form>
            </div>
            <div className="form">
              Search by Year
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="text" value={value} onChange={(e) => this.handleChange(e)} />
                <input className="submit-button" type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
        <div className="list-container">
          {paginationElement}
          {elements}
        </div>
      </div>
    );
  }
}

export default App;
