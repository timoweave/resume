'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import 'font-awesome/css/font-awesome.css';
// import 'bootstrap/dist/css/bootstrap.css'; 
// import 'bootstrap/dist/css/bootstrap-theme.css';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import promise from 'redux-promise';
import axios from 'axios';

import { Grid, Col, Row } from 'react-bootstrap';
import { Button, Glyphicon } from 'react-bootstrap';

export function Store() {
    const nothing = (state, action) => { return {}; };
    const reducers = combineReducers({ none: nothing });
    const createStoreWithMiddleware = applyMiddleware(promise)(createStore)(reducers);
    return createStoreWithMiddleware;
}

// plain version

export class Experience extends Component {
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
                <li>{work.role}</li>
                <li>{work.company}</li>
                <li>{work.city}</li>
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

export class Technical extends Component {
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

export class Education extends Component {
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

export class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { api: "", json: [] };
        this.getJson = this.getJson.bind(this);
    }
    componentWillMount() {
        this.getJson(this.state.api, "json");
    }
    getJson(api, save) {
        const component = this;
        axios.get(api)
            .then(function (response) {
                const result = {};
                result[save] = response.data;
                component.setState(result);
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
                    company={work.company} role={work.role} city={work.city}
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

export class Resume extends Component {
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

export function PlainApp() {
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

// bootstrap version

export class BsExperience extends Experience {
    title() {
        if (this.props.index === 0) { return <span></span>; }
        return (
            <Row style={{ 'fontSize': '1.375em' }}>
                <Col xs={12} style={{ 'textAlign': 'center', 'marginBottom': '0.5em' }}>
                    <Glyphicon glyph="briefcase" style={{ 'color': 'white', 'opacity': '0.3', 'backgroundColor': 'cornflowerblue', 'borderRadius': '50%', 'padding': '0.4em' }}/>
                </Col>
            </Row>
        );
    }
    position() {
        if (this.props.projects === undefined) { return (<span></span>); }
        const work = this.props;
        const font = { 'fontSize': '1.875em', 'marginBottom': '0.375em' };
        const style = {};
        Object.assign(style, this.props.style);
        Object.assign(style, font);
        const lighter = Object.assign({}, this.props.style);
        Object.assign(lighter, { 'fontWeight': 'lighter' });
        const end = Object.assign({}, lighter);
        end['textAlign'] = 'right';

        return (
            <Row>
                <Col xs={6} sm={4} style={style}>{work.role}</Col>
                <Col xs={6} sm={4} style={style}>{work.company}</Col>
                <Col xsHidden sm={2} style={style}>{work.city}</Col>
                <Col xsHidden sm={1} style={end}>{work.begin}</Col>
                <Col xsHidden sm={1} style={end}>{work.end}</Col>
            </Row>
        );
    }

    projects() {
        if (this.props.projects === undefined) { return (<span></span>); }
        const style = Object.assign({}, this.props.style);
        const font = { 'fontWeight': 'lighter', 'fontSize': '1.5em' };
        Object.assign(style, font);
        return this.props.projects.map((proj, index) => {
            return (
                <Row key={index} style={style}>
                    <Col sm={12}>
                        - {proj}
                    </Col>
                </Row>
            );
        });
    }

    render() {
        const style = { 'marginBottom': '1.5em' };
        return (
            <Grid fluid style={style}>
                {this.title()}
                {this.position()}
                {this.projects()}
            </Grid>
        );
    }
}

export class BsTechnical extends Technical {
    technicals() {
        if (this.props.areas === undefined) { return (<span></span>); }

        // const areas = ;
        return this.props.areas.map((area, index) => {
            return (
                <span key={index}> {area} </span>
            );
        });
        // return (<div>{areas}</div>);
    }
    render() {
        if (this.props.category === undefined) { return (<span></span>); }
        const font = { 'fontSize': '1.35em', 'textAlign': 'center' };
        return (
            <Col xs={12} sm={4}>
                <Row style={font}>{this.props.category}</Row>
                <Row style={{ 'textAlign': 'justify', 'padding': '0.5em', 'fontSize': '1.0em', 'fontWeight': 'lighter' }}>
                    {this.technicals()}
                </Row>
            </Col>
        );
    }
}

export class BsEducation extends Education {
    render() {
        if (this.props.school === undefined) { return (<span></span>); }
        const edu = this.props;
        const font = { 'fontWeight': 'lighter' }
        const style = Object.assign({}, this.props.style);
        const lighter = Object.assign({}, this.props.style);
        Object.assign(lighter, font);
        const end = Object.assign({}, lighter);
        end['textAlign'] = 'right';
        return (
            <Grid fluid>
                <Row>
                    <Col xs={6} sm={4} style={style}>{edu.degree}</Col>
                    <Col xs={6} sm={4} style={style}>{edu.school}</Col>
                    <Col xsHidden sm={2} style={lighter}>{edu.state}</Col>
                    <Col xsHidden sm={1} style={end}>{edu.begin}</Col>
                    <Col xsHidden sm={1} style={end}>{edu.end}</Col>
                </Row>
            </Grid>
        );
    }
}

export class BsContacts extends Contacts {
    render() {
        if (this.state.json === undefined) { return (<span></span>); }
        const style = { 'textAlign': 'center', 'fontSize': '1.25em' };
        const contacts = this.state.json.map((contact, index) => {
            return (
                <Col sm={3} style={style}>{contact.detail}</Col>
            );
        });

        return (
            <Grid fluid>
                <Row>
                    {contacts}
                </Row>
            </Grid>
        );
    }
}

export class BsExperiences extends Experiences {
    experiences() {
        if (this.state.json === undefined) { return (<div/>); }
        const works = this.state.json;
        const style = this.props.style;
        return works.map((work, index) => {
            return (
                <BsExperience key={index} index={index} style={style}
                    company={work.company} role={work.role}
                    begin={work.begin} end={work.end} projects={work.projects}>
                </BsExperience>
            );
        });
    }
    render() {
        const title = (
            <Grid fluid>
                <Row style={{ 'fontSize': '1.375em' }}>
                    {/*
                    <Col xs={8} sm={2} style={{ 'textAlign': 'left' }}>
                        Experiences
                    </Col>

                    <Col xs={4} sm={10} style={{ 'textAlign': 'right' }}>
                        <Glyphicon glyph="briefcase"/>
                    </Col>
                    */}
                    <Col xs={12} style={{ 'textAlign': 'center', 'marginBottom': '0.5em' }}>
                        <Glyphicon glyph="briefcase" style={{ 'color': 'white', 'opacity': '0.3', 'backgroundColor': 'cornflowerblue', 'borderRadius': '50%', 'padding': '0.4em' }}/>
                    </Col>
                </Row>
            </Grid>
        );

        if (this.state.json === undefined) { return (<div/>); }
        return (
            <div style={{ 'margin': '1.5em' }}>
                {title}
                {this.experiences()}
            </div>

        );
    }
}

export class BsTechnicals extends Technicals {
    technicals() {
        if (this.state.json === undefined) { return (<div/>); }
        const data = this.state.json;
        const style = this.props.style;
        const tech = data.map((tech, index) => {
            return (
                <BsTechnical key={index} category={tech.category} areas={tech.areas} style={style}>
                </BsTechnical>
            );
        });
        return (
            <Grid fluid style={style}>
                {tech}
            </Grid>
        );
    }
    render() {
        const style = { marginBottom: '1em' };
        const title = (
            <Grid fluid>
                <Row style={{ fontSize: '1.375em' }}>
                    {/*
                    <Col xs={8} sm={2} style={{ 'textAlign': 'left' }}>
                        Technicals
                    </Col>

                    <Col xs={4} sm={10} style={{ 'textAlign': 'right' }}>
                        <Glyphicon glyph="cog"/>
                    </Col>
                      */}
                    <Col xs={12} style={{ 'textAlign': 'center', 'marginBottom': '0.5em' }}>
                        <Glyphicon glyph="cog" style={{ 'color': 'white', 'opacity': '0.3', 'backgroundColor': 'cornflowerblue', 'borderRadius': '50%', 'padding': '0.4em' }}/>
                    </Col>
                </Row>
            </Grid>
        );
        return (
            <div style={{ 'margin': '1.5em' }}>
                {title}
                {this.technicals()}
            </div>
        );
    }
}

export class BsEducations extends Educations {
    title() {
        return (
            <Grid fluid>
                <Row style={{ 'fontSize': '1.375em' }}>
                    {/*
                    <Col xs={8} sm={2} style={{ 'textAlign': 'left' }}>
                        Educations
                    </Col>
                    <Col xs={4} sm={10} style={{ 'textAlign': 'right' }}>
                        <Glyphicon glyph="education"/>
                    </Col>
                      */}
                    <Col xs={5}></Col>
                    <Col xs={2} style={{ 'textAlign': 'center', 'marginBottom': '0.5em' }}>
                        <Glyphicon glyph="education" style={{ 'color': 'white', 'opacity': '0.3', 'backgroundColor': 'cornflowerblue', 'borderRadius': '50%', 'padding': '0.4em' }}/>
                    </Col>
                    <Col xs={5}></Col>
                </Row>
            </Grid>
        );
    }
    educations() {
        if (this.state.json === undefined) {
            return (<div/>)
        }
        const style = { 'fontSize': '1.5em' };
        return this.state.json.map((edu, idx) => {
            return (
                <BsEducation key={idx} style={style}
                    school={edu.school} degree={edu.degree}
                    begin={edu.begin} end={edu.end}
                    state={edu.state}>
                </BsEducation>
            );
        });
    }

    render() {
        return (
            <div style={{ 'margin': '1.5em' }}>
                {this.title()}
                {this.educations()}
            </div>
        );
    }
}

export class BsUsers extends Users {

    render() {
        if (this.state.json === undefined) { return (<span></span>); }
        const style = { 'textAlign': 'center', 'fontSize': '2.5em', 'margin': '0.25em 0.25em' };
        const user = this.state.json[0];
        return (
            <Grid fluid>
                <Row>
                    <Col style={style}> {user.firstname} {user.lastname}</Col>
                </Row>
            </Grid>
        );
    }
}

export class BsHeader extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            user_api: "api/resume/users", user: [],
            contact_api: "api/resume/contacts", contacts: []
        };
    }
    componentWillMount() {
        this.getJson(this.state.user_api, "user");
        this.getJson(this.state.contact_api, "contacts");
    }
    render() {
        if ((this.state.user.length === 0) || (this.state.contacts.length === 0)) {
            return (<span></span>);
        }
        const user = this.state.user[0];
        const contacts = this.state.contacts;
        // lighslategrey
        // steelblue
        // lightseagreen
        return (
            <Grid fluid>
                <Row style={{
                    'alignItems': 'center',
                    'backgroundColor': 'cornflowerblue', 'color': 'white',
                    'padding': '2em 0.25em 2em 0.25em', 'marginBottom': '1.5em'
                }}>
                    <Col xsHidden sm={4} style={{ 'fontSize': '1.25em', 'textAlign': 'left', 'fontWeight': 'lighter' }} >
                        <div> {contacts[0].detail} </div>
                        <div> {contacts[1].detail} </div>
                    </Col>
                    <Col xs={12} sm={4} style={{ 'fontSize': '2.75em', 'textAlign': 'center' }}>
                        <div style={{ 'textAlign': 'center' }}> {user.firstname} {user.lastname} </div>
                    </Col>

                    <Col xsHidden sm={4} style={{ 'fontSize': '1.25em', 'textAlign': 'right', 'fontWeight': 'lighter' }}>
                        <div> {contacts[2].detail} </div>
                        <div> {contacts[3].detail} </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export class BsFooter extends BsHeader {
    render() {
        if ((this.state.user.length === 0) || (this.state.contacts.length === 0)) {
            return (<span></span>);
        }
        const user = this.state.user[0];
        const contacts = this.state.contacts.map((c) => (c.detail));
        const grid = { 'backgroundColor': 'cornflowerblue', 'padding': '5em 1em' };
        const row = { 'textAlign': 'center', 'color': 'white' };
        const center_col = { 'textAlign': 'center', 'fontSize': '1.875em' };
        const contact_col = { 'textAlign': 'center', 'fontSize': '1.15em' };
        return (
            <Grid fluid style={grid}>
                <Row style={row}>
                    <Col xs={12} style={center_col}>
                        {user.firstname} {user.lastname}
                    </Col>
                </Row>
                <Row style={row}>
                    <Col key={0} xs={12} sm={3} style={contact_col}>
                        {contacts[0]}
                    </Col>
                    <Col key={1} xs={12} sm={3} style={contact_col}>
                        {contacts[1]}
                    </Col>
                    <Col key={2} xs={12} sm={3} style={contact_col}>
                        {contacts[2]}
                    </Col>
                    <Col key={3} xs={12} sm={3} style={contact_col}>
                        {contacts[3]}
                    </Col>
                </Row>

            </Grid>
        );
    }
}

export class BsResume extends Resume {
    render() {
        const style = { 'fontSize': '1.5em' };
        return (
            <div>
                <BsHeader api="api/resume/users" style={style}/>
                <BsTechnicals api="api/resume/technicals" style={style}/>
                <BsExperiences api="api/resume/experiences" style={style}/>
                <BsEducations api="api/resume/educations" style={style}/>
                <BsFooter api="api/resume/users" style={style}/>
            </div>
        );
    }
}

export function BsApp() {
    const root = document.getElementById('root');
    const content = (
        <Provider store={Store()}>
            <Router history={browserHistory} >
                <Route path="/">
                    <IndexRoute component={BsResume}/>
                    <Route path="/header" component={BsHeader} />
                    <Route path="/footer" component={BsFooter} />
                    <Route path="/users" component={BsUsers} />
                    <Route path="/contacts" component={BsContacts} />
                    <Route path="/educations" component={BsEducations} />
                    <Route path="/experiences" component={BsExperiences} />
                    <Route path="/technicals" component={BsTechnicals} />
                </Route>
            </Router>
        </Provider>
    );

    ReactDOM.render(content, root);
}
