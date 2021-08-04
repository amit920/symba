import React from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
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
    Row,
    // Card,
    // CardBody,
    // CardTitle,
    Button,
   
    ModalHeader,
    ModalBody,
    ModalFooter,
    // FormGroup,
    // Input,
    // Label
  } from "reactstrap";
import { Colxx } from '../../../components/common/CustomBootstrap';
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


class EditDeptPopUpform extends React.Component {

    constructor(props) {
        super(props);
        this.state = {            
        }
    }

    componentDidMount() {
        // this.handelInitialValues();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
       console.log(nextProps.dept)
        if (!nextProps.dirty) {
            this.handelInitialValues(nextProps.dept);
        }
    }

    componentWillUnmount() {

    }


    handelInitialValues = (docObject) => {
 
        const projectInitialObj = {
            "name": docObject.department_name,
            "deptId": docObject.department_id,
            // "organization": docObject.organization_name,  
            // "orgid": docObject.organization_id
            
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
                <div style={{"width": '350px' , "height": '230px'}}>
                    <form  onSubmit={handleSubmit}>
                    <ModalHeader>
                      <h2>Edit Department Name <br/>  
                        </h2>
                </ModalHeader>
                <ModalBody>
                <div className="container-fluid">
                <Row>
                            <Colxx xxs="12" sm="12" md="12">
                            <label className='required'>Name </label>
                            <Field name="name" className="form-control" component={renderTextField} rows={8} type="text" placeholder='Enter Department Name' required='required'  />

                            </Colxx>
                           
                        </Row>
                        {/* <Row style={{marginTop:'15px'}}>
                        <Colxx sm="12" xxs="12" lg="12" xl="12" >
                      <FormGroup>
                      <Label className='required'>Organization</Label>
                     
                      <Field name="organization" className="form-control"  placeholder="Select Organization" component="select" required='required'>
                        <option value='0'>Select organization ...</option>
                        { oOptions }
              
                       </Field>
                      
                        </FormGroup>
                    </Colxx>
                        </Row> */}
                        
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
    // urls: {
    //     fields: ['doclinkdata']
    // }
};

EditDeptPopUpform = reduxForm({
    form: 'EditDeptPopUpform', // a unique identifier for this form
    validate: (values) => { return validate(values, validations) },
})(EditDeptPopUpform);

const selector = formValueSelector('EditDeptPopUpform') // <-- same as form name

const mapStateToProps = (state) => ({
    fileType: selector(state, 'Type'),
    
});

const mapDispatchToProps = (dispatch) => ({

});



export default connect(mapStateToProps,
mapDispatchToProps
)(EditDeptPopUpform);;
