import React from "react";
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import { Component } from "react";
import { deleteUser, editUser } from '../actions/home'
import { toast } from 'material-react-toastify';
import { TextField } from "@material-ui/core";
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIconfrom from '@material-ui/icons/Edit';

export default class Datatable extends Component {
  constructor(props){
    super(props);
    this.state = {
      limit: 100,
      prev: 1,
      isModalOpen: false,
      id: 1,
      imageUrl: '',
      givenName: '123',
      familyName: '',
      email: '',
      googleId: '',
      loggedIn: 0,
      datas: () =>{
        var tableData = [];
        this.props.allUsersList.forEach((obj) =>{
          tableData.push([
            obj.id,
            // eslint-disable-next-line no-loop-func
            () => { return <img height="50px" width="50px" className="profileImg" alt="profileImage" src={obj.imageurl} /> },
            obj.givenname,
            obj.familyname,
            obj.email,
            obj.googleid,
            () => {
              let d = new Date(parseInt(obj.loggedin)),
              month = '' + (d.getMonth() + 1),day = '' + d.getDate(),year = d.getFullYear(),
              hrs = d.getHours(), min = d.getMinutes(), sec = d.getSeconds();
              if (month.length < 2) month = '0' + month;
              if (day.length < 2) day = '0' + day;
              return day+'-'+month+'-'+year+' ('+hrs+':'+min+':'+sec+')';
            }
          ]);
        })
        return tableData;
      },
      columns: ["Id", "Image", "First Name", "Last Name", "Email", "google Id", "Logged In",
        {
          name: "Edit",
          options: {
            filter: true,
            sort: false,
            empty: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <Button
                  variant="outlined" 
                  size="small" 
                  color="primary"
                  className="cursor-pointer" 
                  startIcon={<EditIconfrom />}
                  onClick={async () => {
                    await this.setState({ isModalOpen: true});
                    await this.editUserInfo(tableMeta);
                    // window.alert(`Clicked "Edit" for row ${tableMeta.rowIndex}`)}
                  }}
                >Edit</Button>
              );
            }
          }
        },
        {
            name: "Delete",
            options: {
              filter: true,
              sort: false,
              empty: true,
              customBodyRender: (value, tableMeta, updateValue) => {
                return (
                  <Button
                  variant="outlined"
                  color="secondary"
                  size="small" 
                  className="cursor-pointer"
                  startIcon={<DeleteIcon />}
                  onClick={async() => {
                    const profile = JSON.parse(localStorage.getItem('profileObj')) || {};
                    if (tableMeta.rowData[4] === profile.email) {
                      toast.warning( "You can not delete your own account!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                      });
                      return;
                    }
                    const result = window.confirm('Are you sure you want to delete this record?');
                    if(result) await this.props.dispatch(deleteUser(tableMeta.rowData[0]));
                  }} 
                >Delete</Button>
                );
              }
            }
        },
      ],
      options: {
        filter: true,
        filterType: "dropdown",
        responsive: "vertical",
        tableBodyHeight: "100%",
        onChangePage: (currentPage) => {
          const { prev, limit } = this.state;
          // every change page it will check the page that should be make a new request or not
          if(currentPage > prev) {
            this.setState({prev: prev+1})
            this.onNextPage(limit, currentPage*limit);
          }
        },
      }
    }
  };
  
  componentDidUpdate(){
    console.log('updated...................', this.props.isEdited)
    if(this.props.isEdited) this.setState({ isModalOpen: false })
  }
  async onNextPage(limit, start){
    // await this.props.dispatch(getAllUsers(limit, start));
    // this.setState({
    //   datas:() =>  {return this.props.allUsersList}
    // });
  }

  async editUserInfo(payload){
    console.log("uuuuuuuuuser", payload);
    this.setState({
      id: payload.rowData[0],
      imageUrl: payload.rowData[1](),
      givenName: payload.rowData[2],
      familyName: payload.rowData[3],
      email: payload.rowData[4],
      googleId: payload.rowData[5],
      loggedIn: payload.rowData[6]()
    })
      console.log('submiteditInfo',  payload.rowData[3])
    }
    onChangeEdit(e){
      console.log(e.target.id, e.target.value)
      this.setState({[e.target.id]: e.target.value})
    }
    handleClose(){
      this.setState({ isModalOpen: false});
    };
  async submiteditInfo(){
    const creds = {
      id: this.state.id,
      // imageUrl: this.refs.imageUrl.src,
      givenName: this.state.givenName,
      familyName: this.state.familyName,
      // this.refs.email.value,
      // this.refs.googleId.value,
      // this.refs.loggedIn.value,
    }
    console.log('submiteditInfo', creds)
    await this.props.dispatch(editUser(creds));
  }
  render(){
    return (
      <React.Fragment>
        <Modal
          open={this.state.isModalOpen}
          onClose={this.handleClose.bind(this)}
        >
          <div className="modal-container">
            <label className="backdrop"></label>
            <div className="modal">
              {this.state.imageUrl}
              <div className="w-full">
                <TextField id="id" ref='id' value={this.state.id} onChange={this.onChangeEdit.bind(this)} className="form-control disabled" variant="outlined"  label="Id" disabled/>
                <TextField id="givenName" ref='givenName' value={this.state.givenName} onChange={this.onChangeEdit.bind(this)} className="form-control" variant="outlined" label="First Name" />
                <TextField id="familyName" ref='familyName' value={this.state.familyName} onChange={this.onChangeEdit.bind(this)} className="form-control" variant="outlined" label="Family Name" />
                <TextField id="email" ref='email' value={this.state.email} onChange={this.onChangeEdit.bind(this)} className="form-control disabled" variant="outlined" label="Email" disabled />
                <TextField id="googleId" ref='googleId' value={this.state.googleId} onChange={this.onChangeEdit.bind(this)} className="form-control disabled" variant="outlined" label="Google Id" disabled />
                <TextField id="loggedIn" ref='loggedIn' value={this.state.loggedIn} onChange={this.onChangeEdit.bind(this)} className="form-control disabled" variant="outlined" label="Logged In" disabled />
                <div className="">
                  <Button variant="contained" size="small" color="primary" onClick={() => this.submiteditInfo()} className="btn margintop15">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <MUIDataTable
          title={"Users List"}
          rows={100}
          data={this.state.datas()}
          columns={this.state.columns}
          options={this.state.options}
        />
      </React.Fragment>
    );
  }
}

Datatable.propTypes = {
    dispatch: PropTypes.func.isRequired,
    allUsersList: PropTypes.array,
    isEdited: PropTypes.bool,
};

// CREATE TABLE users (id serial PRIMARY KEY, imageUrl VARCHAR ( 500 ), email VARCHAR ( 255 ), givenName VARCHAR ( 50 ), familyName VARCHAR ( 50 ), googleId VARCHAR ( 50 ), loggedIn decimal);
// INSERT INTO users (imageUrl, givenName, familyName, email, googleId, loggedIn) VALUES ('https://www.dgvaishnavcollege.edu.in/dgvaishnav-c/uploads/2021/01/dummy-profile-pic.jpg', 'Maharaja', 'Pandian', 'maha@gmail.com', '101050420005704412755', 1623526984893);