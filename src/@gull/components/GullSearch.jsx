import React, { Component } from "react";
import { classList } from "@utils";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

class GullSearch extends Component {
  debounceTimer = null;
  dummyProductList = [
    {
      name: "Headphone 1",
      category: "Gadget",
      currentPrice: 300,
      prevPrice: 400,
      status: "Sale",
      imgUrl: "/assets/images/products/headphone-1.jpg",
    },
    {
      name: "Bitz Headphone 1",
      category: "Gadget",
      currentPrice: 300,
      prevPrice: 400,
      status: "New",
      imgUrl: "/assets/images/products/headphone-2.jpg",
    },
    {
      name: "Sony Headphone 1",
      category: "Gadget",
      currentPrice: 300,
      prevPrice: 400,
      status: "New",
      imgUrl: "/assets/images/products/headphone-3.jpg",
    },
    {
      name: "Earphone 1",
      category: "Gadget",
      currentPrice: 300,
      prevPrice: 400,
      status: "New",
      imgUrl: "/assets/images/products/headphone-4.jpg",
    },
  ];

  state = {
    query: "",
    searchList: this.dummyProductList,
  };

  handleSearch = (event) => {
    event.persist();
    this.setState({ query: event.target.value }, () => {
      if (this.debounceTimer) clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.setState({
          searchList: this.dummyProductList.filter((item) =>
            item.name.toLocaleLowerCase().match(this.state.query.toLowerCase())
          ),
        });
      }, 250);
    });
  };

  render() {
    let { open, handleClose } = this.props;
    let { searchList } = this.state;

    return (
      <div
        className={classList({
          "search-ui": true,
          open: open,
        })}
      >
        <div className="d-flex justify-content-between align-items-center search-header o-hidden">
          <img
            src="/assets/images/logo.png"
            alt=""
            className="logo float-left"
          />
          <button
            className="search-close btn btn-icon bg-transparent mt-2"
            onClick={handleClose}
          >
            <i className="i-Close-Window text-22 text-muted"></i>
          </button>
        </div>

        <input
          type="text"
          placeholder="Type here"
          className="search-input"
          autoFocus
          onChange={this.handleSearch}
        />

        <div className="search-title">
          <span className="text-muted">Search results</span>
        </div>

        <div className="search-results list-horizontal">
          {searchList.map((item, index) => (
            <div key={index} className="list-item col-md-12 p-0">
              <div className="card o-hidden flex-row mb-4 d-flex">
                <div className="list-thumb d-flex">
                  {/* <!-- TUMBNAIL --> */}
                  <img src={item.imgUrl} alt="" />
                </div>
                <div className="flex-grow-1 pl-2 d-flex">
                  <div className="card-body align-self-center d-flex flex-column justify-content-between align-items-lg-center flex-lg-row">
                    {/* <!-- OTHER DATA --> */}
                    <Link to="/" className="w-40 w-sm-100">
                      <div className="item-title">{item.name}</div>
                    </Link>
                    <p className="m-0 text-muted text-small w-15 w-sm-100">
                      Gadget
                    </p>
                    <p className="m-0 text-muted text-small w-15 w-sm-100">
                      ${item.currentPrice}
                      <del className="text-secondary">${item.prevPrice}</del>
                    </p>
                    <p className="m-0 text-muted text-small w-15 w-sm-100 d-none d-lg-block item-badges">
                      <span
                        className={classList({
                          badge: true,
                          "bg-danger": item.status === "Sale",
                          "bg-primary": item.status === "New",
                        })}
                      >
                        {item.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <!-- PAGINATION CONTROL --> */}
        <div className="px-3 mt-5 d-flex flex-row justify-content-center">
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={5}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            // onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}

export default GullSearch;
