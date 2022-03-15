import React from 'react';
import './Stake.scss';
import { Container, Col, Button, Row, ListGroup } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import stake_img from '../images/aspen-stake-on-white-background-260nw-161960036.png';
import unstake_img from '../images/download.jpg';
import worm_img from '../images/download-1.jpg';
import { theme } from '../config';

class Stake extends React.Component<{}, { staked: boolean }> {
    constructor(props: any) {
        super(props);
        this.toggleStaked = this.toggleStaked.bind(this);
        this.stakeAction = this.stakeAction.bind(this);
        this.state = {
            staked: false,
        };
    }

    toggleStaked() {
        this.setState((prevState) => ({
            staked: !prevState.staked,
        }));
    }

    stakeAction() {
        alert('stake action');
    }

    render() {
        return (
            <>
                <Container bsPrefix="stakeContianer">
                    <Row>
                        <h1>Staking</h1>
                    </Row>
                    <Row className={'section'}>
                        <h3>Unclaimed {theme.currency}</h3>
                        <h2>$0</h2>
                        <Button bsPrefix={'claimBtn'}>Claim All</Button>
                    </Row>
                    <Row className={'section'}>
                        <Image
                            className="stakingImage"
                            src={this.state.staked ? stake_img : unstake_img}
                        ></Image>
                    </Row>
                    <Row className={'section'}>
                        <Col style={{ margin: 'auto' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item bsPrefix="stakeListOption">
                                    <Image src={worm_img}></Image>1{' '}
                                    {theme.alphaToken}
                                </ListGroup.Item>
                                <ListGroup.Item bsPrefix="stakeListOption">
                                    <Image src={worm_img}></Image>1{' '}
                                    {theme.betaToken}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col style={{ margin: 'auto' }}>
                            <Row>
                                <Button
                                    bsPrefix={'showBtn'}
                                    onClick={this.toggleStaked}
                                >
                                    {this.state.staked
                                        ? 'Show unstaked'
                                        : 'Show Staked'}
                                </Button>
                            </Row>
                            <Row>
                                <Button
                                    bsPrefix={'allOrNoneBtn'}
                                    onClick={this.stakeAction}
                                >
                                    {this.state.staked
                                        ? 'Unstake All '
                                        : 'Stake All '}
                                    {'(0)'}
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Stake;
