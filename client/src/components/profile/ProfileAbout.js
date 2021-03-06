import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from "../../validation/isEmpty";


class ProfileAbout extends Component {
  render() {
    const { profile } = this.props
    //get first name
    const firstName = profile.user.name.trim().split(" ")[0];
    // Skills List
    const skills = profile.skills.map((skill, index) => (
     <div key={index} className="p-3">
      <div className="fa fa-check"/>{skill}
     </div> 
    ))
    return (
      <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{firstName}</h3>
          <p className="lead">{isEmpty(profile.bio) ? (<span>{firstName} has not completed a bio yet.</span>) : (<span>{profile.bio}</span>)}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className=" d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
