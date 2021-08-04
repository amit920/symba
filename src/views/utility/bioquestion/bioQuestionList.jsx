import React, { Component, Fragment } from "react";
// import { injectIntl } from "react-intl";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import { Button,Table } from "reactstrap";
// import { NavLink } from "react-router-dom";
// import IntlMessages from "../../../helpers/IntlMessages";
import { connect } from 'react-redux';
import * as constants from '../../../utils/constants';
import { Link} from "react-router-dom"
import Pagination from "../../../containers/pages/Pagination";

import { formatDateTime } from '../../../utils/globalFunctions';
import AddBioQuestionPopUpForm from './addBioQuestionPopUpForm';
import EditBioQuestionPopUpForm from './editBioQuestionPopUpForm';
import { reset } from 'redux-form'
import {getBioQuestionList, addBioQuestion, updateBioQuestionDetails, deleteBioQuestion} from '../../../action/bioquestion/bioquestion';

  class AddBioQuestionForm extends Component {
    constructor(props) {
     super(props);
     this.state = {       
        addNewBioQuestionModal: false,
        editBioQuestionModal:false,
      };  
    }

    componentDidMount() {   
      this.props.getBioQuestionList({
        limit_size: constants.DEFAULT_LIMIT_SIZE,
        limit_start: 0,
      })
    }

    handlePageClick = (data) => {
      this.setState({currentPage: data})
      let selected = data-1;
      // alert(data)
      let offset = Math.ceil(selected * constants.DEFAULT_LIMIT_SIZE);
      this.props.getBioQuestionList({          
          limit_size: constants.DEFAULT_LIMIT_SIZE,
          limit_start: offset,
          
      })
    };

    
    closeNewBioQuestionModal = () => {
        this.props.dispatch(reset('AddBioQuestionPopUpForm'));
        this.setState({ addNewBioQuestionModal: false })
    }

    openAddNewBioQuestionSubmissionModal = () => {
        this.setState({ addNewBioQuestionModal: true })
    }

    closeEditSubmissionModal = () => {
        this.props.dispatch(reset('editBioQuestionPopUpForm'));
        this.setState({ editBioQuestionModal: false })
    }
    
    handleEditBioQuestion = (bioObj) => {
        this.setState({ editBioQuestionModal: true, currentBioQ: bioObj })
    }
    
    handleRemoveBioQuestion = (bioQ) => {
        this.props.deleteBioQuestion(bioQ);
    }
    
    submit = values => {        
      values.createby = this.props.currentUser.UserId
      this.props.addBioQuestion(  values,this.closeNewBioQuestionModal);  
    }
    
    submitUpdate = values => {
        values.createby = this.props.currentUser.UserId      
        // alert(values.deptId)
        this.props.updateBioQuestionDetails( values, this.closeEditSubmissionModal);
    }
    
  
  render() {  
    return (
      <div>
      <Fragment>
        <Row>
          <Colxx xxs="12">
             <h1 style={{textAlign:'center',fontWeight:'bold'}}>Bio Question</h1>
            <Separator className="mb-5" />            
          </Colxx>
        </Row>

        <Row>
          <Colxx sm="12" xxs="12" lg="12" xl="12">
            <Button style={{float:"right"}}
              onClick={this.openAddNewBioQuestionSubmissionModal}
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
                          <th>Question Text<br/> <span>(Click to Edit)</span></th>
                          <th>Date Added</th>                                    
                          <th>Org Name</th>
                          <th>Delete</th>                                    
                    </tr>
                </thead>
              
                  <tbody>
                      {this.props.bioquestionList.length > 0 ? this.props.bioquestionList.map((bioq) => {
                          return (
                              <tr >
                                  <td style={{width:'43%', whiteSpace: 'nowrap',overflow: 'hidden',textOverflow: 'ellipsis'}} data-title="Org Name"
                                    title={bioq.Questiontext}>                                
                                    <Link
                                        onClick={() => this.handleEditBioQuestion(bioq)}
                                        className='edit-record-link'
                                    >
                                        {bioq.Questiontext}
                                    </Link>                                               
                                  </td>

                                    <td data-title="Added Date">{formatDateTime(bioq.Createdon)}</td>
                                    <td data-title="Org Name">{bioq.OrgName}</td>
                                    <td data-title="Delete"><Link className='remove-record' onClick={() => { if (window.confirm('Are you sure you want to delete this Bio-Question?')) { this.handleRemoveBioQuestion(bioq) }; }}> Delete </Link></td>
                                            
                              </tr>
                          )
                        }) : <tr className='no-record-found'><td>No Record Found</td></tr>}
                  </tbody>
                       
                </Table>                     
      
                        {this.props.bioquestionCount >= constants.DEFAULT_LIMIT_SIZE &&                        
                        <Pagination
                            currentPage={this.state.currentPage}
                            totalPage={this.props.pageCount}
                            onChangePage={i => this.handlePageClick(i)}
                          />
                        }
            </Colxx>                
        </Row><br></br>      
      </Fragment>

      <AddBioQuestionPopUpForm onSubmit={this.submit} dispatch={this.props.dispatch} onRequestClose={this.closeNewBioQuestionModal} modalStatus={this.state.addNewBioQuestionModal} currentUser={this.props.currentUser} />
      <EditBioQuestionPopUpForm onSubmit={this.submitUpdate} dispatch={this.props.dispatch} onRequestClose={this.closeEditSubmissionModal} modalStatus={this.state.editBioQuestionModal} currentUser={this.props.currentUser}  bioq={this.state.currentBioQ} />
            
      </div>
   );
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.userReducer.currentUser,
        bioquestionList: state.bioquestionReducer.bioquestionList,
        bioquestionCount: state.bioquestionReducer.bioquestionCount,  
        pageCount: Math.ceil(state.bioquestionReducer.bioquestionCount / constants.DEFAULT_LIMIT_SIZE),
    };
  }
  
const mapDispatchToProps = (dispatch) => {
    return {
        getBioQuestionList: (params) => { dispatch(getBioQuestionList(params)) },
        addBioQuestion: (params, callback) => {dispatch(addBioQuestion(params, callback))},
        updateBioQuestionDetails: ( params, callback) => {dispatch(updateBioQuestionDetails( params, callback))},
        deleteBioQuestion: (bioQ) => {dispatch(deleteBioQuestion(bioQ))},

      dispatch: dispatch
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(AddBioQuestionForm);
  
