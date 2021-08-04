import React from 'react'
import { Field, reduxForm } from 'redux-form'
// import Select from 'react-select';
import { connect } from 'react-redux';
import { renderTextField, validate } from '../../util/form-fields';
// import * as constants from '../../../utils/constants';
// import axios from 'axios';
// import { getAPIURL } from '../../../utils/getApiUrl';
// import { setAuthToken } from '../../../utils/setAuthToken';
// import { getBase64 } from '../../../utils/globalFunctions';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {
    // Row,
    // Card,
    // CardBody,
    // CardTitle,
    Button,   
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    // Input,
    Label
  } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
import { getDepartmentDetails,clearDepartmentDetails} from '../../../action/department/department';
import {getorganizationList_for_Orgddl} from '../../../action/organizations/organization';
/* eslint-disable */

// const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

// const FileInput = ({
//     input: { value: omitValue, onChange, onBlur, ...inputProps },
//     meta: omitMeta,
//     ...props
// }) => {
//     return (

//         <input
//             onChange={adaptFileEventToValue(onChange)}
//             onBlur={adaptFileEventToValue(onBlur)}
//             type="file"
//             {...props.input}
//             {...props}
//         />
//     );
// };


class addDeptPopUpform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        }
    }

    componentDidMount() {
        this.handelInitialValues();
        this.props.getorganizationList_for_Orgddl({})
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        //this.handelInitialValues();
    }

    componentWillUnmount() {
    }

    handelInitialValues = () => {
        const projectInitialObj = {           
            "name": '',
        }
        this.props.initialize(projectInitialObj)
    }

    handleSelectChange = (value) => {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    }

    render() {
        const { handleSubmit } = this.props
        let oOptions = [];
        if( this.props.organizationList ) {
            this.props.organizationList.map((c) => {
                oOptions.push( <option key= {c.org_id} value={c.org_id} >{c.org_name}</option> );
            });
        }
        return (
            <Modal  open={this.props.modalStatus} onClose={this.props.onRequestClose} center >
                <div style={{"width": '400px' , "height": '350px'}}>
                    <form  onSubmit={handleSubmit}>
                    <ModalHeader>
                      <h2>Add New Department <br/>  
                        </h2>
                </ModalHeader>
                <ModalBody>
                <div className="container-fluid">
                <Colxx xxs="12" sm="12" md="12">
                      <FormGroup>
                            <label className='required'>Name </label>
                            <Field name="name" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter Department Name' required='required'  />
                            </FormGroup>
                            </Colxx>
                           
                       


                        {/* <Row>
                            <Colxx xxs="12" sm="12" md="12">
                            <label className='required'>Organization </label>
                            <Field name="org" disabled={!(this.state.isEditMode || this.state.isNewForm)} className="form-control"  placeholder="Select Organization" component="select">
                                <option >Select Organization</option>
                                            {this.props.organizationList.map((e, key) => {
                                            return <option  key={key} value={e.org_id}>{e.org_name}</option>;
                                        })}
                                    </Field>
                                
                            </Colxx>
                           
                        </Row> */}
  
                            <Colxx xxs="12" sm="12" md="12">
                      <FormGroup>
                      <Label className='required'>Organization</Label>
                     
                      <Field name="organization" className="form-control"  placeholder="Select Organization" component="select" required='required'>
                        <option value='0'>Select Organization ...</option>
                        { oOptions }
              
                       </Field>
                      
                        </FormGroup>
                    </Colxx>
                        
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

addDeptPopUpform = reduxForm({
    form: 'addDeptPopUpform', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(addDeptPopUpform);

// const selector = formValueSelector('addDeptPopUpform') // <-- same as form name

const mapStateToProps = (state) => ({
    departmentDetail: state.departmentReducer.departmentDetail,
    currentUser: state.userReducer.currentUser,
    organizationList: state.organizationReducer.organizationList,
});

const mapDispatchToProps = (dispatch) => ({
    getDepartmentDetails: (departmentId) => { dispatch(getDepartmentDetails(departmentId)) },
    clearDepartmentDetails: () => { dispatch(clearDepartmentDetails()) },
    getorganizationList_for_Orgddl: (params) => { dispatch(getorganizationList_for_Orgddl(params)) },
});



export default connect( mapStateToProps, mapDispatchToProps)(addDeptPopUpform);;
