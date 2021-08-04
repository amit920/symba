import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { renderTextField, validate, renderDateFieldutility } from '../../util/form-fields';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Row, Button, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {getorganizationList_for_Orgddl} from '../../../action/organizations/organization';
import {getDepartments} from '../../../action/master/masterData';
import "react-datepicker/dist/react-datepicker.css";
/* eslint-disable */

class addUsersPopUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount() {
        this.props.getorganizationList_for_Orgddl({})
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //this.handelInitialValues();
    }

    componentWillUnmount() {}

    loadDepartment = (value) => {
        //console.log(Object.keys(value))
        //console.log(value)
        this.props.getDepartments(value.target.value)
    }

    render() {
        const { handleSubmit } = this.props
        let oOptions = [];
        if( this.props.organizationList ) {
            this.props.organizationList.map((c) => {
                oOptions.push( <option key= {c.org_id} value={c.org_id} >{c.org_name}</option> );
            });
        }
        

        let dept = [];
        if( this.props.departmentList ) {
            this.props.departmentList.map((c) => {
                dept.push( <option key= {c.departmentID} value={c.departmentID} >{c.departmentDesc}</option> );
            });
        }

        return (
            <Modal  open={this.props.modalStatus} onClose={this.props.onRequestClose} center >
                <div style={{width:'780px', height:'720px'}}>
                    <form  onSubmit={handleSubmit}>
                        <ModalHeader style={{width:'97%'}}>
                        <h2>Add New User <br/>  
                            </h2>
                        </ModalHeader>

                        <ModalBody>
                            <div className="container-fluid">
                                <Row style={{width:'50%', display:'inline-block'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <Label className='required'>Organization</Label>                            
                                                <Field name="organization" 
                                                className="form-control"  
                                                onChange={this.loadDepartment}
                                                value={this.state.value} 
                                                placeholder="Select Organization"                                                
                                                component="select" required='required'>
                                                <option value='0'>Select Organization ...</option>
                                                { oOptions }
                                                
                                                </Field>                            
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row style={{width:'50%', display:'inline-block', float:'right'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <Label className='required'>Department</Label>                            
                                                <Field name="department" 
                                                className="form-control"  
                                                placeholder="Select Department" 
                                                component="select" required='required'>
                                                <option value='0'>Select Department ...</option>
                                                { dept }
                                                </Field>                            
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row style={{width:'50%', display:'inline-block'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label className='required'>First Name </label>
                                            <Field name="firstname" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter First Name' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>        

                                <Row style={{width:'50%', display:'inline-block', float:'right'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label className='required'>Last Name </label>
                                            <Field name="lastname" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter Last Name' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row style={{width:'50%', display:'inline-block'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label className='required'>Email </label>
                                            <Field name="email" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter Email' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row style={{width:'50%', display:'inline-block', float:'right'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label className='required'>UserType </label>
                                            <Field name="usertypeid" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter UserType ID' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row style={{width:'50%', display:'inline-block'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>                   
                                            <label>Start Date </label>
                                            <Field
                                                name="startdate"
                                                className="form-control"
                                                component={renderDateFieldutility}
                                                type="text" placeholder="Enter start date"
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row style={{width:'50%', display:'inline-block', float:'right'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>                    
                                            <label>End Date </label>
                                            <Field
                                                name="enddate"
                                                className="input-text"
                                                component={renderDateFieldutility}
                                                type="text"
                                                placeholder="Enter end date"
                                            />
                                        </FormGroup>
                                    </Colxx>
                                </Row>

                                <Row style={{width:'50%', display:'inline-block'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label>School Name </label>
                                            <Field name="schoolname" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter School Name' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>
                        
                                <Row style={{width:'50%', display:'inline-block', float:'right'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label>City </label>
                                            <Field name="city" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter City' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>                                        

                                <Row style={{width:'50%', display:'inline-block'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label>Usertitle </label>
                                            <Field name="usertitle" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter User Title' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>                
                            
                            </div>        
                        </ModalBody>  

                        <ModalFooter style={{width:'97%'}} >
                            <Button color="primary" type="submit">
                                Submit
                            </Button>
                        </ModalFooter>    

                    </form>
                </div>
            </Modal>
        )
    }
}

const validations = {
    required: {
        fields: []
    },
};

addUsersPopUpForm = reduxForm({
    form: 'addUsersPopUpForm', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(addUsersPopUpForm);

const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser,
    organizationList: state.organizationReducer.organizationList,
    departmentList: state.masterReducer.departmentList,

});

const mapDispatchToProps = (dispatch) => ({
    getorganizationList_for_Orgddl: (params) => { dispatch(getorganizationList_for_Orgddl(params)) },
    getDepartments: (organization) => { dispatch(getDepartments(organization)) },
});

export default connect( mapStateToProps, mapDispatchToProps)(addUsersPopUpForm);;
