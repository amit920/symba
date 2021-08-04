import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import {
    // Input, 
    Card,
    CardBody,
    CardTitle,
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
  import AddOrgPopUpform from './addOrgPopUpform';
  import EditOrgPopUpform from './editOrgPopUpform';
  import { reset } from 'redux-form'
  import { organizationList,addOrganization,updateOrganization,removeOrganizationSubmission} from '../../../action/organizations/organization';
class AddOrganizationForm extends Component {
    constructor(props) {
     super(props);
     this.state = {
        searchText: null,

        sort_dir: null,
        sort_type: null,
        addNewOrganizationModal: false,
        editOrganizationModal:false,
    };
    
    }
    componentDidMount() {   
      this.props.organizationList({
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
        this.props.organizationList({          
            limit_size: constants.DEFAULT_LIMIT_SIZE,
            limit_start: offset,
            
        })
      };
     
       closeNewOrganizationModal = () => {
        this.props.dispatch(reset('addOrgPopUpform'));
        this.setState({ addNewOrganizationModal: false })
    }
    openAddNewOrganizationSubmissionModal = () => {
        this.setState({ addNewOrganizationModal: true })
    }
    closeEditSubmissionModal = () => {
        this.props.dispatch(reset('editOrgPopUpform'));
        this.setState({ editOrganizationModal: false })
    }
    openEditSubmissionModal = () => {
        this.setState({ editOverviewResourcesModal: true })
    }
    handleEditOrganization = (orgObj) => {
        this.setState({ editOrganizationModal: true, currentOrg: orgObj })
    }
    handleRemoveOrganizationSubmission = (org) => {
        this.props.removeOrganizationSubmission(org);
    }
    submit = values => {
        
      values.createby = this.props.currentUser.UserId
      this.props.addOrganization(  values,this.closeNewOrganizationModal);  
      }
      submitUpdate = values => {
        values.createby = this.props.currentUser.UserId

        if(values.filelinkdata === undefined)
        {
          values.Type='';
        }
        else{
          values.Type='File';
        }
       
        this.props.updateOrganization( values, this.closeEditSubmissionModal);
    }
    createFeedbackList = () => {
      let table = []   
     if (this.props.feedbackList) {
          if (this.props.feedbackCount > 0) {
            let Title = []
              for (let i = 0; i < this.props.feedbackCount; i++) {  
                  Title.push(<Colxx xxs="12" md="10" sm="10" lg="8" xl="8">{              
                    <div>              
                    <Card >
                           <CardBody>
                             <CardTitle style={{marginBottom:"1rem"}}>
                               <span style={{fontWeight:'bold',fontSize:'15px'}}>{this.props.feedbackList[i].ManagerName+": "} </span>
                               <label style={{fontSize:'13px'}}> {new Intl.DateTimeFormat('us-GB', { 
                                        month: 'long', 
                                        day: '2-digit',
                                        year: 'numeric', 
                                    }).format(new Date(this.props.feedbackList[i].Datesubmitted))}</label>
                                
    
                               </CardTitle>
                               
                               <span style={{fontWeight:'bold',fontSize:'18px'}}>Project: {this.props.feedbackList[i].Project}</span><br></br>
                               <span style={{fontSize:'15px'}}>  {this.props.feedbackList[i].Feedbackq1response}</span>
                           </CardBody>                          
                         </Card><br></br>                        
                         </div>
                  }</Colxx>)
                  
     
              }
             
              table.push(<Row>{Title}</Row>)
          }
         
      }
      return table
    }
  render() {
    
    return (
      <div>
      <Fragment>
        <Row>
          <Colxx xxs="12">
             <h1 style={{textAlign:'center',fontWeight:'bold'}}>Organization</h1>
            <Separator className="mb-5" />
            
          </Colxx>
        </Row>
        <Row>
        <Colxx sm="12" xxs="12" lg="12" xl="12">
        <Button style={{float:"right"}}
          onClick={this.openAddNewOrganizationSubmissionModal}
          color="info" outline className="mb-2"                             
            >
             Add New
          </Button>
        </Colxx>
        </Row>
       <Row>
       <Colxx sm="12" xxs="12" lg="12" xl="12">
                    <Table style={{width:'100%',marginTop:30}}>
                            <thead>
                                <tr>
                                    <th >Name<br/> <span>(Click to Edit)</span></th>
                                    <th>Org Community Quote</th>
                                    <th>Date Added</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.orgList.length > 0 ? this.props.orgList.map((org) => {
                                    return (
                                        <tr >
                                            <td data-title="Org Name">
                                            <Link
                                                 onClick={() => this.handleEditOrganization(org)}
                                                 className='edit-record-link'
                                                >
                                                    {org.org_name}
                                                </Link>
                                               
                                            </td>
                                            <td style={{maxWidth: '620px',whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}} data-title="orgcommunityquote">{org.orgcommunityquote}</td>
                                            <td data-title="Added Date">{formatDateTime(org.Date_Added)}</td>
                                                                                                                                   
                                        </tr>
                                    )
                                }) : <tr className='no-record-found'><td>No Record Found</td></tr>}
                            </tbody>
                       
                        </Table>
                        {this.props.orgCount >= constants.DEFAULT_LIMIT_SIZE &&                        
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPage={this.props.pageCount}
                            onChangePage={i => this.handlePageClick(i)}
                          />
                        }
                    </Colxx>
                  
       
       </Row><br></br>
      
      
      
      </Fragment>
      <AddOrgPopUpform onSubmit={this.submit} dispatch={this.props.dispatch} onRequestClose={this.closeNewOrganizationModal} modalStatus={this.state.addNewOrganizationModal} currentUser={this.props.currentUser}  />
      <EditOrgPopUpform onSubmit={this.submitUpdate} dispatch={this.props.dispatch} onRequestClose={this.closeEditSubmissionModal} modalStatus={this.state.editOrganizationModal} currentUser={this.props.currentUser}  org={this.state.currentOrg} />
            
      </div>

   );
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        orgList: state.organizationReducer.orgList,
        orgCount: state.organizationReducer.orgCount,
        pageCount: Math.ceil(state.organizationReducer.orgCount / constants.DEFAULT_LIMIT_SIZE),
    };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      organizationList: (params) => { dispatch(organizationList(params)) },
      addOrganization: (params, callback) => {dispatch(addOrganization(params, callback))},
      updateOrganization: ( params, callback) => {dispatch(updateOrganization( params, callback))},
      removeOrganizationSubmission: (org) => {dispatch(removeOrganizationSubmission(org))},

      dispatch: dispatch
    };
  }
  export default connect(mapStateToProps, mapDispatchToProps)(AddOrganizationForm);
  
