import React from "react";
import { Colxx } from "../../components/common/CustomBootstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
class CompletedProjectPagination extends React.Component {
  componentDidMount() {}
  onChangePage(e) {
    this.props.onChangePage(e);
  }
  render() {
    const {
      totalPage = 0,
      completedProjectCurrentPage = 1,
      numberLimit = 5,
      lastIsActive = true,
      firstIsActive = true
    } = this.props;

    let startPoint = 1;
    let endPoint = numberLimit;

    if (numberLimit > totalPage) {
      startPoint = 1;
      endPoint = totalPage;
    } else if (completedProjectCurrentPage <= parseInt(numberLimit / 2, 10)) {
      startPoint = 1;
      endPoint = numberLimit;
    } else if (completedProjectCurrentPage + parseInt(numberLimit / 2, 10) <= totalPage) {
      startPoint = completedProjectCurrentPage - parseInt(numberLimit / 2, 10);
      endPoint = completedProjectCurrentPage + parseInt(numberLimit / 2, 10);
    } else {
      startPoint = totalPage - (numberLimit - 1);
      endPoint = totalPage;
    }
    startPoint = startPoint === 0 ? 1 : startPoint;
    const points = [];
    for (var i = startPoint; i <= endPoint; i++) {
      points.push(i);
    }

    let firstPageButtonClassName = completedProjectCurrentPage <= 1 ? "disabled" : "";
    let lastPageButtonClassName = completedProjectCurrentPage >= totalPage ? "disabled" : "";
    let prevPageButtonClassName = completedProjectCurrentPage <= 1 ? "disabled" : "";
    let nextPageButtonClassName = completedProjectCurrentPage >= totalPage ? "disabled" : "";
    return totalPage > 1 ? (
      <Colxx xxs="12" className="mt-3 mb-3">
        <Nav className="pagination justify-content-center">
          {firstIsActive && (
            <NavItem className={`page-item ${firstPageButtonClassName}`}>
              <NavLink
                className="page-link first"
                onClick={() => this.onChangePage(1)}>
                <i className="simple-icon-control-start" />
              </NavLink>
            </NavItem>
          )}

          <NavItem className={`page-item ${prevPageButtonClassName}`}>
            <NavLink
              className="page-link prev"
              onClick={() => this.onChangePage(completedProjectCurrentPage - 1)}
            >
              <i className="simple-icon-arrow-left" />
            </NavLink>
          </NavItem>
          {points.map(i => {
            return (
              <NavItem
                key={i}
                className={`page-item ${completedProjectCurrentPage === i && "active"}`}>
                <NavLink
                  className="page-link"
                  onClick={() => this.onChangePage(i)}
                >
                  {i}
                </NavLink>
              </NavItem>
            );
          })}
          <NavItem className={`page-item ${nextPageButtonClassName}`}>
            <NavLink
              className="page-link next"
              onClick={() => this.onChangePage(completedProjectCurrentPage + 1)}
            >
              <i className="simple-icon-arrow-right" />
            </NavLink>
          </NavItem>
          {lastIsActive && (
            <NavItem className={`page-item ${lastPageButtonClassName}`}>
              <NavLink
                className="page-link last"
                onClick={() => this.onChangePage(totalPage)}>
                <i className="simple-icon-control-end" />
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Colxx>
    ) : (
      <Colxx xxs="12" className="mt-2" />
    );
  }
}

export default CompletedProjectPagination;
