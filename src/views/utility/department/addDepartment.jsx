import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
    // Input, 
    // Card,
    // CardBody,
    // CardTitle,
    // CardSubtitle,
    // CardImg,
    // CardText,
    Button,Table
  } from "reactstrap";
  // import { NavLink } from "react-router-dom";
  // import IntlMessages from "../../../helpers/IntlMessages";
  // import { getInternList } from '../../../action/community/community';
  import { connect } from 'react-redux';
  import * as constants from '../../../utils/constants';
  import { Link} from "react-router-dom"
  import Pagination from "../../../containers/pages/Pagination";
  
  import { formatDateTime } from '../../../utils/globalFunctions';
  import AddDeptPopUpform from './addDeptPopUpform';
  import EditDeptPopUpform from './editDeptPopUpform';
  import { reset } from 'redux-form'
  import { getDepartmentList,addDepartment,editDepartmentDetails,deleteDepartment} from '../../../action/department/department';


  class AddDepartmentForm extends Component {
    constructor(props) {
     super(props);
     this.state = {
        searchText: null,
        sort_dir: null,
        sort_type: null,
        addNewDepartmentModal: false,
        editDepartmentModal:false,
    };
    
    }
    componentDidMount() {   
      this.props.getDepartmentList({
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
        search_text: this.state.searchText,        
        sort_dir: this.state.sort_dir,
        sort_type: this.state.sort_type       
      })        
    }

    handlePageClick = (data) => {
      this.setState({currentPage: data})
      let selected = data-1;
      // alert(data)
      let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
      this.props.getDepartmentList({          
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: offset,
          
      })
    };
     
    closeNewDepartmentModal = () => {
        this.props.dispatch(reset('addDeptPopUpform'));
        this.setState({ addNewDepartmentModal: false })
    }

    openAddNewDepartmentSubmissionModal = () => {
        this.setState({ addNewDepartmentModal: true })
    }

    closeEditSubmissionModal = () => {
        this.props.dispatch(reset('editDeptPopUpform'));
        this.setState({ editDepartmentModal: false })
    }
    
    handleEditDepartment = (deptObj) => {
        this.setState({ editDepartmentModal: true, currentDept: deptObj })
    }
    
    handleRemoveDepartment = (dept) => {
        this.props.deleteDepartment(dept);
    }
    
    submit = values => {        
      values.createby = this.props.currentUser.UserId
      this.props.addDepartment(  values,this.closeNewDepartmentModal);  
    }
    
    submitUpdate = values => {
        values.createby = this.props.currentUser.UserId      
        // alert(values.deptId)
        this.props.editDepartmentDetails( values, this.closeEditSubmissionModal);
    }
    
  render() {
    
    return (
      <div>
      <Fragment>
        <Row>
          <Colxx xxs="12">
             <h1 style={{textAlign:'center',fontWeight:'bold'}}>Department</h1>
            <Separator className="mb-5" />            
          </Colxx>
        </Row>

        <Row>
        <Colxx sm="12" xxs="12" lg="12" xl="12">
          <Button style={{float:"right"}}
            onClick={this.openAddNewDepartmentSubmissionModal}
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
                                    <th>Dept Name<br/> <span>(Click to Edit)</span></th>
                                    <th>Date Added</th>                                    
                                    <th>Org Name</th>
                                    <th>Delete</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.departmentList.length > 0 ? this.props.departmentList.map((dept) => {
                                    return (
                                        <tr >
                                            <td data-title="Org Name">
                                            <Link
                                                 onClick={() => this.handleEditDepartment(dept)}
                                                 className='edit-record-link'
                                                >
                                                    {dept.department_name}
                                                </Link>                                               
                                            </td>
                                            <td data-title="Added Date">{formatDateTime(dept.created_on)}</td>
                                            <td data-title="Org Name">{dept.organization_name}</td>
                                            <td data-title="Delete"><Link className='remove-record' onClick={() => { if (window.confirm('Are you sure you want to delete this department?')) { this.handleRemoveDepartment(dept) }; }}> Delete </Link></td>
                                           
                                        </tr>
                                    )
                                }) : <tr className='no-record-found'><td>No Record Found</td></tr>}
                            </tbody>
                       
                        </Table>         
                        {this.props.departmentCount >= constants.DEFAULT_LIMIT_SIZE &&                        
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPage={this.props.pageCount}
                            onChangePage={i => this.handlePageClick(i)}
                          />
                        }

                    </Colxx>                
       </Row><br></br>      
      </Fragment>

      <AddDeptPopUpform onSubmit={this.submit} dispatch={this.props.dispatch} onRequestClose={this.closeNewDepartmentModal} modalStatus={this.state.addNewDepartmentModal} currentUser={this.props.currentUser} />
      <EditDeptPopUpform onSubmit={this.submitUpdate} dispatch={this.props.dispatch} onRequestClose={this.closeEditSubmissionModal} modalStatus={this.state.editDepartmentModal} currentUser={this.props.currentUser}  dept={this.state.currentDept} />
            
      </div>
   );
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        departmentList: state.departmentReducer.departmentList,
        departmentCount: state.departmentReducer.departmentCount, 
        pageCount: Math.ceil(state.departmentReducer.departmentCount / constants.DEFAULT_LIMIT_SIZE), 
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      getDepartmentList: (params) => { dispatch(getDepartmentList(params)) },
      addDepartment: (params, callback) => {dispatch(addDepartment(params, callback))},
      editDepartmentDetails: ( params, callback) => {dispatch(editDepartmentDetails( params, callback))},
      deleteDepartment: (dept) => {dispatch(deleteDepartment(dept))},

      dispatch: dispatch
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartmentForm);
  
