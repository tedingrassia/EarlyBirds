import React from 'react';
import './App.scss';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Row,
    Button,
} from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { theme } from './config';
import { connectToMetamask, getAddress } from './backend/createNFT';

import Stake from './sections/Stake';
import Minting from './sections/Minting';
import Numbers from './sections/Numbers';

class HeaderSection extends React.Component<
    {},
    {
        wallet: string;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            wallet: '',
        };
    }
    async componentDidMount() {
        const wallet = await getAddress();
        this.setState({
            wallet: wallet,
        });
        console.log('wallet', wallet);
    }
    render() {
        return (
            <>
                <h1 id="title">{theme.gameTitle}</h1>
                <h2>{theme.gameTag}</h2>
                <h3>Play at your own risk.</h3>
                <Button bsPrefix={'connectBtn'} onClick={connectToMetamask}>
                    {this.state.wallet === 'not connected'
                        ? 'Connect'
                        : 'Connected: ' +
                          this.state.wallet.replace(
                              this.state.wallet.substring(6, 36),
                              '...'
                          )}
                </Button>
            </>
        );
    }
}
function Sections() {
    return (
        <>
            <Row className="mainSection">
                <HeaderSection></HeaderSection>
            </Row>
            <Row className="mainSection">
                <Stake></Stake>
            </Row>
            <Row className="mainSection">
                <Minting></Minting>
            </Row>
            <Row className="mainSection">
                <Numbers></Numbers>
            </Row>
        </>
    );
}

function TopBar() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">{theme.gameTitle}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#link">Docs</Nav.Link>
                            <Nav.Link href="#link">Medium</Nav.Link>
                            <NavDropdown
                                title="Third Party"
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Etherscan
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    OpenSea
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Social" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    Twitter
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Instagram
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Discord
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

function App() {
    return (
        <Container fluid className="App">
            <Container>
                <TopBar></TopBar>
                <Routes>
                    <Route path="/" element={<Sections />} />
                </Routes>
            </Container>
        </Container>
    );
}

export default App;
