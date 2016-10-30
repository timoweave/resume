'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import axios from 'axios';

class Experience extends Component {
    constructor(props) {
        super(props);
        this.renderProjects = this.renderProjects.bind(this);
    }
    renderProjects() {
        if (this.props.projects === undefined) { return (<span></span>); }
        const projects = this.props.projects.map((proj, index) => {
            return (
                <li key={index}>
                    {proj}
                </li>
            );
        });
        return (<ul>{projects}</ul>);
    }
    render() {
        const work = this.props;
        return (
            <div>
                <span>{work.company}</span>
                <span>{work.role}</span>
                <span>{work.begin}</span>
                <span>{work.end}</span>
                {this.renderProjects()}
            </div>
        );
    }
}

class Technical extends Component {
    constructor(props) {
        super(props);
        this.renderAreas = this.renderAreas.bind(this);
    }
    renderAreas() {
        if (this.props.areas === undefined) { return (<span></span>); }

        const areas = this.props.areas.map((area, index) => {
            return (
                <li key={index}>{area}</li>
            );
        });
        return (<ul>{areas}</ul>);
    }
    render() {
        return (
            <div>
                {this.props.category}
                {this.renderAreas()}
            </div>
        );
    }
}

class Education extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <span>{this.props.school}</span>
                <span>{this.props.state}</span>,
                <span>{this.props.degree}</span>,
                <span>{this.props.begin}</span> -
                <span>{this.props.end}</span>
            </div>
        );
    }
}

class About extends Component {
    constructor(props) {
        super(props);
        this.renderContacts = this.renderContacts.bind(this);
    }
    renderContacts() {
        const contacts = this.props.contacts.map((contact, index) => {
            return (<li key={index}> {contact} </li>);
        });
        return (<ul>{contacts}</ul>);
    }
    render() {
        return (
            <div>
                <span>{this.props.firstname}</span> <span>{this.props.lastname}</span>
                {this.renderContacts()}
            </div>
        );
    }
}

class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { api: "", json: [] };
        this.getJson = this.getJson.bind(this);
    }
    componentWillMount() {
        this.getJson();
    }
    getJson() {
        const component = this;
        axios.get(this.state.api)
            .then(function (response) {
                component.setState({ json: response.data });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (<span></span>);
    }
}

export class Experiences extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/experiences" };
        this.renderExperiences = this.renderExperiences.bind(this);
    }
    renderExperiences() {
        if (this.state.json === undefined) { return (<div/>); }
        const works = this.state.json;
        return works.map((work, index) => {
            return (
                <Experience key={index}
                    company={work.company} role={work.role}
                    begin={work.begin} end={work.end} projects={work.projects}></Experience>
            );
        });
    }
    render() {
        return (
            <div >
                <h1>Experiences</h1>
                {this.renderExperiences()}
            </div >
        );
    }
}

export class Technicals extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/technicals" };
        this.renderTechnicals = this.renderTechnicals.bind(this);
    }
    renderTechnicals() {
        if (this.state.json === undefined) { return (<div/>); }
        const techs = this.state.json;
        return techs.map((tech, index) => {
            return (
                <Technical key={index} category={tech.category} areas={tech.areas}>
                </Technical>
            );
        });
    }
    render() {
        return (
            <div>
                <h1>Technicals</h1>
                {this.renderTechnicals()}
            </div>
        );
    }
}

export class Educations extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/educations" };
        this.renderEducations = this.renderEducations.bind(this);
    }
    renderEducations() {
        if (this.state.json === undefined) {
            return (<div/>)
        }
        return this.state.json.map((edu, idx) => {
            return (
                <Education key={idx}
                    school={edu.school} degree={edu.degree}
                    begin={edu.begin} end={edu.end}
                    state={edu.state}/>
            );
        });
    }
    render() {
        return (
            <div>
                <h1>Educations</h1>
                {this.renderEducations()}
            </div>
        );
    }
}

export class Abouts extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/abouts" };
        this.renderAbouts = this.renderAbouts.bind(this);
    }

    renderAbouts() {
        if (this.state.json === undefined) {
            return (<div/>)
        }
        return this.state.json.map((about, index) => {
            return (
                <About key={index}
                    firstname={about.firstname}
                    lastname={about.lastname}
                    contacts={about.contacts}
                    >
                </About>
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Abouts</h1>
                {this.renderAbouts()}
            </div>
        );
    }
}

export default class Resume extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Abouts api="api/resume/abouts"/>
                <Technicals api="api/resume/technicals"/>
                <Experiences api="api/resume/experiences"/>
                <Educations api="api/resume/educations"/>
            </div>
        );
    }
}

export function Store() {
    const nothing = (state, action) => { return {}; };
    const reducers = combineReducers({ none: nothing });
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore)(reducers);
    return createStoreWithMiddleware;
}

export function main() {
    const root = document.getElementById('root');
    const content = (
        <Provider store={Store()}>
            <Router history={browserHistory} >
                <Route path="/">
                    <IndexRoute component={Resume}/>
                    <Route path="/abouts" component={Abouts} />
                    <Route path="/educations" component={Educations} />
                    <Route path="/experiences" component={Experiences} />
                    <Route path="/technicals" component={Technicals} />
                </Route>
            </Router>
        </Provider>
    );
    
    ReactDOM.render(content, root);
}

main();
