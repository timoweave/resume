'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import promise from 'redux-promise';
import axios from 'axios';
import style from './app.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'; // fixTapTouch

import { green100, green500, green700 } from 'material-ui/styles/colors';
import { RaisedButton, Chip } from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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
        const title = [work.company, work.role, work.begin, ' - ', work.end].join(' ');
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title={title} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                    {this.renderProjects()}                
                </CardText>
            </Card>            
        );
    }
}

class Technical extends Component {
    constructor(props) {
        super(props);
        this.renderAreas = this.renderAreas.bind(this);
        this.styles = {
            chip : {
                margin: 4,
                fontSize : "1.5em"
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            }
        };
    }
    renderAreas() {
        if (this.props.areas === undefined) { return (<span></span>); }

        const areas = this.props.areas.map((area, index) => {
            return (
                <Chip key={index} style={this.styles.chip}>{area}</Chip>
            );
        });
        return (<div style={this.styles.wrapper}>{areas}</div>);
    }
    render() {
        const title=this.props.category;
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title={title} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                    {this.renderAreas()}                
                </CardText>
            </Card>            
        );
    }
}

class Education extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const edu = this.props;
        const title = [edu.school, edu.state, edu.degree, edu.begin, ' - ', edu.end].join(' ');
        return (
            <Card>
                <CardHeader title={title}/>
            </Card>            
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
        const title = "Experiences";
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title={title} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                    {this.renderExperiences()}                
                </CardText>
            </Card>            
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
        const title = "Technicals";
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title={title} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                    {this.renderTechnicals()}                
                </CardText>
            </Card>            
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
        const title = "Educations";
        return (
            <Card initiallyExpanded={true}>
                <CardHeader title={title} actAsExpander={true} showExpandableButton={true}/>
                <CardText expandable={true}>
                    {this.renderEducations()}                
                </CardText>
            </Card>            
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

function getMuiThemeInfo() {
    const muiTheme = getMuiTheme({
        palette: {
            primary1Color: green500,
            primary2Color: green700,
            primary3Color: green100,
        },
    }, {
        // userAgent: req.headers['user-agent'],
        avatar: {
            borderColor: null,
        }

    });
    return muiTheme;
}
function fixTapTouch() {
    // Some components use react-tap-event-plugin to listen
    // for touch events because onClick is not fast enough.
    // This dependency is temporary and will eventually go away.
    // Until then, be sure to inject this plugin at the start of your app.
    //
    // Needed for onTouchTap
    // http://stackoverflow.com/a/34015469/988941

    injectTapEventPlugin();
}

export function main() {
    fixTapTouch();
    const muiTheme = getMuiThemeInfo();
    const root = document.getElementById('root');
    const content = (
        <MuiThemeProvider muiTheme={muiTheme}>
            <Router history={browserHistory} >
                <Route path="/">
                    <IndexRoute component={Resume}/>
                    <Route path="/abouts" component={Abouts} />
                    <Route path="/educations" component={Educations} />
                    <Route path="/experiences" component={Experiences} />
                    <Route path="/technicals" component={Technicals} />
                </Route>
            </Router>
        </MuiThemeProvider>
    );
    
    ReactDOM.render(content, root);
}

main();
