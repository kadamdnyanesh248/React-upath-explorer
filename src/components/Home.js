import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Datatable from './DataTable'
import {getAllUsers} from '../actions/home'
import { ToastContainer, toast} from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit: 100,
            start: 1
        }
    }
    componentDidMount(){
        this.props.dispatch(getAllUsers(this.state.limit, this.state.start));
        if(this.props.user && this.props.user.msg){
            toast.success( this.props.user.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    }
    render() {        
        const {dispatch, allUsersList, user} = this.props;
        console.log('======>', user);
    //     const asd = [
    //     { email: "danny.k@borngroup.com",
    //       familyname: "K",
    //       fullname: "Dnyaneshwar K",
    //       givenname: "Dnyaneshwar",
    //       googleid: "106453325228396744013",
    //       id: 1,
    //       imageurl: "https://lh3.googleusercontent.com/a/AATXAJw0ySdgP7bhtuRAB5Dq5YNT5wfrbLiHo14dTajD=s96-c",
    //       loggedin: "1623386948005"},
    //     {
    //       email: "kadamdnyanesh248@gmail.com",
    //       familyname: "Kadam",
    //       fullname: "Dnyaneshwar Kadam",
    //       givenname: "Dnyaneshwar",
    //       googleid: "101050420005704412755",
    //       id: 2,
    //       imageurl: "https://lh3.googleusercontent.com/a-/AOh14GiZHASNlys4af1sHjUxLmGWHzNgxR91UoWw1p0nzA=s96-c",
    //       loggedin: "1623392189139"
    //     }
    //   ]
        return (
            <div className="">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    />
                  <div className="abc">
                    <Datatable 
                        allUsersList={allUsersList}
                        dispatch={dispatch}
                    />
                </div>
            </div>
        )
    }
};

Home.propTypes = {
    dispatch: PropTypes.func.isRequired,
    allUsersList: PropTypes.array,
    user: PropTypes.object
};

function mapStateToProps(state) {
    const {user} = state.auth;
    const {allUsersList} = state.allUsers;
    return {
      allUsersList,
      user
  }
}

export default connect(mapStateToProps)(Home)