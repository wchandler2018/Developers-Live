import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"
import  PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";


class CreateProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            dibble: '',
            errors: {}

        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
    onSubmit(e){
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
            dribble: this.state.dribble
        }
        this.props.createProfile(profileData, this.props.history)
    }

    onChange(e){
        this.setState({ [e.target.name]: e.target.value})
    }

  render() {
      const {errors, displaySocialInputs } = this.state;
      //select field options

      let socialInputs;
      if(displaySocialInputs){
        socialInputs = (
            <div>
        <InputGroup 
            placeholder="Twitter Profile URL"
            name="twitter"
            icon = "fab fa-twitter"
            value = {this.state.twitter}
            onChange = {this.onChange}
            error = {errors.twitter}
            /> 

        <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

        <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

        <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        <InputGroup
            placeholder="Dribbble Page URL"
            name="dribble"
            icon="fab fa-dribbble"
            value={this.state.dribbble}
            onChange={this.onChange}
            error={errors.dribble}
          />
        </div>
        )
      }
      const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Frontend Developer', value: 'Frontend Developer' },
        { label: 'Backend Developer', value: 'Backend Developer' },
        { label: 'Full Stack Developer', value: 'Full Stack Developer' },
        { label: 'Designer', value: 'Designer' },
        { label: 'Webmaster', value: 'Webmaster' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Project Manager', value: 'Project Manager' },
        { label: 'Quality Controll Tester', value: 'Quality Controll Tester' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
      ];
    return (
      <div className="create-profile">
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-r4 text-center">Create Your Profile</h1>
                        <p className="lead text-center">
                            Lets Get Your Profile Set Up
                        </p>
                        <small className="d-block pb-3">** = required fields</small>
                        <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="**Screen Name"
                            name="handle"
                            value = {this.state.handle}
                            onChange = {this.onChange}
                            error={errors.handle}
                            info = "Choose a unigue screen name for your profile."
                        />
                        <TextFieldGroup 
                            placeholder="Location"
                            name="location"
                            value = {this.state.location}
                            onChange = {this.onChange}
                            error={errors.location}
                            info = "Please enter your location."
                        />
                        <SelectListGroup 
                            placeholder="Professional Status"
                            name="status"
                            value = {this.state.status}
                            onChange = {this.onChange}
                            error={errors.status}
                            options = {options}
                            info = "Where are you in your career."
                        />
                        <TextFieldGroup 
                            placeholder="Organization"
                            name="company"
                            value = {this.state.company}
                            onChange = {this.onChange}
                            error={errors.company}
                            info = "Where you currently work, freelance or your own company"
                        />
                        <TextFieldGroup 
                            placeholder="Company or Personal Website"
                            name="website"
                            value = {this.state.website}
                            onChange = {this.onChange}
                            error={errors.website}
                            info = "Please enter your company's or professional portfolio website."
                        />
                        <TextFieldGroup 
                            placeholder="Professional Skills"
                            name="skills"
                            value = {this.state.skills}
                            onChange = {this.onChange}
                            error={errors.skills}
                            info = "Please use comma seperated values(example...HTML,CSS,JS,React)."
                        />
                        <TextFieldGroup 
                            placeholder="GitHub Username"
                            name="githubusername"
                            value = {this.state.githubusername}
                            onChange = {this.onChange}
                            error={errors.githubusername}
                            info = "If you want to include your latest Github repos and link please include your username."
                        />
                        <TextAreaFieldGroup
                            placeholder="Tell us about you"
                            name="bio"
                            value = {this.state.bio}
                            onChange = {this.onChange}
                            error={errors.bio}
                            info = "We would love to know more about!!!"
                        />
                        <div className="mb-3">
                            <button 
                            type="button"
                            onClick={() => {
                            this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                               }))
                           }}
                            className="btn btn-light">
                            Add Links To Your Social Media Pages 
                            </button> 
                            <span className="text-muted">optional</span>
                        </div>
                            {socialInputs}
                            <input 
                            type="submit" 
                            value="submit"
                            className="btn btn-outline-info btn-block mt-4"
                            />
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.propType = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile })( withRouter(CreateProfile));
