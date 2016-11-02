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
        this.projects = this.projects.bind(this);
        this.position = this.position.bind(this);
    }
    projects() {
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
    position() {
        if (this.props.projects === undefined) { return (<span></span>); }
        const work = this.props;
        return (
            <ul>
                <li>{work.company}</li>
                <li>{work.role}</li>
                <li>{work.begin}</li>
                <li>{work.end}</li>
            </ul>
        );
    }

    render() {
        return (
            <div>
                {this.position()}
                {this.projects()}
            </div>
        );
    }
}

class Technical extends Component {
    constructor(props) {
        super(props);
        this.technicals = this.technicals.bind(this);
    }
    technicals() {
        if (this.props.areas === undefined) { return (<span></span>); }

        const areas = this.props.areas.map((area, index) => {
            return (
                <li key={index}>{area}</li>
            );
        });
        return (<ul>{areas}</ul>);
    }
    render() {
        if (this.props.category === undefined) { return (<span></span>); }
        return (
            <div>
                {this.props.category}
                {this.technicals()}
            </div>
        );
    }
}

class Education extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.school === undefined) { return (<span></span>); }
        return (
            <ul>
                <li>{this.props.school}</li>
                <li>{this.props.state}</li>
                <li>{this.props.degree}</li>
                <li>{this.props.begin}</li>
                <li>{this.props.end}</li>
            </ul>
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

export class Contacts extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/contacts" };
    }

    render() {
        if (this.state.json === undefined) { return (<span></span>); }

        const contacts = this.state.json.map((contact, index) => {
            return (
                <li key={index}>{contact.method}, {contact.detail}</li>
            );
        });

        return (
            <div>
                <h1>Contacts</h1>
                <ul>
                    {contacts}
                </ul>
            </div>
        );
    }
}

export class Experiences extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/experiences" };
        this.experiences = this.experiences.bind(this);
    }
    experiences() {
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
        if (this.state.json === undefined) { return (<div/>); }
        return (
            <div >
                <h1>Experiences</h1>
                {this.experiences()}
            </div >
        );
    }
}

export class Technicals extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/technicals" };
        this.technicals = this.technicals.bind(this);
    }
    technicals() {
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
                {this.technicals()}
            </div>
        );
    }
}

export class Educations extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/educations" };
        this.educations = this.educations.bind(this);
    }
    educations() {
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
                {this.educations()}
            </div>
        );
    }
}

export class Users extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = { api: this.props.api || "api/resume/users" };
    }

    render() {
        if (this.state.json === undefined) { return (<span></span>); }
        const user = this.state.json[0];
        return (
            <div>
                <h1>User</h1>
                <ul>
                    <li key={0}>{user.firstname}</li>
                    <li key={1}>{user.lastname}</li>
                </ul>
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
                <Users api="api/resume/users"/>
                <Contacts api="api/resume/contacts"/>
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
                    <Route path="/users" component={Users} />
                    <Route path="/contacts" component={Contacts} />
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
