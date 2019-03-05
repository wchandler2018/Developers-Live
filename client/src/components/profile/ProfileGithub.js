import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ProfileGithub extends Component {
constructor(props){
    super(props)
    this.state={
      clientId: "d6e1c6ed2b47cf3ea322",
      clientSecret: "b47d7b00d6a6db39665fd0d863a1d196b0e6521a",
      count: 5,
      sort: "created: asc",
      repos: []
    }
  }

  componentDidMount(){
   const { username } = this.props;
   const { count, sort, clientId, clientSecret } = this.state;

   fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret${clientSecret}`)
   .then(res=>res.json())
   .then(data => {
     if(this.refs.myRef){
      this.setState({repos: data}) 
     } 
   }).catch(err => console.log(err))
  }
  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ))
    return (
      <div ref="myRef">
        <hr/>
        <h3 className="mb-2 mt-5 text-center">Latest Github Repos</h3>
        {repoItems}
      </div>
    )
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired
}

export default ProfileGithub