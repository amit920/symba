import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Button,Table } from "reactstrap";
import { connect } from 'react-redux';
import * as constants from '../../../utils/constants';
import { Link } from "react-router-dom"
import Pagination from "../../../containers/pages/Pagination";
import AddUsersPopUpForm from './addUsersPopUpForm';
import EditUsersPopUpForm from './editUsersPopUpForm';
import { reset } from 'redux-form'
import {getUserList,addusers,updateUserDetails} from '../../../action/supusers/supusers';


class UsersList extends Component {
    constructor(props) {
      super(props);
        this.state = {       
          addNewUsersModal: false,
          editUsersModal:false,
          searchText: null,
        };  
      }

    componentDidMount() {   
      this.props.getUserList({
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
        search_text: this.state.searchText,
      })
    }

    handlePageClick = (data) => {
      this.setState({currentPage: data})
      let selected = data-1;
      // alert(data)
      let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
      this.props.getUserList({          
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: offset,
          search_text: this.state.searchText,                    
      })
    };

    
    closeNewUsersModal = () => {
        this.props.dispatch(reset('AddUsersPopUpForm'));
        this.setState({ addNewUsersModal: false })
    }

    openAddNewUsersSubmissionModal = () => {
        this.setState({ addNewUsersModal: true })
    }

    closeEditSubmissionModal = () => {
      this.props.dispatch(reset('EditUsersPopUpForm'));
      this.setState({ editUsersModal: false })
    }
  
    handleEditUserfeatures = (userObj) => {
        this.setState({ editUsersModal: true, currentFeatures: userObj })
    }

    submit = values => {        
      values.createby = this.props.currentUser.UserId
      this.props.addusers(  values,this.closeNewUsersModal);  
    }
    
    submitUpdate = values => {
        values.createby = this.props.currentUser.UserId      
        // alert(values.deptId)
        this.props.updateUserDetails( values, this.closeEditSubmissionModal);
    }
    
    handleTextSearchChange = (event) => {
      this.setState({ searchText: event.target.value }, function () {
        this.props.getUserList({
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: 0,
          search_text: this.state.searchText,
        });
      });
    };

  render() {  
    return (
      <div>
      <Fragment>
        <Row>
          <Colxx xxs="12">
             <h1 style={{textAlign:'center',fontWeight:'bold'}}>Users List</h1>
            <Separator className="mb-5" />            
          </Colxx>
        </Row>

        <Row>
          <Colxx xxs="12" md="1" sm="1" lg="1" xl="1"></Colxx>
          <Colxx xxs="12" md="10" sm="10" lg="10" xl="10">
            <div className="searchbar">
              <input
                onChange={this.handleTextSearchChange}
                name="searchKeyword"
                id="searchKeyword"
                placeholder="Search by name, org"
              />
              <span className="search-icon">
                <i className="simple-icon-magnifier" />
              </span>
            </div>
          </Colxx>
        </Row>

        <Row>
          <Colxx sm="12" xxs="12" lg="12" xl="12">
            <Button style={{float:"right"}}
              onClick={this.openAddNewUsersSubmissionModal}
              color="info" outline className="mb-2">
              Add New
            </Button>
          </Colxx>
        </Row>

        <Row>
          <Colxx sm="12" xxs="12" lg="12" xl="12">
              <Table style={{width:'100%',marginTop:30}}>
                <thead>
                    <tr>
                          <th>First Name</th>
                          <th>Last Name</th>                                    
                          <th>Email</th>
                          <th>UserType</th>
                          <th>Org Name</th>
                          <th>Dept Name</th> 
                          <th>Start Date</th>
                          <th>End Date</th>                                    
                    </tr>
                </thead>
              
                  <tbody>
                      {this.props.userList.length > 0 ? this.props.userList.map((user) => {
                          return (
                              <tr >
                                    <td data-title="First Name">
                                        <Link
                                              onClick={() => this.handleEditUserfeatures(user)}
                                              className='edit-record-link'
                                            >
                                                {user.Firstname}
                                            </Link>                                               
                                        </td>
                                    <td data-title="Last Name">{user.Lastname}</td>
                                    <td data-title="Email">{user.Email}</td>
                                    <td data-title="UserType">{user.usertype}</td>
                                    <td data-title="Org Name">{user.organization.orgName}</td>
                                    <td data-title="Dept Name">{user.Departmentname}</td>
                                    <td data-title="Start Date">{user.Startdate}</td>
                                    <td data-title="End Date">{user.Enddate}</td>
                                    
                              </tr>
                          )
                        }) : <tr className='no-record-found'><td>No Record Found</td></tr>}
                  </tbody>
                       
                </Table>                     
      
                        {this.props.userCount >= constants.DEFAULT_LIMIT_SIZE &&                        
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPage={this.props.pageCount}
                            onChangePage={i => this.handlePageClick(i)}
                          />
                        }
            </Colxx>                
        </Row><br></br>      
      </Fragment>

      <AddUsersPopUpForm onSubmit={this.submit} dispatch={this.props.dispatch} onRequestClose={this.closeNewUsersModal} modalStatus={this.state.addNewUsersModal} currentUser={this.props.currentUser} />
      <EditUsersPopUpForm onSubmit={this.submitUpdate} dispatch={this.props.dispatch} onRequestClose={this.closeEditSubmissionModal} modalStatus={this.state.editUsersModal} currentUser={this.props.currentUser}  user={this.state.currentFeatures} />      
      </div>
   );
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        userList: state.userReducer.userList,
        userCount: state.userReducer.userCount,  
        pageCount: Math.ceil(state.userReducer.userCount / constants.DEFAULT_LIMIT_SIZE),
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      getUserList: (params) => { dispatch(getUserList(params))},
      addusers: (orgdata, callback) => {dispatch(addusers(orgdata, callback))},
      updateUserDetails: ( params, callback) => {dispatch(updateUserDetails( params, callback))},
      dispatch: dispatch
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
