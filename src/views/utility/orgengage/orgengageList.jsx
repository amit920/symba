import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Button,Table } from "reactstrap";
import { connect } from 'react-redux';
import * as constants from '../../../utils/constants';
import { Link } from "react-router-dom"
import Pagination from "../../../containers/pages/Pagination";
import { formatDateTime } from '../../../utils/globalFunctions';
import AddOrgEngageCategoryPopUpForm from './addOrgEngageCategoryPopUpForm';
import EditOrgEngageCategoryPopUpForm from './editOrgEngageCategoryPopUpForm';
import { reset } from 'redux-form'
import { getOrgengagecategoryList, addOrgEngageCategory, 
         updateOrgengagCategoryDetails, deleteOrgEngage } from '../../../action/orgengage/orgengage';
  

  class OrgengageCategoryList extends Component {
    constructor(props) {
     super(props);
     this.state = {
        searchText: null,
        sort_dir: null,
        sort_type: null,
        addNewOrgFeaturesModal: false,
        editDepartmentModal:false,
    };
    
    }
    componentDidMount() {   
      this.props.getOrgengagecategoryList({
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
      this.props.getOrgengagecategoryList({          
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: offset,
          
      })
    };

     
    closeNewDepartmentModal = () => {
        this.props.dispatch(reset('AddOrgEngageCategoryPopUpForm'));
        this.setState({ addNewOrgFeaturesModal: false })
    }

    openAddNewDepartmentSubmissionModal = () => {
        this.setState({ addNewOrgFeaturesModal: true })
    }

    closeEditSubmissionModal = () => {
        this.props.dispatch(reset('editOrgEngageCategoryPopUpForm'));
        this.setState({ editDepartmentModal: false })
    }
    
    handleEditDepartment = (deptObj) => {
        this.setState({ editDepartmentModal: true, currentDept: deptObj })
    }
    
    handleRemoveDepartment = (orgengage) => {
        this.props.deleteOrgEngage(orgengage);
    }
    
    submit = values => {        
      values.createby = this.props.currentUser.UserId
      this.props.addOrgEngageCategory(  values,this.closeNewDepartmentModal);  
    }
    
    submitUpdate = values => {
        values.createby = this.props.currentUser.UserId      
        // alert(values.deptId)
        this.props.updateOrgengagCategoryDetails( values, this.closeEditSubmissionModal);
    }
    
  render() {
    
    return (
      <div>
      <Fragment>
        <Row>
          <Colxx xxs="12">
             <h1 style={{textAlign:'center',fontWeight:'bold'}}>Org Engage</h1>
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
                                    <th>Category Name<br/> <span>(Click to Edit)</span></th>
                                    {/* <th>EngageFeatures</th>
                                    <th>FeedbackFeatures</th>
                                    <th>LaunchpadFeatures</th>
                                    <th>ProjectsFeatures</th> */}
                                    <th>CreatedOn</th>                                    
                                    <th>Org Name</th>
                                    <th>Delete</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.categoryList.length > 0 ? this.props.categoryList.map((org) => {
                                    return (
                                        <tr >
                                            <td data-title="Org Name">
                                            <Link
                                                 onClick={() => this.handleEditDepartment(org)}
                                                 className='edit-record-link'
                                                >
                                                    {org.Categoryname}
                                                </Link>                                               
                                            </td>
                                            {/* <td data-title="Org Name">{org.EngageFeatures}</td>
                                            <td data-title="Org Name">{org.feedbackFeatures}</td>
                                            <td data-title="Org Name">{org.launchpadFeatures}</td>
                                            <td data-title="Org Name">{org.projectsFeatures}</td> */}
                                            <td data-title="Added Date">{formatDateTime(org.Createdon)}</td>
                                            <td data-title="Org Name">{org.OrgName}</td>
                                            <td data-title="Delete"><Link className='remove-record' onClick={() => { if (window.confirm('Are you sure you want to delete this OrgEngage?')) { this.handleRemoveDepartment(org) }; }}> Delete </Link></td>
                                           
                                        </tr>
                                    )
                                }) : <tr className='no-record-found'><td>No Record Found</td></tr>}
                            </tbody>
                       
                        </Table>  
                        {this.props.categoryCount >= constants.DEFAULT_LIMIT_SIZE &&                        
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPage={this.props.pageCount}
                            onChangePage={i => this.handlePageClick(i)}
                          />
                        }

                    </Colxx>                
       </Row><br></br>      
      </Fragment>

      <AddOrgEngageCategoryPopUpForm onSubmit={this.submit} dispatch={this.props.dispatch} onRequestClose={this.closeNewDepartmentModal} modalStatus={this.state.addNewOrgFeaturesModal} currentUser={this.props.currentUser} />
      <EditOrgEngageCategoryPopUpForm onSubmit={this.submitUpdate} dispatch={this.props.dispatch} onRequestClose={this.closeEditSubmissionModal} modalStatus={this.state.editDepartmentModal} currentUser={this.props.currentUser}  dept={this.state.currentDept} />
        
      </div>
   );
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser, 
        categoryList:state.orgengagecategoryReducer.categoryList,
        categoryCount:state.orgengagecategoryReducer.categoryCount,
        pageCount: Math.ceil(state.orgengagecategoryReducer.categoryCount / constants.DEFAULT_LIMIT_SIZE),
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      getOrgengagecategoryList: (params) => { dispatch(getOrgengagecategoryList(params)) },
      addOrgEngageCategory: (params, callback) => {dispatch(addOrgEngageCategory(params, callback))},
      updateOrgengagCategoryDetails: ( params, callback) => {dispatch(updateOrgengagCategoryDetails( params, callback))},
      deleteOrgEngage: (orgengage) => {dispatch(deleteOrgEngage(orgengage))},

      dispatch: dispatch
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(OrgengageCategoryList);
  
