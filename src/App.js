import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    }
  }
  // Getting mongodb database from the server
  componentDidMount() {
    const url = "http://snappyserver-env.bvs7eikvs5.us-east-2.elasticbeanstalk.com/tasks";
    fetch(url, {
      method: "GET"
    }).then(respone => respone.json()).then(posts => {
      console.log("posts: " + posts)
      this.setState({ posts: posts })
    })
  }
  //Sending deleting request to the server
  deleteRow(id) {
    console.log("id", id)
    fetch('http://snappyserver-env.bvs7eikvs5.us-east-2.elasticbeanstalk.com/tasks/' + id, {
      method: "DELETE"  
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
        window.location.reload();
      })
    })

  }
  render() {
    const columns = [
      {
        Header: "User ID",
        accessor: "_id"
      }, {
        Header: "First Name",
        accessor: "firstname"
      }, {
        Header: "Last Name",
        accessor: "lastname"
      }, {
        Header: "Address",
        accessor: "address"
      }, {
        Header: "Zip Code",
        accessor: "zipcode"
      }, {
        Header: "City",
        accessor: "city"
      }, {
        Header: "State",
        accessor: "state"
      }, {
        Header: "Phone",
        accessor: "phone"
      }
      , {
        Header: "Notes",
        accessor: "notes"
      }
      , {
        Header: "Created",
        accessor: "Created_date"
      }, {
        Header: "Actions",
        Cell: props => {
          return (
            <button style={{ backgroundColor: "red", color: "#fefefe" }}
              onClick={() => {
                this.deleteRow(props.original._id);
              }}>Delete</button>
          )
        },
        sortable: false,
        filterable: false,
        witdh: 100,
        maxWidth: 100,
        minWidth: 100

      }
    ]
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize={10}
      ></ReactTable>
    );
  }
}

export default App;
