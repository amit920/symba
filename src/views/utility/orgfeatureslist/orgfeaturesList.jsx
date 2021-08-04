import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Button,Table } from "reactstrap";
import { connect } from 'react-redux';
import * as constants from '../../../utils/constants';
import { Link } from "react-router-dom"
import Pagination from "../../../containers/pages/Pagination";
import { formatDateTime } from '../../../utils/globalFunctions';
import AddOrgFeaturesPopUpForm from './addOrgFeaturesPopUpForm';
import EditOrgFeaturesPopUpForm from './editOrgFeaturesPopUpForm';
import { reset } from 'redux-form'
import { getOrgFeaturesList, addOrgFeatures, updateOrgFeaturesDetails, 
         deleteOrgFeatures} from '../../../action/features/features';
  

class OrgfeaturesList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        searchText: null,
        sort_dir: null,
        sort_type: null,
        addNewOrgFeaturesModal: false,
        editOrgFeaturesModal:false,
      };    
    }


    componentDidMount() {   
      this.props.getOrgFeaturesList({
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
      this.props.getOrgFeaturesList({          
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: offset,
          
      })
    };


    closeNewOrgFeaturesModal = () => {
        this.props.dispatch(reset('AddOrgFeaturesPopUpForm'));
        this.setState({ addNewOrgFeaturesModal: false })
    }

    openAddNewOrgFeaturesSubmissionModal = () => {
        this.setState({ addNewOrgFeaturesModal: true })
    }

    closeEditSubmissionModal = () => {
        this.props.dispatch(reset('editOrgFeaturesPopUpForm'));
        this.setState({ editOrgFeaturesModal: false })
    }
    
    handleEditOrgfeatures = (featuresObj) => {
        this.setState({ editOrgFeaturesModal: true, currentFeatures: featuresObj })
    }
    
    handleRemoveOrgFeatures = (features) => {
        this.props.deleteOrgFeatures(features);
    }
    
    submit = values => {        
      values.createby = this.props.currentUser.UserId
      // values.org=this.props.match.params.org
      this.props.addOrgFeatures(  values,this.closeNewOrgFeaturesModal);  
    }
    
    submitUpdate = values => {
        values.createby = this.props.currentUser.UserId      
        // alert(values.deptId)
        this.props.updateOrgFeaturesDetails( values, this.closeEditSubmissionModal);
    }
    
  render() {    
    return (
      <div>
      <Fragment>
        <Row>
          <Colxx xxs="12">
             <h1 style={{textAlign:'center',fontWeight:'bold'}}>Org Features List</h1>
            <Separator className="mb-5" />            
          </Colxx>
        </Row>

        <Row>
          <Colxx sm="12" xxs="12" lg="12" xl="12">
            <Button style={{float:"right"}}
              onClick={this.openAddNewOrgFeaturesSubmissionModal}
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
                            <th>CommunityFeatures<br/> <span>(Click to Edit)</span></th>
                            <th>EngageFeatures</th>
                            <th>FeedbackFeatures</th>
                            <th>LaunchpadFeatures</th>
                            <th>ProjectsFeatures</th>
                            <th>CreatedOn</th>                                    
                            <th>Org Name</th>
                            <th>Delete</th>                                    
                        </tr>
                    </thead>
                          
                        <tbody>
                            {this.props.featuresList.length > 0 ? this.props.featuresList.map((org) => {
                              return (
                                    <tr >
                                        <td data-title="Org Name">
                                        <Link
                                              onClick={() => this.handleEditOrgfeatures(org)}
                                              className='edit-record-link'
                                            >
                                                {org.CommunityFeatures}
                                            </Link>                                               
                                        </td>
                                        <td data-title="Org Name">{org.EngageFeatures}</td>
                                        <td data-title="Org Name">{org.feedbackFeatures}</td>
                                        <td data-title="Org Name">{org.launchpadFeatures}</td>
                                        <td data-title="Org Name">{org.projectsFeatures}</td>
                                        <td data-title="Added Date">{formatDateTime(org.Createdon)}</td>
                                        <td data-title="Org Name">{org.OrgName}</td>
                                        <td data-title="Delete"><Link className='remove-record' onClick={() => { if (window.confirm('Are you sure you want to delete this orgFeatures?')) { this.handleRemoveOrgFeatures(org) }; }}> Delete </Link></td>
                                        
                                    </tr>
                                    )
                                }) : <tr className='no-record-found'><td>No Record Found</td></tr>}
                            </tbody>
                       
                        </Table>  
                        {this.props.featuresCount >= constants.DEFAULT_LIMIT_SIZE &&                        
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPage={this.props.pageCount}
                            onChangePage={i => this.handlePageClick(i)}
                          />
                        }                   
                    </Colxx>                
       </Row><br></br>      
      </Fragment>

      <AddOrgFeaturesPopUpForm onSubmit={this.submit} dispatch={this.props.dispatch} onRequestClose={this.closeNewOrgFeaturesModal} modalStatus={this.state.addNewOrgFeaturesModal} currentUser={this.props.currentUser} />
      <EditOrgFeaturesPopUpForm onSubmit={this.submitUpdate} dispatch={this.props.dispatch} onRequestClose={this.closeEditSubmissionModal} modalStatus={this.state.editOrgFeaturesModal} currentUser={this.props.currentUser}  features={this.state.currentFeatures} />
            
      </div>
   );
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser, 
        featuresList:state.orgfeatureslistReducer.featuresList,
        featuresCount:state.orgfeatureslistReducer.featuresCount,
        pageCount: Math.ceil(state.orgfeatureslistReducer.featuresCount / constants.DEFAULT_LIMIT_SIZE),
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
      getOrgFeaturesList: (params) => { dispatch(getOrgFeaturesList(params)) },
      addOrgFeatures: (params, callback) => {dispatch(addOrgFeatures(params, callback))},
      updateOrgFeaturesDetails: ( params, callback) => {dispatch(updateOrgFeaturesDetails( params, callback))},
      deleteOrgFeatures: (features) => {dispatch(deleteOrgFeatures(features))},

      dispatch: dispatch
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(OrgfeaturesList);
  
