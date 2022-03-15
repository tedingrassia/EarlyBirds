import React, { useState } from 'react';
import {
    Container,
    Col,
    Button,
    Row,
    ProgressBar,
    Tooltip,
    OverlayTrigger,
    Modal,
    Spinner,
} from 'react-bootstrap';
import { theme } from '../config';
import Image from 'react-bootstrap/Image';
import './Minting.scss';
import background_image from '../logo512.png';
import {
    balanceOf,
    getCurrentMintCost,
    mintTokens,
} from '../backend/createNFT';

function LearnModalBtn() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button
                bsPrefix="secondBtn"
                onClick={handleShow}
                style={{ width: 125 }}
            >
                Learn
            </Button>

            <Modal
                dialogClassName="learnModal"
                show={show}
                onHide={handleClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>What the fuck is this game?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    That is a good question. No one actually knows
                </Modal.Body>
                <Modal.Footer>
                    <Button bsPrefix="closeBtn" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

class Minting extends React.Component<
    {},
    {
        mintAmount: number;
        currentMintCost: number;
        currentMintCostCurr: string;
        autoStake: boolean;
        minting: boolean;
        balance: string;
    }
> {
    constructor(props: any) {
        super(props);
        this.adjustMintAmount = this.adjustMintAmount.bind(this);
        this.toggleAutoStake = this.toggleAutoStake.bind(this);
        this.mint = this.mint.bind(this);
        this.state = {
            autoStake: true,
            currentMintCost: 0,
            mintAmount: 1,
            minting: false,
            currentMintCostCurr: '$DIRT',
            balance: '0',
        };
    }
    async componentDidMount() {
        const balanceStr = await balanceOf();
        const balance = parseFloat(balanceStr).toFixed(2);
        let currentMintCost = await getCurrentMintCost();
        console.log('test: ', currentMintCost);
        if (currentMintCost == '0.0') {
            currentMintCost = '.05';
            this.setState({
                balance,
                currentMintCost: parseFloat(currentMintCost),
                currentMintCostCurr: 'ether',
            });
            return;
        }
        this.setState({
            balance,
            currentMintCost: parseFloat(currentMintCost),
        });
    }

    adjustMintAmount(amount: number) {
        if (this.state.mintAmount <= 1 && amount < 0) {
            return;
        }
        this.setState((prevState) => ({
            mintAmount: prevState.mintAmount + amount,
        }));
    }

    toggleAutoStake() {
        this.setState((prevState) => ({
            autoStake: !prevState.autoStake,
        }));
    }

    async mint() {
        this.setState((prevState) => ({
            minting: !prevState.minting,
        }));
        await mintTokens(this.state.autoStake, this.state.mintAmount);
        this.setState((prevState) => ({
            minting: !prevState.minting,
        }));
    }

    renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Toggle this button to auto stake your newly minted NFT
        </Tooltip>
    );

    render() {
        return (
            <>
                <Container bsPrefix="mintingContianer">
                    <Row>
                        <h1>Minting</h1>
                    </Row>
                    <Row className="section">
                        <Row>
                            <ProgressBar animated now={60} />
                        </Row>
                        <Row>
                            <span id="costSpan">
                                <h3 id="left">
                                    Current Cost: {this.state.currentMintCost}{' '}
                                    {this.state.currentMintCostCurr}
                                </h3>
                                <h3 id="right">Next Cost: 50,000</h3>
                            </span>
                        </Row>
                    </Row>
                    <Row className="section">
                        <Col>
                            <h2>{theme.currency} Balance: </h2>
                            <h1>{this.state.balance}</h1>
                        </Col>
                        <Col>
                            <Row>
                                <Image src={background_image}></Image>
                            </Row>
                            <Row>
                                <h3>
                                    x {this.state.mintAmount} Cost:{' '}
                                    {(
                                        this.state.currentMintCost *
                                        this.state.mintAmount
                                    ).toFixed(2)}{' '}
                                    {this.state.currentMintCostCurr}
                                </h3>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <h3>Buy a Bird Cage</h3>
                            </Row>
                            <Row>
                                <Image fluid src={background_image}></Image>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        bsPrefix="buyBtn"
                                        style={{ width: 125 }}
                                    >
                                        Buy
                                    </Button>
                                </Col>
                                <Col>
                                    <LearnModalBtn></LearnModalBtn>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="section">
                        <Col lg={3}>
                            <Image fluid src={background_image}></Image>
                        </Col>
                        <Col xs={6}>
                            <Row>
                                <Button bsPrefix="mintBtn" onClick={this.mint}>
                                    {this.state.minting ? (
                                        <Spinner
                                            className="loader"
                                            animation="border"
                                        ></Spinner>
                                    ) : (
                                        <span>Mint</span>
                                    )}
                                </Button>
                            </Row>
                            <Row>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={this.renderTooltip}
                                >
                                    <Button
                                        id="autoStakeCheck"
                                        onClick={this.toggleAutoStake}
                                    >
                                        Auto Staked?{' '}
                                        {this.state.autoStake ? 'Yes' : 'No'}
                                    </Button>
                                </OverlayTrigger>
                            </Row>
                            <Row>
                                <Col>
                                    <Button
                                        bsPrefix="secondBtn"
                                        onClick={() => this.adjustMintAmount(1)}
                                    >
                                        +
                                    </Button>
                                </Col>
                                <Col>
                                    <Button
                                        bsPrefix="secondBtn"
                                        onClick={() =>
                                            this.adjustMintAmount(-1)
                                        }
                                    >
                                        -
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={3}>
                            <Image fluid src={background_image}></Image>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Minting;
