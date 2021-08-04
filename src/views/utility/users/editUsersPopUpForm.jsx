import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import { renderTextField, renderDateField, validate } from '../../util/form-fields';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { Row, Button, ModalHeader, ModalBody, ModalFooter, FormGroup, Label } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {getDepartments} from '../../../action/master/masterData';
//import {getDepartments} from '../../../action/master/masterData';
/* eslint-disable */

class EditUsersPopUpForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
        }
    }

    componentDidMount() {

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.user === undefined)
        {
            return true
        }
    //    console.log(nextProps.bioq)
        if (!nextProps.dirty) {
            this.handelInitialValues(nextProps.user);
            // this.props.getorganizationList_for_Orgddl({})

        }

    }

    componentWillUnmount() {}

    handelInitialValues = (userObject) => {
        const userInitialObj = {
            "firstname": userObject.Firstname,
            "UserId": userObject.UserId,
            "lastname": userObject.Lastname,
            "email": userObject.Email,
            "usertypeid": userObject.Usertypeid,
            "startdate": userObject.Startdate,
            "enddate": userObject.Enddate,
            "usertitle": userObject.Usertitle,
            "city": userObject.City,
            "schoolname": userObject.Schoolname,
            "department": userObject.DepartmentID,  
            // "orgid": bioObject.organization_id
            
        }
        this.props.initialize(userInitialObj)
        this.props.getDepartments(userObject.organization.id)   
    }
    handleSelectChange = (value) => {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }

    
    render() {
        const {handleSubmit } = this.props
        let dept = [];
        if( this.props.departmentList ) {
            this.props.departmentList.map((c) => {
                dept.push( <option key= {c.departmentID} value={c.departmentID} >{c.departmentDesc}</option> );
            });
        }
        return (
            <Modal  open={this.props.modalStatus} onClose={this.props.onRequestClose} center >
                <div style={{width:'780px', height:'600px'}}>
                    <form  onSubmit={handleSubmit}>
                        <ModalHeader>
                            <h2>Edit User Details <br/>  
                            </h2>
                        </ModalHeader>
                    
                        <ModalBody>
                            <div className="container-fluid">
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
                                            <Field name="startdate"
                                                className="form-control"
                                                component={renderDateField}
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
                                                component={renderDateField}
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
                                <Row style={{width:'50%', display:'inline-block'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label>Usertitle </label>
                                            <Field name="usertitle" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter User Title' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row> 
                                <Row style={{width:'50%', display:'inline-block', float:'right', marginTop:'-90px'}} >
                                    <Colxx xxs="12" sm="12" md="12">
                                        <FormGroup>
                                            <label>City </label>
                                            <Field name="city" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter City' required='required'  />
                                        </FormGroup>
                                    </Colxx>
                                </Row>                                        
                                <Row style={{width:'50%', float:'right', display:'inline-block'}} >
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
                             </div>
    
                        </ModalBody>

                        <ModalFooter>
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
        fields: ['name']
    },
};

EditUsersPopUpForm = reduxForm({
    form: 'EditUsersPopUpForm', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(EditUsersPopUpForm);


const mapStateToProps = (state) => ({
     organizationList: state.organizationReducer.organizationList,
     departmentList: state.masterReducer.departmentList,

});

const mapDispatchToProps = (dispatch) => ({
    // getorganizationList_for_Orgddl: (params) => { dispatch(getorganizationList_for_Orgddl(params)) },
    getDepartments: (organization) => { dispatch(getDepartments(organization)) },

});

export default connect(mapStateToProps, mapDispatchToProps)(EditUsersPopUpForm);
