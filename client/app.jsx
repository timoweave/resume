'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import promise from 'redux-promise';
import axios from 'axios';
import styles from './app.css';
// import fontsStyles from '../fonts/fonts.css';
// import fontAwesomeStyles from '../node_modules/font-awesome/css/font-awesome.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'; // fixTapTouch

import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { green100, green500, green700 } from 'material-ui/styles/colors';
import { RaisedButton, Chip, Divider, FloatingActionButton, Paper } from 'material-ui';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import School from 'material-ui/svg-icons/social/school';
import CommContacts from 'material-ui/svg-icons/communication/contacts';

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
        const style = { backgroundColor: "none" };
        return (
            <Card initiallyExpanded={true}>
                <CardText expandable={true}>
                    <div>
                        <Toolbar style={style}>
                            <ToolbarGroup style={{ width: "30%" }}>
                                <ToolbarTitle text={work.company} />
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarTitle text={work.city} />
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarTitle text={work.role} />
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarTitle text={work.begin} />
                            </ToolbarGroup>
                            <ToolbarGroup>
                                <ToolbarTitle text={work.end} />
                            </ToolbarGroup>
                        </Toolbar>
                    </div>
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
            chip: {
                margin: "4px",
                fontSize: "1.5em",
                backgroundColor: "#EAEAEA"
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            span: {
                margin: "0.5em",
            }
        };
    }
    renderAreas() {
        if (this.props.areas === undefined) { return (<p></p>); }
        const areas = this.props.areas.join(' ');
        return (<p>{areas}</p>);
    }
    render() {
        const title = this.props.category;
        return (
            <div className="col-md-4">
                <div className="row">
                    {this.props.category}
                </div>
                <div className="row">
                    {this.renderAreas()}
                </div>
            </div>
        );
    }
}

class Education extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const edu = this.props;
        const style = { backgroundColor: "none", color: "black" };
        return (
            <Toolbar style={style}>
                <ToolbarGroup style={{ width: "30%" }}>
                    <ToolbarTitle text={edu.school} style={style} />
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text={edu.state} style={style}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text={edu.degree} style={style}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text={edu.begin} style={style}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarTitle text={edu.end} style={style}/>
                </ToolbarGroup>
            </Toolbar>
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
                <Education key={idx} school={edu.school} degree={edu.degree}
                    begin={edu.begin} end={edu.end}
                    state={edu.state}/>
            );
        });
    }
    render() {
        const title = "Educations";
        const style = {
            paper: { emargin: 20, textAlign: 'center', display: 'block' },
            title: { color: "black", fontWeight: "bold", fontSize: "1.75em" }
        }
        return (
            <Paper style={style.paper} zDepth={2}>
                <Toolbar>
                    <ToolbarGroup>
                        <ToolbarTitle text={title} style={style.title}/>
                    </ToolbarGroup>
                </Toolbar>
                {this.renderEducations()}
            </Paper>
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
                <Divider />
                <Technicals api="api/resume/technicals"/>
                <Divider />
                <Experiences api="api/resume/experiences"/>
                <Divider />
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
                    <Route path="abouts" component={Abouts} > </Route>
                    <Route path="educations" component={Educations} ></Route>
                    <Route path="experiences" component={Experiences}></Route>
                    <Route path="technicals" component={Technicals} ></Route>
                </Route>
            </Router>
        </MuiThemeProvider>
    );

    ReactDOM.render(content, root);
}

main();
